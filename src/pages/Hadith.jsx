import { useState } from 'react';
import { hadithCollections } from '../data/hadiths';
import { useLang } from '../App';
import { t } from '../lang';

export default function Hadith() {
  const { lang } = useLang();
  const [activeTab, setActiveTab] = useState('bukhari');
  const [search,    setSearch]    = useState('');
  const [expanded,  setExpanded]  = useState(null);

  const col = hadithCollections[activeTab];
  const filtered = col.hadiths.filter(h =>
    h.english.toLowerCase().includes(search.toLowerCase()) ||
    h.arabic.includes(search) ||
    h.narrator.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page">
      <div className="flex-between au" style={{ marginBottom:16 }}>
        <div>
          <h2 style={{ fontSize:22, fontWeight:900, color:'var(--text-primary)' }}>{t('hadithTitle', lang)}</h2>
          <div style={{ fontSize:13, color:'var(--text-muted)' }}>{t('hadithSub', lang)}</div>
        </div>
        <div style={{ fontFamily:"'Amiri',serif", fontSize:26, color:'var(--green-dark)' }}>{col.arabic}</div>
      </div>

      <div className="tabs au d1">
        {Object.entries(hadithCollections).map(([k, c]) => (
          <button key={k} className={`tab${activeTab===k?' active':''}`} onClick={() => { setActiveTab(k); setExpanded(null); setSearch(''); }}>
            {c.name}
          </button>
        ))}
      </div>

      <div className="search-wrap au d2">
        <span className="search-icon">🔍</span>
        <input placeholder={t('search', lang)} value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      {filtered.map((h, i) => (
        <div key={h.id} className="hadith-card au" style={{ animationDelay:`${Math.min(i,8)*0.05}s` }}>
          <div className="hadith-ar">{h.arabic}</div>
          <div className="hadith-en" style={{ display: expanded===i ? 'block' : '-webkit-box', WebkitLineClamp: expanded===i ? 'unset' : 3, WebkitBoxOrient:'vertical', overflow: expanded===i ? 'visible' : 'hidden' }}>
            {h.english}
          </div>
          {h.english.length > 180 && (
            <button onClick={() => setExpanded(expanded===i ? null : i)}
              style={{ background:'none', border:'none', color:'var(--green-dark)', fontSize:13, fontWeight:700, cursor:'pointer', padding:'6px 0', fontFamily:'inherit' }}>
              {expanded===i ? t('showLess', lang) : t('readMore', lang)}
            </button>
          )}
          <div className="flex-between mt-8">
            <span className="tag">{h.reference}</span>
            <span className="hadith-narrator">— {h.narrator}</span>
          </div>
        </div>
      ))}

      {filtered.length === 0 && (
        <div style={{ textAlign:'center', padding:40, color:'var(--text-muted)' }}>
          <div style={{ fontSize:40, marginBottom:8 }}>🔍</div>
          <p style={{ fontSize:15, fontWeight:600 }}>{t('search', lang).replace('...','')}</p>
        </div>
      )}
    </div>
  );
}
