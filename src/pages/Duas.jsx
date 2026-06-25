import { useState } from 'react';
import { duasData } from '../data/duas';
import { useLang } from '../App';
import { t } from '../lang';

export default function Duas() {
  const { lang } = useLang();
  const [open,   setOpen]   = useState(0);
  const [search, setSearch] = useState('');

  const filtered = search
    ? duasData.map(c => ({ ...c, duas: c.duas.filter(d => d.title.toLowerCase().includes(search.toLowerCase()) || d.english.toLowerCase().includes(search.toLowerCase()) || d.arabic.includes(search)) })).filter(c => c.duas.length > 0)
    : duasData;

  return (
    <div className="page">
      <div className="flex-between au" style={{ marginBottom:16 }}>
        <div>
          <h2 style={{ fontSize:22, fontWeight:900, color:'var(--text-primary)' }}>{t('duasTitle', lang)}</h2>
          <div style={{ fontSize:13, color:'var(--text-muted)' }}>{t('duasSub', lang)}</div>
        </div>
      </div>

      <div style={{ background:'var(--green-dark)', borderRadius:'var(--r)', padding:18, textAlign:'center', marginBottom:16, color:'#FFF' }} className="au d1">
        <div style={{ fontFamily:"'Amiri',serif", fontSize:24, marginBottom:4 }}>أَدْعِيَة وَأَذْكَار</div>
        <div style={{ fontSize:13, opacity:0.85 }}>
          {lang === 'ar' ? 'اذكروا الله كثيراً — يذكركم' : lang === 'ur' ? 'اللہ کو کثرت سے یاد کرو — وہ تمہیں یاد رکھے گا' : 'Remember Allah often — He remembers you'}
        </div>
      </div>

      <div className="search-wrap au d2">
        <span className="search-icon">🔍</span>
        <input placeholder={t('searchDuas', lang)} value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      {filtered.map((cat, ci) => (
        <div key={cat.id} className="dua-cat au" style={{ animationDelay:`${ci*0.05}s` }}>
          <button className="dua-cat-header" onClick={() => setOpen(open===ci ? -1 : ci)}>
            <div className="dua-cat-left">
              <span className="dua-emoji">{cat.emoji}</span>
              <div>
                <div className="dua-cat-name">{cat.category}</div>
                <div className="dua-cat-count">{cat.duas.length} {lang==='ar'?'أدعية':lang==='ur'?'دعائیں':'duas'}</div>
              </div>
            </div>
            <span className={`dua-chevron${open===ci?' open':''}`}>▼</span>
          </button>

          {open === ci && cat.duas.map((dua, di) => (
            <div key={di} className="dua-item">
              <div className="dua-item-title">{dua.title}</div>
              <div className="dua-arabic">{dua.arabic}</div>
              <div className="dua-transliteration">{dua.transliteration}</div>
              <div className="dua-english">{dua.english}</div>
              <div className="dua-source">📖 {dua.source}</div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
