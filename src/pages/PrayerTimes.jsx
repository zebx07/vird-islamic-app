import { useState, useEffect } from 'react';
import { useLang } from '../App';
import { t } from '../lang';

const PRAYERS = [
  { key:'Fajr',    name:'Fajr',    ar:'فجر',   icon:'🌙' },
  { key:'Sunrise', name:'Sunrise', ar:'شروق',  icon:'🌅' },
  { key:'Dhuhr',   name:'Dhuhr',   ar:'ظهر',   icon:'☀️' },
  { key:'Asr',     name:'Asr',     ar:'عصر',   icon:'🌤️' },
  { key:'Maghrib', name:'Maghrib', ar:'مغرب',  icon:'🌇' },
  { key:'Isha',    name:'Isha',    ar:'عشاء',  icon:'🌃' },
];

const METHODS = [
  { id:1, name:'University of Karachi'},
  { id:3, name:'Muslim World League'  },
  { id:4, name:'Umm Al-Qura (Saudi)'  },
  { id:2, name:'ISNA (North America)' },
  { id:5, name:'Egyptian Authority'   },
];

function fmt(t) {
  if (!t) return '--:--';
  const [h, m] = t.split(':').map(Number);
  return `${h%12||12}:${String(m).padStart(2,'0')} ${h>=12?'PM':'AM'}`;
}

export default function PrayerTimes() {
  const { lang } = useLang();
  const [times,  setTimes]  = useState(null);
  const [date,   setDate]   = useState(null);
  const [loc,    setLoc]    = useState('Detecting location...');
  const [method, setMethod] = useState(1);
  const [next,   setNext]   = useState(null);
  const [loading,setLoading]= useState(true);
  const [error,  setError]  = useState(null);

  useEffect(() => { load(); }, [method]);

  function load() {
    setLoading(true); setError(null);
    const today=new Date(), d=today.getDate(), m=today.getMonth()+1, y=today.getFullYear();
    const dateKey = `${y}-${m}-${d}`;
    const cacheKey = `vird_prayer_cache_${dateKey}_m${method}`;

    // Check cache first
    try {
      const cached = JSON.parse(localStorage.getItem(cacheKey));
      if (cached) {
        setTimes(cached.timings); setDate(cached.date); computeNext(cached.timings);
        if (cached.loc) setLoc(cached.loc);
        setLoading(false);
        return;
      }
    } catch {}

    navigator.geolocation?.getCurrentPosition(
      async ({coords}) => {
        try {
          // Use cached location or fetch from Nominatim
          const cachedLoc = localStorage.getItem('vird_location');
          let geoPromise = null;
          if (!cachedLoc) {
            geoPromise = fetch(`https://nominatim.openstreetmap.org/reverse?lat=${coords.latitude}&lon=${coords.longitude}&format=json`).catch(()=>null);
          }

          const r = await fetch(`https://api.aladhan.com/v1/timings/${d}-${m}-${y}?latitude=${coords.latitude}&longitude=${coords.longitude}&method=${method}&adjustment=-1`);
          const j=await r.json();
          if(j.data){
            setTimes(j.data.timings); setDate(j.data.date); computeNext(j.data.timings);
            let locName = '';
            if (cachedLoc) {
              locName = cachedLoc;
            } else if (geoPromise) {
              const geo = await geoPromise;
              if(geo){
                const g=await geo.json().catch(()=>null);
                const a=g?.address;
                locName = a?.neighbourhood||a?.suburb||a?.quarter||a?.city_district||a?.city||a?.town||a?.state||'Your Location';
                if (locName && locName !== 'Your Location') localStorage.setItem('vird_location', locName);
              }
            }
            if (!locName) { const tz=j.data.meta?.timezone||''; locName = tz.split('/').pop()?.replace(/_/g,' ')||'Your Location'; }
            setLoc(locName);
            try { localStorage.setItem(cacheKey, JSON.stringify({ timings:j.data.timings, date:j.data.date, loc:locName })); } catch {}
          }
        } catch { setError('Failed to load prayer times'); }
        setLoading(false);
      },
      () => loadByCity(d,m,y)
    );
  }

  async function loadByCity(d,m,y) {
    try {
      const r=await fetch(`https://api.aladhan.com/v1/timingsByCity/${d}-${m}-${y}?city=Mecca&country=SA&method=${method}`);
      const j=await r.json();
      if(j.data){ setTimes(j.data.timings); setDate(j.data.date); setLoc('Mecca (default)'); computeNext(j.data.timings); }
    } catch { setError('Could not load prayer times'); }
    setLoading(false);
  }

  function computeNext(t) {
    const now=new Date(), nowM=now.getHours()*60+now.getMinutes();
    let found=null;
    for(const p of PRAYERS){ if(!t[p.key]) continue; const[h,m]=t[p.key].split(':').map(Number); if(h*60+m>nowM){found=p.key;break;} }
    setNext(found||'Fajr');
  }

  return (
    <div className="page">
      {/* Method selector */}
      <div className="card card-p au" style={{ marginBottom:14 }}>
        <div style={{ fontSize:12, color:'var(--text-muted)', fontWeight:700, marginBottom:6, textTransform:'uppercase', letterSpacing:0.5 }}>{t('calcMethod', lang)}</div>
        <select value={method} onChange={e => setMethod(Number(e.target.value))}
          style={{ width:'100%', padding:'9px 12px', borderRadius:10, border:'1.5px solid var(--border)', background:'var(--surface)', color:'var(--text-primary)', fontSize:14, outline:'none', fontFamily:'inherit' }}>
          {METHODS.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
        </select>
      </div>

      {/* Banner */}
      <div style={{ background:'var(--green-dark)', borderRadius:'var(--r)', padding:20, marginBottom:16, color:'#FFF' }} className="au d1">
        <div style={{ fontSize:13, opacity:0.8, marginBottom:6 }}>📍 {loc}</div>
        {date && (
          <>
            <div style={{ fontSize:20, fontWeight:800 }}>
              {new Date().toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric'})}
            </div>
            <div style={{ fontFamily:"'Amiri',serif", fontSize:18, opacity:0.9, marginTop:4 }}>
              {date.hijri?.day} {date.hijri?.month?.ar} {date.hijri?.year} هـ
            </div>
          </>
        )}
      </div>

      {loading ? (
        <div className="loading"><div className="spinner" /><p>{t('gettingTimes', lang)}</p></div>
      ) : error ? (
        <div style={{ textAlign:'center', padding:20 }}>
          <p style={{ color:'var(--text-secondary)', marginBottom:12, fontSize:14 }}>{error}</p>
          <button className="btn-primary" style={{ width:'auto', padding:'10px 24px' }} onClick={load}>{t('tryAgain', lang)}</button>
        </div>
      ) : (
        PRAYERS.map((p, i) => (
          <div key={p.key} className={`pt-item au${next===p.key?' pt-next':''}`} style={{ animationDelay:`${i*0.06}s` }}>
            <div className="pt-left">
              <div className="pt-icon-wrap">{p.icon}</div>
              <div>
                <div className="pt-name">
                  {t(p.key, lang)}
                  {next===p.key && <span className="badge" style={{ marginLeft:8, fontSize:10 }}>{t('nextPrayer', lang)}</span>}
                </div>
                <div className="pt-ar">{p.ar}</div>
              </div>
            </div>
            <div className="pt-time">{fmt(times?.[p.key])}</div>
          </div>
        ))
      )}

      {/* Qibla */}
      <div className="card card-p au" style={{ marginTop:16, display:'flex', gap:14, alignItems:'center' }}>
        <span style={{ fontSize:36 }}>🧭</span>
        <div>
          <div style={{ fontWeight:700, fontSize:15, color:'var(--text-primary)' }}>{t('qibla', lang)}</div>
          <div style={{ fontSize:13, color:'var(--text-muted)', marginTop:3, lineHeight:1.5 }}>{t('qiblaDesc', lang)}</div>
        </div>
      </div>
    </div>
  );
}
