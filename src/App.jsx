import { useState, createContext, useContext } from 'react';
import './index.css';
import Home          from './pages/Home';
import Quran         from './pages/Quran';
import Hadith        from './pages/Hadith';
import Duas          from './pages/Duas';
import PrayerTimes   from './pages/PrayerTimes';
import Tasbeeh       from './pages/Tasbeeh';
import DhikrChains   from './pages/DhikrChains';
import NamesOfAllah  from './pages/NamesOfAllah';
import IslamicQuiz   from './pages/IslamicQuiz';
import HabitTracker  from './pages/HabitTracker';
import Notifications from './pages/Notifications';
import { t, LANGS, getGreeting } from './lang';

export const LangCtx = createContext({ lang:'en', setLang:()=>{} });
export const useLang = () => useContext(LangCtx);

// ── DHIKR HUB (combines Tasbeeh + Chains + Names) ───────────────────────────
function DhikrHub({ setPage }) {
  const [tab, setTab] = useState('tasbeeh');
  const { lang } = useLang();
  return (
    <div style={{ display:'flex', flexDirection:'column', height:'100%' }}>
      <div className="tabs" style={{ margin:'0 16px 0', borderRadius:0, borderBottom:'2px solid var(--border)', background:'var(--bg)', position:'sticky', top:0, zIndex:10 }}>
        {[
          { id:'tasbeeh', label: t('tasbeeh', lang) },
          { id:'chains',  label: t('chains',  lang) },
          { id:'names',   label: t('names',   lang) },
        ].map(tb => (
          <button key={tb.id} className={`tab${tab===tb.id?' active':''}`}
            style={{ flex:1, borderRadius:0, borderBottom: tab===tb.id ? '2px solid var(--green-dark)' : '2px solid transparent', marginBottom:-2 }}
            onClick={() => setTab(tb.id)}>
            {tb.label}
          </button>
        ))}
      </div>
      <div style={{ flex:1, overflowY:'auto' }}>
        {tab === 'tasbeeh' && <Tasbeeh />}
        {tab === 'chains'  && <DhikrChains />}
        {tab === 'names'   && <NamesOfAllah />}
      </div>
    </div>
  );
}

// ── MORE MENU ────────────────────────────────────────────────────────────────
const MORE_ITEMS = [
  { icon:'📚', page:'hadith',  keyLabel:'hadith'  },
  { icon:'🤲', page:'duas',    keyLabel:'duas'     },
  { icon:'🎓', page:'quiz',    keyLabel:'quiz'     },
  { icon:'✅', page:'habits',  keyLabel:'habits'   },
  { icon:'🔔', page:'notifs',  keyLabel:'notifs'   },
];

const MORE_SUB_KEYS = {
  hadith: 'hadithSub',
  duas:   'duasSub',
  quiz:   'quizSub',
  habits: 'habitsSub',
  notifs: 'notifsSub',
};

function MoreMenu({ setPage }) {
  const { lang } = useLang();
  return (
    <div className="page">
      <h2 style={{ fontSize:22, fontWeight:900, color:'var(--text-primary)', marginBottom:4 }}>{t('more', lang)}</h2>
      <p style={{ fontSize:13, color:'var(--text-muted)', marginBottom:20 }}>{t('moreDesc', lang)}</p>
      {MORE_ITEMS.map(it => (
        <button key={it.page} className="more-item au" onClick={() => setPage(it.page)}>
          <div className="more-icon">{it.icon}</div>
          <div style={{ flex:1 }}>
            <div className="more-title">{t(it.keyLabel, lang)}</div>
            <div className="more-sub">{t(MORE_SUB_KEYS[it.page], lang)}</div>
          </div>
          <span className="more-arrow">›</span>
        </button>
      ))}
    </div>
  );
}

// ── LANG PICKER ──────────────────────────────────────────────────────────────
function LangPicker({ onClose }) {
  const { lang, setLang } = useLang();
  return (
    <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.55)', zIndex:300, display:'flex', alignItems:'flex-end' }}
      onClick={e => { if(e.target===e.currentTarget) onClose(); }}>
      <div style={{ background:'var(--bg)', borderRadius:'20px 20px 0 0', padding:24, width:'100%', animation:'fadeUp 0.3s ease', boxSizing:'border-box' }}>
        <div style={{ fontSize:16, fontWeight:800, color:'var(--text-primary)', marginBottom:16 }}>🌐 Language / Dil / لغة</div>
        {Object.entries(LANGS).map(([code, info]) => (
          <button key={code} onClick={() => { setLang(code); onClose(); }}
            style={{ width:'100%', display:'flex', gap:14, alignItems:'center', padding:'14px 16px', background: lang===code ? 'rgba(20,90,50,0.1)' : 'var(--surface)', border:`2px solid ${lang===code?'var(--green-dark)':'var(--border)'}`, borderRadius:14, marginBottom:10, cursor:'pointer', fontFamily:'inherit' }}>
            <span style={{ width:40, height:40, borderRadius:10, background: lang===code?'var(--green-dark)':'var(--surface2)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:14, fontWeight:900, color: lang===code?'#FFF':'var(--text-primary)', flexShrink:0, letterSpacing:-0.5 }}>{info.icon}</span>
            <div style={{ textAlign:'left' }}>
              <div style={{ fontWeight:800, fontSize:15, color:'var(--text-primary)' }}>{info.label}</div>
              <div style={{ fontSize:12, color:'var(--text-muted)' }}>{code === 'en' ? 'English' : code === 'ar' ? 'Arabic · العربية' : code === 'ur' ? 'Urdu · اردو' : 'Turkish · Türkçe'}</div>
            </div>
            {lang === code && <span style={{ marginLeft:'auto', color:'var(--green-dark)', fontWeight:900, fontSize:18 }}>✓</span>}
          </button>
        ))}
      </div>
    </div>
  );
}

// ── BOTTOM NAV ───────────────────────────────────────────────────────────────
const NAV = [
  { id:'home',   icon:<svg viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>,                                                                                          key:'home'   },
  { id:'quran',  icon:<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 14H8v-2h8v2zm0-4H8v-2h8v2zm0-4H8V6h8v2z"/></svg>,  key:'quran'  },
  { id:'prayer', icon:<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>, key:'prayer' },
  { id:'dhikr',  icon:<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/></svg>, key:'dhikr'  },
  { id:'more',   icon:<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>, key:'more'   },
];

const SUB_PAGES = new Set(['hadith','duas','quiz','habits','notifs']);
const TITLES = { hadith:'hadith', duas:'duas', quiz:'quiz', habits:'habits', notifs:'notifs' };

// ── APP ROOT ─────────────────────────────────────────────────────────────────
export default function App() {
  const [page,       setPage]      = useState('home');
  const [theme,      setTheme]     = useState(() => localStorage.getItem('vird_theme') || 'light');
  const [lang,       setLangState] = useState(() => localStorage.getItem('vird_lang')  || 'en');
  const [showLang,   setShowLang]  = useState(false);

  const setLang = code => { setLangState(code); localStorage.setItem('vird_lang', code); document.documentElement.setAttribute('dir', LANGS[code].dir); };
  const toggleTheme = () => { const n = theme==='light'?'dark':'light'; setTheme(n); localStorage.setItem('vird_theme',n); document.documentElement.setAttribute('data-theme',n); };

  // Apply persisted settings on mount
  useState(() => { document.documentElement.setAttribute('data-theme', theme); document.documentElement.setAttribute('dir', LANGS[lang]?.dir||'ltr'); });

  const activeTab = ['home','quran','prayer','dhikr'].includes(page) ? page : 'more';
  const isSub     = SUB_PAGES.has(page);

  const renderPage = () => {
    switch(page) {
      case 'home':    return <Home setPage={setPage} />;
      case 'quran':   return <Quran />;
      case 'prayer':  return <PrayerTimes />;
      case 'dhikr':   return <DhikrHub setPage={setPage} />;
      case 'hadith':  return <Hadith />;
      case 'duas':    return <Duas />;
      case 'quiz':    return <IslamicQuiz />;
      case 'habits':  return <HabitTracker />;
      case 'notifs':  return <Notifications />;
      case 'more':    return <MoreMenu setPage={setPage} />;
      default:        return <Home setPage={setPage} />;
    }
  };

  return (
    <LangCtx.Provider value={{ lang, setLang }}>
      <div className="app">
        {/* Top bar */}
        <header className="topbar">
          {isSub ? (
            <>
              <button className="topbar-back" onClick={() => setPage('more')}>
                {lang==='ar' ? '→' : '←'} {t('back', lang).replace('← ','').replace('→ ','')}
              </button>
              <span className="topbar-title">{t(TITLES[page], lang)}</span>
            </>
          ) : (
            <div className="topbar-brand">
              <div className="logo">🕌</div>
              <h1>Vird<span> App</span></h1>
            </div>
          )}
          <div className="topbar-actions">
            <button className="topbar-btn" onClick={() => setShowLang(true)} title="Language" style={{ fontSize:12, fontWeight:900, minWidth:32, padding:'0 6px' }}>
              {LANGS[lang].icon}
            </button>
            <button className="topbar-btn" onClick={toggleTheme} title="Theme">
              {theme==='light' ? '🌙' : '☀️'}
            </button>
          </div>
        </header>

        {/* Page */}
        <main key={page} style={{ flex:1, overflowY:'auto' }}>{renderPage()}</main>

        {/* Bottom nav */}
        <nav className="bottomnav">
          {NAV.map(n => (
            <button key={n.id} className={`bottomnav-btn${activeTab===n.id?' active':''}`} onClick={() => setPage(n.id)}>
              {n.icon}
              {t(n.key, lang)}
            </button>
          ))}
        </nav>

        {showLang && <LangPicker onClose={() => setShowLang(false)} />}
      </div>
    </LangCtx.Provider>
  );
}
