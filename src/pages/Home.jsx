import { useState, useEffect, useRef } from 'react';
import { useLang } from '../App';
import { t, getGreeting, T } from '../lang';

const MOODS = [
  { emoji:'😊', key:'happy',    color:'#27ae60' },
  { emoji:'😢', key:'sad',      color:'#2980b9' },
  { emoji:'😰', key:'anxious',  color:'#8e44ad' },
  { emoji:'🙏', key:'grateful', color:'#d4ac0d' },
  { emoji:'😌', key:'peaceful', color:'#117a65' },
  { emoji:'💔', key:'lonely',   color:'#c0392b' },
];

const MOOD_VERSES = {
  happy: [
    { ar:'لَئِن شَكَرْتُمْ لَأَزِيدَنَّكُمْ', en:'If you are grateful, I will surely increase you [in favour].', ur:'اگر تم شکر ادا کرو تو میں تمہیں اور زیادہ دوں گا۔', tr:'Eğer şükrederseniz, elbette size artırırım.', ref:'Ibrahim 14:7' },
    { ar:'فَبِأَيِّ آلَاءِ رَبِّكُمَا تُكَذِّبَانِ', en:'So which of the favours of your Lord would you deny?', ur:'تو تم اپنے رب کی کون کون سی نعمت جھٹلاؤ گے؟', tr:'Öyleyse Rabbinizin hangi nimetlerini yalanlarsınız?', ref:'Ar-Rahman 55:13' },
    { ar:'وَأَمَّا بِنِعْمَةِ رَبِّكَ فَحَدِّثْ', en:'And as for the favour of your Lord, proclaim it.', ur:'اور اپنے رب کی نعمت کا تذکرہ کرو۔', tr:'Rabbinin nimetini anlat.', ref:'Ad-Duha 93:11' },
  ],
  sad: [
    { ar:'فَإِنَّ مَعَ الْعُسْرِ يُسْرًا', en:'Verily, with hardship comes ease.', ur:'یقیناً ہر تنگی کے ساتھ آسانی ہے۔', tr:'Şüphesiz, güçlükle birlikte kolaylık vardır.', ref:'Ash-Sharh 94:5' },
    { ar:'لَا تَحْزَنْ إِنَّ اللَّهَ مَعَنَا', en:'Do not grieve; indeed Allah is with us.', ur:'غم نہ کرو، بے شک اللہ ہمارے ساتھ ہے۔', tr:'Üzülme, çünkü Allah bizimle beraberdir.', ref:'At-Tawbah 9:40' },
    { ar:'وَلَسَوْفَ يُعْطِيكَ رَبُّكَ فَتَرْضَىٰ', en:'And your Lord is going to give you, and you will be satisfied.', ur:'اور عنقریب تمہارا رب تمہیں اتنا دے گا کہ تم راضی ہو جاؤ گے۔', tr:'Rabbin sana verecek ve sen razı olacaksın.', ref:'Ad-Duha 93:5' },
  ],
  anxious: [
    { ar:'وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ', en:'Whoever relies upon Allah — He will be sufficient for him.', ur:'جو اللہ پر بھروسہ کرے، وہ اس کے لیے کافی ہے۔', tr:'Kim Allah\'a tevekkül ederse, Allah ona yeter.', ref:'At-Talaq 65:3' },
    { ar:'لَا تَخَفْ إِنَّنِي مَعَكُمَا أَسْمَعُ وَأَرَىٰ', en:'Fear not. Indeed, I am with you both; I hear and I see.', ur:'ڈرو نہیں، میں تمہارے ساتھ ہوں، سنتا اور دیکھتا ہوں۔', tr:'Korkmayın, Ben sizinleyim, duyar ve görürüm.', ref:'Taha 20:46' },
    { ar:'حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ', en:'Sufficient for us is Allah, and He is the best Disposer of affairs.', ur:'ہمیں اللہ کافی ہے اور وہ بہترین کارساز ہے۔', tr:'Allah bize yeter, O ne güzel vekildir.', ref:'Al-Imran 3:173' },
  ],
  grateful: [
    { ar:'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ', en:'All praise is due to Allah, Lord of all the worlds.', ur:'تمام تعریف اللہ کے لیے ہے جو تمام جہانوں کا رب ہے۔', tr:'Hamd, alemlerin Rabbi Allah\'a aittir.', ref:'Al-Fatihah 1:2' },
    { ar:'وَإِن تَعُدُّوا نِعْمَةَ اللَّهِ لَا تُحْصُوهَا', en:'And if you should count the favours of Allah, you could not enumerate them.', ur:'اور اگر تم اللہ کی نعمتیں گنو تو شمار نہیں کر سکتے۔', tr:'Allah\'ın nimetlerini saymaya kalksanız sayamazsınız.', ref:'An-Nahl 16:18' },
    { ar:'رَبِّ أَوْزِعْنِي أَنْ أَشْكُرَ نِعْمَتَكَ', en:'My Lord, enable me to be grateful for Your favour.', ur:'اے میرے رب! مجھے توفیق دے کہ میں تیری نعمت کا شکر ادا کروں۔', tr:'Rabbim, bana nimetine şükretmeyi ilham et.', ref:'An-Naml 27:19' },
  ],
  peaceful: [
    { ar:'أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ', en:'Verily, in the remembrance of Allah do hearts find rest.', ur:'یاد رکھو! اللہ کی یاد سے دلوں کو سکون ملتا ہے۔', tr:'Bilin ki, kalpler ancak Allah\'ın zikriyle huzur bulur.', ref:'Ar-Ra\'d 13:28' },
    { ar:'هُوَ الَّذِي أَنزَلَ السَّكِينَةَ فِي قُلُوبِ الْمُؤْمِنِينَ', en:'It is He who sent down tranquility into the hearts of the believers.', ur:'وہی ہے جس نے مومنوں کے دلوں میں سکینت اتاری۔', tr:'Müminlerin kalplerine huzur indiren O\'dur.', ref:'Al-Fath 48:4' },
    { ar:'سَلَامٌ قَوْلًا مِّن رَّبٍّ رَّحِيمٍ', en:'Peace — a word from a Merciful Lord.', ur:'سلام ہے — رحیم رب کی طرف سے۔', tr:'Merhametli Rabbin sözü olarak selam.', ref:'Ya-Sin 36:58' },
  ],
  lonely: [
    { ar:'وَنَحْنُ أَقْرَبُ إِلَيْهِ مِنْ حَبْلِ الْوَرِيدِ', en:'We are closer to him than his jugular vein.', ur:'ہم اس کی شہ رگ سے بھی زیادہ قریب ہیں۔', tr:'Biz ona şah damarından daha yakınız.', ref:'Qaf 50:16' },
    { ar:'إِنَّ اللَّهَ مَعَ الصَّابِرِينَ', en:'Indeed, Allah is with the patient.', ur:'بے شک اللہ صبر کرنے والوں کے ساتھ ہے۔', tr:'Şüphesiz Allah sabredenlerle beraberdir.', ref:'Al-Baqarah 2:153' },
    { ar:'وَهُوَ مَعَكُمْ أَيْنَ مَا كُنتُمْ', en:'And He is with you wherever you are.', ur:'اور وہ تمہارے ساتھ ہے تم جہاں بھی ہو۔', tr:'Nerede olursanız olun, O sizinle beraberdir.', ref:'Al-Hadid 57:4' },
  ],
};

const PRAYERS = ['Fajr','Sunrise','Dhuhr','Asr','Maghrib','Isha'];
const P_ICON  = { Fajr:'🌙', Sunrise:'🌅', Dhuhr:'☀️', Asr:'🌤️', Maghrib:'🌇', Isha:'🌃' };

function fmt(time) {
  if (!time) return '--:--';
  const [h, m] = time.split(':').map(Number);
  return `${h%12||12}:${String(m).padStart(2,'0')} ${h>=12?'PM':'AM'}`;
}

function heroBg() {
  const h = new Date().getHours();
  if (h >= 4  && h < 7)  return 'linear-gradient(160deg,#1a1a3e,#2d1b69)';
  if (h >= 7  && h < 12) return 'linear-gradient(160deg,#145A32,#27ae60)';
  if (h >= 12 && h < 17) return 'linear-gradient(160deg,#0d2818,#145A32)';
  if (h >= 17 && h < 20) return 'linear-gradient(160deg,#7b341e,#c05621)';
  return 'linear-gradient(160deg,#0d0d1a,#1a1a3e)';
}

const FEATURES = [
  { icon:'📖', key:'quran',  page:'quran',   color:'#145A32' },
  { icon:'💬', key:'hadith', page:'hadith',  color:'#1a5276' },
  { icon:'🤲', key:'duas',   page:'duas',    color:'#6c3483' },
  { icon:'📿', key:'tasbeeh',page:'dhikr',   color:'#117a65' },
  { icon:'🔗', key:'chains', page:'dhikr',   color:'#7d6608' },
  { icon:'✨', key:'names',  page:'dhikr',   color:'#784212' },
  { icon:'🎓', key:'quiz',   page:'quiz',    color:'#1a5276' },
  { icon:'✅', key:'habits', page:'habits',  color:'#145A32' },
];

export default function Home({ setPage }) {
  const { lang } = useLang();
  const [times,  setTimes]  = useState(null);
  const [next,   setNext]   = useState(null);
  const [loc,    setLoc]    = useState('');
  const [countdown, setCd]  = useState('');
  const [hijri,  setHijri]  = useState(null);
  const [mood,       setMood]    = useState(null);
  const [moodVerse,  setMV]      = useState(null);
  const [pickNum,    setPickNum] = useState('');
  const [pickVerse,  setPV]      = useState(null);
  const [pickLoading,setPL]      = useState(false);

  const greeting = getGreeting(lang);
  const salaam   = T.assalamu[lang] || T.assalamu.en;

  useEffect(() => { loadTimes(); }, []);

  useEffect(() => {
    if (!next || !times) return;
    const tick = () => {
      const now = new Date();
      const [h, m] = times[next].split(':').map(Number);
      const target = new Date(); target.setHours(h, m, 0, 0);
      if (target < now) target.setDate(target.getDate()+1);
      const diff = target - now;
      const hh = Math.floor(diff/3600000), mm = Math.floor((diff%3600000)/60000), ss = Math.floor((diff%60000)/1000);
      setCd(`${String(hh).padStart(2,'0')}:${String(mm).padStart(2,'0')}:${String(ss).padStart(2,'0')}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [next, times]);

  async function loadTimes() {
    const d = new Date(), day = d.getDate(), mon = d.getMonth()+1, yr = d.getFullYear();
    const dateKey = `${yr}-${mon}-${day}`;
    const cacheKey = `vird_prayer_cache_${dateKey}`;

    // Check cache first
    try {
      const cached = JSON.parse(localStorage.getItem(cacheKey));
      if (cached) {
        setTimes(cached.timings); setHijri(cached.hijri); findNext(cached.timings);
        if (cached.loc) setLoc(cached.loc);
        return;
      }
    } catch {}

    try {
      const pos = await new Promise((res,rej) => navigator.geolocation?.getCurrentPosition(res, rej, { timeout:5000 }));
      const { latitude, longitude } = pos.coords;

      // Use cached location or fetch from Nominatim
      let locName = '';
      const cachedLoc = localStorage.getItem('vird_location');
      let geoPromise = null;
      if (!cachedLoc) {
        geoPromise = fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`).catch(()=>null);
      }

      const r = await fetch(`https://api.aladhan.com/v1/timings/${day}-${mon}-${yr}?latitude=${latitude}&longitude=${longitude}&method=1&adjustment=-1`);
      const j = await r.json();
      if (j.data) {
        setTimes(j.data.timings); setHijri(j.data.date?.hijri); findNext(j.data.timings);
        if (cachedLoc) {
          locName = cachedLoc;
        } else if (geoPromise) {
          const geo = await geoPromise;
          if (geo) {
            const g = await geo.json().catch(()=>null);
            const a = g?.address;
            locName = a?.neighbourhood||a?.suburb||a?.quarter||a?.city_district||a?.city||a?.town||a?.state||'';
            if (locName) localStorage.setItem('vird_location', locName);
          }
        }
        if (!locName) { const tz=j.data.meta?.timezone||''; locName = tz.split('/').pop()?.replace(/_/g,' ')||''; }
        setLoc(locName);
        try { localStorage.setItem(cacheKey, JSON.stringify({ timings:j.data.timings, hijri:j.data.date?.hijri, loc:locName })); } catch {}
      }
    } catch {
      try {
        const r = await fetch(`https://api.aladhan.com/v1/timingsByCity/${day}-${mon}-${yr}?city=Mecca&country=SA&method=2`);
        const j = await r.json();
        if (j.data) {
          setTimes(j.data.timings); setHijri(j.data.date?.hijri); findNext(j.data.timings); setLoc('Mecca');
          try { localStorage.setItem(cacheKey, JSON.stringify({ timings:j.data.timings, hijri:j.data.date?.hijri, loc:'Mecca' })); } catch {}
        }
      } catch {}
    }
  }

  function findNext(tm) {
    const now = new Date(), nowM = now.getHours()*60+now.getMinutes();
    for (const p of PRAYERS) {
      if (!tm[p]) continue;
      const [h,m] = tm[p].split(':').map(Number);
      if (h*60+m > nowM) { setNext(p); return; }
    }
    setNext('Fajr');
  }

  const h = new Date().getHours();
  const remKey = h < 12 ? 'remMorning' : h < 17 ? 'remNoon' : h < 21 ? 'remEvening' : 'remNight';

  const fetchPickVerse = async () => {
    const n = parseInt(pickNum);
    if (!n || n < 1 || n > 114) return;
    setPL(true); setPV(null);
    try {
      const EDITIONS = { en:'en.pickthall', ur:'ur.jalandhry', tr:'tr.diyanet', ar:'ar.muyassar' };
      const edition = EDITIONS[lang] || 'en.pickthall';
      const cacheKey = `vird_pick_${n}_${lang}`;
      let j;
      try { j = JSON.parse(localStorage.getItem(cacheKey)); } catch {}
      if (!j) {
        const r = await fetch(`https://api.alquran.cloud/v1/surah/${n}/editions/quran-uthmani,${edition}`);
        j = await r.json();
        try { localStorage.setItem(cacheKey, JSON.stringify(j)); } catch {}
      }
      if (j.data?.length >= 2) {
        const ayahs = j.data[0].ayahs;
        const trans = j.data[1].ayahs;
        const idx = Math.floor(Math.random() * ayahs.length);
        setPV({ ar: ayahs[idx].text, tr: trans[idx]?.text, num: ayahs[idx].numberInSurah, surah: j.data[0].englishName });
      }
    } catch {}
    setPL(false);
  };

  return (
    <div style={{ paddingBottom: 24 }}>
      {/* HERO */}
      <div style={{ background:heroBg(), padding:'28px 20px 24px', position:'relative', overflow:'hidden' }}>
        {[...Array(12)].map((_,i) => (
          <div key={i} style={{ position:'absolute', borderRadius:'50%', background:'rgba(255,255,255,0.06)',
            width:i%3===0?80:i%3===1?50:30, height:i%3===0?80:i%3===1?50:30,
            top:`${(i*31)%90}%`, left:`${(i*47)%100}%`, animation:`starTwinkle ${2+i%3}s ease-in-out infinite`, animationDelay:`${i*0.3}s` }}/>
        ))}

        <div style={{ position:'relative', zIndex:1 }}>
          <div style={{ fontSize:13, color:'rgba(255,255,255,0.7)', fontWeight:600, marginBottom:4 }}>{greeting}</div>
          <div style={{ fontFamily:"'Amiri',serif", fontSize:lang==='en'?22:28, color:'#fff', fontWeight:700, marginBottom:2 }}>{salaam}</div>
          {hijri && (
            <div style={{ fontSize:12, color:'rgba(255,255,255,0.6)', marginBottom:16 }}>
              {hijri.day} {hijri.month?.en} {hijri.year} AH
              {lang!=='en' && <span style={{ marginLeft:8, fontFamily:"'Amiri',serif" }}>{hijri.month?.ar}</span>}
            </div>
          )}

          {next && times && (
            <div style={{ background:'rgba(255,255,255,0.12)', backdropFilter:'blur(8px)', borderRadius:16, padding:'14px 18px', display:'flex', justifyContent:'space-between', alignItems:'center', border:'1px solid rgba(255,255,255,0.15)' }}>
              <div>
                <div style={{ fontSize:11, color:'rgba(255,255,255,0.65)', fontWeight:700, textTransform:'uppercase', letterSpacing:1, marginBottom:4 }}>{t('nextPrayer', lang)}</div>
                <div style={{ fontSize:22, fontWeight:900, color:'#fff' }}>{P_ICON[next]} {t(next, lang)}</div>
                <div style={{ fontSize:13, color:'rgba(255,255,255,0.75)', marginTop:3 }}>{fmt(times[next])}</div>
                {loc && <div style={{ fontSize:11, color:'rgba(255,255,255,0.5)', marginTop:2 }}>📍 {loc}</div>}
              </div>
              <div style={{ textAlign:'right' }}>
                <div style={{ fontSize:11, color:'rgba(255,255,255,0.6)', marginBottom:4 }}>{t('timeRemaining', lang)}</div>
                <div style={{ fontFamily:'monospace', fontSize:26, fontWeight:900, color:'var(--gold)', letterSpacing:2 }}>{countdown||'--:--:--'}</div>
                <button onClick={() => setPage('prayer')} style={{ marginTop:8, background:'rgba(255,255,255,0.2)', color:'#fff', border:'none', borderRadius:8, padding:'5px 12px', fontSize:12, fontWeight:700, cursor:'pointer', fontFamily:'inherit' }}>
                  {t('allTimes', lang)}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Islamic greetings bar */}
      <div style={{ background:'var(--green-dark)', padding:'10px 20px', display:'flex', gap:16, overflowX:'auto', scrollbarWidth:'none' }}>
        {[
          { ar:'السَّلَامُ عَلَيْكُمْ',       en:'As-salamu Alaykum' },
          { ar:'جَزَاكَ اللَّهُ خَيْرًا',    en:'JazakAllahu Khayran' },
          { ar:'بَارَكَ اللَّهُ فِيكَ',       en:'BarakAllahu Feek' },
          { ar:'إِنْ شَاءَ اللَّهُ',         en:'In sha Allah' },
          { ar:'الْحَمْدُ لِلَّهِ',          en:'Alhamdulillah' },
          { ar:'مَاشَاءَ اللَّهُ',           en:'MashaAllah' },
          { ar:'تَصَبَّحُ عَلَى خَيْرٍ',      en:'Good Night' },
          { ar:'صَبَاحُ الْخَيْرِ',          en:'Good Morning' },
        ].map((g,i) => (
          <div key={i} style={{ flex:'0 0 auto', textAlign:'center', color:'#fff' }}>
            <div style={{ fontFamily:"'Amiri',serif", fontSize:15, whiteSpace:'nowrap' }}>{g.ar}</div>
            <div style={{ fontSize:10, opacity:0.65, whiteSpace:'nowrap', marginTop:2 }}>{g.en}</div>
          </div>
        ))}
      </div>

      {/* ── HOW ARE YOU FEELING ── */}
      <div style={{ margin:'16px 16px 0', background:'var(--surface)', border:'1.5px solid var(--border)', borderRadius:18, padding:'16px 18px' }} className="au">
        <div style={{ fontSize:14, fontWeight:800, color:'var(--text-primary)', marginBottom:14 }}>
          {t('howAreYou', lang)}
        </div>
        <div style={{ display:'flex', gap:10, justifyContent:'space-between' }}>
          {MOODS.map(m => (
            <button key={m.key} onClick={() => {
              if (mood === m.key) { setMood(null); setMV(null); }
              else { const pool = MOOD_VERSES[m.key]; setMood(m.key); setMV(pool[Math.floor(Math.random()*pool.length)]); }
            }}
              style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:4, padding:'10px 4px', borderRadius:14,
                border:`2px solid ${mood===m.key ? m.color : 'var(--border)'}`,
                background: mood===m.key ? `${m.color}18` : 'var(--surface2)',
                cursor:'pointer', transition:'all 0.2s', fontFamily:'inherit' }}>
              <span style={{ fontSize:22 }}>{m.emoji}</span>
            </button>
          ))}
        </div>
        {mood && moodVerse && (
          <div style={{ marginTop:14, padding:'12px 14px', background:'linear-gradient(135deg,#0d2818,#145A32)', borderRadius:14, color:'#fff', animation:'fadeUp 0.3s ease' }}>
            <div style={{ fontSize:13, color:'var(--gold)', fontWeight:700, marginBottom:6 }}>{t('forYou', lang)}</div>
            <div style={{ fontFamily:"'Amiri',serif", fontSize:22, direction:'rtl', textAlign:'right', lineHeight:1.8, marginBottom:10 }}>
              {moodVerse.ar}
            </div>
            <div style={{ fontSize:13, opacity:0.9, lineHeight:1.6, marginBottom:8 }}>
              {moodVerse[lang] || moodVerse.en}
            </div>
            <div style={{ fontSize:11, opacity:0.6, fontWeight:700 }}>— {moodVerse.ref}</div>
          </div>
        )}
      </div>

      {/* ── DISCOVER A VERSE ── */}
      <div style={{ margin:'14px 16px 0', background:'var(--surface)', border:'1.5px solid var(--border)', borderRadius:18, padding:'16px 18px' }} className="au d1">
        <div style={{ fontSize:14, fontWeight:800, color:'var(--text-primary)', marginBottom:4 }}>📖 {t('verseOfDay', lang)}</div>
        <div style={{ fontSize:12, color:'var(--text-muted)', marginBottom:12 }}>{t('verseOfDaySub', lang)}</div>
        <div style={{ display:'flex', gap:10 }}>
          <input type="number" min="1" max="114" placeholder="1 – 114" value={pickNum}
            onChange={e => setPickNum(e.target.value)}
            onKeyDown={e => e.key==='Enter' && fetchPickVerse()}
            style={{ flex:1, padding:'10px 14px', borderRadius:12, border:'1.5px solid var(--border)', background:'var(--surface2)', color:'var(--text-primary)', fontSize:16, fontWeight:700, outline:'none', fontFamily:'inherit' }}/>
          <button onClick={fetchPickVerse} disabled={pickLoading}
            style={{ padding:'10px 18px', borderRadius:12, background:'var(--green-dark)', color:'#fff', border:'none', fontSize:13, fontWeight:800, cursor:'pointer', fontFamily:'inherit', opacity:pickLoading?0.6:1 }}>
            {pickLoading ? '...' : t('reveal', lang)}
          </button>
        </div>
        {pickVerse && (
          <div style={{ marginTop:14, padding:'12px 14px', background:'linear-gradient(135deg,#0d2818,#145A32)', borderRadius:14, color:'#fff', animation:'fadeUp 0.3s ease' }}>
            <div style={{ fontSize:11, color:'var(--gold)', fontWeight:700, marginBottom:8 }}>
              {t('fromSurah', lang)} {pickVerse.surah} · {t('verse', lang)} {pickVerse.num}
            </div>
            <div style={{ fontFamily:"'Amiri',serif", fontSize:22, direction:'rtl', textAlign:'right', lineHeight:1.8, marginBottom:10 }}>
              {pickVerse.ar}
            </div>
            <div style={{ fontSize:13, opacity:0.9, lineHeight:1.6 }}>{pickVerse.tr}</div>
          </div>
        )}
      </div>

      {/* Features grid */}
      <div style={{ padding:'16px 16px 0' }}>
        <div style={{ fontSize:13, fontWeight:800, color:'var(--text-muted)', textTransform:'uppercase', letterSpacing:1, marginBottom:12 }}>{t('features', lang)}</div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:10 }}>
          {FEATURES.map((f,i) => (
            <button key={i} onClick={() => setPage(f.page)}
              style={{ background:'var(--surface)', border:'1.5px solid var(--border)', borderRadius:16, padding:'14px 8px', display:'flex', flexDirection:'column', alignItems:'center', gap:6, cursor:'pointer', fontFamily:'inherit', transition:'all 0.2s', animation:`fadeUp 0.4s ${i*0.04}s ease both` }}
              onMouseEnter={e => e.currentTarget.style.transform='translateY(-3px)'}
              onMouseLeave={e => e.currentTarget.style.transform='translateY(0)'}>
              <div style={{ width:44, height:44, borderRadius:14, background:`${f.color}22`, border:`1.5px solid ${f.color}44`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:20 }}>{f.icon}</div>
              <div style={{ fontSize:10, fontWeight:700, color:'var(--text-secondary)', textAlign:'center', lineHeight:1.3 }}>{t(f.key, lang)}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Today's prayer schedule */}
      {times && (
        <div style={{ padding:'16px 16px 0' }}>
          <div style={{ fontSize:13, fontWeight:800, color:'var(--text-muted)', textTransform:'uppercase', letterSpacing:1, marginBottom:12 }}>{t('todayPrayersHdr', lang)}</div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:8 }}>
            {PRAYERS.map(p => (
              <div key={p} style={{ background: p===next?'var(--green-dark)':'var(--surface)', border:`1.5px solid ${p===next?'var(--green-dark)':'var(--border)'}`, borderRadius:14, padding:'10px 12px', textAlign:'center' }}>
                <div style={{ fontSize:18, marginBottom:4 }}>{P_ICON[p]}</div>
                <div style={{ fontSize:12, fontWeight:700, color: p===next?'#fff':'var(--text-primary)' }}>{t(p, lang)}</div>
                <div style={{ fontSize:12, color: p===next?'rgba(255,255,255,0.8)':'var(--text-muted)', marginTop:2 }}>{fmt(times[p])}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Daily reminder */}
      <div style={{ margin:'16px', background:'linear-gradient(135deg,#0d2818,#145A32)', borderRadius:16, padding:'16px 18px', color:'#fff' }}>
        <div style={{ fontFamily:"'Amiri',serif", fontSize:20, marginBottom:6, lineHeight:1.6 }}>
          {h < 12 ? 'أَذْكَارُ الصَّبَاحِ' : h < 17 ? 'أَذْكَارُ الظُّهْرِ' : h < 21 ? 'أَذْكَارُ الْمَسَاءِ' : 'أَذْكَارُ اللَّيْلِ'}
        </div>
        <div style={{ fontSize:12, opacity:0.85, marginBottom:12, lineHeight:1.6 }}>{t(remKey, lang)}</div>
        <div style={{ display:'flex', gap:10 }}>
          <button onClick={() => setPage('duas')}
            style={{ flex:1, background:'rgba(255,255,255,0.15)', color:'#fff', border:'1px solid rgba(255,255,255,0.25)', borderRadius:10, padding:'9px', fontSize:12, fontWeight:700, cursor:'pointer', fontFamily:'inherit' }}>
            📿 {t('duas', lang)}
          </button>
          <button onClick={() => setPage('dhikr')}
            style={{ flex:1, background:'var(--gold)', color:'#000', border:'none', borderRadius:10, padding:'9px', fontSize:12, fontWeight:700, cursor:'pointer', fontFamily:'inherit' }}>
            🔗 {t('chains', lang)}
          </button>
        </div>
      </div>
    </div>
  );
}
