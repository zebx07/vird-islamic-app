import { useState, useEffect, useRef } from 'react';
import { useLang } from '../App';
import { t } from '../lang';

const POOL = [
  { q:'How many surahs are in the Quran?', a:0, opts:['114','112','116','120'] },
  { q:'Which surah is the longest in the Quran?', a:1, opts:['Al-Imran','Al-Baqarah','An-Nisa','Al-Maidah'] },
  { q:'Which surah is called the heart of the Quran?', a:2, opts:['Al-Fatiha','Al-Ikhlas','Ya-Sin','Al-Kahf'] },
  { q:'How many times is Bismillah mentioned in the Quran?', a:1, opts:['112','114','113','110'] },
  { q:'How many pillars does Islam have?', a:0, opts:['5','4','6','7'] },
  { q:'In which month was the Quran first revealed?', a:2, opts:['Rajab','Shaban','Ramadan','Muharram'] },
  { q:"What is the first word revealed to Prophet Muhammad ﷺ?", a:0, opts:["Iqra' (Read)",'Bismillah','Qul','Alif'] },
  { q:'Which angel brought the revelation to Prophet Muhammad ﷺ?', a:1, opts:['Mikail','Jibril','Israfil','Azrael'] },
  { q:'How many rakaat are in Fajr prayer?', a:0, opts:['2','3','4','5'] },
  { q:'Which prophet built the Kaaba?', a:2, opts:['Muhammad ﷺ','Ismail','Ibrahim','Adam'] },
  { q:'How many times must a Muslim pray each day?', a:1, opts:['3','5','4','7'] },
  { q:'What is the direction Muslims face during prayer?', a:0, opts:['Qibla (Mecca)','Jerusalem','Medina','East'] },
  { q:'Which surah is recited in every rakat of prayer?', a:2, opts:['Al-Ikhlas','Al-Falaq','Al-Fatiha','Al-Baqarah'] },
  { q:'What is the meaning of "Islam"?', a:1, opts:['Faith','Submission / Peace','Prayer','Charity'] },
  { q:'How many months does the Islamic calendar have?', a:0, opts:['12','10','13','11'] },
  { q:'What does "Zakat" mean?', a:2, opts:['Prayer','Fasting','Purification / Charity','Pilgrimage'] },
  { q:'What is the Shahada?', a:0, opts:['Declaration of faith','Daily prayer','Fasting','Pilgrimage'] },
  { q:'In which city was Prophet Muhammad ﷺ born?', a:1, opts:['Medina','Mecca','Taif','Jerusalem'] },
  { q:'What is the Night of Power called?', a:2, opts:["Laylat Al-Isra'",'Laylat Al-Miraj','Laylat Al-Qadr','Laylat Al-Bara'] },
  { q:'Which prophet built the ark?', a:0, opts:['Nuh (Noah)','Ibrahim','Musa','Yunus'] },
  { q:'What is the Islamic month of fasting?', a:1, opts:['Rajab','Ramadan','Shawwal','Muharram'] },
  { q:'How many verses does Surah Al-Fatiha have?', a:0, opts:['7','6','8','5'] },
  { q:"What is the last surah of the Quran?", a:2, opts:['Al-Falaq','Al-Ikhlas','An-Nas','Al-Masad'] },
  { q:'How many days did the creation of the universe take according to Islam?', a:1, opts:['5','6','7','4'] },
  { q:'What is the Islamic term for voluntary charity?', a:0, opts:['Sadaqah','Zakat','Waqf','Fidya'] },
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

  const start = () => {
    const qs = shuffle(POOL).slice(0,10).map(q => ({
      ...q,
      opts: shuffle(q.opts.map((o,i) => ({ text:o, orig:i }))),
    }));
    setQs(qs); setQi(0); setSel(null); setAns([]); setTimer(TIME); setScreen('play');
  };

  useEffect(() => {
    if (screen !== 'play') return;
    clearInterval(intervalRef.current);
    setTimer(TIME);
    intervalRef.current = setInterval(() => {
      setTimer(t => {
        if (t <= 1) { clearInterval(intervalRef.current); doAnswer(null); return TIME; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [qi, screen]);

  function doAnswer(chosenOpt) {
    clearInterval(intervalRef.current);
    const q = questions[qi];
    const correctText = q.opts.find(o => o.orig === q.a)?.text;
    const chosenText  = chosenOpt?.text ?? null;
    setSel(chosenText);
    const isCorrect = chosenText === correctText;
    setTimeout(() => {
      setAns(a => [...a, { question:q.q, chosen:chosenText, correct:correctText, isCorrect }]);
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
        <div style={{ fontSize:13, color:'var(--text-muted)', marginTop:4 }}>{score*10}% correct</div>
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
        <p style={{ fontSize:16, fontWeight:700, color:'var(--text-primary)', lineHeight:1.55, margin:0 }}>{q.q}</p>
      </div>

      <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
        {q.opts.map((opt, i) => {
          const correctText = q.opts.find(o => o.orig === q.a)?.text;
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
