import { useState, useEffect, useRef } from 'react';
import { surahs, getMeaning, getType } from '../data/surahs';
import { useLang } from '../App';
import { t } from '../lang';

const RECITERS = [
  { id: 'ar.alafasy',           name: 'Mishary Alafasy' },
  { id: 'ar.abdurrahmaansudais',name: 'Sudais'          },
  { id: 'ar.husary',            name: 'Husary'          },
  { id: 'ar.minshawi',          name: 'Minshawi'        },
];

function globalAyahStart(surahNum) {
  return surahs.slice(0, surahNum - 1).reduce((s, x) => s + x.verses, 0);
}

// ── MUSHAF PAGE BROWSER ─────────────────────────────────────────────────────
function MushafPage({ onBack }) {
  const { lang } = useLang();
  const [page,    setPage]    = useState(1);
  const [verses,  setVerses]  = useState([]);
  const [loading, setLoading] = useState(true);
  const inputRef = useRef();

  useEffect(() => {
    setLoading(true);
    fetch(`https://api.alquran.cloud/v1/page/${page}/quran-uthmani`)
      .then(r => r.json())
      .then(d => { setVerses(d.data?.ayahs || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, [page]);

  const go = p => setPage(Math.max(1, Math.min(604, p)));

  return (
    <div className="page">
      <button onClick={onBack} style={{ background:'none', color:'var(--green-dark)', padding:'0 0 14px', border:'none', cursor:'pointer', fontSize:14, fontWeight:700 }}>← Back</button>

      {/* Page nav */}
      <div className="card card-p au" style={{ marginBottom:14 }}>
        <div className="flex-between" style={{ alignItems:'center' }}>
          <button onClick={() => go(page-1)} disabled={page===1}
            style={{ background:'var(--green-dark)', color:'#FFF', border:'none', borderRadius:10, width:40, height:40, fontSize:20, cursor:'pointer', opacity:page===1?0.3:1 }}>‹</button>
          <div style={{ textAlign:'center' }}>
            <div style={{ fontWeight:800, fontSize:16, color:'var(--text-primary)' }}>Page {page} / 604</div>
            <input ref={inputRef} type="number" min="1" max="604" defaultValue={page}
              onKeyDown={e => { if(e.key==='Enter') go(Number(inputRef.current.value)); }}
              style={{ width:70, textAlign:'center', border:'1.5px solid var(--border)', borderRadius:8, padding:'4px 8px', fontSize:13, background:'var(--surface)', color:'var(--text-primary)', fontFamily:'inherit', marginTop:4 }}/>
          </div>
          <button onClick={() => go(page+1)} disabled={page===604}
            style={{ background:'var(--green-dark)', color:'#FFF', border:'none', borderRadius:10, width:40, height:40, fontSize:20, cursor:'pointer', opacity:page===604?0.3:1 }}>›</button>
        </div>
        <div className="progress-bar" style={{ marginTop:10 }}>
          <div className="progress-fill" style={{ width:`${(page/604)*100}%` }}/>
        </div>
      </div>

      {loading ? (
        <div className="loading"><div className="spinner"/><p>{t('loading',lang)}</p></div>
      ) : (
        <div className="card card-p" style={{ lineHeight:2.2 }}>
          {verses.length > 0 && (
            <div style={{ fontSize:11, color:'var(--text-muted)', fontWeight:700, marginBottom:12 }}>
              {verses[0]?.surah?.englishName} — {t('verses',lang)} {verses[0]?.numberInSurah}
            </div>
          )}
          <div style={{ fontFamily:"'Amiri',serif", fontSize:26, direction:'rtl', textAlign:'justify', color:'var(--text-primary)', lineHeight:2.4 }}>
            {verses.map((v, i) => (
              <span key={i}>
                {v.text}
                <span style={{ color:'var(--gold)', fontSize:18, margin:'0 4px' }}>
                  &#x06DD;{v.numberInSurah}
                </span>
                {' '}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Quick jump to surah */}
      <div style={{ marginTop:14 }}>
        <div style={{ fontSize:12, color:'var(--text-muted)', fontWeight:700, marginBottom:8, textTransform:'uppercase' }}>{t('jumpToSurah',lang)}</div>
        <select onChange={e => {
          const s = surahs[Number(e.target.value)-1];
          // approximate page: each surah starts roughly at page (surahNum * 604/114)
          // use known surah start pages
          const SURAH_PAGES = [1,1,2,50,77,102,128,151,177,187,208,221,235,249,262,267,282,293,305,312,322,332,342,350,359,367,377,385,396,404,411,415,418,428,434,440,446,453,458,461,465,469,475,478,481,483,487,489,491,492,495,496,498,500,502,503,504,506,507,508,510,511,511,512,513,514,515,516,517,518,519,519,520,520,521,521,522,523,523,524,524,524,525,525,526,526,527,527,527,528,528,528,529,529,529,530,531,531,531,532,532,533,533,533,534,534,535,535,535,536,536,537,537,537,538,538];
          go(SURAH_PAGES[Number(e.target.value)-1] || 1);
        }} style={{ width:'100%', padding:'10px 14px', borderRadius:10, border:'1.5px solid var(--border)', background:'var(--surface)', color:'var(--text-primary)', fontSize:14, outline:'none', fontFamily:'inherit' }}>
          <option value="">{t('search',lang)}</option>
          {surahs.map(s => <option key={s.number} value={s.number}>{s.number}. {s.name} — {s.arabic}</option>)}
        </select>
      </div>
    </div>
  );
}

// ── SURAH DETAIL ─────────────────────────────────────────────────────────────
function SurahDetail({ surah, onBack }) {
  const { lang } = useLang();
  const [verses,     setVerses]     = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [reciterIdx, setReciterIdx] = useState(0);
  const [playing,    setPlaying]    = useState(null);
  const [mode,       setMode]       = useState('verse'); // 'verse' | 'reading'
  const [error,      setError]      = useState(null);
  const audioRef = useRef(null);
  const reciter  = RECITERS[reciterIdx];

  const stopAudio = () => {
    if (audioRef.current) { audioRef.current.pause(); audioRef.current.src = ''; audioRef.current = null; }
    setPlaying(null);
  };

  useEffect(() => { stopAudio(); }, [reciterIdx]);
  useEffect(() => () => stopAudio(), []);

  const EDITIONS = { en:'en.pickthall', ur:'ur.jalandhry', tr:'tr.diyanet', ar:'ar.muyassar' };

  useEffect(() => {
    setLoading(true); setError(null);
    const edition = EDITIONS[lang] || 'en.pickthall';
    fetch(`https://api.alquran.cloud/v1/surah/${surah.number}/editions/quran-uthmani,${edition}`)
      .then(r => r.json())
      .then(d => {
        if (d.data?.length >= 2) {
          const ar = d.data[0].ayahs, tr = d.data[1].ayahs;
          setVerses(ar.map((a, i) => ({ num: a.numberInSurah, ar: a.text, en: tr[i]?.text || '' })));
        } else { setError('Failed to load verses'); }
        setLoading(false);
      })
      .catch(() => { setError('Network error.'); setLoading(false); });
  }, [surah.number, lang]);

  const playFull = () => {
    if (playing === 'full') { stopAudio(); return; }
    stopAudio();
    setError(null);
    // Use Islamic Network CDN for full surah — same reciter IDs, very reliable
    const url = `https://cdn.islamic.network/quran/audio-surah/128/${reciter.id}/${surah.number}.mp3`;
    const a = new Audio(url);
    a.onerror = () => { setError(`Audio not available for ${reciter.name} — try another reciter`); setPlaying(null); };
    a.onended = () => setPlaying(null);
    a.play().catch(() => { setError('Tap play again'); setPlaying(null); });
    audioRef.current = a;
    setPlaying('full');
  };

  const playAyah = num => {
    if (playing === num) { stopAudio(); return; }
    stopAudio();
    const globalNum = globalAyahStart(surah.number) + num;
    const url = `https://cdn.islamic.network/quran/audio/128/${reciter.id}/${globalNum}.mp3`;
    const a = new Audio(url);
    a.onerror = () => { setError('Ayah audio failed'); setPlaying(null); };
    a.onended = () => setPlaying(null);
    a.play().catch(() => setPlaying(null));
    audioRef.current = a;
    setPlaying(num);
  };

  return (
    <div className="page">
      <button onClick={() => { stopAudio(); onBack(); }} style={{ background:'none', color:'var(--green-dark)', padding:'0 0 14px', border:'none', cursor:'pointer', fontSize:14, fontWeight:700 }}>← {t('quranTitle',lang)}</button>

      <div className="card card-p au" style={{ marginBottom:14 }}>
        <div className="flex-between">
          <div>
            <div style={{ fontSize:20, fontWeight:900, color:'var(--text-primary)' }}>{surah.name}</div>
            <div style={{ fontSize:13, color:'var(--text-muted)', marginTop:3 }}>{getMeaning(surah,lang)} · {surah.verses} {t('verses',lang)} · {getType(surah,lang)}</div>
          </div>
          <div style={{ fontFamily:"'Amiri',serif", fontSize:28, color:'var(--green-dark)' }}>{surah.arabic}</div>
        </div>
      </div>

      {/* Audio bar */}
      <div className="audio-bar au d1">
        <button className={`audio-play-btn${playing==='full'?' playing':''}`} onClick={playFull}>
          {playing === 'full' ? '⏸' : '▶'}
        </button>
        <div className="audio-info">
          <div className="audio-title">{playing === 'full' ? `${t('playing',lang)} — ${reciter.name}` : t('playFull',lang)}</div>
          <select className="reciter-select" value={reciterIdx} onChange={e => setReciterIdx(Number(e.target.value))}>
            {RECITERS.map((r, i) => <option key={r.id} value={i}>{r.name}</option>)}
          </select>
        </div>
        {playing && <button className="audio-stop-btn" onClick={stopAudio}>{t('stop',lang)}</button>}
      </div>

      {/* Mode toggle */}
      <div className="tabs au d1" style={{ marginBottom:14 }}>
        <button className={`tab${mode==='verse'?' active':''}`} onClick={() => setMode('verse')}>{t('verseByVerse',lang)}</button>
        <button className={`tab${mode==='reading'?' active':''}`} onClick={() => setMode('reading')}>{t('readingMode',lang)}</button>
      </div>

      {error && (
        <div style={{ background:'#FFEBEE', border:'1.5px solid #FFCDD2', borderRadius:12, padding:'10px 14px', marginBottom:12, fontSize:13, color:'#C62828', fontWeight:600 }}>⚠️ {error}</div>
      )}

      {surah.number !== 9 && surah.number !== 1 && (
        <div style={{ textAlign:'center', fontFamily:"'Amiri',serif", fontSize:26, color:'var(--green-dark)', marginBottom:14, padding:18, background:'var(--surface)', borderRadius:'var(--r-sm)', border:'1.5px solid var(--border)' }}>
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </div>
      )}

      {loading ? (
        <div className="loading"><div className="spinner"/><p>{t('loadingVerses',lang)}</p></div>
      ) : mode === 'reading' ? (
        /* ── READING MODE: flowing mushaf-style ── */
        <div className="card card-p">
          <div style={{ fontFamily:"'Amiri',serif", fontSize:26, direction:'rtl', textAlign:'justify', color:'var(--text-primary)', lineHeight:2.4 }}>
            {verses.map(v => (
              <span key={v.num}>
                {v.ar}
                <span style={{ color:'var(--gold)', fontSize:18, margin:'0 6px' }}>&#x06DD;{v.num}</span>
                {' '}
              </span>
            ))}
          </div>
          <div style={{ borderTop:'1.5px solid var(--border)', marginTop:20, paddingTop:16 }}>
            <div style={{ fontSize:13, color:'var(--text-muted)', fontWeight:700, marginBottom:10 }}>{t('translation',lang)}</div>
            {verses.map(v => (
              <p key={v.num} style={{ fontSize:14, color:'var(--text-secondary)', marginBottom:10, lineHeight:1.7 }}>
                <span style={{ fontWeight:700, color:'var(--green-dark)', marginRight:6 }}>{v.num}.</span>{v.en}
              </p>
            ))}
          </div>
        </div>
      ) : (
        /* ── VERSE BY VERSE MODE ── */
        verses.map(v => (
          <div key={v.num} className="verse-block au">
            <div className="flex-between" style={{ marginBottom:10 }}>
              <span className="verse-num-badge">{v.num}</span>
              <button onClick={() => playAyah(v.num)}
                style={{ background: playing===v.num?'var(--green-dark)':'var(--surface2)', border:'1.5px solid var(--border)', borderRadius:8, padding:'5px 10px', cursor:'pointer', fontSize:16, color: playing===v.num?'#FFF':'var(--text-muted)', transition:'all 0.2s' }}>
                {playing === v.num ? '⏸' : '🔊'}
              </button>
            </div>
            <div className="verse-ar">{v.ar}</div>
            <div className="verse-en">{v.en}</div>
          </div>
        ))
      )}
    </div>
  );
}

// ── MAIN QURAN PAGE ───────────────────────────────────────────────────────────
export default function Quran() {
  const { lang } = useLang();
  const [selected, setSelected] = useState(null);
  const [mushaf,   setMushaf]   = useState(false);
  const [search,   setSearch]   = useState('');

  if (mushaf)   return <MushafPage onBack={() => setMushaf(false)} />;
  if (selected) return <SurahDetail surah={selected} onBack={() => setSelected(null)} />;

  const filtered = surahs.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.arabic.includes(search) ||
    getMeaning(s,lang).toLowerCase().includes(search.toLowerCase()) ||
    s.meaning.toLowerCase().includes(search.toLowerCase()) ||
    String(s.number).includes(search)
  );

  return (
    <div className="page">
      <div className="flex-between au" style={{ marginBottom:16 }}>
        <div>
          <h2 style={{ fontSize:22, fontWeight:900, color:'var(--text-primary)' }}>{t('quranTitle',lang)}</h2>
          <div style={{ fontSize:13, color:'var(--text-muted)' }}>{t('surahs',lang)} · 604 {t('pageOf',lang)}</div>
        </div>
        <button onClick={() => setMushaf(true)}
          style={{ background:'var(--green-dark)', color:'#FFF', border:'none', borderRadius:12, padding:'8px 14px', fontSize:13, fontWeight:700, cursor:'pointer' }}>
          {t('mushaf',lang)}
        </button>
      </div>

      <div className="search-wrap au d1">
        <span className="search-icon">🔍</span>
        <input placeholder={t('search',lang)} value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      <div>
        {filtered.map((s, i) => (
          <button key={s.number} className="surah-item au" style={{ animationDelay:`${Math.min(i,10)*0.04}s` }} onClick={() => setSelected(s)}>
            <div className="surah-num">{s.number}</div>
            <div style={{ flex:1 }}>
              <div className="surah-en">{s.name}</div>
              <div className="surah-meta">{getMeaning(s,lang)} · {s.verses} {t('verses',lang)} · {getType(s,lang)}</div>
            </div>
            <div className="surah-ar">{s.arabic}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
