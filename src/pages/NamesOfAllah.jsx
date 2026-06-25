import { useState } from 'react';
import { useLang } from '../App';
import { t } from '../lang';

const NAMES = [
  {n:1,ar:'الرَّحْمَنُ',la:'Ar-Rahman',me:'The Most Gracious',be:'Recite for mercy and compassion'},
  {n:2,ar:'الرَّحِيمُ',la:'Ar-Raheem',me:'The Most Merciful',be:'For forgiveness and divine mercy'},
  {n:3,ar:'الْمَلِكُ',la:'Al-Malik',me:'The King',be:'For leadership and authority'},
  {n:4,ar:'الْقُدُّوسُ',la:'Al-Quddus',me:'The Most Holy',be:'For purification of heart'},
  {n:5,ar:'السَّلَامُ',la:'As-Salam',me:'The Source of Peace',be:'For peace of mind'},
  {n:6,ar:'الْمُؤْمِنُ',la:'Al-Mumin',me:'The Guardian of Faith',be:'For protection'},
  {n:7,ar:'الْمُهَيْمِنُ',la:'Al-Muhaymin',me:'The Protector',be:'Protection from harm'},
  {n:8,ar:'الْعَزِيزُ',la:'Al-Aziz',me:'The Almighty',be:'For strength and dignity'},
  {n:9,ar:'الْجَبَّارُ',la:'Al-Jabbar',me:'The Compeller',be:'For overcoming hardship'},
  {n:10,ar:'الْمُتَكَبِّرُ',la:'Al-Mutakabbir',me:'The Supreme',be:'For greatness and honor'},
  {n:11,ar:'الْخَالِقُ',la:'Al-Khaliq',me:'The Creator',be:'For new beginnings'},
  {n:12,ar:'الْبَارِئُ',la:'Al-Bari',me:'The Originator',be:'For relief from illness'},
  {n:13,ar:'الْمُصَوِّرُ',la:'Al-Musawwir',me:'The Fashioner',be:'For beauty and form'},
  {n:14,ar:'الْغَفَّارُ',la:'Al-Ghaffar',me:'The Forgiving',be:'Recite often for forgiveness'},
  {n:15,ar:'الْقَهَّارُ',la:'Al-Qahhar',me:'The Dominant',be:'For overcoming enemies'},
  {n:16,ar:'الْوَهَّابُ',la:'Al-Wahhab',me:'The Bestower',be:'For gifts and provisions'},
  {n:17,ar:'الرَّزَّاقُ',la:'Ar-Razzaq',me:'The Provider',be:'For rizq and sustenance'},
  {n:18,ar:'الْفَتَّاحُ',la:'Al-Fattah',me:'The Opener',be:'For opening doors and opportunities'},
  {n:19,ar:'الْعَلِيمُ',la:'Al-Alim',me:'The All-Knowing',be:'For knowledge and wisdom'},
  {n:20,ar:'الْقَابِضُ',la:'Al-Qabid',me:'The Withholder',be:"For understanding God's wisdom"},
  {n:21,ar:'الْبَاسِطُ',la:'Al-Basit',me:'The Expander',be:'For expansion of blessings'},
  {n:22,ar:'الْخَافِضُ',la:'Al-Khafid',me:'The Abaser',be:'For humility'},
  {n:23,ar:'الرَّافِعُ',la:'Ar-Rafi',me:'The Exalter',be:'For elevation of rank'},
  {n:24,ar:'الْمُعِزُّ',la:'Al-Muizz',me:'The Honourer',be:'For honor and respect'},
  {n:25,ar:'الْمُذِلُّ',la:'Al-Mudhill',me:'The Humiliator',be:'For justice against oppressors'},
  {n:26,ar:'السَّمِيعُ',la:'As-Samee',me:'The All-Hearing',be:'Know all duas are heard'},
  {n:27,ar:'الْبَصِيرُ',la:'Al-Baseer',me:'The All-Seeing',be:'For insight and clarity'},
  {n:28,ar:'الْحَكَمُ',la:'Al-Hakam',me:'The Judge',be:'For justice and fair decisions'},
  {n:29,ar:'الْعَدْلُ',la:'Al-Adl',me:'The Just',be:'For fairness and truth'},
  {n:30,ar:'اللَّطِيفُ',la:'Al-Lateef',me:'The Subtle One',be:'For gentleness and provision'},
  {n:31,ar:'الْخَبِيرُ',la:'Al-Khabeer',me:'The Aware',be:'For awareness and insight'},
  {n:32,ar:'الْحَلِيمُ',la:'Al-Haleem',me:'The Forbearing',be:'For patience and self-control'},
  {n:33,ar:'الْعَظِيمُ',la:'Al-Adheem',me:'The Magnificent',be:'For awe and gratitude'},
  {n:34,ar:'الْغَفُورُ',la:'Al-Ghafoor',me:'The Forgiving',be:'For forgiveness of sins'},
  {n:35,ar:'الشَّكُورُ',la:'Ash-Shakoor',me:'The Appreciative',be:'For gratitude and reward'},
  {n:36,ar:'الْعَلِيُّ',la:'Al-Ali',me:'The Most High',be:'For spiritual elevation'},
  {n:37,ar:'الْكَبِيرُ',la:'Al-Kabeer',me:'The Grand',be:'For greatness of spirit'},
  {n:38,ar:'الْحَفِيظُ',la:'Al-Hafeez',me:'The Preserver',be:'For protection and safety'},
  {n:39,ar:'الْمُقِيتُ',la:'Al-Muqeet',me:'The Nourisher',be:'For provision and sustenance'},
  {n:40,ar:'الْحَسِيبُ',la:'Al-Haseeb',me:'The Reckoner',be:'For accountability'},
  {n:41,ar:'الْجَلِيلُ',la:'Al-Jaleel',me:'The Majestic',be:'For majesty and reverence'},
  {n:42,ar:'الْكَرِيمُ',la:'Al-Kareem',me:'The Generous',be:'For generosity and kindness'},
  {n:43,ar:'الرَّقِيبُ',la:'Ar-Raqeeb',me:'The Watchful',be:'Remember Allah watches all'},
  {n:44,ar:'الْمُجِيبُ',la:'Al-Mujeeb',me:'The Responsive',be:'Your duas will be answered'},
  {n:45,ar:'الْوَاسِعُ',la:'Al-Wasi',me:'The All-Encompassing',be:'For abundance and expansion'},
  {n:46,ar:'الْحَكِيمُ',la:'Al-Hakeem',me:'The Wise',be:'For wisdom in decisions'},
  {n:47,ar:'الْوَدُودُ',la:'Al-Wadood',me:'The Loving',be:'For love and compassion'},
  {n:48,ar:'الْمَجِيدُ',la:'Al-Majeed',me:'The Glorious',be:'For glory and honor'},
  {n:49,ar:'الْبَاعِثُ',la:'Al-Baaith',me:'The Resurrector',be:'For new beginnings and revival'},
  {n:50,ar:'الشَّهِيدُ',la:'Ash-Shaheed',me:'The Witness',be:'Allah witnesses everything'},
  {n:51,ar:'الْحَقُّ',la:'Al-Haqq',me:'The Truth',be:'For truth and clarity'},
  {n:52,ar:'الْوَكِيلُ',la:'Al-Wakeel',me:'The Trustee',be:'For reliance and tawakkul'},
  {n:53,ar:'الْقَوِيُّ',la:'Al-Qawiyy',me:'The Strong',be:'For strength and resilience'},
  {n:54,ar:'الْمَتِينُ',la:'Al-Mateen',me:'The Firm',be:'For firmness in faith'},
  {n:55,ar:'الْوَلِيُّ',la:'Al-Waliyy',me:'The Friend',be:'For divine friendship'},
  {n:56,ar:'الْحَمِيدُ',la:'Al-Hameed',me:'The Praiseworthy',be:'For gratitude and praise'},
  {n:57,ar:'الْمُحْصِي',la:'Al-Muhsi',me:'The Reckoner',be:'For accountability'},
  {n:58,ar:'الْمُبْدِئُ',la:'Al-Mubdi',me:'The Originator',be:'For new starts'},
  {n:59,ar:'الْمُعِيدُ',la:'Al-Mueed',me:'The Restorer',be:'For restoration and healing'},
  {n:60,ar:'الْمُحْيِي',la:'Al-Muhyi',me:'The Giver of Life',be:'For life and revival'},
  {n:61,ar:'الْمُمِيتُ',la:'Al-Mumeet',me:'The Taker of Life',be:'Remembrance of death'},
  {n:62,ar:'الْحَيُّ',la:'Al-Hayy',me:'The Ever-Living',be:'For life and vitality'},
  {n:63,ar:'الْقَيُّومُ',la:'Al-Qayyoom',me:'The Self-Subsisting',be:'For independence'},
  {n:64,ar:'الْوَاجِدُ',la:'Al-Wajid',me:'The Finder',be:'For finding what is lost'},
  {n:65,ar:'الْمَاجِدُ',la:'Al-Majid',me:'The Noble',be:'For nobility of character'},
  {n:66,ar:'الْوَاحِدُ',la:'Al-Wahid',me:'The One',be:'For unity and focus'},
  {n:67,ar:'الأَحَدُ',la:'Al-Ahad',me:'The Unique',be:'For sincerity in worship'},
  {n:68,ar:'الصَّمَدُ',la:'As-Samad',me:'The Eternal',be:'Reliance on Allah alone'},
  {n:69,ar:'الْقَادِرُ',la:'Al-Qadir',me:'The Able',be:'For capability and power'},
  {n:70,ar:'الْمُقْتَدِرُ',la:'Al-Muqtadir',me:'The Powerful',be:'For power over affairs'},
  {n:71,ar:'الْمُقَدِّمُ',la:'Al-Muqaddim',me:'The Expediter',be:'For advancement'},
  {n:72,ar:'الْمُؤَخِّرُ',la:'Al-Muakhkhir',me:'The Delayer',be:'Patience with timing'},
  {n:73,ar:'الأَوَّلُ',la:'Al-Awwal',me:'The First',be:'For priority and beginnings'},
  {n:74,ar:'الآخِرُ',la:'Al-Akhir',me:'The Last',be:'For endings and completion'},
  {n:75,ar:'الظَّاهِرُ',la:'Az-Zahir',me:'The Manifest',be:'For clarity'},
  {n:76,ar:'الْبَاطِنُ',la:'Al-Batin',me:'The Hidden',be:'For inner knowledge'},
  {n:77,ar:'الْوَالِي',la:'Al-Wali',me:'The Governor',be:'For governance and order'},
  {n:78,ar:'الْمُتَعَالِ',la:'Al-Mutaali',me:'The Most Exalted',be:'For exaltation'},
  {n:79,ar:'الْبَرُّ',la:'Al-Barr',me:'The Source of Goodness',be:'For kindness'},
  {n:80,ar:'التَّوَّابُ',la:'At-Tawwab',me:'The Acceptor of Repentance',be:'For tawbah'},
  {n:81,ar:'الْمُنْتَقِمُ',la:'Al-Muntaqim',me:'The Avenger',be:'For justice'},
  {n:82,ar:'الْعَفُوُّ',la:'Al-Afuww',me:'The Pardoner',be:'For pardon and ease'},
  {n:83,ar:'الرَّؤُوفُ',la:'Ar-Rauf',me:'The Compassionate',be:'For compassion'},
  {n:84,ar:'مَالِكُ الْمُلْكِ',la:'Malik-ul-Mulk',me:'Owner of All Sovereignty',be:'Ultimate trust in Allah'},
  {n:85,ar:'ذُوالْجَلَالِ',la:'Dhul-Jalal wal-Ikram',me:'Lord of Majesty and Bounty',be:'For majesty'},
  {n:86,ar:'الْمُقْسِطُ',la:'Al-Muqsit',me:'The Equitable',be:'For justice and equality'},
  {n:87,ar:'الْجَامِعُ',la:'Al-Jami',me:'The Gatherer',be:'For unity'},
  {n:88,ar:'الْغَنِيُّ',la:'Al-Ghani',me:'The Self-Sufficient',be:'For independence'},
  {n:89,ar:'الْمُغْنِي',la:'Al-Mughni',me:'The Enricher',be:'For wealth and sufficiency'},
  {n:90,ar:'الْمَانِعُ',la:'Al-Mani',me:'The Preventer',be:'For protection'},
  {n:91,ar:'الضَّارُ',la:'Ad-Darr',me:'The Distresser',be:'Understanding divine tests'},
  {n:92,ar:'النَّافِعُ',la:'An-Nafi',me:'The Propitious',be:'For benefit and profit'},
  {n:93,ar:'النُّورُ',la:'An-Nur',me:'The Light',be:'For guidance and enlightenment'},
  {n:94,ar:'الْهَادِي',la:'Al-Hadi',me:'The Guide',be:'For guidance on right path'},
  {n:95,ar:'الْبَدِيعُ',la:'Al-Badi',me:'The Incomparable',be:'For creativity'},
  {n:96,ar:'الْبَاقِي',la:'Al-Baqi',me:'The Everlasting',be:'For permanence'},
  {n:97,ar:'الْوَارِثُ',la:'Al-Warith',me:'The Inheritor',be:'For legacy'},
  {n:98,ar:'الرَّشِيدُ',la:'Ar-Rashid',me:'The Guide to Right Path',be:'For right guidance'},
  {n:99,ar:'الصَّبُورُ',la:'As-Saboor',me:'The Patient',be:'For patience and endurance'},
];

export default function NamesOfAllah() {
  const { lang } = useLang();
  const [flipped,   setFlipped]   = useState({});
  const [memorized, setMemorized] = useState({});
  const [search,    setSearch]    = useState('');

  const filtered = NAMES.filter(n =>
    n.la.toLowerCase().includes(search.toLowerCase()) ||
    n.me.toLowerCase().includes(search.toLowerCase()) ||
    n.ar.includes(search)
  );

  const memCount = Object.values(memorized).filter(Boolean).length;
  const toggle = num => setFlipped(f => ({ ...f, [num]: !f[num] }));
  const mem    = num => setMemorized(m => ({ ...m, [num]: !m[num] }));

  return (
    <div className="page">
      <div className="flex-between au" style={{ marginBottom:8 }}>
        <div>
          <h2 style={{ fontSize:22, fontWeight:900, color:'var(--text-primary)' }}>{t('namesTitle',lang)}</h2>
          <div style={{ fontSize:13, color:'var(--text-muted)' }}>أسماء الله الحسنى · {t('tapFlip',lang)}</div>
        </div>
        <span className="badge">{memCount}/99</span>
      </div>

      <div className="progress-bar au d1"><div className="progress-fill" style={{ width:`${(memCount/99)*100}%` }} /></div>

      <div className="search-wrap au d2">
        <span className="search-icon">🔍</span>
        <input placeholder={t('search',lang)} value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      <div className="names-grid">
        {filtered.map((n, i) => (
          <div key={n.n} className={`name-card au${memorized[n.n]?' mem':''}${flipped[n.n]?' flip':''}`}
            style={{ animationDelay:`${Math.min(i,12)*0.03}s` }}
            onClick={() => toggle(n.n)}>
            <div className="name-n">{n.n}</div>
            <div className="name-ar">{n.ar}</div>
            {flipped[n.n] ? (
              <>
                <div className="name-la">{n.la}</div>
                <div className="name-me">{n.me}</div>
                <div className="name-be">{n.be}</div>
                <button className={`mem-pill${memorized[n.n]?' done':' undone'}`}
                  onClick={e => { e.stopPropagation(); mem(n.n); }}>
                  {memorized[n.n] ? `✓ ${t('memorized',lang)}` : t('markMemorized',lang)}
                </button>
              </>
            ) : (
              <div className="name-la">{n.la}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
