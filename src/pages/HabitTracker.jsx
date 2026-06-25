import { useState, useEffect } from 'react';
import { useLang } from '../App';
import { t } from '../lang';

const HABITS = [
  { id:'fajr',    labelKey:'habitFajr',    ar:'صلاة الفجر',       icon:'🌙', pts:10 },
  { id:'dhuhr',   labelKey:'habitDhuhr',   ar:'صلاة الظهر',       icon:'☀️', pts:10 },
  { id:'asr',     labelKey:'habitAsr',     ar:'صلاة العصر',       icon:'🌤️', pts:10 },
  { id:'maghrib', labelKey:'habitMaghrib', ar:'صلاة المغرب',      icon:'🌇', pts:10 },
  { id:'isha',    labelKey:'habitIsha',    ar:'صلاة العشاء',      icon:'🌃', pts:10 },
  { id:'quran',   labelKey:'habitQuran',   ar:'قراءة القرآن',      icon:'📖', pts:15 },
  { id:'fasting', labelKey:'habitFasting', ar:'الصيام',            icon:'🌙', pts:20 },
  { id:'sadaqah', labelKey:'habitSadaqah', ar:'الصدقة',            icon:'💚', pts:15 },
  { id:'morning', labelKey:'habitMorning', ar:'أذكار الصباح',      icon:'📿', pts:8  },
  { id:'evening', labelKey:'habitEvening', ar:'أذكار المساء',      icon:'📿', pts:8  },
  { id:'tahajjud',labelKey:'habitTahajjud',ar:'صلاة التهجد',       icon:'⭐', pts:25 },
  { id:'salawat', labelKey:'habitSalawat', ar:'الصلاة على النبي ﷺ', icon:'💎', pts:10 },
];

const dateKey = d => d.toISOString().split('T')[0];
const last7   = () => Array.from({length:7},(_,i)=>{ const d=new Date(); d.setDate(d.getDate()-(6-i)); return d; });

export default function HabitTracker() {
  const { lang } = useLang();
  const [data,    setData]    = useState(() => { try{ return JSON.parse(localStorage.getItem('vird_habits')||'{}'); }catch{ return {}; } });
  const [selDate, setSelDate] = useState(dateKey(new Date()));
  const days = last7();

  useEffect(() => { localStorage.setItem('vird_habits', JSON.stringify(data)); }, [data]);

  const toggle = id => setData(d => ({ ...d, [selDate]: { ...(d[selDate]||{}), [id]: !(d[selDate]||{})[id] } }));

  const day    = data[selDate] || {};
  const done   = HABITS.filter(h => day[h.id]).length;
  const pts    = HABITS.filter(h => day[h.id]).reduce((s,h)=>s+h.pts,0);
  const maxPts = HABITS.reduce((s,h)=>s+h.pts,0);
  const pct    = Math.round((done/HABITS.length)*100);
  const isToday= selDate === dateKey(new Date());

  const streak = (() => {
    let s=0; const now=new Date();
    for(let i=0;i<30;i++){ const d=new Date(now); d.setDate(now.getDate()-i); const k=dateKey(d); const n=HABITS.filter(h=>(data[k]||{})[h.id]).length; if(n>=Math.floor(HABITS.length*0.5))s++; else if(i>0)break; }
    return s;
  })();

  return (
    <div className="page">
      <div className="flex-between au" style={{ marginBottom:8 }}>
        <div>
          <h2 style={{ fontSize:22, fontWeight:900, color:'var(--text-primary)' }}>{t('habitsTitle', lang)}</h2>
          <div style={{ fontSize:13, color:'var(--text-muted)' }}>{isToday ? t('habitsSub', lang) : t('back', lang)}</div>
        </div>
        <div style={{ display:'flex', gap:8 }}>
          <div style={{ textAlign:'center', background:'var(--surface)', border:'1.5px solid var(--border)', borderRadius:12, padding:'6px 14px' }}>
            <div style={{ fontSize:18, fontWeight:900, color:'var(--green-dark)' }}>{streak}</div>
            <div style={{ fontSize:10, color:'var(--text-muted)', fontWeight:700 }}>🔥 {t('streak', lang)}</div>
          </div>
          <div style={{ textAlign:'center', background:'var(--surface)', border:'1.5px solid var(--border)', borderRadius:12, padding:'6px 14px' }}>
            <div style={{ fontSize:18, fontWeight:900, color:'var(--gold)' }}>{pts}</div>
            <div style={{ fontSize:10, color:'var(--text-muted)', fontWeight:700 }}>⭐ {t('pts', lang)}</div>
          </div>
        </div>
      </div>

      {/* 7-day strip */}
      <div style={{ display:'flex', gap:6, overflowX:'auto', marginBottom:16, scrollbarWidth:'none', paddingBottom:4 }} className="au d1">
        {days.map(d => {
          const k=dateKey(d); const n=HABITS.filter(h=>(data[k]||{})[h.id]).length; const sel=k===selDate;
          return (
            <button key={k} onClick={() => setSelDate(k)} style={{
              flex:'0 0 auto', width:50, padding:'8px 4px', borderRadius:12, border:`2px solid ${sel?'var(--green-dark)':'var(--border)'}`,
              cursor:'pointer', textAlign:'center', background:sel?'var(--green-dark)':'var(--surface)',
              color:sel?'#FFF':'var(--text-primary)', transition:'all 0.2s', fontFamily:'inherit'
            }}>
              <div style={{ fontSize:10, opacity:0.8, fontWeight:600 }}>{d.toLocaleDateString(lang==='ar'?'ar':lang==='ur'?'ur':lang==='tr'?'tr':'en',{weekday:'short'})}</div>
              <div style={{ fontSize:16, fontWeight:800, margin:'2px 0' }}>{d.getDate()}</div>
              <div style={{ fontSize:10, color:sel?'rgba(255,255,255,0.7)':'var(--text-muted)' }}>
                {n>0?`${n}/${HABITS.length}`:'—'}
              </div>
            </button>
          );
        })}
      </div>

      {/* Progress */}
      <div className="card card-p au d2" style={{ marginBottom:16 }}>
        <div className="flex-between" style={{ marginBottom:8 }}>
          <div>
            <div style={{ fontSize:15, fontWeight:700, color:'var(--text-primary)' }}>
              {isToday ? t('todayProgress', lang) : new Date(selDate+'T12:00:00').toLocaleDateString(lang==='ar'?'ar':lang==='ur'?'ur':lang==='tr'?'tr':'en',{weekday:'long',month:'short',day:'numeric'})}
            </div>
            <div style={{ fontSize:13, color:'var(--text-muted)', marginTop:2 }}>{done}/{HABITS.length} {t('habits_label',lang)} · {pts}/{maxPts} {t('pts',lang)}</div>
          </div>
          <div style={{ fontSize:32, fontWeight:900, color:'var(--green-dark)' }}>{pct}%</div>
        </div>
        <div className="progress-bar"><div className="progress-fill" style={{ width:`${pct}%` }} /></div>
      </div>

      {HABITS.map(h => {
        const isDone = !!day[h.id];
        return (
          <button key={h.id} className={`habit-btn au${isDone?' done':''}`} onClick={() => toggle(h.id)}>
            <span style={{ fontSize:22 }}>{h.icon}</span>
            <div style={{ flex:1 }}>
              <div className="habit-label">{t(h.labelKey,lang)}</div>
              <div className="habit-ar">{h.ar}</div>
            </div>
            <span className="habit-pts">+{h.pts}</span>
            <div className="habit-check">{isDone && '✓'}</div>
          </button>
        );
      })}

      {pct === 100 && (
        <div style={{ textAlign:'center', padding:20, background:'rgba(20,90,50,0.08)', borderRadius:16, marginTop:8, border:'2px solid var(--green-mid)', animation:'scaleIn 0.4s ease' }}>
          <div style={{ fontSize:44 }}>🏆</div>
          <div style={{ fontSize:18, fontWeight:800, color:'var(--green-dark)', marginTop:8 }}>{t('perfectDay', lang)}</div>
          <div style={{ fontSize:13, color:'var(--text-muted)', marginTop:4 }}>{t('perfectDaySub', lang)}</div>
        </div>
      )}
    </div>
  );
}
