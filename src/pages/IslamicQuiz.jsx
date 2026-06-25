import { useState, useEffect, useRef } from 'react';
import { useLang } from '../App';
import { t } from '../lang';

const POOL = [
  { q:{en:'How many surahs are in the Quran?',ar:'كم عدد سور القرآن؟',ur:'قرآن میں کتنی سورتیں ہیں؟',tr:'Kuran\'da kaç sure vardır?'}, a:0, opts:['114','112','116','120'] },
  { q:{en:'Which surah is the longest in the Quran?',ar:'ما هي أطول سورة في القرآن؟',ur:'قرآن کی سب سے لمبی سورت کون سی ہے؟',tr:'Kuran\'ın en uzun suresi hangisidir?'}, a:1, opts:['Al-Imran','Al-Baqarah','An-Nisa','Al-Maidah'] },
  { q:{en:'Which surah is called the heart of the Quran?',ar:'ما السورة التي تسمى قلب القرآن؟',ur:'قرآن کا دل کس سورت کو کہا جاتا ہے؟',tr:'Kuran\'ın kalbi olarak adlandırılan sure hangisidir?'}, a:2, opts:['Al-Fatiha','Al-Ikhlas','Ya-Sin','Al-Kahf'] },
  { q:{en:'How many times is Bismillah mentioned in the Quran?',ar:'كم مرة ذُكرت البسملة في القرآن؟',ur:'قرآن میں بسم اللہ کتنی مرتبہ آئی ہے؟',tr:'Kuran\'da Besmele kaç kez geçer?'}, a:1, opts:['112','114','113','110'] },
  { q:{en:'How many pillars does Islam have?',ar:'كم عدد أركان الإسلام؟',ur:'اسلام کے کتنے ارکان ہیں؟',tr:'İslam\'ın kaç şartı vardır?'}, a:0, opts:['5','4','6','7'] },
  { q:{en:'In which month was the Quran first revealed?',ar:'في أي شهر نزل القرآن أول مرة؟',ur:'قرآن کس مہینے میں نازل ہوا؟',tr:'Kuran ilk hangi ayda indirildi?'}, a:2, opts:{en:['Rajab','Shaban','Ramadan','Muharram'],ar:['رجب','شعبان','رمضان','محرم'],ur:['رجب','شعبان','رمضان','محرم'],tr:['Recep','Şaban','Ramazan','Muharrem']} },
  { q:{en:"What is the first word revealed to Prophet Muhammad ﷺ?",ar:'ما أول كلمة نزلت على النبي محمد ﷺ؟',ur:'نبی ﷺ پر سب سے پہلا لفظ کون سا نازل ہوا؟',tr:'Hz. Muhammed ﷺ\'e indirilen ilk kelime nedir?'}, a:0, opts:{en:["Iqra' (Read)",'Bismillah','Qul','Alif'],ar:['اقرأ','بسم الله','قل','ألف'],ur:['اقرأ (پڑھو)','بسم اللہ','قل','الف'],tr:['İkra (Oku)','Besmele','Kul','Elif']} },
  { q:{en:'Which angel brought the revelation to Prophet Muhammad ﷺ?',ar:'أي ملك نزل بالوحي على النبي ﷺ؟',ur:'کس فرشتے نے نبی ﷺ پر وحی لائی؟',tr:'Vahyi Hz. Muhammed ﷺ\'e hangi melek getirdi?'}, a:1, opts:{en:['Mikail','Jibril','Israfil','Azrael'],ar:['ميكائيل','جبريل','إسرافيل','عزرائيل'],ur:['میکائیل','جبریل','اسرافیل','عزرائیل'],tr:['Mikail','Cebrail','İsrafil','Azrail']} },
  { q:{en:'How many rakaat are in Fajr prayer?',ar:'كم عدد ركعات صلاة الفجر؟',ur:'نمازِ فجر میں کتنی رکعات ہیں؟',tr:'Sabah namazı kaç rekattır?'}, a:0, opts:['2','3','4','5'] },
  { q:{en:'Which prophet built the Kaaba?',ar:'أي نبي بنى الكعبة؟',ur:'کعبہ کس نبی نے تعمیر کیا؟',tr:'Kabe\'yi hangi peygamber inşa etti?'}, a:2, opts:{en:['Muhammad ﷺ','Ismail','Ibrahim','Adam'],ar:['محمد ﷺ','إسماعيل','إبراهيم','آدم'],ur:['محمد ﷺ','اسماعیل','ابراہیم','آدم'],tr:['Hz. Muhammed ﷺ','Hz. İsmail','Hz. İbrahim','Hz. Adem']} },
  { q:{en:'How many times must a Muslim pray each day?',ar:'كم مرة يجب على المسلم أن يصلي يومياً؟',ur:'مسلمان کو دن میں کتنی بار نماز پڑھنی چاہیے؟',tr:'Bir Müslüman günde kaç vakit namaz kılmalıdır?'}, a:1, opts:['3','5','4','7'] },
  { q:{en:'What is the direction Muslims face during prayer?',ar:'ما الاتجاه الذي يستقبله المسلمون في الصلاة؟',ur:'مسلمان نماز میں کس طرف رخ کرتے ہیں؟',tr:'Müslümanlar namazda hangi yöne döner?'}, a:0, opts:{en:['Qibla (Mecca)','Jerusalem','Medina','East'],ar:['القبلة (مكة)','القدس','المدينة','الشرق'],ur:['قبلہ (مکہ)','یروشلم','مدینہ','مشرق'],tr:['Kıble (Mekke)','Kudüs','Medine','Doğu']} },
  { q:{en:'Which surah is recited in every rakat of prayer?',ar:'ما السورة التي تُقرأ في كل ركعة؟',ur:'ہر رکعت میں کون سی سورت پڑھی جاتی ہے؟',tr:'Namazın her rekatında hangi sure okunur?'}, a:2, opts:['Al-Ikhlas','Al-Falaq','Al-Fatiha','Al-Baqarah'] },
  { q:{en:'What is the meaning of "Islam"?',ar:'ما معنى كلمة "الإسلام"؟',ur:'"اسلام" کا مطلب کیا ہے؟',tr:'"İslam" ne anlama gelir?'}, a:1, opts:{en:['Faith','Submission / Peace','Prayer','Charity'],ar:['إيمان','استسلام / سلام','صلاة','صدقة'],ur:['ایمان','اطاعت / سلامتی','نماز','صدقہ'],tr:['İman','Teslimiyet / Barış','Namaz','Sadaka']} },
  { q:{en:'How many months does the Islamic calendar have?',ar:'كم عدد أشهر التقويم الإسلامي؟',ur:'اسلامی کیلنڈر میں کتنے مہینے ہیں؟',tr:'İslami takvimde kaç ay vardır?'}, a:0, opts:['12','10','13','11'] },
  { q:{en:'What does "Zakat" mean?',ar:'ما معنى "الزكاة"؟',ur:'"زکوٰة" کا مطلب کیا ہے؟',tr:'"Zekat" ne demektir?'}, a:2, opts:{en:['Prayer','Fasting','Purification / Charity','Pilgrimage'],ar:['صلاة','صيام','تطهير / صدقة','حج'],ur:['نماز','روزہ','تزکیہ / صدقہ','حج'],tr:['Namaz','Oruç','Arınma / Sadaka','Hac']} },
  { q:{en:'What is the Shahada?',ar:'ما هي الشهادة؟',ur:'شہادت کیا ہے؟',tr:'Şehadet nedir?'}, a:0, opts:{en:['Declaration of faith','Daily prayer','Fasting','Pilgrimage'],ar:['إعلان الإيمان','الصلاة اليومية','الصيام','الحج'],ur:['اعلانِ ایمان','روزانہ نماز','روزہ','حج'],tr:['İman ikrarı','Günlük namaz','Oruç','Hac']} },
  { q:{en:'In which city was Prophet Muhammad ﷺ born?',ar:'في أي مدينة وُلد النبي محمد ﷺ؟',ur:'نبی ﷺ کس شہر میں پیدا ہوئے؟',tr:'Hz. Muhammed ﷺ hangi şehirde doğdu?'}, a:1, opts:{en:['Medina','Mecca','Taif','Jerusalem'],ar:['المدينة','مكة','الطائف','القدس'],ur:['مدینہ','مکہ','طائف','یروشلم'],tr:['Medine','Mekke','Taif','Kudüs']} },
  { q:{en:'What is the Night of Power called?',ar:'ما اسم ليلة القدر؟',ur:'شبِ قدر کو کیا کہتے ہیں؟',tr:'Kadir Gecesi\'nin adı nedir?'}, a:2, opts:["Laylat Al-Isra'",'Laylat Al-Miraj','Laylat Al-Qadr','Laylat Al-Bara'] },
  { q:{en:'Which prophet built the ark?',ar:'أي نبي بنى السفينة؟',ur:'کس نبی نے کشتی بنائی؟',tr:'Gemiyi hangi peygamber yaptı?'}, a:0, opts:{en:['Nuh (Noah)','Ibrahim','Musa','Yunus'],ar:['نوح','إبراهيم','موسى','يونس'],ur:['نوح','ابراہیم','موسیٰ','یونس'],tr:['Hz. Nuh','Hz. İbrahim','Hz. Musa','Hz. Yunus']} },
  { q:{en:'What is the Islamic month of fasting?',ar:'ما شهر الصيام في الإسلام؟',ur:'اسلام میں روزوں کا مہینہ کون سا ہے؟',tr:'İslam\'da oruç ayı hangisidir?'}, a:1, opts:{en:['Rajab','Ramadan','Shawwal','Muharram'],ar:['رجب','رمضان','شوال','محرم'],ur:['رجب','رمضان','شوال','محرم'],tr:['Recep','Ramazan','Şevval','Muharrem']} },
  { q:{en:'How many verses does Surah Al-Fatiha have?',ar:'كم عدد آيات سورة الفاتحة؟',ur:'سورة الفاتحہ میں کتنی آیات ہیں؟',tr:'Fatiha Suresi kaç ayettir?'}, a:0, opts:['7','6','8','5'] },
  { q:{en:"What is the last surah of the Quran?",ar:'ما آخر سورة في القرآن؟',ur:'قرآن کی آخری سورت کون سی ہے؟',tr:'Kuran\'ın son suresi hangisidir?'}, a:2, opts:['Al-Falaq','Al-Ikhlas','An-Nas','Al-Masad'] },
  { q:{en:'How many days did the creation of the universe take according to Islam?',ar:'كم يوماً استغرق خلق الكون في الإسلام؟',ur:'اسلام کے مطابق کائنات کتنے دنوں میں بنائی گئی؟',tr:'İslam\'a göre evrenin yaratılışı kaç gün sürdü?'}, a:1, opts:['5','6','7','4'] },
  { q:{en:'What is the Islamic term for voluntary charity?',ar:'ما المصطلح الإسلامي للصدقة التطوعية؟',ur:'رضاکارانہ صدقے کی اسلامی اصطلاح کیا ہے؟',tr:'Gönüllü sadakanın İslami terimi nedir?'}, a:0, opts:{en:['Sadaqah','Zakat','Waqf','Fidya'],ar:['صدقة','زكاة','وقف','فدية'],ur:['صدقہ','زکوٰة','وقف','فدیہ'],tr:['Sadaka','Zekat','Vakıf','Fidye']} },
];

const shuffle = a => [...a].sort(() => Math.random()-0.5);
const TIME = 15;
const LETTERS = ['A','B','C','D'];

export default function IslamicQuiz() {
  const { lang } = useLang();
  const [screen,    setScreen]  = useState('start');
  const [questions, setQs]      = useState([]);
  const [qi,        setQi]      = useState(0);
  const [sel,       setSel]     = useState(null);
  const [answers,   setAns]     = useState([]);
  const [timer,     setTimer]   = useState(TIME);
  const intervalRef = useRef(null);

  const getOpts = (opts) => Array.isArray(opts) ? opts : (opts[lang] || opts.en);
  const getQ = (q) => typeof q.q === 'string' ? q.q : (q.q[lang] || q.q.en);

  const start = () => {
    const qs = shuffle(POOL).slice(0,10).map(q => ({
      ...q,
      shuffled: shuffle(getOpts(q.opts).map((o,i) => ({ text:o, orig:i }))),
    }));
    setQs(qs); setQi(0); setSel(null); setAns([]); setTimer(TIME); setScreen('play');
  };

  useEffect(() => {
    if (screen !== 'play') return;
    clearInterval(intervalRef.current);
    setTimer(TIME);
    intervalRef.current = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) { clearInterval(intervalRef.current); doAnswer(null); return TIME; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [qi, screen]);

  function doAnswer(chosenOpt) {
    clearInterval(intervalRef.current);
    const q = questions[qi];
    const correctText = q.shuffled.find(o => o.orig === q.a)?.text;
    const chosenText  = chosenOpt?.text ?? null;
    setSel(chosenText);
    const isCorrect = chosenText === correctText;
    setTimeout(() => {
      setAns(a => [...a, { question:getQ(q), chosen:chosenText, correct:correctText, isCorrect }]);
      setSel(null);
      if (qi + 1 < questions.length) setQi(qi+1);
      else setScreen('review');
    }, 900);
  }

  const score = answers.filter(a => a.isCorrect).length;

  /* ── START SCREEN ── */
  if (screen === 'start') return (
    <div className="page" style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', minHeight:'70vh', textAlign:'center', gap:16 }}>
      <div style={{ fontSize:64, animation:'fadeIn 0.5s ease' }}>🕌</div>
      <h2 style={{ fontSize:26, fontWeight:900, color:'var(--text-primary)', animation:'fadeUp 0.5s ease' }}>{t('quizTitle',lang)}</h2>
      <p style={{ fontSize:14, color:'var(--text-muted)', maxWidth:280, lineHeight:1.6, animation:'fadeUp 0.5s 0.1s ease both' }}>
        {t('quizSub',lang)}
      </p>
      <div style={{ display:'flex', gap:12, flexWrap:'wrap', justifyContent:'center', animation:'fadeUp 0.5s 0.2s ease both' }}>
        {[['❓',t('q10Questions',lang)],['⏱',t('q15s',lang)],['📊',t('qReview',lang)]].map(([icon,label]) => (
          <div key={label} style={{ background:'var(--surface)', border:'1.5px solid var(--border)', borderRadius:14, padding:'10px 16px', fontSize:12, color:'var(--text-secondary)', fontWeight:700 }}>
            <span style={{ marginRight:5 }}>{icon}</span>{label}
          </div>
        ))}
      </div>
      <button className="btn-primary" style={{ width:200, animation:'scaleIn 0.4s 0.3s ease both' }} onClick={start}>{t('startQuiz',lang)}</button>
    </div>
  );

  /* ── REVIEW SCREEN ── */
  if (screen === 'review') return (
    <div className="page">
      <div style={{ textAlign:'center', padding:'20px 0 12px', animation:'fadeUp 0.4s ease' }}>
        <div style={{ fontSize:56 }}>{score>=8?'🏆':score>=6?'🌟':score>=4?'👍':'📚'}</div>
        <h2 style={{ fontSize:24, fontWeight:900, color:'var(--text-primary)', margin:'8px 0 4px' }}>
          {score>=8?t('excellent',lang):score>=6?t('wellDone',lang):score>=4?t('goodTry',lang):t('keepLearning',lang)}
        </h2>
        <div style={{ fontSize:38, fontWeight:900, color:'var(--green-dark)' }}>{score}/10</div>
        <div style={{ fontSize:13, color:'var(--text-muted)', marginTop:4 }}>{score*10}% {t('correct',lang)}</div>
      </div>

      <div className="progress-bar" style={{ margin:'0 0 18px' }}>
        <div className="progress-fill" style={{ width:`${score*10}%` }} />
      </div>

      {answers.map((a,i) => (
        <div key={i} className="card card-p" style={{ marginBottom:10, borderLeft:`4px solid ${a.isCorrect?'var(--green-dark)':'#dc2626'}`, animation:`fadeUp 0.3s ${i*0.04}s ease both` }}>
          <div style={{ fontSize:13, fontWeight:700, color:'var(--text-primary)', marginBottom:6 }}>Q{i+1}. {a.question}</div>
          {a.isCorrect
            ? <div style={{ fontSize:13, color:'var(--green-dark)', fontWeight:700 }}>✓ {a.correct}</div>
            : <>
                <div style={{ fontSize:12, color:'#dc2626' }}>✗ {a.chosen ?? t('timeOut',lang)}</div>
                <div style={{ fontSize:12, color:'var(--green-dark)', fontWeight:700, marginTop:2 }}>✓ {a.correct}</div>
              </>
          }
        </div>
      ))}

      <button className="btn-primary" style={{ marginTop:8 }} onClick={start}>{t('playAgain',lang)}</button>
    </div>
  );

  /* ── PLAY SCREEN ── */
  const q = questions[qi];
  if (!q) return null;
  const timePct = (timer / TIME) * 100;

  return (
    <div className="page">
      <div className="flex-between au" style={{ marginBottom:10 }}>
        <div style={{ fontSize:13, color:'var(--text-muted)', fontWeight:700 }}>{t('question',lang)} {qi+1} / 10</div>
        <div style={{ fontSize:13, fontWeight:800, color:timer<=5?'#dc2626':'var(--green-dark)' }}>⏱ {timer}s</div>
      </div>

      {/* Timer bar */}
      <div className="progress-bar" style={{ marginBottom:16 }}>
        <div style={{ height:'100%', width:`${timePct}%`, background:timer<=5?'#dc2626':'var(--green-dark)', borderRadius:6, transition:'width 1s linear, background 0.3s' }} />
      </div>

      {/* Progress dots */}
      <div style={{ display:'flex', gap:4, marginBottom:18 }} className="au">
        {questions.map((_,i) => (
          <div key={i} style={{ flex:1, height:5, borderRadius:3,
            background:i<qi?'var(--green-dark)':i===qi?'var(--gold)':'var(--border)',
            transition:'background 0.3s' }} />
        ))}
      </div>

      <div className="card card-p au" style={{ marginBottom:18, minHeight:80, display:'flex', alignItems:'center' }}>
        <p style={{ fontSize:16, fontWeight:700, color:'var(--text-primary)', lineHeight:1.55, margin:0 }}>{getQ(q)}</p>
      </div>

      <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
        {q.shuffled.map((opt, i) => {
          const correctText = q.shuffled.find(o => o.orig === q.a)?.text;
          let style = { background:'var(--surface)', border:'2px solid var(--border)', color:'var(--text-primary)' };
          if (sel !== null) {
            if (opt.text === correctText)
              style = { background:'rgba(20,90,50,0.12)', border:'2px solid var(--green-dark)', color:'var(--green-dark)' };
            else if (opt.text === sel)
              style = { background:'rgba(220,38,38,0.10)', border:'2px solid #dc2626', color:'#dc2626' };
          }
          return (
            <button key={i} className="quiz-option au"
              style={{ ...style, animationDelay:`${i*0.07}s`, fontFamily:'inherit', fontWeight:600 }}
              disabled={sel !== null}
              onClick={() => doAnswer(opt)}>
              <span className="quiz-letter">{LETTERS[i]}</span>
              <span style={{ flex:1, textAlign:'left' }}>{opt.text}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
