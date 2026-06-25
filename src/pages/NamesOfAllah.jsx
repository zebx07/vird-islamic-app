import { useState, useEffect } from 'react';
import { useLang } from '../App';
import { t } from '../lang';

const NAMES = [
  {n:1,ar:'الرَّحْمَنُ',la:'Ar-Rahman',me:{en:'The Most Gracious',ur:'بے حد مہربان',tr:'Esirgeyen'},be:{en:'Recite for mercy and compassion',ur:'رحمت اور شفقت کے لیے',tr:'Merhamet ve şefkat için'}},
  {n:2,ar:'الرَّحِيمُ',la:'Ar-Raheem',me:{en:'The Most Merciful',ur:'نہایت رحم والا',tr:'Bağışlayan'},be:{en:'For forgiveness and divine mercy',ur:'مغفرت اور رحمت کے لیے',tr:'Bağışlanma ve ilahi merhamet için'}},
  {n:3,ar:'الْمَلِكُ',la:'Al-Malik',me:{en:'The King',ur:'بادشاہ',tr:'Hükümdar'},be:{en:'For leadership and authority',ur:'قیادت اور اختیار کے لیے',tr:'Liderlik ve otorite için'}},
  {n:4,ar:'الْقُدُّوسُ',la:'Al-Quddus',me:{en:'The Most Holy',ur:'پاک ذات',tr:'Mukaddes'},be:{en:'For purification of heart',ur:'دل کی صفائی کے لیے',tr:'Kalp temizliği için'}},
  {n:5,ar:'السَّلَامُ',la:'As-Salam',me:{en:'The Source of Peace',ur:'سلامتی دینے والا',tr:'Esenlik Veren'},be:{en:'For peace of mind',ur:'ذہنی سکون کے لیے',tr:'Huzur için'}},
  {n:6,ar:'الْمُؤْمِنُ',la:'Al-Mumin',me:{en:'The Guardian of Faith',ur:'ایمان کا محافظ',tr:'Güven Veren'},be:{en:'For protection',ur:'حفاظت کے لیے',tr:'Koruma için'}},
  {n:7,ar:'الْمُهَيْمِنُ',la:'Al-Muhaymin',me:{en:'The Protector',ur:'نگہبان',tr:'Koruyucu'},be:{en:'Protection from harm',ur:'نقصان سے حفاظت',tr:'Zarardan korunma için'}},
  {n:8,ar:'الْعَزِيزُ',la:'Al-Aziz',me:{en:'The Almighty',ur:'غالب',tr:'Güçlü'},be:{en:'For strength and dignity',ur:'طاقت اور عزت کے لیے',tr:'Güç ve onur için'}},
  {n:9,ar:'الْجَبَّارُ',la:'Al-Jabbar',me:{en:'The Compeller',ur:'زبردست',tr:'Düzeltici'},be:{en:'For overcoming hardship',ur:'مشکلات پر قابو پانے کے لیے',tr:'Zorlukları aşmak için'}},
  {n:10,ar:'الْمُتَكَبِّرُ',la:'Al-Mutakabbir',me:{en:'The Supreme',ur:'بڑائی والا',tr:'Büyüklük Sahibi'},be:{en:'For greatness and honor',ur:'عظمت اور عزت کے لیے',tr:'Büyüklük ve onur için'}},
  {n:11,ar:'الْخَالِقُ',la:'Al-Khaliq',me:{en:'The Creator',ur:'پیدا کرنے والا',tr:'Yaratan'},be:{en:'For new beginnings',ur:'نئی شروعات کے لیے',tr:'Yeni başlangıçlar için'}},
  {n:12,ar:'الْبَارِئُ',la:'Al-Bari',me:{en:'The Originator',ur:'ایجاد کرنے والا',tr:'Var Eden'},be:{en:'For relief from illness',ur:'بیماری سے شفا کے لیے',tr:'Hastalıktan kurtulmak için'}},
  {n:13,ar:'الْمُصَوِّرُ',la:'Al-Musawwir',me:{en:'The Fashioner',ur:'صورت بنانے والا',tr:'Şekil Veren'},be:{en:'For beauty and form',ur:'خوبصورتی کے لیے',tr:'Güzellik için'}},
  {n:14,ar:'الْغَفَّارُ',la:'Al-Ghaffar',me:{en:'The Forgiving',ur:'بخشنے والا',tr:'Çok Bağışlayan'},be:{en:'Recite often for forgiveness',ur:'مغفرت کے لیے پڑھیں',tr:'Bağışlanma için okuyun'}},
  {n:15,ar:'الْقَهَّارُ',la:'Al-Qahhar',me:{en:'The Dominant',ur:'سب پر غالب',tr:'Kahreden'},be:{en:'For overcoming enemies',ur:'دشمنوں پر غلبہ کے لیے',tr:'Düşmanları yenmek için'}},
  {n:16,ar:'الْوَهَّابُ',la:'Al-Wahhab',me:{en:'The Bestower',ur:'عطا کرنے والا',tr:'Bağışlayan'},be:{en:'For gifts and provisions',ur:'عطا اور رزق کے لیے',tr:'Hediyeler ve rızık için'}},
  {n:17,ar:'الرَّزَّاقُ',la:'Ar-Razzaq',me:{en:'The Provider',ur:'رزق دینے والا',tr:'Rızık Veren'},be:{en:'For rizq and sustenance',ur:'رزق اور روزی کے لیے',tr:'Rızık ve geçim için'}},
  {n:18,ar:'الْفَتَّاحُ',la:'Al-Fattah',me:{en:'The Opener',ur:'کھولنے والا',tr:'Açan'},be:{en:'For opening doors and opportunities',ur:'دروازے کھولنے کے لیے',tr:'Kapıları açmak için'}},
  {n:19,ar:'الْعَلِيمُ',la:'Al-Alim',me:{en:'The All-Knowing',ur:'سب جاننے والا',tr:'Her Şeyi Bilen'},be:{en:'For knowledge and wisdom',ur:'علم اور حکمت کے لیے',tr:'Bilgi ve hikmet için'}},
  {n:20,ar:'الْقَابِضُ',la:'Al-Qabid',me:{en:'The Withholder',ur:'تنگی کرنے والا',tr:'Daraltan'},be:{en:"For understanding God's wisdom",ur:'اللہ کی حکمت سمجھنے کے لیے',tr:"Allah'ın hikmetini anlamak için"}},
  {n:21,ar:'الْبَاسِطُ',la:'Al-Basit',me:{en:'The Expander',ur:'کشادگی دینے والا',tr:'Genişleten'},be:{en:'For expansion of blessings',ur:'برکت کی کشادگی کے لیے',tr:'Bereketin genişlemesi için'}},
  {n:22,ar:'الْخَافِضُ',la:'Al-Khafid',me:{en:'The Abaser',ur:'پست کرنے والا',tr:'Alçaltan'},be:{en:'For humility',ur:'عاجزی کے لیے',tr:'Alçakgönüllülük için'}},
  {n:23,ar:'الرَّافِعُ',la:'Ar-Rafi',me:{en:'The Exalter',ur:'بلند کرنے والا',tr:'Yükselten'},be:{en:'For elevation of rank',ur:'مرتبہ بلند کرنے کے لیے',tr:'Mertebe yükseltmek için'}},
  {n:24,ar:'الْمُعِزُّ',la:'Al-Muizz',me:{en:'The Honourer',ur:'عزت دینے والا',tr:'İzzet Veren'},be:{en:'For honor and respect',ur:'عزت اور احترام کے لیے',tr:'Onur ve saygı için'}},
  {n:25,ar:'الْمُذِلُّ',la:'Al-Mudhill',me:{en:'The Humiliator',ur:'ذلیل کرنے والا',tr:'Alçaltan'},be:{en:'For justice against oppressors',ur:'ظالموں کے خلاف انصاف',tr:'Zalimlere karşı adalet için'}},
  {n:26,ar:'السَّمِيعُ',la:'As-Samee',me:{en:'The All-Hearing',ur:'سب سننے والا',tr:'Her Şeyi Duyan'},be:{en:'Know all duas are heard',ur:'جان لیں ہر دعا سنی جاتی ہے',tr:'Tüm duaların duyulduğunu bilin'}},
  {n:27,ar:'الْبَصِيرُ',la:'Al-Baseer',me:{en:'The All-Seeing',ur:'سب دیکھنے والا',tr:'Her Şeyi Gören'},be:{en:'For insight and clarity',ur:'بصیرت اور وضاحت کے لیے',tr:'Öngörü ve netlik için'}},
  {n:28,ar:'الْحَكَمُ',la:'Al-Hakam',me:{en:'The Judge',ur:'فیصلہ کرنے والا',tr:'Hükmeden'},be:{en:'For justice and fair decisions',ur:'انصاف اور منصفانہ فیصلے',tr:'Adalet ve adil kararlar için'}},
  {n:29,ar:'الْعَدْلُ',la:'Al-Adl',me:{en:'The Just',ur:'عدل کرنے والا',tr:'Adaletli'},be:{en:'For fairness and truth',ur:'انصاف اور سچائی کے لیے',tr:'Adalet ve doğruluk için'}},
  {n:30,ar:'اللَّطِيفُ',la:'Al-Lateef',me:{en:'The Subtle One',ur:'باریک بین',tr:'Lütfeden'},be:{en:'For gentleness and provision',ur:'نرمی اور رزق کے لیے',tr:'Nezaket ve rızık için'}},
  {n:31,ar:'الْخَبِيرُ',la:'Al-Khabeer',me:{en:'The Aware',ur:'باخبر',tr:'Her Şeyden Haberdar'},be:{en:'For awareness and insight',ur:'آگاہی اور بصیرت کے لیے',tr:'Farkındalık ve kavrayış için'}},
  {n:32,ar:'الْحَلِيمُ',la:'Al-Haleem',me:{en:'The Forbearing',ur:'بردبار',tr:'Yumuşak Huylu'},be:{en:'For patience and self-control',ur:'صبر اور ضبط نفس کے لیے',tr:'Sabır ve öz denetim için'}},
  {n:33,ar:'الْعَظِيمُ',la:'Al-Adheem',me:{en:'The Magnificent',ur:'عظمت والا',tr:'Yüce'},be:{en:'For awe and gratitude',ur:'خشیت اور شکر کے لیے',tr:'Hayranlık ve şükür için'}},
  {n:34,ar:'الْغَفُورُ',la:'Al-Ghafoor',me:{en:'The Forgiving',ur:'بخشنے والا',tr:'Bağışlayan'},be:{en:'For forgiveness of sins',ur:'گناہوں کی معافی کے لیے',tr:'Günahların bağışlanması için'}},
  {n:35,ar:'الشَّكُورُ',la:'Ash-Shakoor',me:{en:'The Appreciative',ur:'قدردان',tr:'Şükredenleri Ödüllendiren'},be:{en:'For gratitude and reward',ur:'شکر اور اجر کے لیے',tr:'Şükür ve ödül için'}},
  {n:36,ar:'الْعَلِيُّ',la:'Al-Ali',me:{en:'The Most High',ur:'بلند و بالا',tr:'Yüce'},be:{en:'For spiritual elevation',ur:'روحانی بلندی کے لیے',tr:'Manevi yükseliş için'}},
  {n:37,ar:'الْكَبِيرُ',la:'Al-Kabeer',me:{en:'The Grand',ur:'بہت بڑا',tr:'Büyük'},be:{en:'For greatness of spirit',ur:'روح کی عظمت کے لیے',tr:'Ruh büyüklüğü için'}},
  {n:38,ar:'الْحَفِيظُ',la:'Al-Hafeez',me:{en:'The Preserver',ur:'حفاظت کرنے والا',tr:'Koruyucu'},be:{en:'For protection and safety',ur:'حفاظت اور سلامتی کے لیے',tr:'Koruma ve güvenlik için'}},
  {n:39,ar:'الْمُقِيتُ',la:'Al-Muqeet',me:{en:'The Nourisher',ur:'قوت دینے والا',tr:'Besleyen'},be:{en:'For provision and sustenance',ur:'رزق اور قوت کے لیے',tr:'Rızık ve geçim için'}},
  {n:40,ar:'الْحَسِيبُ',la:'Al-Haseeb',me:{en:'The Reckoner',ur:'حساب لینے والا',tr:'Hesap Gören'},be:{en:'For accountability',ur:'احتساب کے لیے',tr:'Hesap vermek için'}},
  {n:41,ar:'الْجَلِيلُ',la:'Al-Jaleel',me:{en:'The Majestic',ur:'جلال والا',tr:'Yüce'},be:{en:'For majesty and reverence',ur:'جلال اور تعظیم کے لیے',tr:'Haşmet ve saygı için'}},
  {n:42,ar:'الْكَرِيمُ',la:'Al-Kareem',me:{en:'The Generous',ur:'کرم والا',tr:'Cömert'},be:{en:'For generosity and kindness',ur:'سخاوت اور مہربانی کے لیے',tr:'Cömertlik ve iyilik için'}},
  {n:43,ar:'الرَّقِيبُ',la:'Ar-Raqeeb',me:{en:'The Watchful',ur:'نگران',tr:'Gözetleyen'},be:{en:'Remember Allah watches all',ur:'یاد رکھیں اللہ سب دیکھتا ہے',tr:"Allah'ın her şeyi gördüğünü bilin"}},
  {n:44,ar:'الْمُجِيبُ',la:'Al-Mujeeb',me:{en:'The Responsive',ur:'قبول کرنے والا',tr:'Kabul Eden'},be:{en:'Your duas will be answered',ur:'آپ کی دعائیں قبول ہوں گی',tr:'Dualarınız kabul olunacak'}},
  {n:45,ar:'الْوَاسِعُ',la:'Al-Wasi',me:{en:'The All-Encompassing',ur:'وسعت والا',tr:'Geniş'},be:{en:'For abundance and expansion',ur:'فراوانی اور وسعت کے لیے',tr:'Bolluk ve genişleme için'}},
  {n:46,ar:'الْحَكِيمُ',la:'Al-Hakeem',me:{en:'The Wise',ur:'حکمت والا',tr:'Hikmet Sahibi'},be:{en:'For wisdom in decisions',ur:'فیصلوں میں حکمت کے لیے',tr:'Kararlarda hikmet için'}},
  {n:47,ar:'الْوَدُودُ',la:'Al-Wadood',me:{en:'The Loving',ur:'محبت کرنے والا',tr:'Seven'},be:{en:'For love and compassion',ur:'محبت اور شفقت کے لیے',tr:'Sevgi ve şefkat için'}},
  {n:48,ar:'الْمَجِيدُ',la:'Al-Majeed',me:{en:'The Glorious',ur:'بزرگی والا',tr:'Şanlı'},be:{en:'For glory and honor',ur:'شان اور عزت کے لیے',tr:'Şan ve onur için'}},
  {n:49,ar:'الْبَاعِثُ',la:'Al-Baaith',me:{en:'The Resurrector',ur:'اٹھانے والا',tr:'Dirilten'},be:{en:'For new beginnings and revival',ur:'نئی شروعات کے لیے',tr:'Yeni başlangıçlar için'}},
  {n:50,ar:'الشَّهِيدُ',la:'Ash-Shaheed',me:{en:'The Witness',ur:'گواہ',tr:'Şahit'},be:{en:'Allah witnesses everything',ur:'اللہ سب کا گواہ ہے',tr:'Allah her şeye şahittir'}},
  {n:51,ar:'الْحَقُّ',la:'Al-Haqq',me:{en:'The Truth',ur:'حق',tr:'Hak'},be:{en:'For truth and clarity',ur:'سچائی اور وضاحت کے لیے',tr:'Doğruluk ve netlik için'}},
  {n:52,ar:'الْوَكِيلُ',la:'Al-Wakeel',me:{en:'The Trustee',ur:'کارساز',tr:'Vekil'},be:{en:'For reliance and tawakkul',ur:'توکل اور بھروسے کے لیے',tr:'Tevekkül için'}},
  {n:53,ar:'الْقَوِيُّ',la:'Al-Qawiyy',me:{en:'The Strong',ur:'طاقتور',tr:'Güçlü'},be:{en:'For strength and resilience',ur:'طاقت اور استقامت کے لیے',tr:'Güç ve dayanıklılık için'}},
  {n:54,ar:'الْمَتِينُ',la:'Al-Mateen',me:{en:'The Firm',ur:'مضبوط',tr:'Metin'},be:{en:'For firmness in faith',ur:'ایمان میں مضبوطی کے لیے',tr:'İmanda sağlamlık için'}},
  {n:55,ar:'الْوَلِيُّ',la:'Al-Waliyy',me:{en:'The Friend',ur:'دوست',tr:'Dost'},be:{en:'For divine friendship',ur:'الہی دوستی کے لیے',tr:'İlahi dostluk için'}},
  {n:56,ar:'الْحَمِيدُ',la:'Al-Hameed',me:{en:'The Praiseworthy',ur:'تعریف کے لائق',tr:'Övülmeye Layık'},be:{en:'For gratitude and praise',ur:'شکر اور حمد کے لیے',tr:'Şükür ve övgü için'}},
  {n:57,ar:'الْمُحْصِي',la:'Al-Muhsi',me:{en:'The Reckoner',ur:'شمار کرنے والا',tr:'Sayan'},be:{en:'For accountability',ur:'احتساب کے لیے',tr:'Hesap için'}},
  {n:58,ar:'الْمُبْدِئُ',la:'Al-Mubdi',me:{en:'The Originator',ur:'پہلی بار پیدا کرنے والا',tr:'İlk Yaratan'},be:{en:'For new starts',ur:'نئی شروعات کے لیے',tr:'Yeni başlangıçlar için'}},
  {n:59,ar:'الْمُعِيدُ',la:'Al-Mueed',me:{en:'The Restorer',ur:'دوبارہ پیدا کرنے والا',tr:'İade Eden'},be:{en:'For restoration and healing',ur:'بحالی اور شفا کے لیے',tr:'İyileşme için'}},
  {n:60,ar:'الْمُحْيِي',la:'Al-Muhyi',me:{en:'The Giver of Life',ur:'زندگی دینے والا',tr:'Hayat Veren'},be:{en:'For life and revival',ur:'زندگی اور تجدید کے لیے',tr:'Hayat ve canlanma için'}},
  {n:61,ar:'الْمُمِيتُ',la:'Al-Mumeet',me:{en:'The Taker of Life',ur:'موت دینے والا',tr:'Öldüren'},be:{en:'Remembrance of death',ur:'موت کی یاد',tr:'Ölümü hatırlama'}},
  {n:62,ar:'الْحَيُّ',la:'Al-Hayy',me:{en:'The Ever-Living',ur:'ہمیشہ زندہ',tr:'Diri'},be:{en:'For life and vitality',ur:'زندگی اور توانائی کے لیے',tr:'Hayat ve canlılık için'}},
  {n:63,ar:'الْقَيُّومُ',la:'Al-Qayyoom',me:{en:'The Self-Subsisting',ur:'قائم رہنے والا',tr:'Kaim'},be:{en:'For independence',ur:'آزادی کے لیے',tr:'Bağımsızlık için'}},
  {n:64,ar:'الْوَاجِدُ',la:'Al-Wajid',me:{en:'The Finder',ur:'پانے والا',tr:'Bulan'},be:{en:'For finding what is lost',ur:'کھوئی چیز پانے کے لیے',tr:'Kaybedileni bulmak için'}},
  {n:65,ar:'الْمَاجِدُ',la:'Al-Majid',me:{en:'The Noble',ur:'بزرگ',tr:'Şerefli'},be:{en:'For nobility of character',ur:'کردار کی بلندی کے لیے',tr:'Karakter asaleti için'}},
  {n:66,ar:'الْوَاحِدُ',la:'Al-Wahid',me:{en:'The One',ur:'ایک',tr:'Bir'},be:{en:'For unity and focus',ur:'اتحاد اور توجہ کے لیے',tr:'Birlik ve odaklanma için'}},
  {n:67,ar:'الأَحَدُ',la:'Al-Ahad',me:{en:'The Unique',ur:'یکتا',tr:'Tek'},be:{en:'For sincerity in worship',ur:'عبادت میں اخلاص کے لیے',tr:'İbadette samimiyet için'}},
  {n:68,ar:'الصَّمَدُ',la:'As-Samad',me:{en:'The Eternal',ur:'بے نیاز',tr:'Samed'},be:{en:'Reliance on Allah alone',ur:'صرف اللہ پر بھروسہ',tr:"Yalnızca Allah'a güvenmek"}},
  {n:69,ar:'الْقَادِرُ',la:'Al-Qadir',me:{en:'The Able',ur:'قادر',tr:'Kadir'},be:{en:'For capability and power',ur:'صلاحیت اور طاقت کے لیے',tr:'Yetenek ve güç için'}},
  {n:70,ar:'الْمُقْتَدِرُ',la:'Al-Muqtadir',me:{en:'The Powerful',ur:'اقتدار والا',tr:'Kudretli'},be:{en:'For power over affairs',ur:'معاملات پر اختیار کے لیے',tr:'İşler üzerinde güç için'}},
  {n:71,ar:'الْمُقَدِّمُ',la:'Al-Muqaddim',me:{en:'The Expediter',ur:'آگے کرنے والا',tr:'Öne Alan'},be:{en:'For advancement',ur:'ترقی کے لیے',tr:'İlerleme için'}},
  {n:72,ar:'الْمُؤَخِّرُ',la:'Al-Muakhkhir',me:{en:'The Delayer',ur:'پیچھے کرنے والا',tr:'Erteleyen'},be:{en:'Patience with timing',ur:'وقت کے ساتھ صبر',tr:'Zamanlama ile sabır'}},
  {n:73,ar:'الأَوَّلُ',la:'Al-Awwal',me:{en:'The First',ur:'سب سے پہلا',tr:'İlk'},be:{en:'For priority and beginnings',ur:'ترجیح اور شروعات کے لیے',tr:'Öncelik ve başlangıçlar için'}},
  {n:74,ar:'الآخِرُ',la:'Al-Akhir',me:{en:'The Last',ur:'سب سے آخر',tr:'Son'},be:{en:'For endings and completion',ur:'اختتام اور تکمیل کے لیے',tr:'Bitiş ve tamamlanma için'}},
  {n:75,ar:'الظَّاهِرُ',la:'Az-Zahir',me:{en:'The Manifest',ur:'ظاہر',tr:'Zahir'},be:{en:'For clarity',ur:'وضاحت کے لیے',tr:'Netlik için'}},
  {n:76,ar:'الْبَاطِنُ',la:'Al-Batin',me:{en:'The Hidden',ur:'پوشیدہ',tr:'Batın'},be:{en:'For inner knowledge',ur:'باطنی علم کے لیے',tr:'İç bilgi için'}},
  {n:77,ar:'الْوَالِي',la:'Al-Wali',me:{en:'The Governor',ur:'حاکم',tr:'Yöneten'},be:{en:'For governance and order',ur:'حکمرانی اور نظم کے لیے',tr:'Yönetim ve düzen için'}},
  {n:78,ar:'الْمُتَعَالِ',la:'Al-Mutaali',me:{en:'The Most Exalted',ur:'بلند و برتر',tr:'Yüce'},be:{en:'For exaltation',ur:'بلندی کے لیے',tr:'Yücelik için'}},
  {n:79,ar:'الْبَرُّ',la:'Al-Barr',me:{en:'The Source of Goodness',ur:'نیکی کا سرچشمہ',tr:'İyilik Kaynağı'},be:{en:'For kindness',ur:'مہربانی کے لیے',tr:'İyilik için'}},
  {n:80,ar:'التَّوَّابُ',la:'At-Tawwab',me:{en:'The Acceptor of Repentance',ur:'توبہ قبول کرنے والا',tr:'Tövbeleri Kabul Eden'},be:{en:'For tawbah',ur:'توبہ کے لیے',tr:'Tövbe için'}},
  {n:81,ar:'الْمُنْتَقِمُ',la:'Al-Muntaqim',me:{en:'The Avenger',ur:'بدلہ لینے والا',tr:'İntikam Alan'},be:{en:'For justice',ur:'انصاف کے لیے',tr:'Adalet için'}},
  {n:82,ar:'الْعَفُوُّ',la:'Al-Afuww',me:{en:'The Pardoner',ur:'معاف کرنے والا',tr:'Affeden'},be:{en:'For pardon and ease',ur:'معافی اور آسانی کے لیے',tr:'Af ve kolaylık için'}},
  {n:83,ar:'الرَّؤُوفُ',la:'Ar-Rauf',me:{en:'The Compassionate',ur:'شفیق',tr:'Şefkatli'},be:{en:'For compassion',ur:'شفقت کے لیے',tr:'Şefkat için'}},
  {n:84,ar:'مَالِكُ الْمُلْكِ',la:'Malik-ul-Mulk',me:{en:'Owner of All Sovereignty',ur:'تمام بادشاہی کا مالک',tr:'Mülkün Sahibi'},be:{en:'Ultimate trust in Allah',ur:'اللہ پر مکمل بھروسہ',tr:"Allah'a tam güven"}},
  {n:85,ar:'ذُوالْجَلَالِ',la:'Dhul-Jalal wal-Ikram',me:{en:'Lord of Majesty and Bounty',ur:'جلال اور اکرام والا',tr:'Celal ve İkram Sahibi'},be:{en:'For majesty',ur:'جلال کے لیے',tr:'Haşmet için'}},
  {n:86,ar:'الْمُقْسِطُ',la:'Al-Muqsit',me:{en:'The Equitable',ur:'انصاف کرنے والا',tr:'Adaletli'},be:{en:'For justice and equality',ur:'انصاف اور مساوات کے لیے',tr:'Adalet ve eşitlik için'}},
  {n:87,ar:'الْجَامِعُ',la:'Al-Jami',me:{en:'The Gatherer',ur:'جمع کرنے والا',tr:'Toplayan'},be:{en:'For unity',ur:'اتحاد کے لیے',tr:'Birlik için'}},
  {n:88,ar:'الْغَنِيُّ',la:'Al-Ghani',me:{en:'The Self-Sufficient',ur:'بے نیاز',tr:'Zengin'},be:{en:'For independence',ur:'بے نیازی کے لیے',tr:'Bağımsızlık için'}},
  {n:89,ar:'الْمُغْنِي',la:'Al-Mughni',me:{en:'The Enricher',ur:'غنی کرنے والا',tr:'Zenginleştiren'},be:{en:'For wealth and sufficiency',ur:'دولت اور کفایت کے لیے',tr:'Zenginlik için'}},
  {n:90,ar:'الْمَانِعُ',la:'Al-Mani',me:{en:'The Preventer',ur:'روکنے والا',tr:'Engelleyen'},be:{en:'For protection',ur:'حفاظت کے لیے',tr:'Koruma için'}},
  {n:91,ar:'الضَّارُ',la:'Ad-Darr',me:{en:'The Distresser',ur:'نقصان پہنچانے والا',tr:'Zarar Veren'},be:{en:'Understanding divine tests',ur:'الہی آزمائشوں کو سمجھنا',tr:'İlahi sınavları anlamak'}},
  {n:92,ar:'النَّافِعُ',la:'An-Nafi',me:{en:'The Propitious',ur:'نفع دینے والا',tr:'Fayda Veren'},be:{en:'For benefit and profit',ur:'فائدے اور نفع کے لیے',tr:'Fayda için'}},
  {n:93,ar:'النُّورُ',la:'An-Nur',me:{en:'The Light',ur:'نور',tr:'Nur'},be:{en:'For guidance and enlightenment',ur:'ہدایت اور روشنی کے لیے',tr:'Rehberlik ve aydınlanma için'}},
  {n:94,ar:'الْهَادِي',la:'Al-Hadi',me:{en:'The Guide',ur:'ہدایت دینے والا',tr:'Yol Gösteren'},be:{en:'For guidance on right path',ur:'سیدھے راستے کی ہدایت کے لیے',tr:'Doğru yol rehberliği için'}},
  {n:95,ar:'الْبَدِيعُ',la:'Al-Badi',me:{en:'The Incomparable',ur:'بے مثال',tr:'Eşsiz'},be:{en:'For creativity',ur:'تخلیق کے لیے',tr:'Yaratıcılık için'}},
  {n:96,ar:'الْبَاقِي',la:'Al-Baqi',me:{en:'The Everlasting',ur:'ہمیشہ رہنے والا',tr:'Baki'},be:{en:'For permanence',ur:'دوام کے لیے',tr:'Kalıcılık için'}},
  {n:97,ar:'الْوَارِثُ',la:'Al-Warith',me:{en:'The Inheritor',ur:'وارث',tr:'Varis'},be:{en:'For legacy',ur:'وراثت کے لیے',tr:'Miras için'}},
  {n:98,ar:'الرَّشِيدُ',la:'Ar-Rashid',me:{en:'The Guide to Right Path',ur:'سیدھی راہ دکھانے والا',tr:'Doğru Yola İleten'},be:{en:'For right guidance',ur:'صحیح ہدایت کے لیے',tr:'Doğru rehberlik için'}},
  {n:99,ar:'الصَّبُورُ',la:'As-Saboor',me:{en:'The Patient',ur:'صبر والا',tr:'Sabırlı'},be:{en:'For patience and endurance',ur:'صبر اور برداشت کے لیے',tr:'Sabır ve dayanıklılık için'}},
];

export default function NamesOfAllah() {
  const { lang } = useLang();
  const [flipped,   setFlipped]   = useState({});
  const [memorized, setMemorized] = useState(() => { try { return JSON.parse(localStorage.getItem('vird_names_mem')||'{}'); } catch { return {}; } });
  const [search,    setSearch]    = useState('');

  const getME = n => n.me[lang] || n.me.en;
  const getBE = n => n.be[lang] || n.be.en;

  const filtered = NAMES.filter(n =>
    n.la.toLowerCase().includes(search.toLowerCase()) ||
    getME(n).toLowerCase().includes(search.toLowerCase()) ||
    n.ar.includes(search)
  );

  useEffect(() => { localStorage.setItem('vird_names_mem', JSON.stringify(memorized)); }, [memorized]);
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
                <div className="name-me">{getME(n)}</div>
                <div className="name-be">{getBE(n)}</div>
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
