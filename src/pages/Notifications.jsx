import { useState, useEffect } from 'react';
import { useLang } from '../App';
import { t } from '../lang';

const REMINDERS = [
  { id:'fajr',    label:'Fajr Prayer',       ar:'الفجر',   icon:'🌙', time:'05:00', default:true  },
  { id:'dhuhr',   label:'Dhuhr Prayer',      ar:'الظهر',   icon:'☀️', time:'13:00', default:true  },
  { id:'asr',     label:'Asr Prayer',        ar:'العصر',   icon:'🌤️', time:'16:00', default:true  },
  { id:'maghrib', label:'Maghrib Prayer',    ar:'المغرب',  icon:'🌇', time:'18:30', default:true  },
  { id:'isha',    label:'Isha Prayer',       ar:'العشاء',  icon:'🌃', time:'20:00', default:true  },
  { id:'morning', label:'Morning Azkar',     ar:'أذكار الصباح', icon:'📿', time:'06:00', default:true  },
  { id:'evening', label:'Evening Azkar',     ar:'أذكار المساء', icon:'📿', time:'17:00', default:true  },
  { id:'tahajjud',label:'Tahajjud Reminder', ar:'التهجد',  icon:'⭐', time:'03:00', default:false },
  { id:'quran',   label:'Daily Quran',       ar:'القرآن',  icon:'📖', time:'08:00', default:false },
  { id:'dhikr',   label:'Daily Dhikr',       ar:'الذكر',   icon:'💎', time:'09:00', default:false },
];

const LOAD = () => { try { return JSON.parse(localStorage.getItem('vird_notifs') || 'null') || Object.fromEntries(REMINDERS.map(r => [r.id, { on: r.default, time: r.time }])); } catch { return {}; } };

function scheduleNotif(label, body) {
  if (Notification.permission !== 'granted') return;
  new Notification(label, { body, icon: '/icon.svg', badge: '/icon.svg', tag: label });
}

export default function Notifications() {
  const { lang } = useLang();
  const [perm,    setPerm]    = useState(Notification.permission);
  const [settings,setSettings]= useState(LOAD);
  const [saved,   setSaved]   = useState(false);

  useEffect(() => { localStorage.setItem('vird_notifs', JSON.stringify(settings)); }, [settings]);

  const requestPerm = async () => {
    const p = await Notification.requestPermission();
    setPerm(p);
    if (p === 'granted') {
      scheduleNotif('Vird App 🕌', 'Notifications enabled! You\'ll be reminded for prayers and dhikr. Jazakallahu Khayran.');
    }
  };

  const toggle = id => setSettings(s => ({ ...s, [id]: { ...s[id], on: !s[id]?.on } }));
  const setTime = (id, t) => setSettings(s => ({ ...s, [id]: { ...s[id], time: t } }));

  const testNotif = id => {
    const r = REMINDERS.find(x => x.id === id);
    scheduleNotif(`${r.icon} ${r.label}`, `This is how your ${r.label} reminder will look. ${r.ar}`);
  };

  const save = () => {
    localStorage.setItem('vird_notifs', JSON.stringify(settings));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    if (perm === 'granted') scheduleNotif('Vird ✅', 'Reminder settings saved!');
  };

  return (
    <div className="page">
      <div className="au" style={{ marginBottom:20 }}>
        <h2 style={{ fontSize:22, fontWeight:900, color:'var(--text-primary)' }}>Notifications</h2>
        <div style={{ fontSize:13, color:'var(--text-muted)' }}>{t('notifsSub',lang)}</div>
      </div>

      {/* Permission banner */}
      {perm === 'default' && (
        <div className="card card-p au d1" style={{ background:'linear-gradient(135deg,#0d2818,#145A32)', color:'#FFF', marginBottom:20, textAlign:'center' }}>
          <div style={{ fontSize:36, marginBottom:8 }}>🔔</div>
          <div style={{ fontSize:16, fontWeight:800, marginBottom:6 }}>{t('enableReminders',lang)}</div>
          <div style={{ fontSize:13, opacity:0.9, marginBottom:16, lineHeight:1.6 }}>{t('enableDesc',lang)}</div>
          <button onClick={requestPerm}
            style={{ background:'var(--gold)', color:'#000', border:'none', borderRadius:12, padding:'12px 28px', fontSize:14, fontWeight:800, cursor:'pointer', fontFamily:'inherit', width:'100%' }}>
            {t('allowNotifs',lang)}
          </button>
        </div>
      )}

      {perm === 'denied' && (
        <div style={{ background:'#FFEBEE', border:'1.5px solid #FFCDD2', borderRadius:14, padding:16, marginBottom:20, fontSize:13, color:'#C62828', lineHeight:1.6 }} className="au">
          <b>{t('notifsBlocked',lang)}</b><br/>{t('notifsBlockedFix',lang)}
        </div>
      )}

      {perm === 'granted' && (
        <div style={{ background:'rgba(20,90,50,0.1)', border:'1.5px solid var(--green-mid)', borderRadius:14, padding:'10px 16px', marginBottom:20, fontSize:13, color:'var(--green-dark)', fontWeight:700 }} className="au">
          {t('notifsEnabled',lang)}
        </div>
      )}

      {/* Note about browser notifications */}
      <div style={{ background:'var(--surface2)', borderRadius:12, padding:'12px 16px', marginBottom:20, fontSize:12, color:'var(--text-muted)', lineHeight:1.7, border:'1.5px solid var(--border)' }} className="au d1">
        <b style={{ color:'var(--text-secondary)' }}>📱 How reminders work:</b><br/>
        Reminders appear as browser notifications while the app is open or running in the background.
        For reliable prayer time alerts, <b>install the app</b> on your phone (tap Share → Add to Home Screen on iPhone, or the install banner on Android) and keep the PWA running in the background.
      </div>

      {/* Reminders list */}
      {REMINDERS.map((r, i) => {
        const s = settings[r.id] || { on: r.default, time: r.time };
        return (
          <div key={r.id} className="card card-p au" style={{ marginBottom:10, animationDelay:`${i*0.04}s`, opacity: s.on ? 1 : 0.6, transition:'opacity 0.2s' }}>
            <div className="flex-between" style={{ marginBottom: s.on ? 10 : 0 }}>
              <div style={{ display:'flex', gap:12, alignItems:'center' }}>
                <span style={{ fontSize:22 }}>{r.icon}</span>
                <div>
                  <div style={{ fontWeight:700, fontSize:14, color:'var(--text-primary)' }}>{r.label}</div>
                  <div style={{ fontSize:12, color:'var(--text-muted)', fontFamily:"'Amiri',serif" }}>{r.ar}</div>
                </div>
              </div>
              <div style={{ display:'flex', gap:10, alignItems:'center' }}>
                {perm === 'granted' && s.on && (
                  <button onClick={() => testNotif(r.id)}
                    style={{ background:'none', border:'1.5px solid var(--border)', borderRadius:8, padding:'4px 10px', fontSize:11, color:'var(--text-muted)', cursor:'pointer', fontFamily:'inherit', fontWeight:700 }}>
                    {t('testBtn',lang)}
                  </button>
                )}
                {/* Toggle */}
                <div onClick={() => toggle(r.id)} style={{ width:44, height:24, borderRadius:12, background: s.on ? 'var(--green-dark)' : 'var(--border)', cursor:'pointer', position:'relative', transition:'background 0.25s', flexShrink:0 }}>
                  <div style={{ position:'absolute', top:3, left: s.on ? 22 : 2, width:18, height:18, borderRadius:'50%', background:'#FFF', transition:'left 0.25s', boxShadow:'0 1px 3px rgba(0,0,0,0.3)' }}/>
                </div>
              </div>
            </div>
            {s.on && (
              <div style={{ display:'flex', alignItems:'center', gap:10, paddingTop:8, borderTop:'1px solid var(--border)' }}>
                <span style={{ fontSize:12, color:'var(--text-muted)', fontWeight:700 }}>{t('timeLabel',lang)}</span>
                <input type="time" value={s.time} onChange={e => setTime(r.id, e.target.value)}
                  style={{ padding:'5px 10px', borderRadius:8, border:'1.5px solid var(--border)', background:'var(--surface)', color:'var(--text-primary)', fontSize:13, outline:'none', fontFamily:'inherit' }}/>
              </div>
            )}
          </div>
        );
      })}

      <button className="btn-primary" style={{ marginTop:8 }} onClick={save}>
        {saved ? t('savedSettings',lang) : t('saveSettings',lang)}
      </button>
    </div>
  );
}
