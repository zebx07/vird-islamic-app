import { useState, useEffect, useRef } from 'react';
import { useLang } from '../App';
import { t } from '../lang';

const DHIKRS = [
  { ar:'سُبْحَانَ اللَّهِ',              en:'SubhanAllah',       t:33  },
  { ar:'الْحَمْدُ لِلَّهِ',              en:'Alhamdulillah',     t:33  },
  { ar:'اللَّهُ أَكْبَرُ',               en:'Allahu Akbar',      t:33  },
  { ar:'لَا إِلَهَ إِلَّا اللَّهُ',     en:'La ilaha illAllah', t:100 },
  { ar:'أَسْتَغْفِرُ اللَّهَ',           en:'Astaghfirullah',    t:100 },
  { ar:'اللَّهُمَّ صَلِّ عَلَى مُحَمَّد',en:'Salawat',           t:10  },
];

const R=90, C=2*Math.PI*R;

export default function Tasbeeh() {
  const { lang } = useLang();
  const [idx,   setIdx]   = useState(0);
  const [count, setCount] = useState(0);
  const [total, setTotal] = useState(0);
  const [bump,  setBump]  = useState(false);
  const [flash, setFlash] = useState(false);
  const key = useRef(0);

  const d      = DHIKRS[idx];
  const inSet  = count % d.t;
  const sets   = Math.floor(count / d.t);
  const pct    = inSet / d.t;
  const offset = C * (1 - pct);

  const tap = () => {
    const n = count + 1;
    setCount(n); setTotal(t => t+1);
    key.current++;
    setBump(true); setTimeout(()=>setBump(false), 180);
    if (n % d.t === 0) { setFlash(true); setTimeout(()=>setFlash(false), 800); }
  };

  useEffect(() => {
    const h = e => { if (e.code==='Space') { e.preventDefault(); tap(); } };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [count, idx]);

  return (
    <div className="tasbeeh-wrap">
      <div className="tasbeeh-dhikr-display au">{d.ar}</div>
      <div className="tasbeeh-en au d1">{d.en}</div>

      <div className="preset-row au d1">
        {DHIKRS.map((x,i) => (
          <button key={i} className={`preset-pill${idx===i?' on':''}`} onClick={() => { setIdx(i); setCount(0); }}>
            {x.en}
          </button>
        ))}
      </div>

      {/* Animated SVG ring */}
      <div className="au d2">
        <div className="tasbeeh-ring" onClick={tap} style={{ position:'relative', width:220, height:220 }}>
          <svg width={220} height={220} viewBox="0 0 220 220">
            <circle cx={110} cy={110} r={R} fill="none" stroke="var(--border)" strokeWidth={16} />
            <circle cx={110} cy={110} r={R} fill="none"
              stroke={flash ? 'var(--gold)' : 'var(--green-dark)'}
              strokeWidth={16} strokeLinecap="round"
              strokeDasharray={C} strokeDashoffset={offset}
              transform="rotate(-90 110 110)"
              style={{ transition:'stroke-dashoffset 0.3s ease, stroke 0.4s' }}
            />
            {/* Background fill */}
            <circle cx={110} cy={110} r={72} fill="var(--surface)" />
          </svg>
          <div className="tasbeeh-inner">
            <div key={key.current} className={`tasbeeh-count${bump?' bump':''}`}
              style={{ color: flash ? 'var(--gold)':'var(--green-dark)' }}>
              {inSet === 0 ? (sets > 0 ? d.t : 0) : inSet}
            </div>
            {sets > 0 && <div className="tasbeeh-sets">×{sets} complete</div>}
            <div style={{ fontSize:11, color:'var(--text-muted)', marginTop:4 }}>{t('tapToCount', lang)}</div>
          </div>
        </div>
      </div>

      <div className="counter-info au d3">{d.t - inSet} {t('more_left', lang)} {d.t}</div>

      {flash && (
        <div style={{ background:'var(--green-dark)', color:'#FFF', borderRadius:16, padding:'14px 24px', textAlign:'center', marginBottom:12, animation:'scaleIn 0.3s ease' }}>
          <div style={{ fontSize:22 }}>🎉 {t('mashallah', lang)}</div>
          <div style={{ fontSize:13, marginTop:4, opacity:0.9 }}>{sets} {t('completeSet', lang)} · {count} {t('total', lang)}</div>
        </div>
      )}

      <div className="tasbeeh-stats au d3">
        {[[t('session',lang), count],[t('sets',lang), sets],[t('total',lang), total]].map(([l,v])=>(
          <div key={l} className="stat-box">
            <div className="stat-n">{v}</div>
            <div className="stat-l">{l}</div>
          </div>
        ))}
      </div>

      <button className="au d4" onClick={() => setCount(0)}
        style={{ background:'none', border:'1.5px solid var(--border)', color:'var(--text-muted)', fontSize:13, cursor:'pointer', padding:'9px 22px', borderRadius:10, fontFamily:'inherit', transition:'all 0.2s' }}>
        {t('reset', lang)}
      </button>
    </div>
  );
}
