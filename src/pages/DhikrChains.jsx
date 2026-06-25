import { useState, useEffect } from 'react';
import { useLang } from '../App';
import { t } from '../lang';

const SEED = [
  { id:1, title:'Dua for Gaza', dhikr:'اللَّهُمَّ انْصُرْ إِخْوَانَنَا فِي غَزَّة', english:'Dua for Gaza', desc:'O Allah, grant victory to our brothers and sisters in Gaza. Relieve their suffering and grant them ease.', target:1000, current:0, joined:false, myCount:0, type:'community' },
  { id:2, title:'Darood Ibrahim', dhikr:'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّد', english:'Darood Ibrahim', desc:'The complete Darood we recite in every prayer. The Prophet ﷺ said: Whoever sends blessings upon me once, Allah will send blessings upon him tenfold.', target:1000, current:0, joined:true, myCount:0, type:'community' },
  { id:3, title:'Morning Tasbih', dhikr:'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ', english:'SubhanAllah wa biHamdihi', desc:'SubhanAllah wa biHamdihi — 100 trees are planted in Jannah for each recitation. Light on the tongue, heavy on the scale.', target:100, current:0, joined:false, myCount:0, type:'community' },
  { id:4, title:'Istighfar Chain', dhikr:'أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ', english:'Astaghfirullah', desc:'Seek forgiveness together. The Prophet ﷺ sought forgiveness more than 70 times a day. Open the doors of mercy.', target:1000, current:0, joined:true, myCount:0, type:'community' },
  { id:5, title:'La ilaha illAllah', dhikr:'لَا إِلَهَ إِلَّا اللَّهُ', english:'La ilaha illAllah', desc:'The best dhikr. The Prophet ﷺ said: The best thing I and the prophets before me have said is La ilaha illAllah.', target:1000, current:0, joined:false, myCount:0, type:'community' },
];

const LOAD = () => { try { return JSON.parse(localStorage.getItem('vird_chains') || 'null') || SEED; } catch { return SEED; } };

export default function DhikrChains() {
  const { lang } = useLang();
  const [chains,   setChains]  = useState(LOAD);
  const [modal,    setModal]   = useState(false);
  const [infoId,   setInfoId]  = useState(null);
  const [myTarget, setMyTarget]= useState({});
  const [newTitle, setNT]      = useState('');
  const [newAr,    setNA]      = useState('');
  const [newEn,    setNE]      = useState('');
  const [newDesc,  setND]      = useState('');
  const [newTgt,   setNTgt]    = useState('1000');

  useEffect(() => { localStorage.setItem('vird_chains', JSON.stringify(chains)); }, [chains]);

  const update = fn => setChains(c => fn([...c]));
  const toggle = id => update(c => c.map(x => x.id===id ? {...x, joined:!x.joined} : x));
  const plus   = id => update(c => c.map(x => x.id===id ? {...x, myCount:(x.myCount||0)+1} : x));

  const addChain = () => {
    if (!newTitle.trim()) return;
    setChains(c => [...c, { id:Date.now(), title:newTitle, dhikr:newAr||'ذِكْر', english:newEn||newTitle, desc:newDesc||'Personal dhikr chain', target:parseInt(newTgt)||1000, current:0, joined:true, myCount:0, type:'personal' }]);
    setNT(''); setNA(''); setNE(''); setND(''); setNTgt('1000'); setModal(false);
  };

  const joined = chains.filter(c => c.joined);
  const totalMy = joined.reduce((s,c) => s+(c.myCount||0), 0);

  return (
    <div className="page">
      <div className="flex-between au" style={{ marginBottom:8 }}>
        <div>
          <h2 style={{ fontSize:22, fontWeight:900, color:'var(--text-primary)' }}>{t('chainsTitle',lang)}</h2>
          <div style={{ fontSize:13, color:'var(--text-muted)' }}>{joined.length} {t('joinedCount',lang)} · {totalMy.toLocaleString()} {t('recitationsToday',lang)}</div>
        </div>
        <button className="btn-primary" style={{ width:'auto', padding:'8px 16px', fontSize:13 }} onClick={() => setModal(true)}>+ New</button>
      </div>

      {/* How it works */}
      <div className="card card-p au d1" style={{ background:'linear-gradient(135deg,#0d2818,#145A32)', color:'#FFF', marginBottom:16 }}>
        <div style={{ fontSize:13, fontWeight:800, color:'var(--gold)', marginBottom:8 }}>{t('howItWorks',lang)}</div>
        <div style={{ fontSize:12, lineHeight:1.8, opacity:0.92 }}>
          {t('howLine1',lang)}<br/>
          {t('howLine2',lang)}<br/>
          {t('howLine3',lang)}<br/>
          {t('howLine4',lang)}
        </div>
      </div>

      {/* My progress strip */}
      {joined.length > 0 && (
        <div style={{ display:'flex', gap:10, marginBottom:16, overflowX:'auto', scrollbarWidth:'none', paddingBottom:4 }} className="au d1">
          {joined.map(c => {
            const mt = myTarget[c.id] || 0;
            const mc = c.myCount || 0;
            const mp = mt > 0 ? Math.min(100, Math.round((mc/mt)*100)) : null;
            return (
              <div key={c.id} style={{ flex:'0 0 auto', minWidth:130, background:'var(--surface)', border:'1.5px solid var(--border)', borderRadius:14, padding:'10px 14px' }}>
                <div style={{ fontSize:10, fontWeight:700, color:'var(--text-muted)', marginBottom:4, maxWidth:120, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{c.title}</div>
                <div style={{ fontSize:24, fontWeight:900, color:'var(--green-dark)' }}>{mc.toLocaleString()}</div>
                {mp !== null
                  ? <>
                      <div style={{ fontSize:10, color:'var(--text-muted)', marginBottom:4 }}>{mp}% of {mt}</div>
                      <div className="progress-bar"><div className="progress-fill" style={{ width:`${mp}%` }}/></div>
                    </>
                  : <div style={{ fontSize:10, color:'var(--text-muted)' }}>{t('noTargetSet',lang)}</div>
                }
              </div>
            );
          })}
        </div>
      )}

      {/* Chain cards */}
      {chains.map((c, i) => {
        const mt   = myTarget[c.id] || 0;
        const mc   = c.myCount || 0;
        const pct  = Math.min(100, Math.round((mc/c.target)*100));
        const done = mt > 0 && mc >= mt;
        return (
          <div key={c.id} className="chain-card au" style={{ animationDelay:`${i*0.05}s` }}>
            <div className="flex-between" style={{ alignItems:'flex-start', marginBottom:2 }}>
              <div className="chain-title">{c.title}</div>
              <span style={{ fontSize:10, fontWeight:700, padding:'3px 8px', borderRadius:20, flexShrink:0, marginLeft:8,
                background: c.type==='personal'?'rgba(212,172,13,0.15)':'rgba(20,90,50,0.12)',
                color: c.type==='personal'?'var(--gold)':'var(--green-dark)', border:'1px solid currentColor' }}>
                {c.type==='personal'?t('personal',lang):t('community',lang)}
              </span>
            </div>

            <div className="chain-ar">{c.dhikr}</div>

            <button onClick={() => setInfoId(infoId===c.id ? null : c.id)}
              style={{ background:'none', border:'none', color:'var(--text-muted)', fontSize:12, cursor:'pointer', padding:'0 0 10px', textAlign:'left', fontFamily:'inherit' }}>
              {infoId===c.id ? t('hideInfo',lang) : t('aboutChain',lang)}
            </button>

            {infoId===c.id && (
              <div style={{ fontSize:13, color:'var(--text-secondary)', background:'var(--surface2)', borderRadius:10, padding:'10px 12px', marginBottom:12, lineHeight:1.7, borderLeft:'3px solid var(--green-dark)' }}>
                {c.desc}
              </div>
            )}

            {/* Progress bar */}
            <div className="flex-between" style={{ fontSize:12, marginBottom:4 }}>
              <span style={{ color:'var(--text-muted)', fontWeight:600 }}>{t('myCount',lang)} {mc.toLocaleString()} {t('recitations',lang)}</span>
              <span style={{ fontWeight:800, color:'var(--green-dark)' }}>{pct}%</span>
            </div>
            <div className="chain-bar" style={{ marginBottom:4 }}><div className="chain-fill" style={{ width:`${pct}%` }}/></div>
            <div style={{ fontSize:11, color:'var(--text-muted)', marginBottom:14 }}>{t('communityGoal',lang)} {c.target.toLocaleString()}</div>

            {/* Personal target (only if joined) */}
            {c.joined && (
              <div style={{ display:'flex', gap:8, alignItems:'center', marginBottom:12, background:'var(--surface2)', borderRadius:10, padding:'8px 12px' }}>
                <span style={{ fontSize:12, fontWeight:700, color:'var(--text-muted)', whiteSpace:'nowrap' }}>{t('myTarget',lang)}</span>
                <input type="number" min="0" placeholder="e.g. 100" value={mt||''}
                  onChange={e => setMyTarget(m => ({...m, [c.id]: Number(e.target.value)}))}
                  style={{ flex:1, padding:'5px 8px', borderRadius:8, border:'1.5px solid var(--border)', background:'var(--surface)', color:'var(--text-primary)', fontSize:13, outline:'none', fontFamily:'inherit', maxWidth:90 }}/>
                <span style={{ fontSize:12, fontWeight:700, color:done?'var(--gold)':'var(--text-muted)' }}>
                  {done ? t('targetDone',lang) : `${t('myCount',lang)} ${mc}`}
                </span>
              </div>
            )}

            <div style={{ display:'flex', gap:10, alignItems:'center' }}>
              <button className={c.joined?'btn-joined':'btn-join'} onClick={() => toggle(c.id)}>
                {c.joined ? t('joined',lang) : t('joinChain',lang)}
              </button>
              {c.joined && <button className="btn-plus" onClick={() => plus(c.id)}>{t('recited',lang)}</button>}
            </div>
          </div>
        );
      })}

      {/* Create modal */}
      {modal && (
        <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.6)', zIndex:200, display:'flex', alignItems:'flex-end' }}
          onClick={e => { if(e.target===e.currentTarget) setModal(false); }}>
          <div style={{ background:'var(--bg)', borderRadius:'20px 20px 0 0', padding:24, width:'100%', animation:'fadeUp 0.3s ease', maxHeight:'85vh', overflowY:'auto', boxSizing:'border-box' }}>
            <h3 style={{ fontSize:18, fontWeight:800, color:'var(--text-primary)', marginBottom:6 }}>{t('startChain',lang)}</h3>
            <p style={{ fontSize:13, color:'var(--text-muted)', marginBottom:18, lineHeight:1.6 }}>
              {t('howLine3',lang)}
            </p>
            {[
              [t('chainTitle',lang),   newTitle, setNT,   'text',  t('chainTitlePlh',lang)],
              [t('arabicText',lang),   newAr,    setNA,   'text',  t('chainArPlh',lang)],
              [t('englishName',lang),  newEn,    setNE,   'text',  t('chainEnPlh',lang)],
              [t('description',lang),  newDesc,  setND,   'text',  t('chainDescPlh',lang)],
              [t('goalLabel',lang),    newTgt,   setNTgt, 'number','1000'],
            ].map(([label, val, setter, type, ph]) => (
              <div key={label} style={{ marginBottom:14 }}>
                <label style={{ fontSize:12, fontWeight:700, color:'var(--text-muted)', textTransform:'uppercase', letterSpacing:0.5, display:'block', marginBottom:5 }}>{label}</label>
                <input type={type} placeholder={ph} value={val} onChange={e => setter(e.target.value)}
                  style={{ width:'100%', padding:'10px 14px', borderRadius:10, border:'1.5px solid var(--border)', background:'var(--surface)', color:'var(--text-primary)', fontSize:14, outline:'none', fontFamily:'inherit', boxSizing:'border-box' }}/>
              </div>
            ))}
            <div style={{ display:'flex', gap:10, marginTop:4 }}>
              <button onClick={() => setModal(false)}
                style={{ flex:1, padding:'12px', borderRadius:12, border:'1.5px solid var(--border)', background:'none', color:'var(--text-secondary)', fontWeight:700, cursor:'pointer', fontFamily:'inherit' }}>{t('cancel',lang)}</button>
              <button className="btn-primary" style={{ flex:2 }} onClick={addChain}>{t('createChain',lang)}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
