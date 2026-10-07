
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
    globe: <><circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c2.4 2.6 3.6 5.4 3.6 8.5s-1.2 5.9-3.6 8.5M12 3.5C9.6 6.1 8.4 8.9 8.4 12s1.2 5.9 3.6 8.5"/></>,
    navAcum: <><path d="M4 19h16"/><path d="M6 16v-4M10 16V8M14 16v-6M18 16V5"/></>,
    backup: <><ellipse cx="12" cy="6" rx="7" ry="2.6"/><path d="M5 6v6c0 1.4 3.1 2.6 7 2.6s7-1.2 7-2.6V6"/><path d="M5 12v6c0 1.4 3.1 2.6 7 2.6s7-1.2 7-2.6v-6"/></>,
    camera: <><path d="M4 8.5A1.5 1.5 0 0 1 5.5 7h2l1.5-2h6l1.5 2h2A1.5 1.5 0 0 1 20 8.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 17.5z"/><circle cx="12" cy="12.5" r="3.4"/></>,
    sparkle: <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z"/>,
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
// Importes: sin decimales si son enteros, con los céntimos si los hay (12 € / 12,50 €)
const fmtExact = (n) => { const v = Math.round((Number(n)||0)*100)/100; return new Intl.NumberFormat('es-ES',{style:'currency',currency:'EUR',minimumFractionDigits: Number.isInteger(v)?0:2, maximumFractionDigits:2}).format(v); };
const fmt = fmtExact;

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
    ].map(t=>({ ...t, demo:true })),
    plan: JSON.parse(JSON.stringify(EXAMPLE_PLAN)),
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

// Movimientos de ejemplo que trae la app la primera vez (para poder borrarlos de golpe)
const DEMO_SIGNATURES = [
  ['income','sueldo',1750,''], ['expense','piso',650,'Alquiler'], ['expense','comida',42,'Mercadona'],
  ['expense','transporte',18,'Abono transporte'], ['income','bizum',15,'Cena de Jon'], ['expense','ocio',35,'Cine'],
  ['expense','subs',12.99,'Spotify'],
];
const EXAMPLE_PLAN = { sueldo:1750, categories:{ piso:650, comida:250, agualuz:60, transporte:40, subs:15, gym:35, ocio:150, ahorro:300, inversiones:200 } };
function isDemoDerivedPlan(plan){
  const c = (plan && plan.categories) || {};
  return Number(c.comida)===42 && Number(c.transporte)===18 && Number(c.ocio)===35 && !c.agualuz && !c.gym;
}
function isDemoTxn(t){
  if (t.demo) return true;
  return DEMO_SIGNATURES.some(([type,catId,amount,note]) => t.type===type && t.catId===catId && Number(t.amount)===amount && (t.note||'')===note);
}
function countDemo(txns){
  // Solo los consideramos de ejemplo si aparecen casi todos juntos (evita borrar un "Alquiler 650" real)
  const demos = txns.filter(isDemoTxn);
  return demos.length >= 5 ? demos.length : 0;
}

async function shareBackup(data){
  const stamp = todayISO();
  const json = JSON.stringify({ ...data, meta:{ ...(data.meta||{}), exportedAt:new Date().toISOString() } }, null, 2);
  const name = `cimientos-copia-${stamp}.json`;
  let file;
  try { file = new File([json], name, { type:'application/json' }); } catch(e) {}
  if (file && navigator.canShare && navigator.canShare({ files:[file] })) {
    await navigator.share({ files:[file], title:'Copia de Cimientos', text:`Copia de seguridad del ${stamp}` });
    return 'shared';
  }
  const url = URL.createObjectURL(new Blob([json], { type:'application/json' }));
  const a = document.createElement('a'); a.href = url; a.download = name;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(()=>URL.revokeObjectURL(url), 4000);
  return 'downloaded';
}
const daysSince = (iso) => iso ? Math.floor((Date.now() - new Date(iso).getTime())/86400000) : null;

function monthStats(data, mk){
  const kindOf = (id) => { const c = data.categories.find(c=>c.id===id); return c ? c.kind : 'gasto'; };
  const txns = data.txns.filter(t=>monthOf(t.date)===mk);
  const income = txns.filter(t=>t.type==='income').reduce((s,t)=>s+Number(t.amount),0);
  const exp = txns.filter(t=>t.type==='expense');
  const gasto = exp.filter(t=>kindOf(t.catId)==='gasto').reduce((s,t)=>s+Number(t.amount),0);
  const apartado = exp.filter(t=>kindOf(t.catId)!=='gasto').reduce((s,t)=>s+Number(t.amount),0);
  const byCat = {};
  exp.forEach(t=>{ byCat[t.catId] = (byCat[t.catId]||0) + Number(t.amount); });
  const plan = (data.plan && data.plan.categories) || {};
  const gastoCats = data.categories.filter(c=>c.kind==='gasto');
  const overs = gastoCats.map(c=>({ cat:c, spent:byCat[c.id]||0, plan:Number(plan[c.id]||0) }))
    .filter(x=>x.plan>0 && x.spent>x.plan).sort((a,b)=>(b.spent-b.plan)-(a.spent-a.plan));
  const unders = gastoCats.filter(c=>!c.fixed).map(c=>({ cat:c, spent:byCat[c.id]||0, plan:Number(plan[c.id]||0) }))
    .filter(x=>x.plan>0 && x.spent<=x.plan).sort((a,b)=>(b.plan-b.spent)-(a.plan-a.spent));
  const kept = income - gasto;              // lo que no te gastaste (apartado + sobrante)
  const rate = income>0 ? kept/income : null;
  return { mk, count:txns.length, income, gasto, apartado, kept, rate, overs, unders, byCat };
}

const monthIndex = (mk) => { const [y,m]=mk.split('-').map(Number); return y*12+(m-1); };
function goalProgress(goal, txns){
  const added = txns.filter(t=>t.goalId===goal.id).reduce((s,t)=>s+(t.type==='income'?-1:1)*Number(t.amount),0);
  const saved = Number(goal.initial||0) + added;
  const now = thisMonthKey();
  const monthsLeft = monthIndex(goal.date) - monthIndex(now);
  const remaining = Math.max(0, goal.target - saved);
  const perMonth = monthsLeft>0 ? remaining/monthsLeft : remaining;
  const start = goal.created || now;
  const total = Math.max(1, monthIndex(goal.date) - monthIndex(start));
  const elapsed = clamp(monthIndex(now) - monthIndex(start), 0, total);
  const expected = Number(goal.initial||0) + (goal.target - Number(goal.initial||0)) * (elapsed/total);
  const done = saved >= goal.target;
  return { saved, remaining, perMonth, monthsLeft, expected, behind: Math.max(0, expected - saved), done, pct: goal.target>0 ? clamp(saved/goal.target,0,1) : 0 };
}

// ---------- Detalles de Halloween (discretos) ----------
const BAT_PATH = "M32 9c-1.6 0-2.6 1.6-2.8 3.6C26 9.8 21 8 15 9.2c2.6 1.8 3.8 4.4 3.6 7.4-4-1.8-8.6-1.6-12.6.4 5.6 1.6 9.6 5.2 11.6 9.4 3-2.8 7.6-3.8 11.6-2.8.8-1.8 1.6-3 2.8-3s2 1.2 2.8 3c4-1 8.6 0 11.6 2.8 2-4.2 6-7.8 11.6-9.4-4-2-8.6-2.2-12.6-.4-.2-3 1-5.6 3.6-7.4C43 8 38 9.8 34.8 12.6 34.6 10.6 33.6 9 32 9z";
function Bats(){
  // Dos murciélagos cruzan una vez al abrir la app (una vez por sesión)
  const [show, setShow] = useState(()=>{ try{ return !sessionStorage.getItem('bats'); }catch(e){ return false; } });
  useEffect(()=>{ if(!show) return; try{ sessionStorage.setItem('bats','1'); }catch(e){} const t=setTimeout(()=>setShow(false), 7000); return ()=>clearTimeout(t); }, []);
  if (!show) return null;
  return (
    <div className="bats" aria-hidden="true">
      <svg className="bat b1" viewBox="0 0 64 32"><g className="flap"><path d={BAT_PATH}/></g></svg>
      <svg className="bat b2" viewBox="0 0 64 32"><g className="flap"><path d={BAT_PATH}/></g></svg>
    </div>
  );
}
function Spider(){
  const [up, setUp] = useState(false);
  useEffect(()=>{ if(!up) return; const t=setTimeout(()=>setUp(false), 6000); return ()=>clearTimeout(t); }, [up]);
  return (
    <div className={`spider ${up?'up':''}`} onClick={(e)=>{ e.stopPropagation(); setUp(true); }} aria-hidden="true">
      <div className="spider-thread"/>
      <svg className="spider-body" viewBox="0 0 24 20">
        <g stroke="#F3EBDD" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.75">
          <path d="M9 9 3 4M9 10 2 9M9 11 3 15M10 12 5 18M15 9 21 4M15 10 22 9M15 11 21 15M14 12 19 18"/>
        </g>
        <ellipse cx="12" cy="11" rx="3.6" ry="4.2" fill="#0E0914" stroke="#F3EBDD" strokeOpacity="0.55" strokeWidth="0.8"/>
        <circle cx="12" cy="6.6" r="2.2" fill="#0E0914" stroke="#F3EBDD" strokeOpacity="0.55" strokeWidth="0.8"/>
        <circle cx="11.2" cy="6.4" r="0.45" fill="#FF7A1A"/><circle cx="12.8" cy="6.4" r="0.45" fill="#FF7A1A"/>
      </svg>
    </div>
  );
}
function MoonMark(){
  return (
    <svg className="moon-mark" viewBox="0 0 40 40" aria-hidden="true">
      <defs><radialGradient id="mg" cx="0.5" cy="0.5" r="0.5"><stop offset="0.55" stopColor="#FFD9A3" stopOpacity="0.35"/><stop offset="1" stopColor="#FF7A1A" stopOpacity="0"/></radialGradient></defs>
      <circle cx="20" cy="20" r="19" fill="url(#mg)"/>
      <path d="M24.5 10.5a10 10 0 1 0 5 15.4 8 8 0 1 1-5-15.4z" fill="#FFE6C2"/>
      <circle className="star s1" cx="6" cy="8" r="0.9" fill="#FFE6C2"/>
      <circle className="star s2" cx="34" cy="34" r="0.7" fill="#FFE6C2"/>
      <circle className="star s3" cx="9" cy="31" r="0.6" fill="#FFE6C2"/>
    </svg>
  );
}
const isHalloweenNight = () => todayISO().slice(5)==='10-31';

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
  useEffect(()=>{ try{ navigator.storage && navigator.storage.persist && navigator.storage.persist(); }catch(e){} }, []);
  const [backupMsg, setBackupMsg] = useState(null);
  const { prices, err: pricesErr } = usePrices();
  useEffect(()=>{
    if (!prices || !(data.holdings||[]).length) return;
    const toLink = (data.holdings||[]).filter(h=>h.initUnits==null && priceIdOf(h, prices));
    if (!toLink.length) return;
    setData(d=>({ ...d, holdings:(d.holdings||[]).map(h=>{
      if (h.initUnits!=null || !priceIdOf(h, prices)) return h;
      const st = holdingStats({ ...h, priceId:null, isin:null }, d.txns, null); // valor manual actual
      const live = liveOf(h, prices);
      return { ...h, priceId: priceIdOf(h, prices), initUnits: st.value / live.priceEUR, linkedAt: todayISO(), trackRequested: null };
    }) }));
  }, [prices]);
  const markBackup = () => setData(d=>({ ...d, meta:{ ...(d.meta||{}), lastBackup:new Date().toISOString() } }));
  const quickBackup = async () => {
    try { await shareBackup(data); markBackup(); setBackupMsg('Copia guardada'); setTimeout(()=>setBackupMsg(null), 2500); }
    catch(e){ if (e && e.name!=='AbortError') { setBackupMsg('No se pudo guardar la copia'); setTimeout(()=>setBackupMsg(null), 3000); } }
  };
  const demoCount = countDemo(data.txns);
  const realTxnCount = data.txns.length - demoCount;
  const backupAge = daysSince(data.meta && data.meta.lastBackup);
  const needsBackup = realTxnCount >= 5 && (backupAge===null || backupAge >= 7);
  const [summaryMonth, setSummaryMonth] = useState(null);
  const [goalEdit, setGoalEdit] = useState(null); // objetivo o {} para nuevo
  const goals = data.goals || [];
  const saveGoal = (g) => setData(d=>{
    const list = d.goals || [];
    return { ...d, goals: g.id && list.some(x=>x.id===g.id) ? list.map(x=>x.id===g.id ? { ...x, ...g } : x) : [...list, { ...g, id:uid(), created: thisMonthKey() }] };
  });
  const deleteGoal = (id) => setData(d=>({ ...d, goals:(d.goals||[]).filter(g=>g.id!==id) }));
  const savingsCatId = (data.categories.find(c=>c.kind==='ahorro') || data.categories.find(c=>c.kind==='inversion') || {}).id || 'ahorro';
  // Cierre automático: el primer día que abres la app en un mes nuevo, enseña el resumen del anterior
  useEffect(()=>{
    const prev = addMonths(thisMonthKey(), -1);
    const seen = data.meta && data.meta.lastSummary;
    const real = data.txns.filter(t=>!isDemoTxn(t) && monthOf(t.date)===prev);
    if (seen !== prev && real.length >= 3) setSummaryMonth(prev);
  }, []);
  const closeSummary = () => {
    const prev = addMonths(thisMonthKey(), -1);
    if (summaryMonth===prev) setData(d=>({ ...d, meta:{ ...(d.meta||{}), lastSummary: prev } }));
    setSummaryMonth(null);
  };
  // Acceso directo desde el icono (?add=expense / ?add=income)
  useEffect(()=>{
    try{
      const q = new URLSearchParams(location.search);
      const a = q.get('add');
      if (a==='expense' || a==='income') { setAddOpen({ type:a }); history.replaceState(null, '', location.pathname); }
    }catch(e){}
  }, []);
  const [scan, setScan] = useState(null); // {status:'loading'|'review', result, previews}
  const [aiKeyOpen, setAiKeyOpen] = useState(false);
  const pendingFiles = useRef(null);
  const startScan = async (files) => {
    if (!files || !files.length) return;
    setAddOpen(null);
    if (!getAIKey()) { pendingFiles.current = files; setAiKeyOpen(true); return; }
    let previews = [];
    try { previews = [await resizeImage(files[0], 600)].map(x=>x.dataUrl); } catch(e){}
    setScan({ status:'loading', previews });
    try {
      const result = await readReceipts(files, data.categories);
      setScan({ status:'review', result });
    } catch(e) {
      setScan(null);
      if (e.message==='NO_KEY') { pendingFiles.current = files; setAiKeyOpen(true); return; }
      setBackupMsg(e.message); setTimeout(()=>setBackupMsg(null), 4500);
    }
  };
  const saveScanned = (list) => {
    const withUnits = list.map(t=>{
      if (!t.holdingId) return t;
      const h = (data.holdings||[]).find(x=>x.id===t.holdingId); const live = h ? liveOf(h, prices) : null;
      return live ? { ...t, unitPrice: live.priceEUR, units: Number(t.amount)/live.priceEUR } : t;
    });
    setData(d=>({ ...d, txns:[...d.txns, ...withUnits.map(t=>({ ...t, id:uid(), via:'scan' }))] }));
    setScan(null);
    try{ navigator.vibrate && navigator.vibrate(12); }catch(e){}
    setBackupMsg(list.length===1 ? 'Movimiento guardado' : `${list.length} movimientos guardados`); setTimeout(()=>setBackupMsg(null), 2500);
  };
  const removeDemo = () => setData(d=>({ ...d, txns: d.txns.filter(t=>!isDemoTxn(t)),
    plan: isDemoDerivedPlan(d.plan) ? JSON.parse(JSON.stringify(EXAMPLE_PLAN)) : d.plan }));

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
    let t2 = txn;
    if (txn.holdingId) {
      const h = (data.holdings||[]).find(x=>x.id===txn.holdingId);
      const live = h ? liveOf(h, prices) : null;
      const old = txn.id ? data.txns.find(t=>t.id===txn.id) : null;
      const unitPrice = (old && old.unitPrice) || (live ? live.priceEUR : null);
      if (unitPrice) t2 = { ...txn, unitPrice, units: Number(txn.amount)/unitPrice };
    }
    if (t2.id) setData(d=>({ ...d, txns: d.txns.map(t=> t.id===t2.id ? { ...t, ...t2 } : t) }));
    else setData(d=>({ ...d, txns:[...d.txns, { ...t2, id:uid() }] }));
  };
  const deleteTxn = (id) => setData(d=>({ ...d, txns: d.txns.filter(t=>t.id!==id) }));
  const addCategory = (cat) => setData(d=>({ ...d, categories:[...d.categories, cat] }));
  const updateCategory = (id, patch) => setData(d=>({ ...d, categories: d.categories.map(c=> c.id===id ? {...c, ...patch} : c) }));
  const setPlanSueldo = (v) => setData(d=>({ ...d, plan:{ ...d.plan, sueldo: toNum(v) } }));
  const setPlanCat = (catId, v) => setData(d=>({ ...d, plan:{ ...d.plan, categories:{ ...d.plan.categories, [catId]: toNum(v) } } }));
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

  // Estudio de mercado → Atlas, con tu aportación mensual a inversión
  const atlasMonthly = Math.round(Number((data.plan && data.plan.categories && data.plan.categories[(data.categories.find(c=>c.kind==='inversion')||{}).id]) || 0) || inversionTotal || 0);
  const atlasUrl = `https://acorchete16.github.io/ProjectATLAS/?from=cimientos${atlasMonthly>0 ? `&monthly=${atlasMonthly}` : ''}`;
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
        <div className="top-actions">
          <button className={`icon-btn ${tab==='plan'?'on':''}`} aria-label="Plan" onClick={()=>setTab(tab==='plan'?'mes':'plan')}><Icon name="navPlan"/><span>Plan</span></button>
          <button className="icon-btn" aria-label="Copia de seguridad" onClick={()=>setDataOpen(true)}><Icon name="backup"/></button>
        </div>
      </div>


      {tab==='mes' && (
        <React.Fragment>
          {demoCount>0 && (
            <div className="notice">
              <div className="notice-text"><b>Estos movimientos son de ejemplo.</b> Bórralos para empezar con los tuyos y luego pon tus cifras en Plan.</div>
              <button className="notice-btn" onClick={removeDemo}>Borrar ejemplos</button>
            </div>
          )}
          {needsBackup && demoCount===0 && (
            <div className="notice soft">
              <div className="notice-text">{backupAge===null ? 'Aún no has guardado ninguna copia de tus datos.' : `Hace ${backupAge} días que no guardas copia.`} Si pierdes el móvil, pierdes los datos.</div>
              <button className="notice-btn" onClick={quickBackup}>Guardar copia</button>
            </div>
          )}
          {backupMsg && <div className="toast">{backupMsg}</div>}
          <div className="month-row">
            <button onClick={()=>setMonth(addMonths(month,-1))}><Icon name="chevL" style={{width:14,height:14}}/></button>
            <div className="val">{monthLabel(month)}</div>
            <button onClick={()=>setMonth(addMonths(month,1))}><Icon name="chevR" style={{width:14,height:14}}/></button>
          </div>

          <div className={`hero ${heroOver ? 'over' : ''}`}>
            <MoonMark/>
            <Spider/>
            <div className="hero-inner">
              {isCurrent && !heroOver && (<>
                <div className="hero-label">{isHalloweenNight() ? 'Noche de Halloween · hoy puedes gastar' : 'Hoy puedes gastar'}</div>
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
                {monthTxns.length>0 && <button className="hero-link" onClick={()=>setSummaryMonth(month)}>Ver el cierre del mes</button>}
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
            {recentTxns.length===0 ? <div className="empty-hint">Silencio de cementerio: aún no hay movimientos este mes. Toca el botón naranja para apuntar el primero.</div> : (
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
            <NumInput value={data.plan.sueldo||''} placeholder="0"
              onValue={setPlanSueldo}
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
                        <NumInput value={(data.plan.categories||{})[cat.id] || ''} placeholder="0"
                          onValue={v=>setPlanCat(cat.id, v)}/>
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
          <div className="section-label" style={{marginTop:4}}><span>Objetivos</span><a onClick={()=>setGoalEdit({})}>Nuevo</a></div>
          {goals.length===0 ? (
            <button className="goal-empty" onClick={()=>setGoalEdit({})}>
              <div className="goal-empty-title">Ponle nombre a lo que ahorras</div>
              <div className="goal-empty-sub">Un viaje, un fondo de emergencia, la entrada de un piso… Te digo cuánto apartar al mes para llegar.</div>
              <span className="notice-btn">Crear objetivo</span>
            </button>
          ) : (
            <div className="goal-list">
              {goals.map(g=>{
                const pr = goalProgress(g, data.txns);
                return (
                  <div key={g.id} className={`goal-card ${pr.done?'done':''}`}>
                    <div className="goal-top" onClick={()=>setGoalEdit(g)}>
                      <div>
                        <div className="goal-name">{g.name}</div>
                        <div className="goal-date">para {monthLabel(g.date)}</div>
                      </div>
                      <div className="goal-amt num">{fmt(pr.saved)}<span className="of"> / {fmt(g.target)}</span></div>
                    </div>
                    <div className="goal-bar"><div style={{width:`${pr.pct*100}%`}}/></div>
                    <div className="goal-foot">
                      <span className="goal-status" style={{color: pr.done ? 'var(--accent)' : pr.behind>1 ? 'var(--warn)' : 'var(--muted)'}}>
                        {pr.done ? 'Conseguido' : pr.monthsLeft<=0 ? `Ha vencido el plazo · faltan ${fmt(pr.remaining)}` : pr.behind>1 ? `Vas ${fmt(pr.behind)} por detrás · aparta ${fmt(pr.perMonth)}/mes` : `Vas bien · aparta ${fmt(pr.perMonth)}/mes`}
                      </span>
                      {!pr.done && <button className="goal-add" onClick={()=>setAddOpen({ type:'expense', catId:savingsCatId, goalId:g.id, note:g.name, amount: Math.round(pr.perMonth*100)/100 || undefined })}>Aportar</button>}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          <div className="section-label">Todo lo acumulado</div>
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

      {tab==='cartera' && (
        <CarteraTab data={data} setData={setData} prices={prices} pricesErr={pricesErr} atlasUrl={atlasUrl}
          onAporta={(h)=>setAddOpen({ type:'expense', catId:(data.categories.find(c=>c.kind==='inversion')||data.categories[0]).id, holdingId:h.id, note:h.name })}/>
      )}

      <Bats/>
      <nav className="bottom-nav">
        <div className="bottom-nav-inner">
          <button className={`nav-btn ${tab==='mes'?'active':''}`} onClick={()=>setTab('mes')}><Icon name="navMes"/>Mes</button>
          <button className={`nav-btn ${tab==='historico'?'active':''}`} onClick={()=>setTab('historico')}><Icon name="navAcum"/>Acumulado</button>
          <button className="fab" aria-label="Apuntar movimiento" onClick={()=>setAddOpen({ type:'expense' })}><Icon name="plus"/></button>
          <button className={`nav-btn ${tab==='cartera'?'active':''}`} onClick={()=>setTab('cartera')}><Icon name="trend"/>Cartera</button>
          <a className="nav-btn" href={atlasUrl} target="_blank" rel="noopener"><Icon name="globe"/>Mercado</a>
        </div>
      </nav>

      {addOpen && (
        <AddTxnModal
          initial={addOpen}
          categories={data.categories}
          usage={usage}
          onScan={startScan}
          holdings={data.holdings||[]}
          lastHoldingId={(([...data.txns].reverse().find(t=>t.holdingId))||{}).holdingId}
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
      {aiKeyOpen && <AIKeyModal onClose={()=>{ setAiKeyOpen(false); pendingFiles.current=null; }}
        onConnected={()=>{ setAiKeyOpen(false); const f = pendingFiles.current; pendingFiles.current=null; if (f) startScan(f); else { setBackupMsg('Lectura de tickets activada'); setTimeout(()=>setBackupMsg(null), 2500); } }}/>}
      {scan && scan.status==='loading' && <ScanLoading previews={scan.previews}/>}
      {scan && scan.status==='review' && <ScanReviewModal result={scan.result} categories={data.categories} existing={data.txns} holdings={data.holdings||[]} onClose={()=>setScan(null)} onSave={saveScanned}/>}
      {summaryMonth && <MonthSummaryModal stats={monthStats(data, summaryMonth)} prev={monthStats(data, addMonths(summaryMonth,-1))} catById={catById}
        onClose={closeSummary} onOpenMonth={()=>{ setMonth(summaryMonth); setTab('mes'); closeSummary(); }}/>}
      {goalEdit && <GoalModal goal={goalEdit} onClose={()=>setGoalEdit(null)} onSave={(g)=>{ saveGoal(g); setGoalEdit(null); }} onDelete={goalEdit.id ? ()=>{ deleteGoal(goalEdit.id); setGoalEdit(null); } : null}/>}
      {dataOpen && <DataModal data={data} setData={setData} onClose={()=>setDataOpen(false)}/>}

    </div>
  );
}

// Números escritos a la española o inglesa: "12,5", "1.234,56", "1,234.56", "12.5", "1.500" (=1500)
function toNum(v){
  if (typeof v === 'number') return isFinite(v) ? v : 0;
  let s = String(v==null?'':v).replace(/[\s€]/g,'').replace(/[^0-9.,-]/g,'');
  if (!s) return 0;
  const lc = s.lastIndexOf(','), ld = s.lastIndexOf('.');
  if (lc>=0 && ld>=0) { const dec = lc>ld ? ',' : '.'; const th = dec===',' ? '.' : ','; s = s.split(th).join('').replace(dec,'.'); }
  else if (lc>=0) { const parts = s.split(','); s = parts.length>2 ? parts.join('') : s.replace(',','.'); }
  else if (ld>=0) { const parts = s.split('.'); if (parts.length>2 || (parts[1].length===3 && /^-?[1-9]/.test(parts[0]))) s = parts.join(''); }
  const n = parseFloat(s); return isFinite(n) ? n : 0;
}
const cleanNumText = (t) => String(t).replace(/[^0-9.,]/g,'');
// Campo numérico que acepta coma (type=number en iPhone la rechaza)
function NumInput({ value, onValue, ...rest }){
  const [txt, setTxt] = useState(value==null||value===''||value===0 ? '' : String(value).replace('.',','));
  useEffect(()=>{ if (toNum(txt) !== toNum(value)) setTxt(value==null||value===''||value===0 ? '' : String(value).replace('.',',')); }, [value]);
  return <input type="text" inputMode="decimal" autoComplete="off" {...rest} value={txt}
    onChange={e=>{ const t = cleanNumText(e.target.value); setTxt(t); onValue(t===''?0:toNum(t)); }}/>;
}

function parseAmount(str){ return Number((str||'').replace(',', '.')) || 0; }
function amountToStr(n){ if(n==null || n==='') return ''; const v = Math.round(Number(n)*100)/100; return String(v).replace('.', ','); }

function AddTxnModal({ initial, categories, usage, onClose, onSave, onDelete, onScan, holdings=[], lastHoldingId }){
  const scanRef = useRef(null);
  const isEdit = !!initial.id;
  const rank = (c) => (c.kind==='gasto' && !c.fixed) ? 0 : (c.kind==='gasto' ? 1 : 2);
  const sortByUse = (list) => [...list].sort((x,y)=> ((usage[y.id]||0) - (usage[x.id]||0)) || (rank(x) - rank(y)));
  const expenseOpts = useMemo(()=> sortByUse(categories), [categories, usage]);
  const incomeOpts = useMemo(()=> sortByUse(INCOME_SOURCES), [usage]);
  const [type, setType] = useState(initial.type || 'expense');
  const [amount, setAmount] = useState(amountToStr(initial.amount));
  const [catId, setCatId] = useState(initial.catId || (initial.type==='income' ? incomeOpts[0].id : expenseOpts[0]?.id));
  const [note, setNote] = useState(initial.note || '');
  const [date, setDate] = useState(initial.date || todayISO());
  const [holdingId, setHoldingId] = useState(initial.holdingId || (initial.id ? null : (lastHoldingId && holdings.some(h=>h.id===lastHoldingId) ? lastHoldingId : (holdings[0]||{}).id)) || null);
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
    onSave({ ...(isEdit ? { id: initial.id } : {}), ...(initial.goalId ? { goalId: initial.goalId } : {}), holdingId: (type==='expense' && isInvest && holdingId) ? holdingId : undefined, type, amount:n, catId, note:note.trim(), date });
  };
  const cat = options.find(o=>o.id===catId);
  const isInvest = type==='expense' && !!cat && cat.kind==='inversion';
  const selHolding = isInvest ? holdings.find(h=>h.id===holdingId) : null;
  const goalHint = initial.goalId ? ' · para tu objetivo' : selHolding ? ` · ${selHolding.name}` : '';
  const dateLabel = date===todayISO() ? 'Hoy' : dayLabel(date);
  const [ip, dp] = amount.split(',');
  const intPart = ip ? new Intl.NumberFormat('es-ES').format(Number(ip)) : '0';

  return (
    <Modal title={isEdit ? 'Editar movimiento' : (type==='expense' ? 'Nuevo gasto' : 'Nuevo ingreso')} onClose={onClose}>
      <div className="type-toggle">
        <button className={`expense ${type==='expense'?'active':''}`} onClick={()=>setType('expense')}><Icon name="arrowDown"/>Gasto</button>
        <button className={`income ${type==='income'?'active':''}`} onClick={()=>setType('income')}><Icon name="arrowUp"/>Ingreso</button>
      </div>

      {!isEdit && onScan && (
        <>
          <button className="scan-btn" onClick={()=>scanRef.current && scanRef.current.click()}>
            <Icon name="camera"/><span><b>Foto del ticket o captura</b><small>La IA lo apunta por ti</small></span><Icon name="sparkle" className="spark"/>
          </button>
          <input ref={scanRef} type="file" accept="image/*" multiple style={{display:'none'}} onChange={e=>{ const f=[...(e.target.files||[])]; e.target.value=''; onScan(f); }}/>
        </>
      )}
      <div className="qa-amount">
        <div className={`v num ${amount===''?'empty':''}`} style={{color: amount!=='' && type==='income' ? 'var(--accent)' : undefined}}>
          {intPart}{amount.includes(',') && <>,{dp}</>}<span className="cur">€</span>
        </div>
        <div className="hint">{cat ? (type==='expense' ? `en ${cat.name}${goalHint}` : `de ${cat.name}`) : ''}</div>
      </div>

      <div className="qa-cats">
        {options.map(o=>(
          <div key={o.id} className={`chip ${catId===o.id?'active':''}`} style={{'--chip-color':o.color}} onClick={()=>setCatId(o.id)}>
            <Icon name={o.icon}/>{o.name}
          </div>
        ))}
      </div>

      {isInvest && holdings.length>0 && (
        <div className="qa-hold">
          <div className="qa-hold-label">¿En qué producto de tu cartera?</div>
          <div className="qa-cats" style={{paddingTop:0}}>
            {holdings.map(h=>(
              <div key={h.id} className={`chip ${holdingId===h.id?'active':''}`} style={{'--chip-color':'var(--invest)'}} onClick={()=>setHoldingId(h.id)}>{h.name.length>26 ? h.name.slice(0,25)+'…' : h.name}</div>
            ))}
            <div className={`chip ${!holdingId?'active':''}`} onClick={()=>setHoldingId(null)}>Ninguno</div>
          </div>
        </div>
      )}
      {isInvest && holdings.length===0 && <div className="data-hint" style={{textAlign:'left', margin:'-4px 0 10px'}}>Añade tus fondos y ETFs en la pestaña Cartera y las aportaciones se sumarán solas a cada uno.</div>}
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

function MonthSummaryModal({ stats, prev, catById, onClose, onOpenMonth }){
  const [y,m] = stats.mk.split('-').map(Number);
  const name = MONTHS_ES[m-1];
  const ratePct = stats.rate!=null ? Math.round(stats.rate*100) : null;
  const diff = prev.count>0 ? stats.gasto - prev.gasto : null;
  const verdict = ratePct==null ? 'Sin ingresos apuntados' : ratePct>=30 ? 'Mes muy bueno' : ratePct>=15 ? 'Buen mes' : ratePct>=0 ? 'Mes justo' : 'Mes en negativo';
  return (
    <Modal title={`Cierre de ${name}`} onClose={onClose}>
      <div className="sum-hero">
        <div className="sum-verdict">{verdict}</div>
        <div className="sum-big num" style={{color: stats.kept<0 ? 'var(--danger)' : 'var(--ink)'}}>{fmt(stats.kept)}</div>
        <div className="sum-sub">
          {stats.kept>=0 ? 'no te los gastaste' : 'gastaste más de lo que entró'}
          {ratePct!=null && stats.kept>=0 && <> · el <b>{ratePct}%</b> de tus ingresos</>}
        </div>
        {ratePct!=null && <div className="sum-rate"><div style={{width:`${clamp(ratePct,0,100)}%`}}/></div>}
      </div>

      <div className="sum-grid">
        <div><div className="l">Ingresos</div><div className="v num">{fmt(stats.income)}</div></div>
        <div><div className="l">Gasto real</div><div className="v num">{fmt(stats.gasto)}</div></div>
        <div><div className="l">Apartado</div><div className="v num" style={{color:'var(--accent)'}}>{fmt(stats.apartado)}</div></div>
      </div>

      {diff!=null && (
        <div className="sum-line">
          {Math.abs(diff)<5 ? 'Gastaste prácticamente lo mismo que el mes anterior.'
            : diff<0 ? <>Gastaste <b style={{color:'var(--accent)'}}>{fmt(-diff)} menos</b> que el mes anterior.</>
            : <>Gastaste <b style={{color:'var(--warn)'}}>{fmt(diff)} más</b> que el mes anterior.</>}
        </div>
      )}

      {stats.overs.length>0 && (
        <div className="sum-block">
          <div className="sum-block-title">Donde te pasaste</div>
          {stats.overs.slice(0,3).map(x=>(
            <div key={x.cat.id} className="sum-row">
              <span className="sw" style={{background:x.cat.color}}/><span className="name">{x.cat.name}</span>
              <span className="num" style={{color:'var(--danger)'}}>+{fmt(x.spent-x.plan)}</span>
            </div>
          ))}
        </div>
      )}
      {stats.unders.length>0 && (
        <div className="sum-block">
          <div className="sum-block-title">Donde te sobró</div>
          {stats.unders.slice(0,3).map(x=>(
            <div key={x.cat.id} className="sum-row">
              <span className="sw" style={{background:x.cat.color}}/><span className="name">{x.cat.name}</span>
              <span className="num" style={{color:'var(--accent)'}}>{fmt(x.plan-x.spent)}</span>
            </div>
          ))}
        </div>
      )}

      <button className="btn btn-primary" onClick={onClose}>Empezar el mes</button>
      <button className="btn btn-ghost" onClick={onOpenMonth}>Ver {name} en detalle</button>
    </Modal>
  );
}

function GoalModal({ goal, onClose, onSave, onDelete }){
  const isEdit = !!goal.id;
  const defDate = addMonths(thisMonthKey(), 12);
  const [name, setName] = useState(goal.name || '');
  const [target, setTarget] = useState(goal.target!=null ? String(goal.target).replace('.',',') : '');
  const [date, setDate] = useState(goal.date || defDate);
  const [initial, setInitial] = useState(goal.initial ? String(goal.initial).replace('.',',') : '');
  const t = toNum(target), i = toNum(initial);
  const months = monthIndex(date) - monthIndex(thisMonthKey());
  const per = months>0 ? Math.max(0,t-i)/months : null;
  const submit = () => {
    if (!name.trim() || t<=0 || !/^\d{4}-\d{2}$/.test(date)) return;
    onSave({ ...(isEdit?{ id:goal.id }:{}), name:name.trim(), target:t, date, initial:i });
  };
  return (
    <Modal title={isEdit ? 'Editar objetivo' : 'Nuevo objetivo'} onClose={onClose}>
      <div className="field"><label>¿Para qué ahorras?</label><input autoFocus type="text" value={name} onChange={e=>setName(e.target.value)} placeholder="Ej. Viaje verano 2027"/></div>
      <div className="field-row">
        <div className="field"><label>Cuánto necesitas</label><input type="text" inputMode="decimal" value={target} onChange={e=>setTarget(cleanNumText(e.target.value))} placeholder="1500"/></div>
        <div className="field"><label>Para cuándo</label><input type="month" value={date} min={addMonths(thisMonthKey(),1)} onChange={e=>e.target.value && setDate(e.target.value)}/></div>
      </div>
      <div className="field"><label>¿Ya tienes algo apartado para esto?</label><input type="text" inputMode="decimal" value={initial} onChange={e=>setInitial(cleanNumText(e.target.value))} placeholder="0"/></div>
      {t>0 && (
        <div className="goal-preview">
          {per!=null
            ? <>Tienes que apartar <b className="num">{fmt(per)}</b> al mes durante {months} {months===1?'mes':'meses'}.</>
            : <>Elige una fecha a partir del mes que viene.</>}
        </div>
      )}
      <button className="btn btn-primary" disabled={!name.trim() || t<=0} onClick={submit}>{isEdit ? 'Guardar cambios' : 'Crear objetivo'}</button>
      {onDelete && <button className="btn btn-ghost" style={{color:'var(--danger)'}} onClick={onDelete}>Eliminar objetivo</button>}
      {isEdit && <div className="data-hint">Las aportaciones que ya hiciste se quedan como ahorro aunque elimines el objetivo.</div>}
    </Modal>
  );
}

// ---------- Lectura de tickets con IA (Gemini, con la clave del usuario guardada solo en este móvil) ----------
const AI_KEY = 'cimientos_ai_key';
const AI_MODEL = 'cimientos_ai_model';
const getAIKey = () => { try{ return localStorage.getItem(AI_KEY) || ''; }catch(e){ return ''; } };
const getAIModel = () => { try{ return localStorage.getItem(AI_MODEL) || ''; }catch(e){ return ''; } };
const setAI = (key, model) => { try{ if(key){ localStorage.setItem(AI_KEY,key); localStorage.setItem(AI_MODEL,model); } else { localStorage.removeItem(AI_KEY); localStorage.removeItem(AI_MODEL); } }catch(e){} };
const GEMINI = 'https://generativelanguage.googleapis.com/v1beta';

function aiError(status, body){
  const msg = (body && body.error && body.error.message) || '';
  if (status===400 && /API key|API_KEY/i.test(msg)) return 'La clave no es válida. Cópiala otra vez desde Google AI Studio.';
  if (status===403) return 'Esta clave no tiene permiso para usar Gemini. Crea una nueva en Google AI Studio.';
  if (status===429) return 'Has llegado al límite gratuito por ahora. Espera un minuto y vuelve a probar.';
  if (status===404) return 'El modelo ya no está disponible. Vuelve a conectar la clave en "Tus datos".';
  if (status>=500) return 'Google no responde ahora mismo. Prueba en un rato.';
  return msg ? `Error de Gemini: ${msg.slice(0,120)}` : 'No se pudo leer la imagen.';
}

async function discoverModel(key){
  let res;
  try { res = await fetch(`${GEMINI}/models?pageSize=200&key=${encodeURIComponent(key)}`); }
  catch(e){ throw new Error('Necesitas conexión para conectar la clave.'); }
  const body = await res.json().catch(()=>null);
  if (!res.ok) throw new Error(aiError(res.status, body));
  const models = ((body && body.models) || [])
    .filter(m => (m.supportedGenerationMethods||[]).includes('generateContent'))
    .map(m => m.name.replace(/^models\//,''))
    .filter(n => /flash/.test(n) && !/(image|tts|live|audio|embed|exp|thinking)/.test(n));
  if (!models.length) throw new Error('Tu clave no tiene ningún modelo Flash disponible.');
  const score = (n) => {
    const v = parseFloat((n.match(/gemini-(\d+(?:\.\d+)?)/)||[])[1]||'0');
    let s = v*100;
    if (/lite/.test(n)) s -= 40;
    if (/preview/.test(n)) s -= 15;
    if (/latest/.test(n)) s -= 5;
    if (/-\d{3,}$/.test(n)) s -= 3;   // versiones fechadas, preferimos el alias estable
    return s;
  };
  models.sort((a,b)=>score(b)-score(a));
  return models[0];
}

function resizeImage(file, max=1600){
  return new Promise((resolve, reject)=>{
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const k = Math.min(1, max/Math.max(img.width, img.height));
      const c = document.createElement('canvas');
      c.width = Math.round(img.width*k); c.height = Math.round(img.height*k);
      c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
      URL.revokeObjectURL(url);
      const dataUrl = c.toDataURL('image/jpeg', 0.82);
      resolve({ dataUrl, b64: dataUrl.split(',')[1] });
    };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('No se pudo abrir la imagen.')); };
    img.src = url;
  });
}

async function readReceipts(files, categories){
  const key = getAIKey(); let model = getAIModel();
  if (!key) throw new Error('NO_KEY');
  if (!model) { model = await discoverModel(key); setAI(key, model); }
  const imgs = await Promise.all([...files].slice(0,4).map(f=>resizeImage(f)));
  const today = todayISO();
  const expenseCats = categories.map(c=>`- ${c.id}: ${c.name} (${c.kind==='gasto' ? (c.fixed?'gasto fijo':'gasto') : c.kind})`).join('\n');
  const incomeCats = INCOME_SOURCES.map(c=>`- ${c.id}: ${c.name}`).join('\n');
  const prompt = `Eres el asistente de una app personal de gastos en España. Te paso una o varias imágenes: tickets de compra, facturas o capturas de pantalla de pagos (app del banco, Bizum, Amazon, Glovo...). Extrae los movimientos de dinero.

Reglas:
- Un movimiento por pago. Un ticket de supermercado o restaurante es UN solo movimiento con el TOTAL pagado, no línea por línea.
- Si una captura muestra una lista con varios pagos, devuelve uno por cada pago.
- amount: número positivo en euros (punto decimal). Usa el total final pagado, con IVA y descuentos aplicados.
- type: "expense" si sale dinero; "income" si entra (Bizum recibido, nómina, devolución).
- catId para gastos, elige SOLO de esta lista:
${expenseCats}
- catId para ingresos, elige SOLO de esta lista:
${incomeCats}
- Supermercados y comida para casa van a la categoría de comida. Bares, restaurantes, copas, cine y planes van a ocio si existe esa categoría.
- note: comercio o concepto corto, máximo 30 caracteres (ej. "Mercadona", "Bizum de Jon", "Cena La Viña").
- date: formato YYYY-MM-DD. Si no aparece el año, usa ${today.slice(0,4)}. Si no aparece la fecha, usa ${today}.
- Si no hay ningún importe legible, devuelve items vacío y unreadable true.`;
  const ids = [...categories.map(c=>c.id), ...INCOME_SOURCES.map(c=>c.id)];
  const schema = { type:'OBJECT', properties:{
    items:{ type:'ARRAY', items:{ type:'OBJECT', properties:{
      type:{ type:'STRING', enum:['expense','income'] },
      amount:{ type:'NUMBER' },
      catId:{ type:'STRING', enum: ids },
      note:{ type:'STRING' },
      date:{ type:'STRING' },
    }, required:['type','amount','catId','note','date'] } },
    unreadable:{ type:'BOOLEAN' },
  }, required:['items'] };
  const body = {
    contents:[{ role:'user', parts:[ ...imgs.map(i=>({ inline_data:{ mime_type:'image/jpeg', data:i.b64 } })), { text: prompt } ] }],
    generationConfig:{ responseMimeType:'application/json', responseSchema: schema, temperature:0.1 },
  };
  let res;
  try { res = await fetch(`${GEMINI}/models/${model}:generateContent?key=${encodeURIComponent(key)}`, { method:'POST', headers:{ 'Content-Type':'application/json' }, body: JSON.stringify(body) }); }
  catch(e){ throw new Error('Necesitas conexión para leer tickets.'); }
  const out = await res.json().catch(()=>null);
  if (!res.ok) { if (res.status===404) setAI(key, ''); throw new Error(aiError(res.status, out)); }
  const text = (((out||{}).candidates||[])[0]||{}).content?.parts?.map(p=>p.text||'').join('') || '';
  let parsed; try { parsed = JSON.parse(text); } catch(e){ throw new Error('La IA no devolvió un resultado válido. Prueba con una foto más nítida.'); }
  const expIds = new Set(categories.map(c=>c.id)), incIds = new Set(INCOME_SOURCES.map(c=>c.id));
  const items = (parsed.items||[]).map(it=>{
    const type = it.type==='income' ? 'income' : 'expense';
    let catId = it.catId;
    if (type==='expense' && !expIds.has(catId)) catId = (categories.find(c=>c.kind==='gasto' && !c.fixed) || categories[0]).id;
    if (type==='income' && !incIds.has(catId)) catId = 'otros';
    const date = /^\d{4}-\d{2}-\d{2}$/.test(it.date||'') ? it.date : today;
    return { type, amount: Math.round(Math.abs(Number(it.amount)||0)*100)/100, catId, note:(it.note||'').slice(0,40), date };
  }).filter(it=>it.amount>0);
  return { items, previews: imgs.map(i=>i.dataUrl) };
}

function AIKeyModal({ onClose, onConnected }){
  const [key, setKey] = useState('');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState(null);
  const connect = async () => {
    const k = key.trim(); if (!k) return;
    setBusy(true); setErr(null);
    try { const model = await discoverModel(k); setAI(k, model); onConnected(model); }
    catch(e){ setErr(e.message); }
    setBusy(false);
  };
  return (
    <Modal title="Leer tickets con IA" onClose={onClose}>
      <div className="ai-intro">Para leer fotos de tickets y capturas, la app usa Gemini, la IA de Google. Es gratis, pero necesitas tu propia clave. Se hace una sola vez.</div>
      <ol className="ai-steps">
        <li>Abre <a href="https://aistudio.google.com/apikey" target="_blank" rel="noopener">aistudio.google.com/apikey</a> e inicia sesión con tu cuenta de Google.</li>
        <li>Pulsa <b>Create API key</b> y copia la clave que te da.</li>
        <li>Pégala aquí abajo.</li>
      </ol>
      <div className="field"><input type="text" value={key} onChange={e=>setKey(e.target.value)} placeholder="Pega tu clave (empieza por AIza…)" autoCapitalize="off" autoCorrect="off" spellCheck="false"/></div>
      {err && <div className="copy-ok" style={{color:'var(--danger)', marginBottom:10}}>{err}</div>}
      <button className="btn btn-primary" disabled={!key.trim() || busy} onClick={connect}>{busy ? 'Comprobando…' : 'Conectar'}</button>
      <div className="data-hint" style={{marginTop:12}}>La clave se guarda solo en este móvil y no va en las copias de seguridad. Las fotos se envían a Google para leerlas; con la clave gratuita, Google puede usarlas para mejorar sus modelos, así que no fotografíes nada que no quieras compartir.</div>
    </Modal>
  );
}

function ScanLoading({ previews }){
  return (
    <div className="modal-backdrop scan-backdrop">
      <div className="scan-loading">
        {previews && previews[0] && <div className="scan-thumb" style={{backgroundImage:`url(${previews[0]})`}}><div className="scan-beam"/></div>}
        <div className="scan-loading-title">Leyendo el ticket…</div>
        <div className="scan-loading-sub">Suele tardar unos segundos</div>
      </div>
    </div>
  );
}

function ScanReviewModal({ result, categories, existing, onClose, onSave, holdings=[] }){
  const dupOf = (it) => existing.some(t=>t.date===it.date && Math.abs(Number(t.amount)-it.amount)<0.005 && t.type===it.type);
  const invIds = new Set(categories.filter(c=>c.kind==='inversion').map(c=>c.id));
  const [items, setItems] = useState(()=>result.items.map(it=>({ ...it, key:uid(), dup:dupOf(it), on:!dupOf(it), holdingId: invIds.has(it.catId) && holdings[0] ? holdings[0].id : null })));
  const upd = (k, patch) => setItems(list=>list.map(it=>it.key===k ? { ...it, ...patch } : it));
  const chosen = items.filter(it=>it.on && it.amount>0);
  const total = chosen.reduce((s,it)=>s+(it.type==='income'?1:-1)*it.amount,0);
  return (
    <Modal title={items.length ? `He encontrado ${items.length} ${items.length===1?'movimiento':'movimientos'}` : 'No he encontrado importes'} onClose={onClose}>
      {result.previews && result.previews.length>0 && (
        <div className="scan-previews">{result.previews.map((p,i)=><div key={i} className="scan-prev" style={{backgroundImage:`url(${p})`}}/>)}</div>
      )}
      {items.length===0 && <div className="empty-hint">No he podido leer ningún importe. Prueba con una foto más cerca, recta y con buena luz, o apúntalo a mano.</div>}
      <div className="scan-list">
        {items.map(it=>{
          const opts = it.type==='expense' ? categories : INCOME_SOURCES;
          const cat = opts.find(o=>o.id===it.catId);
          return (
            <div key={it.key} className={`scan-item ${it.on?'':'off'}`}>
              <div className="scan-row1">
                <button className={`scan-check ${it.on?'on':''}`} onClick={()=>upd(it.key,{on:!it.on})} aria-label="Incluir"><Icon name="check"/></button>
                <input className="scan-note" value={it.note} onChange={e=>upd(it.key,{note:e.target.value})} placeholder="Concepto"/>
                <div className="scan-amt">
                  <span className={it.type==='income'?'inc':''}>{it.type==='income'?'+':'−'}</span>
                  <NumInput value={it.amount} onValue={v=>upd(it.key,{amount:Math.abs(v)})}/>
                  <span>€</span>
                </div>
              </div>
              <div className="scan-row2">
                <span className="scan-dot" style={{background: cat ? cat.color : 'var(--faint)'}}/>
                <select value={it.catId} onChange={e=>upd(it.key,{catId:e.target.value})}>
                  {opts.map(o=><option key={o.id} value={o.id}>{o.name}</option>)}
                </select>
                <input type="date" value={it.date} onChange={e=>e.target.value && upd(it.key,{date:e.target.value})}/>
                <button className="scan-type" onClick={()=>{ const type = it.type==='expense'?'income':'expense'; upd(it.key,{ type, catId: type==='income' ? 'otros' : (categories.find(c=>c.kind==='gasto')||categories[0]).id }); }}>{it.type==='expense'?'Gasto':'Ingreso'}</button>
              </div>
              {it.type==='expense' && invIds.has(it.catId) && holdings.length>0 && (
                <div className="scan-row2">
                  <span className="scan-dot" style={{background:'var(--invest)'}}/>
                  <select value={it.holdingId||''} onChange={e=>upd(it.key,{holdingId:e.target.value||null})}>
                    {holdings.map(h=><option key={h.id} value={h.id}>{h.name}</option>)}
                    <option value="">Sin producto</option>
                  </select>
                </div>
              )}
              {it.dup && <div className="scan-dup">Ya tienes un movimiento igual ese día. Lo he desmarcado por si está repetido.</div>}
            </div>
          );
        })}
      </div>
      {items.length>0 && <button className="btn btn-primary" disabled={!chosen.length} onClick={()=>onSave(chosen.map(({key,dup,on,holdingId,...t})=>({ ...t, ...(t.type==='expense' && invIds.has(t.catId) && holdingId ? { holdingId } : {}) })))}>
        {chosen.length ? `Guardar ${chosen.length} · ${total<0?'−':'+'}${fmtExact(Math.abs(total))}` : 'Marca algún movimiento'}
      </button>}
      <button className="btn btn-ghost" onClick={onClose}>{items.length ? 'Descartar' : 'Cerrar'}</button>
    </Modal>
  );
}

// ---------- Cartera: fondos, ETFs y acciones con precios automáticos ----------
const HOLDING_TYPES = { fondo:'Fondo', etf:'ETF', accion:'Acción', cripto:'Cripto', otro:'Otro' };
const HOLDING_COLORS = ['#FF9F43','#B48CFF','#5EC8D8','#8FD66A','#FF6FA5','#FFD166','#8E9BFF','#EF4B55'];
const typeFromYahoo = (t) => t==='MUTUALFUND' ? 'fondo' : t==='ETF' ? 'etf' : t==='EQUITY' ? 'accion' : t==='CRYPTOCURRENCY' ? 'cripto' : 'otro';
const fmt2 = (n) => new Intl.NumberFormat('es-ES',{style:'currency',currency:'EUR',minimumFractionDigits:2,maximumFractionDigits:2}).format(n||0);
const pctStr = (p) => (p>0?'+':'') + (Math.round(p*100)/100).toLocaleString('es-ES',{minimumFractionDigits:2,maximumFractionDigits:2}) + ' %';
const toEUR = (v, cur, fx) => {
  if (v==null) return null;
  if (cur==='USD') return fx && fx.EURUSD ? v / fx.EURUSD : null;
  if (cur==='GBp') return null;
  return v;
};

function usePrices(){
  const [prices, setPrices] = useState(null);
  const [err, setErr] = useState(null);
  const load = async () => {
    try {
      const r = await fetch(`data/prices.json?t=${Date.now()}`, { cache:'no-store' });
      if (!r.ok) throw new Error(r.status);
      setPrices(await r.json()); setErr(null);
    } catch(e) {
      try { const c = await caches.match('data/prices.json', { ignoreSearch:true }); if (c) { setPrices(await c.json()); } } catch(_){}
      setErr('Sin conexión: precios de la última vez');
    }
  };
  useEffect(()=>{
    load();
    const id = setInterval(()=>{ if (document.visibilityState==='visible') load(); }, 5*60*1000);
    const onVis = () => { if (document.visibilityState==='visible') load(); };
    document.addEventListener('visibilitychange', onVis);
    return () => { clearInterval(id); document.removeEventListener('visibilitychange', onVis); };
  }, []);
  return { prices, err, reload: load };
}

const sinceLabel = (iso) => {
  if (!iso) return '';
  const m = Math.round((Date.now() - new Date(iso).getTime())/60000);
  if (m < 2) return 'ahora mismo';
  if (m < 60) return `hace ${m} min`;
  const h = Math.round(m/60);
  if (h < 24) return `hace ${h} h`;
  return `hace ${Math.round(h/24)} días`;
};

const ISIN_RE = /^[A-Z]{2}[A-Z0-9]{9}[0-9]$/;
const priceIdOf = (h, prices) => {
  if (!prices || !prices.items) return null;
  if (h.priceId && prices.items[h.priceId]) return h.priceId;
  const isin = (h.isin||'').toUpperCase();
  return isin && prices.items[isin] ? isin : null;
};
const trackUrl = (isin, name) => `https://github.com/acorchete16/cimientos/issues/new?title=${encodeURIComponent('Seguir ' + isin)}&body=${encodeURIComponent(`isin: ${isin}\nnombre: ${name||''}\n\nSolo tienes que pulsar "Submit new issue". En 1-2 minutos la app empezará a mostrar sus datos en vivo.`)}`;

function liveOf(h, prices){
  const pid = priceIdOf(h, prices);
  if (!pid) return null;
  const p = prices.items[pid];
  if (!p || p.price==null) return null;
  const fx = prices.fx;
  const price = toEUR(p.price, p.currency, fx), prev = toEUR(p.prevClose, p.currency, fx);
  if (price==null) return null;
  const conv = (arr) => (arr||[]).map(([t,v])=>[t, toEUR(v, p.currency, fx)]);
  return { ...p, priceEUR: price, prevEUR: prev, intradayEUR: conv(p.intraday), dailyEUR: conv(p.daily), weeklyEUR: conv(p.weekly), native: p.currency!=='EUR' };
}

function holdingStats(h, txns, prices){
  const contribs = txns.filter(t=>t.holdingId===h.id && t.type==='expense');
  const invested = Number(h.initInvested||0) + contribs.reduce((s,t)=>s+Number(t.amount),0);
  const live = liveOf(h, prices);
  let units = null, value;
  if (live && h.initUnits!=null) {
    units = Number(h.initUnits) + contribs.reduce((s,t)=>s+Number(t.units||0),0);
    value = units * live.priceEUR;
  } else {
    const after = contribs.filter(t=>!h.manualDate || t.date > h.manualDate).reduce((s,t)=>s+Number(t.amount),0);
    value = Number(h.manualValue||0) + after;
  }
  const gain = value - invested;
  const dayChange = live && units!=null && live.prevEUR ? units*(live.priceEUR - live.prevEUR) : 0;
  return { invested, value, gain, gainPct: invested>0 ? gain/invested*100 : 0, units, live, dayChange, contribs, avgPrice: units ? invested/units : null };
}

// Gráfico de línea con dedo/ratón para ver cada punto
function LineChart({ points, height=180, color, baseline, fmtY=fmt2, fmtX }){
  const [hover, setHover] = useState(null);
  const ref = useRef(null);
  const W = 340, H = height, pt = 14, pb = 22, pl = 2, pr = 2;
  if (!points || points.length < 2) return <div className="chart-empty">No hay suficientes datos para este periodo.</div>;
  const ys = points.map(p=>p[1]).concat(baseline!=null ? [baseline] : []);
  let min = Math.min(...ys), max = Math.max(...ys);
  if (max-min < 1e-9) { max += 1; min -= 1; }
  const pad = (max-min)*0.08; min -= pad; max += pad;
  const t0 = points[0][0], t1 = points[points.length-1][0];
  const X = (t) => pl + (t1===t0 ? 0 : (t-t0)/(t1-t0))*(W-pl-pr);
  const Y = (v) => pt + (1-(v-min)/(max-min))*(H-pt-pb);
  const d = points.map(([t,v],i)=>`${i?'L':'M'}${X(t).toFixed(1)},${Y(v).toFixed(1)}`).join(' ');
  const area = `${d} L${X(t1).toFixed(1)},${H-pb} L${X(t0).toFixed(1)},${H-pb} Z`;
  const up = points[points.length-1][1] >= points[0][1];
  const col = color || (up ? 'var(--accent)' : 'var(--danger)');
  const gid = 'g' + Math.random().toString(36).slice(2,7);
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    const cx = ((e.touches ? e.touches[0].clientX : e.clientX) - r.left) / r.width * W;
    let best = 0, bd = Infinity;
    points.forEach(([t],i)=>{ const dd = Math.abs(X(t)-cx); if (dd<bd){ bd=dd; best=i; } });
    setHover(best);
  };
  const hp = hover!=null ? points[hover] : null;
  const defX = (t) => { const dt = new Date(t*1000); return dt.toLocaleDateString('es-ES',{day:'numeric',month:'short'}); };
  const fx = fmtX || defX;
  return (
    <div className="lchart">
      <div className="lchart-tip" style={{opacity: hp?1:0}}>
        {hp && <><b className="num">{fmtY(hp[1])}</b><span>{fx(hp[0])}</span></>}
      </div>
      <svg ref={ref} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="lchart-svg"
        onMouseMove={onMove} onTouchStart={onMove} onTouchMove={onMove} onMouseLeave={()=>setHover(null)} onTouchEnd={()=>setTimeout(()=>setHover(null), 1200)}>
        <defs><linearGradient id={gid} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={col} stopOpacity="0.30"/><stop offset="100%" stopColor={col} stopOpacity="0"/></linearGradient></defs>
        {baseline!=null && <><line x1={pl} x2={W-pr} y1={Y(baseline)} y2={Y(baseline)} stroke="var(--faint)" strokeDasharray="3 4" strokeWidth="1"/>
          <text x={W-pr-2} y={Y(baseline)-4} textAnchor="end" className="lchart-axis">{fmtY(baseline)}</text></>}
        <path d={area} fill={`url(#${gid})`}/>
        <path d={d} fill="none" stroke={col} strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke"/>
        {hp && <><line x1={X(hp[0])} x2={X(hp[0])} y1={pt} y2={H-pb} stroke="var(--ink)" strokeOpacity="0.35" strokeWidth="1"/>
          <circle cx={X(hp[0])} cy={Y(hp[1])} r="4.5" fill={col} stroke="var(--surface)" strokeWidth="2"/></>}
        {!hp && <circle cx={X(t1)} cy={Y(points[points.length-1][1])} r="3.5" fill={col}/>}
        <text x={pl} y={H-6} className="lchart-axis">{fx(t0)}</text>
        <text x={W-pr} y={H-6} textAnchor="end" className="lchart-axis">{fx(t1)}</text>
      </svg>
    </div>
  );
}

function Sparkline({ points, up }){
  if (!points || points.length<2) return <svg className="spark"/>;
  const ys = points.map(p=>p[1]); const min=Math.min(...ys), max=Math.max(...ys)||1;
  const W=64,H=26; const d = points.map(([t,v],i)=>`${i?'L':'M'}${(i/(points.length-1)*W).toFixed(1)},${(H-2-(max-min?((v-min)/(max-min)):0.5)*(H-4)).toFixed(1)}`).join(' ');
  return <svg className="spark" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none"><path d={d} fill="none" stroke={up?'var(--accent)':'var(--danger)'} strokeWidth="1.6" vectorEffect="non-scaling-stroke"/></svg>;
}

const RANGES = [
  { k:'1D', label:'1D' }, { k:'1S', label:'1S' }, { k:'1M', label:'1M' }, { k:'6M', label:'6M' }, { k:'1A', label:'1A' }, { k:'5A', label:'5A' },
];
function seriesFor(live, k){
  if (!live) return [];
  const daily = live.dailyEUR || [];
  if (k==='1D') return (live.intradayEUR||[]).length>=2 ? live.intradayEUR : daily.slice(-2);
  if (k==='1S') return daily.slice(-6);
  if (k==='1M') return daily.slice(-23);
  if (k==='6M') return daily.slice(-127);
  if (k==='1A') return daily;
  return live.weeklyEUR || [];
}

// Ficha del producto con Gemini + búsqueda de Google (datos públicos, se guarda en el móvil)
async function fetchFicha(h, live){
  const key = getAIKey(); let model = getAIModel();
  if (!key) throw new Error('NO_KEY');
  if (!model) { model = await discoverModel(key); setAI(key, model); }
  const prompt = `Busca información actual y fiable sobre este producto de inversión y devuelve SOLO un objeto JSON válido, sin texto antes ni después, sin markdown.
Producto: ${h.name}${h.isin ? ` (ISIN ${h.isin})` : ''}${live && live.symbol ? `, símbolo ${live.symbol}` : ''}.
Claves del JSON (usa null si no lo encuentras, no inventes):
{"descripcion": "2-3 frases claras en español sobre qué es y en qué invierte",
 "gestora": "", "indice": "índice que replica o null", "ter": "comisión anual en %, ej. 0,20 %", "tamano": "patrimonio del fondo, ej. 95.000 M€",
 "dividendos": "Acumulación o Distribución", "replicacion": "Física/Sintética/Muestreo o null", "domicilio": "", "lanzamiento": "año",
 "riesgo": "nivel de riesgo 1-7 (SRRI) si aparece", "n_posiciones": "número aproximado de empresas",
 "top": [{"nombre":"", "peso":"%"}], "paises": [{"nombre":"", "peso":"%"}], "sectores": [{"nombre":"", "peso":"%"}],
 "rent_1a": "rentabilidad último año %", "rent_5a_anual": "rentabilidad anualizada 5 años %",
 "nota": "una frase con lo más importante a tener en cuenta (riesgo de concentración, divisa, etc.)"}
Máximo 5 elementos en top, paises y sectores.`;
  let res;
  try {
    res = await fetch(`${GEMINI}/models/${model}:generateContent?key=${encodeURIComponent(key)}`, { method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ contents:[{ role:'user', parts:[{ text: prompt }] }], tools:[{ google_search:{} }], generationConfig:{ temperature:0.2 } }) });
  } catch(e){ throw new Error('Necesitas conexión para buscar la ficha.'); }
  const out = await res.json().catch(()=>null);
  if (!res.ok) throw new Error(aiError(res.status, out));
  const cand = ((out||{}).candidates||[])[0] || {};
  const text = (cand.content && cand.content.parts || []).map(p=>p.text||'').join('');
  const m = text.match(/\{[\s\S]*\}/);
  if (!m) throw new Error('No he podido montar la ficha. Prueba otra vez.');
  let info; try { info = JSON.parse(m[0]); } catch(e){ throw new Error('La respuesta no era válida. Prueba otra vez.'); }
  const sources = ((cand.groundingMetadata||{}).groundingChunks||[]).map(c=>c.web).filter(Boolean).slice(0,5).map(w=>({ title:w.title, uri:w.uri }));
  return { ...info, sources, at: new Date().toISOString() };
}

function CarteraTab({ data, setData, prices, pricesErr, atlasUrl, openAdd, onAporta }){
  const [range, setRange] = useState('1A');
  const [openId, setOpenId] = useState(null);
  const [form, setForm] = useState(null);
  const holdings = data.holdings || [];
  const stats = holdings.map((h,i)=>({ h, s: holdingStats(h, data.txns, prices), color: HOLDING_COLORS[i % HOLDING_COLORS.length] }));
  const total = stats.reduce((a,x)=>a+x.s.value,0);
  const invested = stats.reduce((a,x)=>a+x.s.invested,0);
  const gain = total - invested;
  const day = stats.reduce((a,x)=>a+x.s.dayChange,0);
  const dayPct = total-day>0 ? day/(total-day)*100 : 0;

  // Evolución de la cartera actual (participaciones de hoy × precio histórico)
  const portfolioSeries = useMemo(()=>{
    const map = new Map();
    let anyLive = false;
    stats.forEach(({h,s})=>{
      if (!s.live || s.units==null) { return; }
      anyLive = true;
      seriesFor(s.live, range).forEach(([t,v])=>{
        const k = range==='1D' ? Math.round(t/300)*300 : new Date(t*1000).toISOString().slice(0,10);
        const cur = map.get(k) || { t, parts:{} }; cur.parts[h.id] = v*s.units; map.set(k, cur);
      });
    });
    if (!anyLive) return [];
    const keys = [...map.keys()].sort((a,b)=> (map.get(a).t - map.get(b).t));
    const last = {}; const manual = stats.filter(x=>!x.s.live || x.s.units==null).reduce((a,x)=>a+x.s.value,0);
    const liveIds = stats.filter(x=>x.s.live && x.s.units!=null).map(x=>x.h.id);
    const out = [];
    keys.forEach(k=>{ const row = map.get(k); Object.assign(last, row.parts); if (liveIds.every(id=>last[id]!=null)) out.push([row.t, liveIds.reduce((a,id)=>a+last[id],0) + manual]); });
    return out;
  }, [prices, data.holdings, data.txns, range]);

  const open = openId ? stats.find(x=>x.h.id===openId) : null;
  const updated = prices && prices.updatedAt;

  return (
    <React.Fragment>
      <div className="tab-title">Cartera</div>
      {holdings.length===0 ? (
        <div className="cart-empty">
          <div className="cart-empty-title">Tu cartera, en directo</div>
          <div className="cart-empty-sub">Dime qué fondos, ETFs o acciones tienes, cuánto has metido y cuánto vale ahora. A partir de ahí, la app sigue el precio sola y te enseña cuánto ganas o pierdes cada día.</div>
          <button className="btn btn-primary" onClick={()=>setForm({})}>Añadir mi primera inversión</button>
        </div>
      ) : (
        <>
          <div className="cart-hero">
            <div className="hero-label">Tu cartera vale</div>
            <div className="hero-huge num"><AnimatedMoney value={total}/></div>
            <div className="cart-gain">
              <span className={gain>=0?'up':'down'}>{gain>=0?'+':''}{fmt2(gain)} ({pctStr(invested>0?gain/invested*100:0)})</span>
              <span className="muted"> desde que empezaste</span>
            </div>
            {day!==0 && <div className="cart-day"><span className={day>=0?'up':'down'}>{day>=0?'+':''}{fmt2(day)} ({pctStr(dayPct)})</span><span className="muted"> hoy</span></div>}
            <div className="cart-meta">Has metido {fmt2(invested)} · precios {updated ? sinceLabel(updated) : '…'}{pricesErr ? ' · sin conexión' : ''}</div>
          </div>

          {portfolioSeries.length>1 && (
            <div className="card chart-card">
              <div className="range-tabs">{RANGES.map(r=><button key={r.k} className={range===r.k?'on':''} onClick={()=>setRange(r.k)}>{r.label}</button>)}</div>
              <LineChart points={portfolioSeries} baseline={range==='5A'||range==='1A' ? null : null}
                fmtX={range==='1D' ? (t)=>new Date(t*1000).toLocaleTimeString('es-ES',{hour:'2-digit',minute:'2-digit'}) : undefined}/>
              <div className="chart-note">Con las participaciones que tienes hoy.</div>
            </div>
          )}

          <div className="section-label"><span>Tus inversiones</span><a onClick={()=>setForm({})}>Añadir</a></div>
          <div className="cat-list">
            {stats.map(({h,s,color})=>{
              const spark = s.live ? seriesFor(s.live, '1M') : null;
              const dpct = s.live && s.live.prevEUR ? (s.live.priceEUR/s.live.prevEUR-1)*100 : null;
              return (
                <div key={h.id} className="hold-row" onClick={()=>setOpenId(h.id)}>
                  <div className="hold-dot" style={{background:color}}/>
                  <div className="hold-mid">
                    <div className="hold-name">{h.name}</div>
                    <div className="hold-sub">{HOLDING_TYPES[h.type]||'Inversión'}{s.live ? <> · <span className={dpct>=0?'up':'down'}>{dpct!=null ? pctStr(dpct) : ''}</span> hoy</> : h.trackRequested ? ' · conectando…' : h.isin ? <> · <span style={{color:'var(--amber)'}}>sin conectar</span></> : ' · valor manual'}</div>
                  </div>
                  {spark && <Sparkline points={spark} up={spark[spark.length-1][1]>=spark[0][1]}/>}
                  <div className="hold-right">
                    <div className="num hold-val">{fmt(s.value)}</div>
                    <div className={`num hold-gain ${s.gain>=0?'up':'down'}`}>{s.gain>=0?'+':''}{fmt(s.gain)}</div>
                  </div>
                </div>
              );
            })}
          </div>

          {stats.length>1 && total>0 && (
            <>
              <div className="section-label">Reparto</div>
              <div className="card">
                <DonutChart segments={stats.filter(x=>x.s.value>0).map(({h,s,color})=>({ label:h.name, value:s.value, color }))} centerValue={fmt(total)} centerLabel="total"/>
              </div>
            </>
          )}
        </>
      )}

      <div className="data-hint" style={{marginTop:14}}>Los precios vienen de Yahoo Finance y se actualizan cada 30 minutos en horario de mercado. Los fondos publican su valor una vez al día. No es asesoramiento financiero.</div>

      {open && <HoldingDetail item={open} prices={prices} data={data} setData={setData} onClose={()=>setOpenId(null)} onEdit={()=>setForm(open.h)} onAporta={()=>onAporta(open.h, open.s)}/>}
      {form && <HoldingForm holding={form} prices={prices} existing={holdings} onClose={()=>setForm(null)}
        onSave={(h)=>{ setData(d=>{ const list = d.holdings||[]; return { ...d, holdings: h.id && list.some(x=>x.id===h.id) ? list.map(x=>x.id===h.id?{...x,...h}:x) : [...list, { ...h, id:uid(), created: todayISO() }] }; }); setForm(null); }}
        onDelete={form.id ? ()=>{ setData(d=>({ ...d, holdings:(d.holdings||[]).filter(x=>x.id!==form.id) })); setForm(null); setOpenId(null); } : null}/>}
    </React.Fragment>
  );
}

function HoldingDetail({ item, prices, data, setData, onClose, onEdit, onAporta }){
  const { h, s, color } = item;
  const [range, setRange] = useState(s.live && (s.live.intradayEUR||[]).length>=2 ? '1D' : '1M');
  const [ficha, setFicha] = useState({ busy:false, err:null });
  const [keyOpen, setKeyOpen] = useState(false);
  const [valOpen, setValOpen] = useState(false);
  const live = s.live;
  const series = seriesFor(live, range);
  const rchg = series.length>1 ? (series[series.length-1][1]/series[0][1]-1)*100 : null;
  const info = h.info;
  const loadFicha = async () => {
    setFicha({ busy:true, err:null });
    try { const inf = await fetchFicha(h, live); setData(d=>({ ...d, holdings:(d.holdings||[]).map(x=>x.id===h.id?{...x, info:inf}:x) })); setFicha({ busy:false, err:null }); }
    catch(e){ if (e.message==='NO_KEY') { setKeyOpen(true); setFicha({busy:false, err:null}); } else setFicha({ busy:false, err:e.message }); }
  };
  const fact = (l, v) => v ? <div className="fact"><span>{l}</span><b>{v}</b></div> : null;
  return (
    <Modal title={h.name} onClose={onClose}>
      <div className="hd-top">
        <span className="hd-chip" style={{'--c':color}}>{HOLDING_TYPES[h.type]||'Inversión'}</span>
        {h.isin && <span className="hd-isin num">{h.isin}</span>}
        {live && <span className="hd-isin">{live.symbol}{live.exchange ? ` · ${live.exchange}` : ''}</span>}
      </div>

      {live ? (
        <>
          <div className="hd-price">
            <div className="num hd-price-v">{fmt2(live.priceEUR)}</div>
            {rchg!=null && <div className={`hd-price-c ${rchg>=0?'up':'down'}`}>{pctStr(rchg)} <span className="muted">{range==='1D'?'hoy':`en ${RANGES.find(r=>r.k===range).label}`}</span></div>}
          </div>
          {live.native && <div className="data-hint" style={{textAlign:'left', margin:'0 0 6px'}}>Cotiza en {live.currency} ({live.price.toLocaleString('es-ES')} {live.currency}); te lo enseño pasado a euros.</div>}
          <div className="range-tabs">{RANGES.map(r=><button key={r.k} className={range===r.k?'on':''} onClick={()=>setRange(r.k)}>{r.label}</button>)}</div>
          <LineChart points={series} baseline={s.avgPrice && range!=='1D' ? s.avgPrice : null}
            fmtX={range==='1D' ? (t)=>new Date(t*1000).toLocaleTimeString('es-ES',{hour:'2-digit',minute:'2-digit'}) : undefined}/>
          {s.avgPrice && range!=='1D' && <div className="chart-note">La línea discontinua es tu precio medio de compra ({fmt2(s.avgPrice)}).</div>}
          <div className="facts">
            {fact('Máx. 52 semanas', live.high52!=null ? fmt2(toEUR(live.high52, live.currency, prices.fx)) : null)}
            {fact('Mín. 52 semanas', live.low52!=null ? fmt2(toEUR(live.low52, live.currency, prices.fx)) : null)}
            {fact('Último precio', live.time ? new Date(live.time*1000).toLocaleString('es-ES',{day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'}) : null)}
          </div>
        </>
      ) : (
        h.isin && ISIN_RE.test(h.isin) ? (
          <div className="connect-box">
            <div className="connect-title">{h.trackRequested ? 'Conectando…' : 'Conecta sus datos en vivo'}</div>
            <div className="notice-text">{h.trackRequested
              ? 'Ya lo has pedido. En 1-2 minutos aparecerán precio y gráficos; si tarda más, vuelve a pulsar.'
              : 'Se abre GitHub con todo rellenado: solo pulsa "Submit new issue". En 1-2 minutos la app empezará a seguir su precio.'}</div>
            <a className="btn btn-primary" href={trackUrl(h.isin, h.name)} target="_blank" rel="noopener"
              onClick={()=>setData(d=>({ ...d, holdings:(d.holdings||[]).map(x=>x.id===h.id?{...x, trackRequested: new Date().toISOString()}:x) }))}>
              <Icon name="globe"/>{h.trackRequested ? 'Volver a pedir' : 'Conectar datos en vivo'}
            </a>
          </div>
        ) : (
          <div className="notice soft" style={{marginTop:6}}>
            <div className="notice-text">Sin ISIN no puedo seguir su precio en directo. Edita la inversión y añade su ISIN (lo ves en Trade Republic, en la ficha del producto).</div>
          </div>
        )
      )}

      <div className="data-section">Tu posición</div>
      <div className="pos-grid">
        <div><span>Vale ahora</span><b className="num">{fmt2(s.value)}</b></div>
        <div><span>Has metido</span><b className="num">{fmt2(s.invested)}</b></div>
        <div><span>Ganancia</span><b className={`num ${s.gain>=0?'up':'down'}`}>{s.gain>=0?'+':''}{fmt2(s.gain)}</b></div>
        <div><span>Rentabilidad</span><b className={`num ${s.gain>=0?'up':'down'}`}>{pctStr(s.gainPct)}</b></div>
        {s.units!=null && <div><span>Participaciones</span><b className="num">{s.units.toLocaleString('es-ES',{maximumFractionDigits:4})}</b></div>}
        {live && s.units!=null && <div><span>Hoy</span><b className={`num ${s.dayChange>=0?'up':'down'}`}>{s.dayChange>=0?'+':''}{fmt2(s.dayChange)}</b></div>}
      </div>
      <div className="hd-actions">
        <button className="btn btn-primary" onClick={onAporta}>Aportar</button>
        <button className="btn btn-ghost" style={{marginTop:0}} onClick={()=>setValOpen(true)}>{live ? 'Ajustar al broker' : 'Actualizar valor'}</button>
      </div>

      <div className="data-section">Ficha</div>
      {!info && !ficha.busy && <button className="btn btn-ghost" style={{marginTop:0}} onClick={loadFicha}><Icon name="sparkle"/>Buscar ficha completa</button>}
      {ficha.busy && <div className="empty-hint">Buscando en internet comisiones, índice, posiciones…</div>}
      {ficha.err && <div className="copy-ok" style={{color:'var(--danger)'}}>{ficha.err}</div>}
      {info && (
        <div className="ficha">
          {info.descripcion && <p className="ficha-desc">{info.descripcion}</p>}
          <div className="facts">
            {fact('Gestora', info.gestora)}{fact('Índice', info.indice)}{fact('Comisión anual (TER)', info.ter)}{fact('Tamaño', info.tamano)}
            {fact('Dividendos', info.dividendos)}{fact('Réplica', info.replicacion)}{fact('Domicilio', info.domicilio)}{fact('Lanzamiento', info.lanzamiento)}
            {fact('Riesgo (1-7)', info.riesgo)}{fact('Nº de empresas', info.n_posiciones)}{fact('Rentab. 1 año', info.rent_1a)}{fact('Rentab. anual 5 años', info.rent_5a_anual)}
          </div>
          {[['Principales posiciones', info.top], ['Países', info.paises], ['Sectores', info.sectores]].map(([t, list])=> list && list.length ? (
            <div key={t} className="ficha-block">
              <div className="sum-block-title">{t}</div>
              {list.slice(0,5).map((x,i)=>{ const w = parseFloat(String(x.peso||'').replace(',','.')); return (
                <div key={i} className="wbar"><span className="wbar-name">{x.nombre}</span><span className="wbar-track"><span style={{width:`${isNaN(w)?0:Math.min(100,w)}%`, background:color}}/></span><span className="num wbar-v">{x.peso}</span></div>
              ); })}
            </div>
          ) : null)}
          {info.nota && <div className="ficha-note">{info.nota}</div>}
          <div className="ficha-foot">
            <span>Buscado {sinceLabel(info.at)} con Gemini. Comprueba los datos importantes en la web de la gestora.</span>
            <button className="link-btn" style={{margin:'6px 0 0'}} onClick={loadFicha}>{ficha.busy ? 'Buscando…' : 'Actualizar ficha'}</button>
          </div>
          {info.sources && info.sources.length>0 && <div className="ficha-src">{info.sources.map((s2,i)=><a key={i} href={s2.uri} target="_blank" rel="noopener">{s2.title || 'Fuente'}</a>)}</div>}
        </div>
      )}

      {s.contribs.length>0 && (
        <>
          <div className="data-section">Aportaciones</div>
          {[...s.contribs].sort((a,b)=>b.date.localeCompare(a.date)).map(t=>(
            <div key={t.id} className="sum-row"><span className="name">{dayLabel(t.date)}</span><span className="num">{fmt2(t.amount)}</span></div>
          ))}
        </>
      )}

      <button className="link-btn" onClick={onEdit}>Editar o eliminar esta inversión</button>
      {keyOpen && <AIKeyModal onClose={()=>setKeyOpen(false)} onConnected={()=>{ setKeyOpen(false); loadFicha(); }}/>}
      {valOpen && <ValueModal h={h} s={s} onClose={()=>setValOpen(false)} onSave={(v)=>{
        setData(d=>({ ...d, holdings:(d.holdings||[]).map(x=>{
          if (x.id!==h.id) return x;
          if (live) { const contribUnits = s.contribs.reduce((a,t)=>a+Number(t.units||0),0); return { ...x, initUnits: v/live.priceEUR - contribUnits }; }
          return { ...x, manualValue: v, manualDate: todayISO() };
        }) })); setValOpen(false);
      }}/>}
    </Modal>
  );
}

function ValueModal({ h, s, onClose, onSave }){
  const [v, setV] = useState(String(Math.round(s.value*100)/100).replace('.',','));
  const n = toNum(v);
  return (
    <Modal title={s.live ? 'Ajustar al valor del broker' : 'Actualizar valor'} onClose={onClose}>
      <div className="ai-intro">{s.live ? 'Si el valor que ves en Trade Republic no coincide con el de la app, pon aquí el del broker y recalculo tus participaciones. A partir de ahí sigue el precio solo.' : 'Mira cuánto vale ahora en tu broker y ponlo aquí.'}</div>
      <div className="field"><label>Valor actual en tu broker (€)</label><input type="text" inputMode="decimal" autoFocus value={v} onChange={e=>setV(cleanNumText(e.target.value))}/></div>
      <button className="btn btn-primary" disabled={!(n>0)} onClick={()=>onSave(n)}>Guardar</button>
    </Modal>
  );
}

function HoldingForm({ holding, prices, existing, onClose, onSave, onDelete }){
  const isEdit = !!holding.id;
  const tracked = prices && prices.items ? Object.values(prices.items) : [];
  const usedIds = new Set(existing.filter(x=>x.id!==holding.id).map(x=>x.priceId).filter(Boolean));
  const [priceId, setPriceId] = useState(holding.priceId || null);
  const [custom, setCustom] = useState(isEdit && !holding.priceId);
  const [name, setName] = useState(holding.name || '');
  const [isin, setIsin] = useState(holding.isin || '');
  const [type, setType] = useState(holding.type || 'etf');
  const [inv, setInv] = useState(holding.initInvested!=null ? String(holding.initInvested).replace('.',',') : '');
  const [val, setVal] = useState('');
  const pick = (p) => { setPriceId(p.id); setCustom(false); setName(p.name); setIsin(p.isin||''); setType(typeFromYahoo(p.type)); };
  const typedIsin = isin.trim().toUpperCase();
  useEffect(()=>{
    if (!custom || !prices || !prices.items) return;
    if (ISIN_RE.test(typedIsin) && prices.items[typedIsin] && !usedIds.has(typedIsin)) { pick(prices.items[typedIsin]); }
  }, [typedIsin]);
  const sel = priceId && prices && prices.items[priceId];
  const live = sel ? liveOf({ priceId }, prices) : null;
  const invN = toNum(inv), valN = toNum(val);
  const canSave = name.trim() && invN>=0 && (isEdit || valN>0);
  const submit = () => {
    const base = { ...(isEdit?{id:holding.id}:{}), name:name.trim(), isin:isin.trim().toUpperCase()||null, type, priceId: custom ? null : priceId, initInvested: invN||0 };
    if (!isEdit || valN>0) {
      if (live) { base.initUnits = valN / live.priceEUR; base.manualValue = null; }
      else { base.initUnits = null; base.manualValue = valN; base.manualDate = todayISO(); }
    }
    onSave(base);
  };
  return (
    <Modal title={isEdit ? 'Editar inversión' : 'Nueva inversión'} onClose={onClose}>
      {!isEdit && (
        <div className="field">
          <label>¿Qué tienes?</label>
          <div className="pick-list">
            {tracked.map(p=>{
              const l = liveOf({priceId:p.id}, prices);
              return (
                <button key={p.id} className={`pick ${priceId===p.id && !custom ? 'on' : ''}`} disabled={usedIds.has(p.id)} onClick={()=>pick(p)}>
                  <span className="pick-name">{p.name}</span>
                  <span className="pick-sub">{HOLDING_TYPES[typeFromYahoo(p.type)]} · {p.isin}{l ? ` · ${fmt2(l.priceEUR)}` : ''}{usedIds.has(p.id) ? ' · ya añadido' : ''}</span>
                </button>
              );
            })}
            <button className={`pick ${custom?'on':''}`} onClick={()=>{ setCustom(true); setPriceId(null); setName(''); setIsin(''); }}>
              <span className="pick-name">Otro producto</span><span className="pick-sub">Lo apuntas a mano y, si me das el ISIN, lo añado al seguimiento de precios</span>
            </button>
          </div>
        </div>
      )}
      {(custom || isEdit) && (
        <>
          <div className="field"><label>Nombre</label><input type="text" value={name} onChange={e=>setName(e.target.value)} placeholder="Ej. Vanguard Global Stock"/></div>
          <div className="field-row">
            <div className="field"><label>ISIN</label><input type="text" value={isin} onChange={e=>setIsin(e.target.value)} placeholder="IE00…" autoCapitalize="characters"/></div>
            <div className="field"><label>Tipo</label><select value={type} onChange={e=>setType(e.target.value)}>{Object.entries(HOLDING_TYPES).map(([k,v])=><option key={k} value={k}>{v}</option>)}</select></div>
          </div>
        </>
      )}
      {(priceId || custom || isEdit) && (
        <>
          <div className="field"><label>¿Cuánto has metido en total? (€)</label><input type="text" inputMode="decimal" value={inv} onChange={e=>setInv(cleanNumText(e.target.value))} placeholder="Suma de todas tus aportaciones"/></div>
          <div className="field"><label>{isEdit ? 'Valor actual (déjalo vacío para no cambiarlo)' : '¿Cuánto vale ahora? (€)'}</label><input type="text" inputMode="decimal" value={val} onChange={e=>setVal(cleanNumText(e.target.value))} placeholder="Lo que pone en tu broker"/></div>
          {custom && ISIN_RE.test(typedIsin) && !live && <div className="data-hint" style={{textAlign:'left', margin:'-4px 0 12px'}}>Este ISIN aún no tiene datos en vivo. Cuando lo guardes podrás conectarlo con un toque.</div>}
          {custom && typedIsin && !ISIN_RE.test(typedIsin) && <div className="data-hint" style={{textAlign:'left', margin:'-4px 0 12px', color:'var(--warn)'}}>Un ISIN tiene 12 caracteres: 2 letras y 10 números o letras (ej. IE00B4L5Y983).</div>}
          {live && valN>0 && <div className="goal-preview">Con el precio de ahora ({fmt2(live.priceEUR)}) son unas <b className="num">{(valN/live.priceEUR).toLocaleString('es-ES',{maximumFractionDigits:3})}</b> participaciones. A partir de aquí el valor se actualiza solo.</div>}
          <button className="btn btn-primary" disabled={!canSave} onClick={submit}>{isEdit ? 'Guardar cambios' : 'Añadir a mi cartera'}</button>
        </>
      )}
      {onDelete && <button className="btn btn-ghost" style={{color:'var(--danger)'}} onClick={onDelete}>Eliminar de la cartera</button>}
      <div className="data-hint" style={{marginTop:12}}>Los importes se guardan solo en tu móvil.</div>
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

function AISettings(){
  const [key, setKeyState] = useState(getAIKey());
  const [open, setOpen] = useState(false);
  if (open) return <AIKeyModal onClose={()=>setOpen(false)} onConnected={()=>{ setKeyState(getAIKey()); setOpen(false); }}/>;
  return key ? (
    <div className="ai-status">
      <div><b>Activada</b><div className="data-status-sub">Modelo: {getAIModel() || 'automático'}</div></div>
      <button className="notice-btn" style={{background:'var(--surface-2)', color:'var(--ink)', border:'1px solid var(--line)'}} onClick={()=>{ setAI(''); setKeyState(''); }}>Desconectar</button>
    </div>
  ) : (
    <button className="btn btn-ghost" style={{marginTop:0}} onClick={()=>setOpen(true)}><Icon name="camera"/>Activar lectura de tickets</button>
  );
}

function DataModal({ data, setData, onClose }){
  const [msg, setMsg] = useState(null);
  const [pending, setPending] = useState(null); // datos leídos de un archivo, esperando confirmación
  const [confirmWipe, setConfirmWipe] = useState(false);
  const [showText, setShowText] = useState(false);
  const [importText, setImportText] = useState('');
  const fileRef = useRef(null);
  const age = daysSince(data.meta && data.meta.lastBackup);

  const save = async () => {
    try {
      const how = await shareBackup(data);
      setData(d=>({ ...d, meta:{ ...(d.meta||{}), lastBackup:new Date().toISOString() } }));
      setMsg({ ok:true, text: how==='shared' ? 'Copia guardada' : 'Copia descargada' });
    } catch(e) { if (e && e.name!=='AbortError') setMsg({ ok:false, text:'No se pudo guardar. Prueba con "Copiar como texto".' }); }
  };
  const validate = (parsed) => parsed && Array.isArray(parsed.categories) && Array.isArray(parsed.txns);
  const onFile = (e) => {
    const f = e.target.files && e.target.files[0]; if (!f) return;
    const r = new FileReader();
    r.onload = () => {
      try { const parsed = JSON.parse(r.result); if (!validate(parsed)) throw 0; setPending(parsed); setMsg(null); }
      catch(err){ setMsg({ ok:false, text:'Ese archivo no es una copia de Cimientos.' }); }
    };
    r.readAsText(f); e.target.value = '';
  };
  const applyPending = (parsed) => { setData(backfillKinds(ensurePlan(parsed, thisMonthKey()))); setPending(null); setMsg({ ok:true, text:`Restaurados ${parsed.txns.length} movimientos` }); };
  const importFromText = () => {
    try { const parsed = JSON.parse(importText); if (!validate(parsed)) throw 0; setPending(parsed); }
    catch(e){ setMsg({ ok:false, text:'El texto pegado no es una copia válida.' }); }
  };
  const copyText = async () => {
    try{ await navigator.clipboard.writeText(JSON.stringify(data)); setMsg({ok:true, text:'Copiado al portapapeles'}); }
    catch(e){ setMsg({ok:false, text:'No se pudo copiar.'}); }
  };
  const wipe = () => { setData(d=>({ ...d, txns:[] })); setConfirmWipe(false); setMsg({ ok:true, text:'Movimientos borrados. El plan y las categorías siguen igual.' }); };

  return (
    <Modal title="Tus datos" onClose={onClose}>
      <div className="data-status">
        <div className={`data-dot ${age===null || age>=7 ? 'warn' : 'ok'}`}/>
        <div>
          <div className="data-status-title">{age===null ? 'Sin copia todavía' : age===0 ? 'Última copia: hoy' : `Última copia: hace ${age} ${age===1?'día':'días'}`}</div>
          <div className="data-status-sub">{data.txns.length} movimientos guardados solo en este móvil</div>
        </div>
      </div>

      <button className="btn btn-primary" onClick={save}><Icon name="backup"/>Guardar copia</button>
      <div className="data-hint">Se abre el menú de compartir: guárdala en Archivos, iCloud, Drive o mándatela por WhatsApp.</div>

      <button className="btn btn-ghost" onClick={()=>fileRef.current && fileRef.current.click()}>Restaurar desde un archivo</button>
      <input ref={fileRef} type="file" accept="application/json,.json" style={{display:'none'}} onChange={onFile}/>

      {pending && (
        <div className="confirm-box">
          <div>Esta copia tiene <b>{pending.txns.length} movimientos</b>{pending.meta && pending.meta.exportedAt ? ` (del ${pending.meta.exportedAt.slice(0,10).split('-').reverse().join('/')})` : ''}. Reemplazará todo lo que hay ahora en la app.</div>
          <div className="confirm-actions">
            <button className="btn btn-ghost" style={{marginTop:0}} onClick={()=>setPending(null)}>Cancelar</button>
            <button className="btn btn-primary" onClick={()=>applyPending(pending)}>Restaurar</button>
          </div>
        </div>
      )}

      {msg && <div className="copy-ok" style={{color: msg.ok?'var(--accent)':'var(--danger)'}}>{msg.text}</div>}

      <div className="data-section">Lectura de tickets</div>
      <AISettings/>

      <div className="data-section">Empezar de cero</div>
      {!confirmWipe
        ? <button className="btn btn-ghost" style={{color:'var(--danger)'}} onClick={()=>setConfirmWipe(true)}>Borrar todos los movimientos</button>
        : (
          <div className="confirm-box danger">
            <div>Se borrarán los {data.txns.length} movimientos. Tu plan y tus categorías se quedan. Guarda antes una copia si quieres poder volver atrás.</div>
            <div className="confirm-actions">
              <button className="btn btn-ghost" style={{marginTop:0}} onClick={()=>setConfirmWipe(false)}>Cancelar</button>
              <button className="btn btn-primary danger" onClick={wipe}>Borrar</button>
            </div>
          </div>
        )}

      <button className="link-btn" onClick={()=>setShowText(v=>!v)}>{showText ? 'Ocultar opciones de texto' : 'Copiar o pegar como texto'}</button>
      {showText && (
        <div style={{marginTop:8}}>
          <button className="btn btn-ghost" onClick={copyText}>Copiar como texto</button>
          <textarea value={importText} onChange={e=>setImportText(e.target.value)} placeholder="Pega aquí una copia en texto…" className="data-textarea"/>
          <button className="btn btn-ghost" onClick={importFromText}>Restaurar desde el texto</button>
        </div>
      )}
    </Modal>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
