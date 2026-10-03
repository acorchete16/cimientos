// Añade a data/watchlist.json los ISIN que vengan en el título/cuerpo de una incidencia "Seguir ...".
import { readFile, writeFile } from 'node:fs/promises';
const text = `${process.env.ISSUE_TITLE || ''}\n${process.env.ISSUE_BODY || ''}`;
const isins = [...new Set((text.toUpperCase().match(/\b[A-Z]{2}[A-Z0-9]{9}[0-9]\b/g) || []))];
const nameMatch = (process.env.ISSUE_BODY || '').match(/nombre:\s*(.+)/i);
const symMatch = (process.env.ISSUE_BODY || '').match(/simbolo:\s*([A-Za-z0-9.\-=^]+)/i);
const wl = JSON.parse(await readFile('data/watchlist.json', 'utf8'));
const added = [];
for (const isin of isins) {
  if (wl.items.some(x => x.id === isin)) continue;
  const it = { id: isin, isin, name: (isins.length === 1 && nameMatch ? nameMatch[1].trim().slice(0, 80) : isin) };
  if (isins.length === 1 && symMatch) it.symbol = symMatch[1];
  wl.items.push(it); added.push(isin);
}
await writeFile('data/watchlist.json', JSON.stringify(wl, null, 2) + '\n');
await writeFile(process.env.GITHUB_OUTPUT || '/dev/null', `isins=${isins.join(',')}\nadded=${added.join(',')}\n`, { flag: 'a' });
console.log('ISIN encontrados:', isins, 'añadidos:', added);
