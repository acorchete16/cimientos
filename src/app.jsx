
const { useState, useEffect, useMemo, useRef } = React;

const Icon = ({ name, ...p }) => {
  const c = { viewBox:"0 0 24 24", fill:"none", stroke:"currentColor", strokeWidth:"1.8",
              strokeLinecap:"round", strokeLinejoin:"round", ...p };
  const paths = {
    shield: <path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z"/>,
    house: <><path d="M4 11 12 4l8 7"/><path d="M6 10v9h12v-9"/></>,
    food: <><path d="M6 3v7a3 3 0 0 0 6 0V3"/><path d="M9 10v11"/><path d="M17 3c-1.5 1-2 2.5-2 5s1 4 2 4v9"/></>,
    bolt: <path d="M13 2 4 14h6l-1 8 9-12h-6z"/>,
    car: <><path d="M4 16V11l2-5h12l2 5v5"/><path d="M4 16h16"/><circle cx="7.5" cy="16.5" r="1.5"/><circle cx="16.5" cy="16.5" r="1.5"/></>,
    sub: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 9h18"/></>,
    dumbbell: <><path d="M4 9v6M20 9v6"/><path d="M7 7v10M17 7v10"/><path d="M7 12h10"/></>,
    trend: <><path d="M4 16l5-6 4 3 7-9"/><path d="M14 4h6v6"/></>,
    fun: <><circle cx="12" cy="12" r="9"/><path d="M9 10h.01M15 10h.01"/><path d="M8.5 14.5c1 1.2 2.2 1.8 3.5 1.8s2.5-.6 3.5-1.8"/></>,
    health: <path d="M12 21s-7-4.4-9.5-9C.9 8.3 2.8 4 7 4c2 0 3.6 1.1 5 3 1.4-1.9 3-3 5-3 4.2 0 6.1 4.3 4.5 8-2.5 4.6-9.5 9-9.5 9z"/>,
    dots3: <path d="M12 5v.01M12 12v.01M12 19v.01" strokeWidth="2.6"/>,
    plus: <path d="M12 5v14M5 12h14"/>,
    close: <path d="M6 6l12 12M18 6L6 18"/>,
    chevL: <path d="M15 6l-6 6 6 6"/>,
    chevR: <path d="M9 6l6 6-6 6"/>,
    trash: <><path d="M4 7h16"/><path d="M10 11v6M14 11v6"/><path d="M6 7l1 13h10l1-13"/><path d="M9 7V4h6v3"/></>,
    moon: <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5z"/>,
    sun: <><circle cx="12" cy="12" r="4.2"/><path d="M12 2v2M12 20v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2 12h2M20 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/></>,
    book: <><path d="M4 5c2-1 5-1 7 0v14c-2-1-5-1-7 0z"/><path d="M20 5c-2-1-5-1-7 0v14c2-1 5-1 7 0z"/></>,
    wallet: <><path d="M3 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M15 12h4"/></>,
    phoneswap: <><rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/></>,
    briefcase: <><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></>,
    gift: <><rect x="4" y="9" width="16" height="11" rx="1"/><path d="M4 9h16M12 9v11M12 9c-2-4-7-3-6 0h6zm0 0c2-4 7-3 6 0h-6z"/></>,
    history: <><circle cx="12" cy="12" r="8.5"/><path d="M12 7v5l3.5 2"/></>,
    arrowDown: <path d="M12 5v14M6 13l6 6 6-6"/>,
    arrowUp: <path d="M12 19V5M6 11l6-6 6 6"/>,
    piggy: <><path d="M4 12a6 6 0 0 1 6-6h4a6 6 0 0 1 6 4h1l-1.2 2.4A6 6 0 0 1 14 18h-1v3H9v-3H8l-2-2H4z"/><circle cx="15" cy="11" r=".6" fill="currentColor" stroke="none"/></>,
    calendar: <><rect x="3.5" y="5" width="17" height="15" rx="2"/><path d="M3.5 10h17M8 3v4M16 3v4"/></>,
    backspace: <><path d="M9 5h11v14H9l-6-7z"/><path d="M13 9.5l5 5M18 9.5l-5 5"/></>,
    navMes: <><rect x="3.5" y="4" width="17" height="16" rx="2"/><path d="M3.5 9h17"/><path d="M8 13h3M8 16h6"/></>,
    navPlan: <><path d="M4 20V9l8-5 8 5v11"/><path d="M4 20h16"/><path d="M9 20v-6h6v6"/></>,
    navAcum: <><path d="M4 19h16"/><path d="M6 16v-4M10 16V8M14 16v-6M18 16V5"/></>,
    backup: <><ellipse cx="12" cy="6" rx="7" ry="2.6"/><path d="M5 6v6c0 1.4 3.1 2.6 7 2.6s7-1.2 7-2.6V6"/><path d="M5 12v6c0 1.4 3.1 2.6 7 2.6s7-1.2 7-2.6v-6"/></>,
    check: <path d="M5 12.5l4.5 4.5L19 7.5"/>,
    edit: <><path d="M4 20h4L18.5 9.5a2.1 2.1 0 0 0-3-3L4.5 17z"/><path d="M13.5 6.5l4 4"/></>,
  };
  return <svg {...c}>{paths[name] || <circle cx="12" cy="12" r="9"/>}</svg>;
};

const STORAGE_KEY = "cimientos_simple_v2";
const OLD_KEY = "cimientos_simple_v1";
const THEME_KEY = "cimientos_simple_theme";
const COLORS = ["#FF9F43","#8E9BFF","#C77DFF","#EF4B55","#FF6FA5","#5EC8D8","#8FD66A","#FFD166","#B48CFF","#A7B0BF"];
const OLD_DEFAULT_COLORS = {"#5B7B9A":"#8E9BFF","#B8792B":"#FF9F43","#D08A3E":"#FFD166","#7A6BAE":"#5EC8D8","#3E8FA6":"#C77DFF","#C25C8A":"#FF6FA5","#B34438":"#EF4B55","#2E8F6E":"#8FD66A","#B8862B":"#B48CFF","#1F6F54":"#8FD66A","#8A8676":"#A7B0BF","#4E7D6B":"#7EE0B5"};
const DEFAULT_CATS = [
  { id:"piso", name:"Piso", icon:"house", color:"#8E9BFF", kind:"gasto" },
  { id:"comida", name:"Comida", icon:"food", color:"#FF9F43", kind:"gasto" },
  { id:"agualuz", name:"Agua / Luz", icon:"bolt", color:"#FFD166", kind:"gasto" },
  { id:"transporte", name:"Transporte", icon:"car", color:"#5EC8D8", kind:"gasto" },
  { id:"subs", name:"Suscripciones", icon:"sub", color:"#C77DFF", kind:"gasto" },
  { id:"gym", name:"Gym", icon:"dumbbell", color:"#FF6FA5", kind:"gasto" },
  { id:"ocio", name:"Ocio", icon:"fun", color:"#EF4B55", kind:"gasto" },
  { id:"ahorro", name:"Ahorro", icon:"piggy", color:"#8FD66A", kind:"ahorro" },
  { id:"inversiones", name:"Inversiones", icon:"trend", color:"#B48CFF", kind:"inversion" },
];
const FIXED_IDS = ["piso","agualuz","subs","gym"];
const KIND_META = {
  gasto:    { label:"Gasto",    color:"var(--danger)" },
  ahorro:   { label:"Ahorro",   color:"var(--accent)" },
  inversion:{ label:"Inversión",color:"var(--invest)" },
};
function inferKind(cat){
  const n = (cat.name||'').toLowerCase();
  if (cat.id==='inversiones' || n.includes('invers')) return 'inversion';
  if (cat.id==='ahorro' || n.includes('ahorro')) return 'ahorro';
  return 'gasto';
}
const INCOME_SOURCES = [
  { id:"sueldo", name:"Sueldo", icon:"wallet", color:"#8FD66A" },
  { id:"bizum", name:"Bizum", icon:"phoneswap", color:"#5EC8D8" },
  { id:"freelance", name:"Freelance", icon:"briefcase", color:"#FF9F43" },
  { id:"regalo", name:"Regalo", icon:"gift", color:"#FF6FA5" },
  { id:"otros", name:"Otros", icon:"dots3", color:"#A7B0BF" },
];
const ICONS = ["house","food","bolt","car","sub","dumbbell","trend","fun","health","book","dots3"];
const MONTHS_ES = ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"];
const todayISO = () => new Date().toISOString().slice(0,10);
const thisMonthKey = () => todayISO().slice(0,7);
const monthOf = (iso) => iso.slice(0,7);
const addMonths = (mk, d) => { const [y,m]=mk.split('-').map(Number); const dt=new Date(y,m-1+d,1); return `${dt.getFullYear()}-${String(dt.getMonth()+1).padStart(2,'0')}`; };
const monthLabel = (mk) => { const [y,m]=mk.split('-').map(Number); return `${MONTHS_ES[m-1]} ${y}`; };
const monthLabelShort = (mk) => { const [y,m]=mk.split('-').map(Number); return `${MONTHS_ES[m-1].slice(0,3)} ${y}`; };
const uid = () => Math.random().toString(36).slice(2,9);
const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
const fmtExact = (n) => new Intl.NumberFormat('es-ES',{style:'currency',currency:'EUR',minimumFractionDigits: Number.isInteger(Number(n))?0:2, maximumFractionDigits:2}).format(n||0);
const fmt = (n) => new Intl.NumberFormat('es-ES',{style:'currency',currency:'EUR',maximumFractionDigits:0}).format(n||0);

function seed(){
  const mk = thisMonthKey();
  return {
    categories: DEFAULT_CATS.map(c=>({ ...c, fixed: c.kind==='gasto' && FIXED_IDS.includes(c.id) })),
    txns: [
      { id:uid(), type:'income', date:`${mk}-01`, amount:1750, catId:'sueldo', note:'' },
      { id:uid(), type:'expense', date:`${mk}-03`, amount:650, catId:'piso', note:'Alquiler' },
      { id:uid(), type:'expense', date:`${mk}-05`, amount:42, catId:'comida', note:'Mercadona' },
      { id:uid(), type:'expense', date:`${mk}-07`, amount:18, catId:'transporte', note:'Abono transporte' },
      { id:uid(), type:'income', date:`${mk}-09`, amount:15, catId:'bizum', note:'Cena de Jon' },
      { id:uid(), type:'expense', date:`${mk}-09`, amount:35, catId:'ocio', note:'Cine' },
      { id:uid(), type:'expense', date:`${mk}-11`, amount:12.99, catId:'subs', note:'Spotify' },
    ],
  };
}

function backfillKinds(d){
  d.categories = (d.categories||[]).map(c => {
    let k = c.kind ? c : { ...c, kind: inferKind(c) };
    if (OLD_DEFAULT_COLORS[k.color]) k = { ...k, color: OLD_DEFAULT_COLORS[k.color] };
    return k.fixed===undefined ? { ...k, fixed: k.kind==='gasto' && FIXED_IDS.includes(k.id) } : k;
  });
  return d;
}

function migrate(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY);
    if(raw) return backfillKinds(JSON.parse(raw));
  }catch(e){}
  try{
    const old = localStorage.getItem(OLD_KEY);
    if(old){
      const o = JSON.parse(old);
      const txns = [];
      Object.entries(o.months||{}).forEach(([mk, m])=>{
        if(m.sueldo) txns.push({ id:uid(), type:'income', date:`${mk}-01`, amount:Number(m.sueldo), catId:'sueldo', note:'' });
        Object.entries(m.amounts||{}).forEach(([catId, amt])=>{
          if(amt) txns.push({ id:uid(), type:'expense', date:`${mk}-02`, amount:Number(amt), catId, note:'' });
        });
      });
      return backfillKinds({ categories: o.categories && o.categories.length ? o.categories : DEFAULT_CATS, txns });
    }
  }catch(e){}
  return seed();
}

function ensurePlan(d, currentMonth){
  if (d.plan) return d;
  const txns = d.txns.filter(t=>monthOf(t.date)===currentMonth);
  const sueldo = txns.filter(t=>t.type==='income' && t.catId==='sueldo').reduce((s,t)=>s+Number(t.amount),0)
    || txns.filter(t=>t.type==='income').reduce((s,t)=>s+Number(t.amount),0);
  const categories = {};
  d.categories.forEach(c=>{
    const v = txns.filter(t=>t.type==='expense' && t.catId===c.id).reduce((s,t)=>s+Number(t.amount),0);
    if (v) categories[c.id] = v;
  });
  return { ...d, plan: { sueldo, categories } };
}

function load(){ return ensurePlan(migrate(), thisMonthKey()); }
function save(d){ try{ localStorage.setItem(STORAGE_KEY, JSON.stringify(d)); }catch(e){} }

function Modal({ title, onClose, children }){
  return (
    <div className="modal-backdrop" onClick={e=>{ if(e.target===e.currentTarget) onClose(); }}>
      <div className="modal">
        <div className="modal-head"><h3>{title}</h3><button className="icon-btn" onClick={onClose}><Icon name="close"/></button></div>
        {children}
      </div>
    </div>
  );
}

function DonutChart({ segments, size=130, thickness=18, centerLabel, centerValue }){
  const total = segments.reduce((s,x)=>s+x.value,0) || 1;
  const r = (size - thickness)/2, cx = size/2, cy = size/2;
  const circumference = 2*Math.PI*r;
  let acc = 0;
  return (
    <div className="donut-wrap">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{flexShrink:0}}>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--surface-3)" strokeWidth={thickness}/>
        {segments.map((s,i)=>{
          const frac = s.value/total;
          const dash = frac*circumference, gap = circumference-dash;
          const offset = -acc*circumference; acc += frac;
          return <circle key={i} cx={cx} cy={cy} r={r} fill="none" stroke={s.color} strokeWidth={thickness}
            strokeDasharray={`${dash} ${gap}`} strokeDashoffset={offset} transform={`rotate(-90 ${cx} ${cy})`}/>;
        })}
        <text x={cx} y={cy-3} textAnchor="middle" style={{fontSize:16, fill:'var(--ink)', fontFamily:"'Fraunces',serif", fontWeight:600}}>{centerValue}</text>
        <text x={cx} y={cy+13} textAnchor="middle" style={{fontSize:9, fill:'var(--muted)', fontFamily:"'Archivo',sans-serif"}}>{centerLabel}</text>
      </svg>
      <div className="donut-legend">
        {segments.map((s,i)=>(
          <div key={i} className="donut-legend-row">
            <span className="sw" style={{background:s.color}}/><span className="name">{s.label}</span>
            <span className="num muted">{Math.round((s.value/total)*100)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function catStatus(amt, planAmt, dayFrac){
  if (!planAmt) return { key:'none', color:'var(--faint)', text: amt>0 ? 'Sin presupuesto en el plan' : 'Sin gastos' };
  if (amt > planAmt) return { key:'over', color:'var(--danger)', text:`Te has pasado ${fmt(amt-planAmt)}` };
  const expected = planAmt*dayFrac;
  if (dayFrac>0 && amt > expected*1.15 && amt > planAmt*0.25) return { key:'fast', color:'var(--warn)', text:`Vas rápido · quedan ${fmt(planAmt-amt)}` };
  return { key:'ok', color:'var(--accent)', text:`Quedan ${fmt(planAmt-amt)}` };
}

function dayLabel(iso){
  const t = todayISO();
  const y = new Date(); y.setDate(y.getDate()-1);
  const yISO = `${y.getFullYear()}-${String(y.getMonth()+1).padStart(2,'0')}-${String(y.getDate()).padStart(2,'0')}`;
  if (iso===t) return 'Hoy';
  if (iso===yISO) return 'Ayer';
  const d = new Date(iso+'T12:00:00');
  const wd = ['dom','lun','mar','mié','jue','vie','sáb'][d.getDay()];
  return `${wd} ${d.getDate()} ${MONTHS_ES[d.getMonth()].slice(0,3)}`;
}

function AnimatedMoney({ value }){
  const [shown, setShown] = useState(value);
  const fromRef = useRef(value);
  useEffect(()=>{
    const from = fromRef.current, to = value;
    if (from===to) return;
    const start = performance.now(), dur = 550;
    let raf;
    const step = (now) => {
      const p = Math.min(1, (now-start)/dur);
      const e = 1 - Math.pow(1-p, 3);
      const v = from + (to-from)*e;
      setShown(v); fromRef.current = v;
      if (p<1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [value]);
  return <>{fmt(shown)}</>;
}

function Cota({ spent, budget, dayFrac, over }){
  // Barra "mecha": relleno = gastado del presupuesto variable, marca = donde deberías ir hoy
  const fs = budget>0 ? clamp(spent/budget, 0, 1) : 0;
  const state = over ? 'over' : (dayFrac!=null && spent/budget > dayFrac*1.1 ? '' : 'ok');
  return (
    <div className="mecha" aria-hidden="true">
      <div className={`mecha-fill ${state}`} style={{width:`${Math.max(fs*100, fs>0?3:0)}%`}}/>
      {dayFrac!=null && <div className="mecha-hoy" style={{left:`${clamp(dayFrac,0,1)*100}%`}}><span>hoy</span></div>}
    </div>
  );
}

function PaceChart({ daily, daysInMonth, dayNow, budget }){
  const W = 320, H = 118, pl = 4, pr = 4, pt = 10, pb = 18;
  const cum = []; let acc = 0;
  for (let i=0; i<dayNow; i++){ acc += daily[i]; cum.push(acc); }
  const maxY = Math.max(budget, acc) * 1.08 || 1;
  const x = (d) => pl + (d/daysInMonth)*(W-pl-pr);
  const y = (v) => pt + (1 - v/maxY)*(H-pt-pb);
  const pts = [[0,0], ...cum.map((v,i)=>[i+1, v])];
  const line = pts.map(([d,v],i)=>`${i?'L':'M'}${x(d).toFixed(1)},${y(v).toFixed(1)}`).join(' ');
  const area = pts.length>1 ? `${line} L${x(pts[pts.length-1][0]).toFixed(1)},${y(0)} L${x(0)},${y(0)} Z` : '';
  const last = pts[pts.length-1];
  const over = last[1] > budget*(last[0]/daysInMonth) + 0.5;
  const col = acc > budget ? 'var(--danger)' : over ? 'var(--warn)' : 'var(--accent)';
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="pace-chart" preserveAspectRatio="none">
      <defs>
        <linearGradient id="paceFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={col} stopOpacity="0.28"/>
          <stop offset="100%" stopColor={col} stopOpacity="0"/>
        </linearGradient>
      </defs>
      <line x1={x(0)} y1={y(budget)} x2={x(daysInMonth)} y2={y(budget)} stroke="var(--border)" strokeDasharray="2 4"/>
      <text x={x(0)+2} y={y(budget)-4} className="pace-axis">tope {fmt(budget)}</text>
      <line x1={x(0)} y1={y(0)} x2={x(daysInMonth)} y2={y(budget)} stroke="var(--faint)" strokeWidth="1.4" strokeDasharray="4 4"/>
      {area && <path d={area} fill="url(#paceFill)"/>}
      {pts.length>1 && <path d={line} fill="none" stroke={col} strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round"/>}
      {dayNow>0 && dayNow<daysInMonth && <circle cx={x(last[0])} cy={y(last[1])} r="4.5" fill={col} stroke="var(--surface)" strokeWidth="2"/>}
      <line x1={x(0)} y1={y(0)} x2={x(daysInMonth)} y2={y(0)} stroke="var(--border)"/>
      <text x={x(0)} y={H-4} className="pace-axis">1</text>
      <text x={x(15)} y={H-4} textAnchor="middle" className="pace-axis">15</text>
      <text x={x(daysInMonth)} y={H-4} textAnchor="end" className="pace-axis">{daysInMonth}</text>
    </svg>
  );
}

function App(){
  const [data, setData] = useState(load);
  const [month, setMonth] = useState(thisMonthKey());
  const [tab, setTab] = useState('mes');
  const [theme, setTheme] = useState(()=>{ try{ return localStorage.getItem(THEME_KEY)||'system'; }catch(e){ return 'system'; } });
  const [addOpen, setAddOpen] = useState(null); // { type, catId }
  const [addCatOpen, setAddCatOpen] = useState(false);
  const [editCatOpen, setEditCatOpen] = useState(null); // category object
  const [dataOpen, setDataOpen] = useState(false);
  const [syncStatus, setSyncStatus] = useState('local'); // local | syncing | synced | offline
  const dbRef = useRef(null);
  const lastSyncedRef = useRef(null);
  const writeTimer = useRef(null);

  useEffect(()=>save(data), [data]);

  // Connect to the account-wide store (if granted) and stay live-synced across devices.
  useEffect(()=>{
    let unsub;
    (async () => {
      try {
        if (!(window.claude && window.claude.use)) return;
        const db = await window.claude.use('db');
        if (!db) return;
        dbRef.current = db;
        const ref = db.doc('app/state');
        unsub = ref.onSnapshot((snap)=>{
          if (snap.exists) {
            const remote = snap.data();
            const remoteStr = JSON.stringify(remote);
            if (remoteStr !== lastSyncedRef.current) {
              lastSyncedRef.current = remoteStr;
              setData(prev => JSON.stringify(prev)===remoteStr ? prev : remote);
            }
            setSyncStatus('synced');
          } else {
            ref.set(data).then(()=>{ lastSyncedRef.current = JSON.stringify(data); setSyncStatus('synced'); }).catch(()=>setSyncStatus('offline'));
          }
        }, ()=> setSyncStatus('offline'));
      } catch(e) { /* no cloud available, stay local-only */ }
    })();
    return () => { if (unsub) unsub(); };
  }, []);

  // Push local changes up, debounced, skipping writes that just echo what we already synced.
  useEffect(()=>{
    if (!dbRef.current) return;
    const json = JSON.stringify(data);
    if (json === lastSyncedRef.current) return;
    setSyncStatus('syncing');
    if (writeTimer.current) clearTimeout(writeTimer.current);
    writeTimer.current = setTimeout(()=>{
      dbRef.current.doc('app/state').set(data)
        .then(()=>{ lastSyncedRef.current = json; setSyncStatus('synced'); })
        .catch(()=> setSyncStatus('offline'));
    }, 900);
    return () => { if (writeTimer.current) clearTimeout(writeTimer.current); };
  }, [data]);
  useEffect(()=>{
    document.documentElement.setAttribute('data-theme', 'dark');
    try{ localStorage.setItem(THEME_KEY, theme); }catch(e){}
  }, [theme]);

  const catById = (id) => data.categories.find(c=>c.id===id) || INCOME_SOURCES.find(c=>c.id===id) || { name:'Otros', icon:'dots3', color:'#999' };

  const catKind = (catId) => { const c = data.categories.find(c=>c.id===catId); return c ? c.kind : 'gasto'; };

  const monthTxns = useMemo(()=> data.txns.filter(t=>monthOf(t.date)===month), [data.txns, month]);
  const incomeTotal = useMemo(()=> monthTxns.filter(t=>t.type==='income').reduce((s,t)=>s+Number(t.amount),0), [monthTxns]);
  const expenseTxnsMonth = useMemo(()=> monthTxns.filter(t=>t.type==='expense'), [monthTxns]);
  const gastoTotal = useMemo(()=> expenseTxnsMonth.filter(t=>catKind(t.catId)==='gasto').reduce((s,t)=>s+Number(t.amount),0), [expenseTxnsMonth, data.categories]);
  const ahorroTotal = useMemo(()=> expenseTxnsMonth.filter(t=>catKind(t.catId)==='ahorro').reduce((s,t)=>s+Number(t.amount),0), [expenseTxnsMonth, data.categories]);
  const inversionTotal = useMemo(()=> expenseTxnsMonth.filter(t=>catKind(t.catId)==='inversion').reduce((s,t)=>s+Number(t.amount),0), [expenseTxnsMonth, data.categories]);
  const expenseTotal = gastoTotal + ahorroTotal + inversionTotal;
  const restante = incomeTotal - expenseTotal;
  const pctUsed = incomeTotal>0 ? clamp((gastoTotal/incomeTotal)*100,0,100) : (gastoTotal>0?100:0);

  const spentByCat = useMemo(()=>{
    const map = {};
    monthTxns.filter(t=>t.type==='expense').forEach(t=>{ map[t.catId] = (map[t.catId]||0) + Number(t.amount); });
    return map;
  }, [monthTxns]);

  const catsByKind = (kind) => data.categories.filter(c=>c.kind===kind);

  const addOrUpdateTxn = (txn) => {
    if (txn.id) setData(d=>({ ...d, txns: d.txns.map(t=> t.id===txn.id ? { ...t, ...txn } : t) }));
    else setData(d=>({ ...d, txns:[...d.txns, { ...txn, id:uid() }] }));
  };
  const deleteTxn = (id) => setData(d=>({ ...d, txns: d.txns.filter(t=>t.id!==id) }));
  const addCategory = (cat) => setData(d=>({ ...d, categories:[...d.categories, cat] }));
  const updateCategory = (id, patch) => setData(d=>({ ...d, categories: d.categories.map(c=> c.id===id ? {...c, ...patch} : c) }));
  const setPlanSueldo = (v) => setData(d=>({ ...d, plan:{ ...d.plan, sueldo: Number(v)||0 } }));
  const setPlanCat = (catId, v) => setData(d=>({ ...d, plan:{ ...d.plan, categories:{ ...d.plan.categories, [catId]: v===''?0:Number(v) } } }));
  const deleteCategory = (id) => setData(d=>({
    ...d,
    categories: d.categories.filter(c=>c.id!==id),
    txns: d.txns.filter(t=> !(t.type==='expense' && t.catId===id)),
  }));

  const allMonthKeys = useMemo(()=>{
    const set = new Set(data.txns.map(t=>monthOf(t.date)));
    set.add(month);
    return [...set].sort().reverse();
  }, [data.txns, month]);

  const allExpenseTxns = data.txns.filter(t=>t.type==='expense');
  const allTimeIncome = data.txns.filter(t=>t.type==='income').reduce((s,t)=>s+Number(t.amount),0);
  const allTimeGasto = allExpenseTxns.filter(t=>catKind(t.catId)==='gasto').reduce((s,t)=>s+Number(t.amount),0);
  const allTimeAhorro = allExpenseTxns.filter(t=>catKind(t.catId)==='ahorro').reduce((s,t)=>s+Number(t.amount),0);
  const allTimeInversion = allExpenseTxns.filter(t=>catKind(t.catId)==='inversion').reduce((s,t)=>s+Number(t.amount),0);
  const allTimeByCat = useMemo(()=>{
    const map = {};
    allExpenseTxns.filter(t=>catKind(t.catId)==='gasto').forEach(t=>{ map[t.catId] = (map[t.catId]||0) + Number(t.amount); });
    return Object.entries(map).sort((a,b)=>b[1]-a[1]).map(([catId,v])=>({ catId, value:v }));
  }, [data.txns, data.categories]);

  const usage = useMemo(()=>{
    const d = new Date(); d.setDate(d.getDate()-90);
    const cutoff = d.toISOString().slice(0,10);
    const m = {};
    data.txns.forEach(t=>{ if (t.date>=cutoff) m[t.catId] = (m[t.catId]||0) + 1; });
    return m;
  }, [data.txns]);
  const recentTxns = [...monthTxns].sort((a,b)=> b.date.localeCompare(a.date));
  const txnGroups = useMemo(()=>{
    const m = new Map();
    recentTxns.forEach(t=>{ if(!m.has(t.date)) m.set(t.date, []); m.get(t.date).push(t); });
    return [...m.entries()];
  }, [monthTxns]);

  // ---- Ritmo del mes y "hoy puedes gastar" ----
  const curMK = thisMonthKey();
  const isCurrent = month===curMK, isPast = month<curMK, isFuture = month>curMK;
  const [yy,mm] = month.split('-').map(Number);
  const daysInMonth = new Date(yy,mm,0).getDate();
  const dayNow = isCurrent ? new Date().getDate() : (isPast ? daysInMonth : 0);
  const dayFrac = dayNow/daysInMonth;
  const plan = data.plan || { sueldo:0, categories:{} };
  const planOf = (id) => Number((plan.categories||{})[id]||0);

  const gastoCats = catsByKind('gasto');
  const varCats = gastoCats.filter(c=>!c.fixed);
  const fixedCats = gastoCats.filter(c=>c.fixed);
  const varIds = new Set(varCats.map(c=>c.id));
  const fixedSpent = fixedCats.reduce((s,c)=>s+(spentByCat[c.id]||0),0);
  const fixedPlanned = fixedCats.reduce((s,c)=>s+planOf(c.id),0);
  const savePlanned = [...catsByKind('ahorro'),...catsByKind('inversion')].reduce((s,c)=>s+planOf(c.id),0);
  let varBudget = varCats.reduce((s,c)=>s+planOf(c.id),0);
  if (!varBudget) {
    const base = incomeTotal || Number(plan.sueldo)||0;
    varBudget = Math.max(0, base - Math.max(fixedPlanned, fixedSpent) - Math.max(savePlanned, ahorroTotal+inversionTotal));
  }
  const varTxns = expenseTxnsMonth.filter(t=>varIds.has(t.catId));
  const varSpent = varTxns.reduce((s,t)=>s+Number(t.amount),0);
  const today = todayISO();
  const spentToday = isCurrent ? varTxns.filter(t=>t.date===today).reduce((s,t)=>s+Number(t.amount),0) : 0;
  const daysLeft = isCurrent ? daysInMonth - dayNow + 1 : 0;
  const varLeft = varBudget - varSpent;
  const dailyAllowance = isCurrent ? Math.max(0, varBudget - (varSpent - spentToday)) / daysLeft : 0;
  const canSpendToday = dailyAllowance - spentToday;
  const heroOver = isCurrent && varBudget>0 && varLeft < 0;
  const paceDiff = varSpent - varBudget*dayFrac;
  const projected = isCurrent && dayNow>0 ? (varSpent - spentToday) / Math.max(1, dayNow-1) * daysInMonth : 0;
  const dailyVar = useMemo(()=>{
    const arr = new Array(daysInMonth).fill(0);
    varTxns.forEach(t=>{ const d = Number(t.date.slice(8,10)); if(d>=1 && d<=daysInMonth) arr[d-1]+=Number(t.amount); });
    return arr;
  }, [monthTxns, data.categories, daysInMonth]);
  const isPaid = (amt, planAmt) => planAmt>0 ? amt >= planAmt*0.95 : amt>0;
  const fixedPaidCount = fixedCats.filter(c=>isPaid(spentByCat[c.id]||0, planOf(c.id))).length;
  const monthGastoByCat = varCats.map(c=>({ catId:c.id, value: spentByCat[c.id]||0 })).filter(x=>x.value>0).sort((a,b)=>b.value-a.value);

  return (
    <div className="wrap">
      <div className="topline">
        <div className="brand">
          <div className="brand-mark">
            <svg viewBox="0 0 30 30" fill="none">
              <defs><radialGradient id="bm" cx="0.35" cy="0.3" r="0.8"><stop offset="0" stopColor="#FFA04D"/><stop offset="1" stopColor="#E2550A"/></radialGradient></defs>
              <circle cx="15" cy="15" r="14" fill="url(#bm)"/>
              <path d="M8 21h14M10 21v-4.5h10V21M12 16.5V13h6v3.5M13.8 13v-2.6h2.4V13" stroke="#2B1103" strokeWidth="1.7" strokeLinejoin="round" strokeLinecap="round"/>
            </svg>
          </div>
          <div>
            <div className="brand-name">Cimientos</div>
            <div className="sync-badge">
              <span className={`sync-dot ${syncStatus}`}/>
              {syncStatus==='synced' && 'Sincronizado'}
              {syncStatus==='syncing' && 'Sincronizando…'}
              {syncStatus==='offline' && 'Sin conexión'}
              {syncStatus==='local' && 'Guardado en este móvil'}
            </div>
          </div>
        </div>
        <button className="icon-btn" aria-label="Copia de seguridad" onClick={()=>setDataOpen(true)}><Icon name="backup"/></button>
      </div>


      {tab==='mes' && (
        <React.Fragment>
          <div className="month-row">
            <button onClick={()=>setMonth(addMonths(month,-1))}><Icon name="chevL" style={{width:14,height:14}}/></button>
            <div className="val">{monthLabel(month)}</div>
            <button onClick={()=>setMonth(addMonths(month,1))}><Icon name="chevR" style={{width:14,height:14}}/></button>
          </div>

          <div className={`hero ${heroOver ? 'over' : ''}`}>
            <div className="hero-inner">
              {isCurrent && !heroOver && (<>
                <div className="hero-label">Hoy puedes gastar</div>
                <div className="hero-huge num"><AnimatedMoney value={Math.max(0, canSpendToday)}/></div>
                <div className="hero-sub">
                  {canSpendToday < 0
                    ? <>Hoy te has pasado {fmt(-canSpendToday)}. Mañana se reajusta solo.</>
                    : spentToday > 0
                      ? <>Llevas {fmt(spentToday)} hoy · media diaria {fmt(dailyAllowance)}</>
                      : <>{fmt(varLeft)} para {daysLeft} {daysLeft===1?'día':'días'} · en gastos del día a día</>}
                </div>
              </>)}
              {isCurrent && heroOver && (<>
                <div className="hero-label">Te has pasado este mes</div>
                <div className="hero-huge num"><AnimatedMoney value={-varLeft}/></div>
                <div className="hero-sub">Has superado tu presupuesto de gastos variables. Lo que gastes ahora sale de tu ahorro.</div>
              </>)}
              {isPast && (<>
                <div className="hero-label">{restante>=0 ? 'Te sobró este mes' : 'Cerraste en negativo'}</div>
                <div className="hero-huge num"><AnimatedMoney value={restante}/></div>
                <div className="hero-sub">{fmt(incomeTotal)} de ingresos · {fmt(gastoTotal)} de gasto real{(ahorroTotal+inversionTotal)>0 && <> · después de apartar {fmt(ahorroTotal+inversionTotal)}</>}</div>
              </>)}
              {isFuture && (<>
                <div className="hero-label">Presupuesto del día a día</div>
                <div className="hero-huge num"><AnimatedMoney value={varBudget}/></div>
                <div className="hero-sub">Unos {fmt(varBudget/daysInMonth)} al día. Todavía no ha empezado el mes.</div>
              </>)}

              {!isFuture && varBudget > 0 && (
                <>
                  <Cota spent={varSpent} budget={varBudget} dayFrac={isCurrent ? dayFrac : null} over={varLeft<0}/>
                  <div className="hero-sheet">
                    <span>Día a día · {fmt(varSpent)} de {fmt(varBudget)}</span>
                    <span>{isCurrent ? `Día ${dayNow}/${daysInMonth}` : monthLabelShort(month)}</span>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="stat-row">
            <div className="stat-mini">
              <div className="l">Ingresos</div>
              <div className="v num">{fmt(incomeTotal)}</div>
              {plan.sueldo>0 && incomeTotal < plan.sueldo && !isPast && <div className="h">previsto {fmt(plan.sueldo)}</div>}
            </div>
            <div className="stat-mini">
              <div className="l">Fijos</div>
              <div className="v num">{fixedPaidCount}/{fixedCats.length}</div>
              <div className="h">{fixedPaidCount===fixedCats.length && fixedCats.length>0 ? 'todo pagado' : 'pagados'}</div>
            </div>
            <div className="stat-mini">
              <div className="l">Apartado</div>
              <div className="v num" style={{color:'var(--accent)'}}>{fmt(ahorroTotal+inversionTotal)}</div>
              <div className="h">ahorro + inversión</div>
            </div>
          </div>

          {!isFuture && varBudget > 0 && (
            <div className="card pace-card">
              <div className="pace-head">
                <div>
                  <div className="pace-title">Ritmo del mes</div>
                  <div className="pace-verdict" style={{color: paceDiff > 0 ? (varLeft<0 ? 'var(--danger)' : 'var(--warn)') : 'var(--accent)'}}>
                    {isPast
                      ? (varLeft>=0 ? `Terminaste ${fmt(varLeft)} por debajo` : `Terminaste ${fmt(-varLeft)} por encima`)
                      : Math.abs(paceDiff) < 1 ? 'Vas justo al ritmo'
                      : paceDiff > 0 ? `Vas ${fmt(paceDiff)} por encima del ritmo` : `Vas ${fmt(-paceDiff)} por debajo del ritmo`}
                  </div>
                </div>
                {isCurrent && dayNow >= 7 && projected > 0 && (
                  <div className="pace-proj">
                    <div className="l">A este paso</div>
                    <div className="v num" style={{color: projected > varBudget ? 'var(--danger)' : 'var(--ink)'}}>{fmt(projected)}</div>
                  </div>
                )}
              </div>
              <PaceChart daily={dailyVar} daysInMonth={daysInMonth} dayNow={dayNow} budget={varBudget}/>
            </div>
          )}

          {varCats.length>0 && (<>
            <div className="section-label"><span>Día a día</span><span className="num lbl-num" style={{color:'var(--danger)'}}>{fmt(varSpent)}</span></div>
            <div className="cat-list">
              {varCats.map(cat=>{
                const amt = spentByCat[cat.id] || 0;
                const planAmt = planOf(cat.id);
                const st = catStatus(amt, planAmt, isFuture ? 0 : dayFrac);
                return (
                  <div key={cat.id} className="cat-row" onClick={()=>setAddOpen({ type:'expense', catId:cat.id })}>
                    <div className="cat-icon" style={{background:cat.color+'22', color:cat.color}}><Icon name={cat.icon}/></div>
                    <div className="cat-mid">
                      <div className="cat-top">
                        <span className="cat-name">{cat.name}</span>
                        <span className="cat-amt num">{fmt(amt)}{planAmt>0 && <span className="of"> / {fmt(planAmt)}</span>}</span>
                      </div>
                      <div className="cat-bar">
                        <div style={{width:`${planAmt>0 ? clamp(amt/planAmt*100,0,100) : (amt>0?100:0)}%`, background:st.color}}/>
                        {isCurrent && planAmt>0 && <span className="pace-tick small" style={{left:`${dayFrac*100}%`}}/>}
                      </div>
                      <div className="cat-sub" style={{color: st.key==='ok'||st.key==='none' ? 'var(--muted)' : st.color}}>{st.text}</div>
                    </div>
                    <button className="txn-del cat-edit-btn" onClick={(e)=>{ e.stopPropagation(); setEditCatOpen(cat); }}><Icon name="edit" style={{width:14,height:14}}/></button>
                  </div>
                );
              })}
            </div>
          </>)}

          {fixedCats.length>0 && (<>
            <div className="section-label"><span>Gastos fijos</span><span className="num lbl-num" style={{color:'var(--muted)'}}>{fmt(fixedSpent)}{fixedPlanned>0 && ` / ${fmt(fixedPlanned)}`}</span></div>
            <div className="fixed-grid">
              {fixedCats.map(cat=>{
                const amt = spentByCat[cat.id] || 0;
                const planAmt = planOf(cat.id);
                const paid = isPaid(amt, planAmt);
                return (
                  <div key={cat.id} className={`fixed-tile ${paid?'paid':''}`}
                    onClick={()=>setAddOpen(paid ? { type:'expense', catId:cat.id } : { type:'expense', catId:cat.id, amount: planAmt>amt ? Math.round((planAmt-amt)*100)/100 : undefined, note: cat.name })}>
                    <div className="fixed-top">
                      <div className="cat-icon sm" style={{background:cat.color+'22', color:cat.color}}><Icon name={cat.icon}/></div>
                      <button className="fixed-edit" onClick={(e)=>{ e.stopPropagation(); setEditCatOpen(cat); }}><Icon name="edit"/></button>
                    </div>
                    <div className="fixed-name">{cat.name}</div>
                    {paid
                      ? <div className="status-chip ok"><Icon name="check"/>Pagado · {fmt(amt)}</div>
                      : amt>0
                        ? <div className="status-chip part">{fmt(amt)} de {fmt(planAmt)}</div>
                        : <div className="status-chip pend">{planAmt>0 ? `Pendiente · ${fmt(planAmt)}` : 'Toca para apuntar'}</div>}
                  </div>
                );
              })}
            </div>
          </>)}

          {[...catsByKind('ahorro'), ...catsByKind('inversion')].length>0 && (<>
            <div className="section-label"><span>Ahorro e inversión</span><span className="num lbl-num" style={{color:'var(--accent)'}}>{fmt(ahorroTotal+inversionTotal)}</span></div>
            <div className="cat-list">
              {[...catsByKind('ahorro'), ...catsByKind('inversion')].map(cat=>{
                const amt = spentByCat[cat.id] || 0;
                const planAmt = planOf(cat.id);
                const col = cat.kind==='inversion' ? 'var(--invest)' : 'var(--accent)';
                const done = planAmt>0 && amt>=planAmt;
                return (
                  <div key={cat.id} className="cat-row" onClick={()=>setAddOpen({ type:'expense', catId:cat.id, amount: planAmt>amt ? planAmt-amt : undefined })}>
                    <div className="cat-icon" style={{background:cat.color+'22', color:cat.color}}><Icon name={cat.icon}/></div>
                    <div className="cat-mid">
                      <div className="cat-top">
                        <span className="cat-name">{cat.name}</span>
                        <span className="cat-amt num" style={{color:col}}>{fmt(amt)}{planAmt>0 && <span className="of"> / {fmt(planAmt)}</span>}</span>
                      </div>
                      <div className="cat-bar"><div style={{width:`${planAmt>0 ? clamp(amt/planAmt*100,0,100) : (amt>0?100:0)}%`, background:col}}/></div>
                      <div className="cat-sub">{done ? 'Meta del mes cumplida' : planAmt>0 ? `Faltan ${fmt(planAmt-amt)} para tu meta` : 'Sin meta en el plan'}</div>
                    </div>
                    <button className="txn-del cat-edit-btn" onClick={(e)=>{ e.stopPropagation(); setEditCatOpen(cat); }}><Icon name="edit" style={{width:14,height:14}}/></button>
                  </div>
                );
              })}
            </div>
          </>)}
          <button className="addcat-btn" onClick={()=>setAddCatOpen(true)}><Icon name="plus"/>Añadir categoría</button>

          {monthGastoByCat.length>0 && (<>
            <div className="section-label">En qué se va el día a día</div>
            <div className="card">
              <DonutChart
                segments={monthGastoByCat.map(({catId,value})=>{ const c=catById(catId); return { label:c.name, value, color:c.color }; })}
                centerValue={fmt(varSpent)}
                centerLabel="día a día"
              />
            </div>
          </>)}

          <div className="section-label">Movimientos</div>
          <div className="card txn-card">
            {recentTxns.length===0 ? <div className="empty-hint">Todavía no hay movimientos este mes. Toca el botón + para añadir uno.</div> : (
              txnGroups.map(([day, list])=>(
                <React.Fragment key={day}>
                  <div className="day-head"><span>{dayLabel(day)}</span><span className="num">{(()=>{ const net=list.reduce((s,t)=>s+(t.type==='income'?1:-1)*Number(t.amount),0); return (net>0?'+':'')+fmt(net); })()}</span></div>
                  {list.map(t=>{
                    const cat = catById(t.catId);
                    return (
                      <div key={t.id} className="txn-row" onClick={()=>setAddOpen(t)} style={{cursor:'pointer'}}>
                        <div className="cat-icon" style={{width:32,height:32,borderRadius:9,background:cat.color+'22', color:cat.color}}><Icon name={cat.icon} style={{width:15,height:15}}/></div>
                        <div className="txn-mid">
                          <div className="txn-name">{t.note || cat.name}</div>
                          <div className="txn-sub">{cat.name}</div>
                        </div>
                        <div className={`txn-amt num ${t.type}`}>{t.type==='income'?'+':'-'}{fmt(t.amount)}</div>
                        <button className="txn-del" onClick={(e)=>{ e.stopPropagation(); deleteTxn(t.id); }}><Icon name="trash" style={{width:14,height:14}}/></button>
                      </div>
                    );
                  })}
                </React.Fragment>
              ))
            )}
          </div>
        </React.Fragment>
      )}

      {tab==='plan' && (
        <React.Fragment>
          <div className="empty-hint" style={{padding:'0 0 16px 0', textAlign:'left'}}>
            Tu plan inicial: el sueldo y los gastos fijos que esperas cada mes. Sirve de referencia — los movimientos reales de cada mes los añades con el botón +.
          </div>

          <div className="card" style={{marginBottom:16}}>
            <div className="summary-row" style={{padding:'0 0 10px 0', border:'none'}}>
              <span className="l" style={{fontSize:13, fontWeight:700, color:'var(--ink)'}}>Sueldo previsto</span>
            </div>
            <input type="number" inputMode="decimal" value={data.plan.sueldo||''} placeholder="0"
              onChange={e=>setPlanSueldo(e.target.value)}
              style={{width:'100%', padding:'10px 11px', borderRadius:10, border:'1px solid var(--border)', background:'var(--surface-2)', color:'var(--ink)', fontFamily:"'Archivo',sans-serif", fontSize:18, fontWeight:600}}/>
            {(()=>{ const asig = Object.values(data.plan.categories||{}).reduce((a,b)=>a+Number(b||0),0); const libre=(Number(data.plan.sueldo)||0)-asig; return (
              <div className="plan-split"><span>Asignado <b className="num">{fmt(asig)}</b></span><span style={{color: libre<0?'var(--danger)':undefined}}>{libre<0 ? 'Te pasas en ' : 'Sin asignar '}<b className="num" style={{color: libre<0?'var(--danger)':'var(--accent)'}}>{fmt(Math.abs(libre))}</b></span></div>
            ); })()}
          </div>

          {['gasto','ahorro','inversion'].map(kind=>{
            const cats = catsByKind(kind);
            if(cats.length===0) return null;
            return (
              <React.Fragment key={kind}>
                <div className="section-label"><span>{KIND_META[kind].label==='Gasto' ? 'Presupuesto por categoría' : KIND_META[kind].label}</span></div>
                <div className="cat-list" style={{marginBottom:4}}>
                  {cats.map(cat=>(
                    <div key={cat.id} className="cat-row" style={{cursor:'default'}}>
                      <div className="cat-icon" style={{background:cat.color+'22', color:cat.color}}><Icon name={cat.icon}/></div>
                      <div className="cat-mid"><div className="cat-name">{cat.name}</div>{cat.kind==='gasto' && <div className="tag-fixed">{cat.fixed ? 'Fijo' : 'Día a día'}</div>}</div>
                      <label className="plan-input">
                        <input type="number" inputMode="decimal" value={(data.plan.categories||{})[cat.id] || ''} placeholder="0"
                          onChange={e=>setPlanCat(cat.id, e.target.value)}/>
                        <span>€</span>
                      </label>
                    </div>
                  ))}
                </div>
              </React.Fragment>
            );
          })}
        </React.Fragment>
      )}

      {tab==='historico' && (
        <React.Fragment>
          <div className="grid3" style={{gridTemplateColumns:'1fr 1fr', marginBottom:9}}>
            <div className="stat-mini"><div className="l">Ahorrado</div><div className="v num" style={{color:'var(--accent)'}}>{fmt(allTimeAhorro)}</div></div>
            <div className="stat-mini"><div className="l">Invertido</div><div className="v num" style={{color:'var(--invest)'}}>{fmt(allTimeInversion)}</div></div>
          </div>
          <div className="grid3" style={{marginBottom:16}}>
            <div className="stat-mini"><div className="l">Ingresado</div><div className="v num">{fmt(allTimeIncome)}</div></div>
            <div className="stat-mini"><div className="l">Gastado</div><div className="v num">{fmt(allTimeGasto)}</div></div>
            <div className="stat-mini"><div className="l">Patrimonio</div><div className="v num">{fmt(allTimeAhorro+allTimeInversion)}</div></div>
          </div>

          <div className="section-label">Gasto real acumulado por categoría</div>
          <div className="card" style={{marginBottom:16}}>
            {allTimeByCat.length===0 ? <div className="empty-hint">Añade movimientos para ver el reparto acumulado.</div> : (
              <DonutChart
                segments={allTimeByCat.map(({catId,value})=>{ const c=catById(catId); return { label:c.name, value, color:c.color }; })}
                centerValue={fmt(allTimeGasto).replace(' €','€')}
                centerLabel="gastado"
              />
            )}
          </div>

          <div className="section-label">Por mes</div>
          {allMonthKeys.map(mk=>{
            const txns = data.txns.filter(t=>monthOf(t.date)===mk);
            const inc = txns.filter(t=>t.type==='income').reduce((s,t)=>s+Number(t.amount),0);
            const exp = txns.filter(t=>t.type==='expense').reduce((s,t)=>s+Number(t.amount),0);
            const res = inc-exp;
            const pct = inc>0 ? clamp((exp/inc)*100,0,100) : (exp>0?100:0);
            return (
              <div key={mk} className="month-hist-row" onClick={()=>{ setMonth(mk); setTab('mes'); }}>
                <div className="month-hist-mid">
                  <div className="month-hist-name">{monthLabelShort(mk)}</div>
                  <div className="month-hist-sub num">{fmt(inc)} ingresos · {fmt(exp)} gastos</div>
                  <div className="month-hist-bar"><div style={{width:`${pct}%`, background: res<0?'var(--danger)':'var(--accent)'}}/></div>
                </div>
                <div className={`month-hist-result num ${res<0?'neg':'pos'}`}>{res<0?'':'+'}{fmt(res)}</div>
              </div>
            );
          })}
        </React.Fragment>
      )}

      <nav className="bottom-nav">
        <div className="bottom-nav-inner">
          <button className={`nav-btn ${tab==='mes'?'active':''}`} onClick={()=>setTab('mes')}><Icon name="navMes"/>Mes</button>
          <button className={`nav-btn ${tab==='plan'?'active':''}`} onClick={()=>setTab('plan')}><Icon name="navPlan"/>Plan</button>
          <button className="fab" aria-label="Apuntar movimiento" onClick={()=>setAddOpen({ type:'expense' })}><Icon name="plus"/></button>
          <button className={`nav-btn ${tab==='historico'?'active':''}`} onClick={()=>setTab('historico')}><Icon name="navAcum"/>Acumulado</button>
        </div>
      </nav>

      {addOpen && (
        <AddTxnModal
          initial={addOpen}
          categories={data.categories}
          usage={usage}
          onClose={()=>setAddOpen(null)}
          onSave={(t)=>{ addOrUpdateTxn(t); setAddOpen(null); try{ navigator.vibrate && navigator.vibrate(12); }catch(e){} }}
          onDelete={addOpen.id ? ()=>{ deleteTxn(addOpen.id); setAddOpen(null); } : undefined}
        />
      )}
      {addCatOpen && <AddCategoryModal onClose={()=>setAddCatOpen(false)} onAdd={addCategory} existing={data.categories}/>}
      {editCatOpen && (
        <EditCategoryModal
          category={editCatOpen}
          onClose={()=>setEditCatOpen(null)}
          onSave={(patch)=>{ updateCategory(editCatOpen.id, patch); setEditCatOpen(null); }}
          onDelete={()=>{ deleteCategory(editCatOpen.id); setEditCatOpen(null); }}
        />
      )}
      {dataOpen && <DataModal data={data} setData={setData} onClose={()=>setDataOpen(false)}/>}

    </div>
  );
}

function parseAmount(str){ return Number((str||'').replace(',', '.')) || 0; }
function amountToStr(n){ if(n==null || n==='') return ''; const v = Math.round(Number(n)*100)/100; return String(v).replace('.', ','); }

function AddTxnModal({ initial, categories, usage, onClose, onSave, onDelete }){
  const isEdit = !!initial.id;
  const sortByUse = (list) => [...list].sort((x,y)=> (usage[y.id]||0) - (usage[x.id]||0));
  const expenseOpts = useMemo(()=> sortByUse(categories), [categories, usage]);
  const incomeOpts = useMemo(()=> sortByUse(INCOME_SOURCES), [usage]);
  const [type, setType] = useState(initial.type || 'expense');
  const [amount, setAmount] = useState(amountToStr(initial.amount));
  const [catId, setCatId] = useState(initial.catId || (initial.type==='income' ? incomeOpts[0].id : expenseOpts[0]?.id));
  const [note, setNote] = useState(initial.note || '');
  const [date, setDate] = useState(initial.date || todayISO());
  const firstRun = useRef(true);

  useEffect(()=>{
    if (firstRun.current) { firstRun.current = false; return; }
    setCatId(type==='expense' ? (expenseOpts[0]?.id||'') : incomeOpts[0].id);
  }, [type]);

  const options = type==='expense' ? expenseOpts : incomeOpts;
  const press = (k) => {
    try{ navigator.vibrate && navigator.vibrate(6); }catch(e){}
    setAmount(prev=>{
      if (k==='del') return prev.slice(0,-1);
      if (k===',') return prev.includes(',') ? prev : (prev==='' ? '0,' : prev+',');
      if (prev.includes(',') && prev.split(',')[1].length>=2) return prev;
      if (prev==='0') return k;
      if (prev.replace(',','').length>=7) return prev;
      return prev + k;
    });
  };
  const n = parseAmount(amount);
  const submit = () => {
    if(!n || n<=0 || !catId) return;
    onSave({ ...(isEdit ? { id: initial.id } : {}), type, amount:n, catId, note:note.trim(), date });
  };
  const cat = options.find(o=>o.id===catId);
  const dateLabel = date===todayISO() ? 'Hoy' : dayLabel(date);
  const [ip, dp] = amount.split(',');
  const intPart = ip ? new Intl.NumberFormat('es-ES').format(Number(ip)) : '0';

  return (
    <Modal title={isEdit ? 'Editar movimiento' : (type==='expense' ? 'Nuevo gasto' : 'Nuevo ingreso')} onClose={onClose}>
      <div className="type-toggle">
        <button className={`expense ${type==='expense'?'active':''}`} onClick={()=>setType('expense')}><Icon name="arrowDown"/>Gasto</button>
        <button className={`income ${type==='income'?'active':''}`} onClick={()=>setType('income')}><Icon name="arrowUp"/>Ingreso</button>
      </div>

      <div className="qa-amount">
        <div className={`v num ${amount===''?'empty':''}`} style={{color: amount!=='' && type==='income' ? 'var(--accent)' : undefined}}>
          {intPart}{amount.includes(',') && <>,{dp}</>}<span className="cur">€</span>
        </div>
        <div className="hint">{cat ? (type==='expense' ? `en ${cat.name}` : `de ${cat.name}`) : ''}</div>
      </div>

      <div className="qa-cats">
        {options.map(o=>(
          <div key={o.id} className={`chip ${catId===o.id?'active':''}`} style={{'--chip-color':o.color}} onClick={()=>setCatId(o.id)}>
            <Icon name={o.icon}/>{o.name}
          </div>
        ))}
      </div>

      <div className="qa-meta">
        <input type="text" value={note} onChange={e=>setNote(e.target.value)} placeholder={type==='income' ? 'Nota: bizum de Jon' : 'Nota (opcional)'}/>
        <label className="qa-date"><Icon name="calendar"/>{dateLabel}
          <input type="date" value={date} onChange={e=>e.target.value && setDate(e.target.value)}/>
        </label>
      </div>

      <div className="keypad">
        {['1','2','3','4','5','6','7','8','9'].map(k=> <button key={k} className="key num" onClick={()=>press(k)}>{k}</button>)}
        <button className="key fn" onClick={()=>press(',')}>,</button>
        <button className="key num" onClick={()=>press('0')}>0</button>
        <button className="key fn" aria-label="Borrar" onClick={()=>press('del')}><Icon name="backspace"/></button>
      </div>

      <button className="btn btn-primary" disabled={!n || !catId} onClick={submit}>
        {isEdit ? 'Guardar cambios' : n ? `Guardar ${fmtExact(n)}` : (type==='expense' ? 'Guardar gasto' : 'Guardar ingreso')}
      </button>
      {isEdit && <button className="btn btn-ghost" style={{color:'var(--danger)'}} onClick={onDelete}>Eliminar movimiento</button>}
    </Modal>
  );
}

function KindPicker({ kind, setKind }){
  return (
    <div className="chip-row">
      {Object.entries(KIND_META).map(([k,meta])=>(
        <div key={k} className={`chip ${kind===k?'active':''}`} style={{'--chip-color':meta.color}} onClick={()=>setKind(k)}>{meta.label}</div>
      ))}
    </div>
  );
}

function FixedPicker({ fixed, setFixed }){
  return (
    <div className="field">
      <label>¿Es un gasto fijo?</label>
      <div className="chip-row">
        <div className={`chip ${fixed?'active':''}`} onClick={()=>setFixed(true)}>Fijo (piso, gym…)</div>
        <div className={`chip ${!fixed?'active':''}`} onClick={()=>setFixed(false)}>Día a día</div>
      </div>
      <div className="copy-ok" style={{textAlign:'left', color:'var(--faint)', fontWeight:500, marginTop:6}}>Los fijos se pagan una vez al mes y no cuentan para el "hoy puedes gastar".</div>
    </div>
  );
}

function AddCategoryModal({ onClose, onAdd, existing }){
  const [name, setName] = useState('');
  const [icon, setIcon] = useState('dots3');
  const [color, setColor] = useState(COLORS[existing.length % COLORS.length]);
  const [kind, setKind] = useState('gasto');
  const [fixed, setFixed] = useState(false);
  const submit = () => {
    if(!name.trim()) return;
    onAdd({ id: uid(), name: name.trim(), icon, color, kind, fixed: kind==='gasto' && fixed });
    onClose();
  };
  return (
    <Modal title="Nueva categoría" onClose={onClose}>
      <div className="field"><label>Nombre</label><input autoFocus type="text" value={name} onChange={e=>setName(e.target.value)} placeholder="Ej. Mascota"/></div>
      <div className="field">
        <label>¿Qué tipo de categoría es?</label>
        <KindPicker kind={kind} setKind={setKind}/>
        <div className="copy-ok" style={{textAlign:'left', color:'var(--faint)', fontWeight:500, marginTop:6}}>Ahorro e Inversión no cuentan como gasto real — se contabilizan aparte.</div>
      </div>
      {kind==='gasto' && <FixedPicker fixed={fixed} setFixed={setFixed}/>}
      <div className="field">
        <label>Icono</label>
        <div className="swatches">
          {ICONS.map(ic=>(
            <div key={ic} className="icon-swatch" onClick={()=>setIcon(ic)} style={{
              background: ic===icon ? color+'33' : 'var(--surface-2)', color: ic===icon? color:'var(--muted)',
              border: ic===icon ? `1.5px solid ${color}` : '1.5px solid transparent'
            }}><Icon name={ic} style={{width:16,height:16}}/></div>
          ))}
        </div>
      </div>
      <div className="field">
        <label>Color</label>
        <div className="swatches">
          {COLORS.map(c=> <div key={c} className={`swatch ${c===color?'active':''}`} style={{background:c}} onClick={()=>setColor(c)}/>)}
        </div>
      </div>
      <button className="btn btn-primary" onClick={submit}>Añadir categoría</button>
    </Modal>
  );
}

function EditCategoryModal({ category, onClose, onSave, onDelete }){
  const [name, setName] = useState(category.name);
  const [icon, setIcon] = useState(category.icon);
  const [color, setColor] = useState(category.color);
  const [kind, setKind] = useState(category.kind || 'gasto');
  const [fixed, setFixed] = useState(!!category.fixed);
  const submit = () => {
    if(!name.trim()) return;
    onSave({ name: name.trim(), icon, color, kind, fixed: kind==='gasto' && fixed });
  };
  return (
    <Modal title="Editar categoría" onClose={onClose}>
      <div className="field"><label>Nombre</label><input autoFocus type="text" value={name} onChange={e=>setName(e.target.value)}/></div>
      <div className="field">
        <label>¿Qué tipo de categoría es?</label>
        <KindPicker kind={kind} setKind={setKind}/>
        <div className="copy-ok" style={{textAlign:'left', color:'var(--faint)', fontWeight:500, marginTop:6}}>Ahorro e Inversión no cuentan como gasto real — se contabilizan aparte.</div>
      </div>
      {kind==='gasto' && <FixedPicker fixed={fixed} setFixed={setFixed}/>}
      <div className="field">
        <label>Icono</label>
        <div className="swatches">
          {ICONS.map(ic=>(
            <div key={ic} className="icon-swatch" onClick={()=>setIcon(ic)} style={{
              background: ic===icon ? color+'33' : 'var(--surface-2)', color: ic===icon? color:'var(--muted)',
              border: ic===icon ? `1.5px solid ${color}` : '1.5px solid transparent'
            }}><Icon name={ic} style={{width:16,height:16}}/></div>
          ))}
        </div>
      </div>
      <div className="field">
        <label>Color</label>
        <div className="swatches">
          {COLORS.map(c=> <div key={c} className={`swatch ${c===color?'active':''}`} style={{background:c}} onClick={()=>setColor(c)}/>)}
        </div>
      </div>
      <button className="btn btn-primary" onClick={submit}>Guardar cambios</button>
      <button className="btn btn-ghost" style={{color:'var(--danger)'}} onClick={onDelete}>Eliminar categoría</button>
    </Modal>
  );
}

function DataModal({ data, setData, onClose }){
  const [importText, setImportText] = useState('');
  const [msg, setMsg] = useState(null);
  const exportText = JSON.stringify(data, null, 2);
  const copy = async () => {
    try{ await navigator.clipboard.writeText(exportText); setMsg({ok:true, text:'Copiado al portapapeles'}); }
    catch(e){ setMsg({ok:false, text:'No se pudo copiar, selecciona el texto manualmente'}); }
  };
  const doImport = () => {
    try{
      const parsed = JSON.parse(importText);
      if(!parsed || !parsed.categories || !parsed.txns) throw new Error('bad');
      setData(parsed);
      setMsg({ok:true, text:'Datos importados correctamente'});
    }catch(e){ setMsg({ok:false, text:'JSON no válido'}); }
  };
  return (
    <Modal title="Copia de seguridad" onClose={onClose}>
      <div className="field">
        <label>Exportar (copia y guarda este texto)</label>
        <textarea readOnly value={exportText} onFocus={e=>e.target.select()}
          style={{width:'100%', minHeight:110, fontFamily:"'Archivo',sans-serif", fontSize:11, padding:10, borderRadius:10, border:'1px solid var(--border)', background:'var(--surface-2)', color:'var(--ink)'}}/>
      </div>
      <button className="btn btn-primary" onClick={copy}>Copiar al portapapeles</button>
      <div className="field" style={{marginTop:16}}>
        <label>Importar (pega un JSON exportado antes)</label>
        <textarea value={importText} onChange={e=>setImportText(e.target.value)} placeholder="Pega aquí…"
          style={{width:'100%', minHeight:90, fontFamily:"'Archivo',sans-serif", fontSize:11, padding:10, borderRadius:10, border:'1px solid var(--border)', background:'var(--surface)', color:'var(--ink)'}}/>
      </div>
      <button className="btn btn-ghost" onClick={doImport}>Importar y sobrescribir</button>
      {msg && <div className="copy-ok" style={{color: msg.ok?'var(--accent)':'var(--danger)'}}>{msg.text}</div>}
      <div className="copy-ok" style={{color:'var(--faint)', fontWeight:500, marginTop:12}}>Tus datos solo viven en este navegador. No se puede descargar un archivo directamente por seguridad — usa copiar/pegar.</div>
    </Modal>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
