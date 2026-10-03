// Descarga precios de Yahoo Finance para los productos de data/watchlist.json
// y los guarda en data/prices.json (la app lo lee desde su propio dominio, sin problemas de CORS).
import { readFile, writeFile } from 'node:fs/promises';

const UA = { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36', 'Accept': 'application/json' };
const HOSTS = ['https://query1.finance.yahoo.com', 'https://query2.finance.yahoo.com'];
const sleep = (ms) => new Promise(r => setTimeout(r, ms));

async function yget(path) {
  let last;
  for (let attempt = 0; attempt < 3; attempt++) {
    for (const h of HOSTS) {
      try {
        const res = await fetch(h + path, { headers: UA });
        if (res.ok) return await res.json();
        last = new Error(`${res.status} ${path}`);
      } catch (e) { last = e; }
      await sleep(800);
    }
    await sleep(2000 * (attempt + 1));
  }
  throw last;
}

// Prefiere cotizaciones en euros en bolsas líquidas (Xetra, Ámsterdam, Milán, París) y exige que tengan historial
const EXCH_PREF = ['GER', 'AMS', 'MIL', 'PAR', 'EBS', 'FRA', 'MUN', 'BER', 'DUS', 'HAM', 'STU', 'LSE', 'NMS', 'NYQ', 'NGM', 'ASE'];
const SUFFIX_PREF = ['.DE', '.AS', '.MI', '.PA', '.SW', '.F', '.L', ''];
const rankQ = (q) => {
  const ie = EXCH_PREF.indexOf(q.exchange), is = SUFFIX_PREF.findIndex(sf => sf ? q.symbol.endsWith(sf) : !q.symbol.includes('.'));
  const isinLike = /^[A-Z]{2}[A-Z0-9]{9}[0-9]\./.test(q.symbol) ? 50 : 0; // "IE00….SG" suelen venir sin historial
  return (ie < 0 ? 30 : ie) + (is < 0 ? 10 : is) + isinLike;
};
async function hasHistory(symbol) {
  try {
    const r = await chart(symbol, '3mo', '1d');
    return pts(r).length >= 20;
  } catch { return false; }
}
async function searchQuotes(q) {
  const j = await yget(`/v1/finance/search?q=${encodeURIComponent(q)}&quotesCount=15&newsCount=0`);
  return (j.quotes || []).filter(x => x.symbol);
}
async function resolveSymbol(item, prev) {
  if (item.symbol) return item.symbol;
  if (prev && prev.symbol && (prev.daily || []).length >= 20) return prev.symbol;
  let cands = await searchQuotes(item.isin);
  // Busca también por nombre para encontrar cotizaciones con ticker (VWCE.DE en vez de IE00….SG)
  const nm = (cands.find(c => c.longname || c.shortname) || {});
  const name = nm.longname || nm.shortname || (item.name && item.name !== item.isin ? item.name : null);
  if (name) {
    try {
      const more = await searchQuotes(name.replace(/\(.*?\)/g, '').trim());
      const type = nm.quoteType;
      cands = cands.concat(more.filter(m => !type || m.quoteType === type));
    } catch {}
  }
  const seen = new Set(); cands = cands.filter(c => !seen.has(c.symbol) && seen.add(c.symbol));
  cands.sort((a, b) => rankQ(a) - rankQ(b));
  for (const c of cands.slice(0, 8)) { if (await hasHistory(c.symbol)) return c.symbol; await sleep(300); }
  if (cands.length) return cands[0].symbol;
  throw new Error(`Sin resultados para ${item.isin}`);
}

const pts = (r) => {
  const t = r.timestamp || [], c = (r.indicators && r.indicators.quote && r.indicators.quote[0] && r.indicators.quote[0].close) || [];
  const out = [];
  for (let i = 0; i < t.length; i++) if (c[i] != null) out.push([t[i], Math.round(c[i] * 10000) / 10000]);
  return out;
};

async function chart(symbol, range, interval) {
  const j = await yget(`/v8/finance/chart/${encodeURIComponent(symbol)}?range=${range}&interval=${interval}&includePrePost=false`);
  const r = j.chart && j.chart.result && j.chart.result[0];
  if (!r) throw new Error(`Sin datos de gráfico para ${symbol}`);
  return r;
}

const wl = JSON.parse(await readFile('data/watchlist.json', 'utf8'));
let prev = {};
try { prev = JSON.parse(await readFile('data/prices.json', 'utf8')).items || {}; } catch {}

const items = {}, errors = {};
for (const it of wl.items) {
  try {
    const symbol = await resolveSymbol(it, prev[it.id]);
    const d1 = await chart(symbol, '1d', '5m');
    const y1 = await chart(symbol, '1y', '1d');
    const y5 = await chart(symbol, '5y', '1wk');
    const m = y1.meta || {};
    const daily = pts(y1);
    const price = m.regularMarketPrice ?? (daily.length ? daily[daily.length - 1][1] : null);
    const prevClose = (d1.meta && (d1.meta.chartPreviousClose ?? d1.meta.previousClose)) ?? (daily.length > 1 ? daily[daily.length - 2][1] : null);
    items[it.id] = {
      id: it.id, isin: it.isin || null, symbol, name: it.name || m.longName || m.shortName || symbol,
      longName: m.longName || m.shortName || null, currency: m.currency || 'EUR', exchange: m.fullExchangeName || m.exchangeName || null,
      type: m.instrumentType || null, price, prevClose,
      changePct: price != null && prevClose ? Math.round((price / prevClose - 1) * 10000) / 100 : null,
      high52: m.fiftyTwoWeekHigh ?? null, low52: m.fiftyTwoWeekLow ?? null,
      time: m.regularMarketTime || null,
      intraday: pts(d1), daily, weekly: pts(y5),
    };
  } catch (e) {
    errors[it.id] = String(e.message || e);
    if (prev[it.id]) items[it.id] = prev[it.id]; // conserva el último dato bueno
  }
  await sleep(600);
}

// Cambio USD→EUR para productos en dólares
let fx = {};
try { const r = await chart('EURUSD=X', '5d', '1d'); fx.EURUSD = r.meta.regularMarketPrice; } catch (e) { errors.fx = String(e.message || e); }

const out = { updatedAt: new Date().toISOString(), fx, items, errors };
await writeFile('data/prices.json', JSON.stringify(out));
console.log('OK', Object.keys(items).length, 'productos;', 'errores:', JSON.stringify(errors));
