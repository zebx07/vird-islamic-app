export const LANGS = {
  en: { label: 'English',  dir: 'ltr', icon: 'EN' },
  ar: { label: 'العربية', dir: 'rtl', icon: 'ع'  },
  ur: { label: 'اردو',    dir: 'rtl', icon: 'اُ' },
  tr: { label: 'Türkçe',  dir: 'ltr', icon: 'TR' },
};

const TR = {
  // Greetings
  greet:           { en:['Good Morning','Good Afternoon','Good Evening','Good Night'], ar:['صباح الخير','مرحباً بك','مساء الخير','تصبح على خير'], ur:['صبح بخیر','آداب','شام بخیر','شب بخیر'], tr:['Günaydın','İyi öğleden sonralar','İyi akşamlar','İyi geceler'] },
  assalamu:        { en:'As-salamu Alaykum',         ar:'السَّلَامُ عَلَيْكُمْ',       ur:'السلام علیکم',           tr:'Es-selamu Aleyküm'      },

  // Nav
  home:            { en:'Home',                      ar:'الرئيسية',                    ur:'ہوم',                    tr:'Ana Sayfa'              },
  quran:           { en:'Quran',                     ar:'القرآن',                      ur:'قرآن',                   tr:'Kuran'                  },
  prayer:          { en:'Prayer',                    ar:'الصلاة',                      ur:'نماز',                   tr:'Namaz'                  },
  dhikr:           { en:'Dhikr',                     ar:'الذكر',                       ur:'ذکر',                    tr:'Zikir'                  },
  more:            { en:'More',                      ar:'المزيد',                      ur:'مزید',                   tr:'Daha Fazla'             },
  moreDesc:        { en:'All Islamic tools in one place', ar:'جميع الأدوات الإسلامية في مكان واحد', ur:'تمام اسلامی ٹولز ایک جگہ', tr:'Tüm İslami araçlar bir arada' },

  // Page titles
  quranTitle:      { en:'The Holy Quran',            ar:'القرآن الكريم',               ur:'قرآن مجید',              tr:'Kur\'an-ı Kerim'        },
  hadith:          { en:'Hadith',                    ar:'الحديث',                      ur:'حدیث',                   tr:'Hadis'                  },
  duas:            { en:'Duas & Azkar',              ar:'الأدعية والأذكار',            ur:'دعائیں و اذکار',         tr:'Dua ve Zikirler'        },
  prayerTimes:     { en:'Prayer Times',              ar:'مواقيت الصلاة',               ur:'نماز کے اوقات',          tr:'Namaz Vakitleri'        },
  tasbeeh:         { en:'Tasbeeh',                   ar:'التسبيح',                     ur:'تسبیح',                  tr:'Tesbih'                 },
  chains:          { en:'Dhikr Chains',              ar:'سلاسل الذكر',                 ur:'ذکر چین',                tr:'Zikir Zincirleri'       },
  names:           { en:'99 Names of Allah',         ar:'أسماء الله الحسنى',           ur:'اللہ کے 99 نام',         tr:'Allah\'ın 99 İsmi'      },
  quiz:            { en:'Islamic Quiz',              ar:'اختبار إسلامي',               ur:'اسلامی کوئز',            tr:'İslami Quiz'            },
  habits:          { en:'Habit Tracker',             ar:'متابعة العبادات',             ur:'عبادت ٹریکر',            tr:'İbadet Takibi'          },
  notifs:          { en:'Notifications',             ar:'الإشعارات',                   ur:'نوٹیفیکیشن',             tr:'Bildirimler'            },

  // Common UI
  search:          { en:'Search...',                 ar:'بحث...',                      ur:'تلاش...',                tr:'Ara...'                 },
  loading:         { en:'Loading...',                ar:'جارٍ التحميل...',             ur:'لوڈ ہو رہا ہے...',       tr:'Yükleniyor...'          },
  back:            { en:'Back',                      ar:'رجوع',                        ur:'واپس',                   tr:'Geri'                   },
  save:            { en:'Save',                      ar:'حفظ',                         ur:'محفوظ کریں',             tr:'Kaydet'                 },
  done:            { en:'Done',                      ar:'تم',                          ur:'مکمل',                   tr:'Tamam'                  },
  cancel:          { en:'Cancel',                    ar:'إلغاء',                       ur:'منسوخ',                  tr:'İptal'                  },
  tryAgain:        { en:'Try Again',                 ar:'حاول مرة أخرى',               ur:'دوبارہ کوشش کریں',       tr:'Tekrar Dene'            },
  networkErr:      { en:'Network error. Check connection.', ar:'خطأ في الشبكة.',      ur:'نیٹ ورک خرابی۔',         tr:'Ağ hatası. Bağlantıyı kontrol edin.' },
  features:        { en:'Features',                  ar:'المميزات',                    ur:'خصوصیات',                tr:'Özellikler'             },
  nextPrayer:      { en:'Next Prayer',               ar:'الصلاة القادمة',              ur:'اگلی نماز',              tr:'Sonraki Namaz'          },
  allTimes:        { en:'All times →',               ar:'كل الأوقات →',                ur:'تمام اوقات →',           tr:'Tüm vakitler →'         },
  todayPrayers:    { en:"Today's Prayers",           ar:'صلوات اليوم',                 ur:'آج کی نمازیں',           tr:'Bugünün Namazları'      },

  // Quran page
  surahs:          { en:'114 Surahs',                ar:'١١٤ سورة',                    ur:'114 سورتیں',             tr:'114 Sure'               },
  mushaf:          { en:'📖 Mushaf',                 ar:'📖 مصحف',                     ur:'📖 مصحف',                tr:'📖 Mushaf'              },
  mushafTitle:     { en:'Mushaf — Page Browser',     ar:'مصحف — تصفح الصفحات',         ur:'مصحف — صفحات',           tr:'Mushaf — Sayfa Görünümü'},
  pageOf:          { en:'Page',                      ar:'صفحة',                        ur:'صفحہ',                   tr:'Sayfa'                  },
  jumpToSurah:     { en:'Jump to Surah',             ar:'انتقل إلى سورة',              ur:'سورت پر جائیں',          tr:'Sureye Git'             },
  playFull:        { en:'Play full surah',           ar:'تشغيل السورة كاملة',          ur:'پوری سورت چلائیں',       tr:'Sureyi Tamamen Dinle'   },
  playing:         { en:'▶ Playing',                 ar:'▶ يُشَغَّل',                  ur:'▶ چل رہا ہے',            tr:'▶ Oynatılıyor'          },
  stop:            { en:'■ Stop',                    ar:'■ إيقاف',                     ur:'■ روکیں',                tr:'■ Durdur'               },
  verseByVerse:    { en:'Verse by Verse',            ar:'آية بآية',                    ur:'آیت بآیت',               tr:'Ayet Ayet'              },
  readingMode:     { en:'📖 Reading Mode',           ar:'📖 وضع القراءة',              ur:'📖 پڑھنے کا موڈ',        tr:'📖 Okuma Modu'          },
  translation:     { en:'English Translation (Pickthall)', ar:'الترجمة الإنجليزية',   ur:'انگریزی ترجمہ',          tr:'İngilizce Çeviri'       },
  bismillah:       { en:'Bismillah',                 ar:'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ', ur:'بسم اللہ الرحمن الرحیم', tr:'Besmele' },
  verses:          { en:'verses',                    ar:'آيات',                        ur:'آیات',                   tr:'ayet'                   },
  loadingVerses:   { en:'Loading verses...',         ar:'جارٍ تحميل الآيات...',        ur:'آیات لوڈ ہو رہی ہیں...', tr:'Ayetler yükleniyor...'  },

  // Hadith
  hadithTitle:     { en:'Hadith Collections',        ar:'مجموعات الأحاديث',            ur:'حدیث مجموعے',            tr:'Hadis Koleksiyonları'   },
  hadithSub:       { en:'Authentic traditions of the Prophet ﷺ', ar:'الأحاديث النبوية الشريفة', ur:'نبی ﷺ کی احادیث', tr:'Hz. Peygamber ﷺ\'in Hadisleri' },
  readMore:        { en:'Read more ▼',               ar:'اقرأ المزيد ▼',               ur:'مزید پڑھیں ▼',           tr:'Devamını oku ▼'         },
  showLess:        { en:'Show less ▲',               ar:'أخفِ ▲',                      ur:'کم دکھائیں ▲',           tr:'Daha az göster ▲'       },

  // Duas
  duasTitle:       { en:'Duas & Azkar',              ar:'أدعية وأذكار',                ur:'دعائیں و اذکار',         tr:'Dualar ve Zikirler'     },
  duasSub:         { en:'Authentic supplications from Quran & Sunnah', ar:'أدعية من القرآن والسنة', ur:'قرآن و سنت کی دعائیں', tr:'Kuran ve Sünnetten Dualar' },
  searchDuas:      { en:'Search duas...',            ar:'ابحث عن دعاء...',             ur:'دعا تلاش کریں...',       tr:'Dua ara...'             },

  // Prayer Times
  calcMethod:      { en:'Calculation Method',        ar:'طريقة الحساب',                ur:'حساب کا طریقہ',          tr:'Hesaplama Yöntemi'      },
  qibla:           { en:'Qibla Direction',           ar:'اتجاه القبلة',                ur:'قبلہ سمت',               tr:'Kıble Yönü'             },
  qiblaDesc:       { en:'Face northeast from North America · West from South Asia', ar:'شمال شرق من أمريكا الشمالية · غرب من جنوب آسيا', ur:'شمالی امریکہ سے شمال مشرق · جنوبی ایشیا سے مغرب', tr:'Kuzey Amerika\'dan kuzeydoğu · Güney Asya\'dan batı' },
  detectingLoc:    { en:'Detecting location...',     ar:'جارٍ تحديد الموقع...',        ur:'مقام معلوم ہو رہا ہے...', tr:'Konum tespit ediliyor...' },
  gettingTimes:    { en:'Getting prayer times...',   ar:'جارٍ جلب أوقات الصلاة...',   ur:'نماز کے اوقات مل رہے ہیں...', tr:'Namaz vakitleri alınıyor...' },

  // Tasbeeh
  tapToCount:      { en:'tap to count',              ar:'اضغط للعد',                   ur:'گنتی کے لیے ٹیپ کریں',  tr:'saymak için dokun'      },
  reset:           { en:'Reset Counter',             ar:'إعادة ضبط العداد',            ur:'گنتی دوبارہ شروع کریں', tr:'Sayacı Sıfırla'         },
  target:          { en:'Target',                    ar:'الهدف',                       ur:'ہدف',                    tr:'Hedef'                  },
  sets:            { en:'Sets',                      ar:'الأطقم',                      ur:'سیٹ',                    tr:'Set'                    },
  session:         { en:'This Session',              ar:'هذه الجلسة',                  ur:'اس سیشن میں',            tr:'Bu Seans'               },
  total:           { en:'Total',                     ar:'الإجمالي',                    ur:'کل',                     tr:'Toplam'                 },
  more_left:       { en:'more · Target:',            ar:'المتبقي · الهدف:',            ur:'باقی · ہدف:',            tr:'kaldı · Hedef:'         },
  mashallah:       { en:'MashaAllah!',               ar:'مَاشَاءَ اللَّهُ!',           ur:'ماشاء اللہ!',            tr:'MaşaAllah!'             },
  completeSet:     { en:'complete set',              ar:'طقم مكتمل',                   ur:'سیٹ مکمل',               tr:'set tamamlandı'         },

  // Dhikr Chains
  chainsTitle:     { en:'Dhikr Chains',              ar:'سلاسل الذكر',                 ur:'ذکر چین',                tr:'Zikir Zincirleri'       },
  howItWorks:      { en:'💡 How Dhikr Chains Work',  ar:'💡 كيف تعمل سلاسل الذكر',    ur:'💡 ذکر چین کیسے کام کرتی ہے', tr:'💡 Zikir Zincirleri Nasıl Çalışır' },
  joinChain:       { en:'Join Chain',                ar:'انضم للسلسلة',                ur:'چین میں شامل ہوں',       tr:'Zincire Katıl'          },
  joined:          { en:'✓ Joined',                  ar:'✓ منضم',                      ur:'✓ شامل',                 tr:'✓ Katıldı'              },
  recited:         { en:'+1 Recited',                ar:'+١ تم الذكر',                 ur:'+1 پڑھا',                tr:'+1 Okundu'              },
  myTarget:        { en:'My target:',                ar:'هدفي:',                       ur:'میرا ہدف:',              tr:'Hedefim:'               },
  myCount:         { en:'My count:',                 ar:'عدد الذكر:',                  ur:'میری گنتی:',             tr:'Sayım:'                 },
  communityGoal:   { en:'Community goal:',           ar:'هدف المجتمع:',                ur:'کمیونٹی کا ہدف:',        tr:'Topluluk hedefi:'       },
  recitations:     { en:'recitations',               ar:'مرات الذكر',                  ur:'تکرار',                  tr:'tekrar'                 },
  targetDone:      { en:'🏆 Target done!',           ar:'🏆 تم الهدف!',                ur:'🏆 ہدف مکمل!',           tr:'🏆 Hedef tamamlandı!'   },
  aboutChain:      { en:'▼ About this chain',        ar:'▼ عن هذه السلسلة',            ur:'▼ اس چین کے بارے میں',  tr:'▼ Bu zincir hakkında'   },
  hideInfo:        { en:'▲ Hide info',               ar:'▲ إخفاء',                     ur:'▲ چھپائیں',              tr:'▲ Gizle'                },
  newChain:        { en:'+ New',                     ar:'+ جديد',                      ur:'+ نئی',                  tr:'+ Yeni'                 },
  startChain:      { en:'Start a New Chain',         ar:'ابدأ سلسلة جديدة',            ur:'نئی چین شروع کریں',      tr:'Yeni Zincir Başlat'     },
  createChain:     { en:'Create Chain',              ar:'إنشاء سلسلة',                 ur:'چین بنائیں',             tr:'Zincir Oluştur'         },
  chainTitle:      { en:'Chain Title *',             ar:'عنوان السلسلة *',             ur:'چین کا عنوان *',         tr:'Zincir Başlığı *'       },
  arabicText:      { en:'Arabic Text',               ar:'النص العربي',                 ur:'عربی متن',               tr:'Arapça Metin'           },
  englishName:     { en:'English Name',              ar:'الاسم بالإنجليزية',           ur:'انگریزی نام',            tr:'İngilizce Adı'          },
  description:     { en:'Description',               ar:'الوصف',                       ur:'تفصیل',                  tr:'Açıklama'               },
  communityTarget: { en:'Community Target',          ar:'هدف المجتمع',                 ur:'کمیونٹی کا ہدف',         tr:'Topluluk Hedefi'        },
  community:       { en:'Community',                 ar:'مجتمع',                       ur:'کمیونٹی',                tr:'Topluluk'               },
  personal:        { en:'Personal',                  ar:'شخصي',                        ur:'ذاتی',                   tr:'Kişisel'                },

  // 99 Names
  namesTitle:      { en:'99 Names of Allah',         ar:'أسماء الله الحسنى',           ur:'اللہ کے 99 نام',         tr:'Allah\'ın 99 İsmi'      },
  memorized:       { en:'Memorized',                 ar:'محفوظة',                      ur:'یاد',                    tr:'Ezberlenmiş'            },
  progress:        { en:'Progress',                  ar:'التقدم',                      ur:'پیشرفت',                 tr:'İlerleme'               },
  tapFlip:         { en:'Tap to flip',               ar:'اضغط للقلب',                  ur:'پلٹنے کے لیے ٹیپ کریں', tr:'Çevirmek için dokun'     },
  markMemorized:   { en:'Mark memorized',            ar:'علم كمحفوظ',                  ur:'یاد شدہ نشان کریں',      tr:'Ezberlendi işaretle'    },
  unmark:          { en:'Unmark',                    ar:'إلغاء التعليم',               ur:'نشان ہٹائیں',            tr:'İşareti kaldır'         },

  // Quiz
  quizTitle:       { en:'Islamic Quiz',              ar:'اختبار إسلامي',               ur:'اسلامی کوئز',            tr:'İslami Quiz'            },
  quizSub:         { en:'Test your Islamic knowledge — 10 random questions, 15 seconds each.', ar:'اختبر معلوماتك الإسلامية — ١٠ أسئلة عشوائية', ur:'اسلامی علم کا امتحان — 10 سوالات', tr:'İslami bilginizi test edin — 10 rastgele soru, 15 saniye.' },
  startQuiz:       { en:'Start Quiz',                ar:'ابدأ الاختبار',               ur:'کوئز شروع کریں',         tr:'Quizi Başlat'           },
  playAgain:       { en:'Play Again',                ar:'العب مرة أخرى',               ur:'دوبارہ کھیلیں',          tr:'Tekrar Oyna'            },
  timeOut:         { en:'Time out',                  ar:'انتهى الوقت',                 ur:'وقت ختم',                tr:'Süre doldu'             },
  question:        { en:'Question',                  ar:'سؤال',                        ur:'سوال',                   tr:'Soru'                   },
  excellent:       { en:'Excellent!',                ar:'ممتاز!',                      ur:'شاندار!',                tr:'Mükemmel!'              },
  wellDone:        { en:'Well Done!',                ar:'أحسنت!',                      ur:'شاباش!',                 tr:'Aferin!'                },
  goodTry:         { en:'Good Try!',                 ar:'محاولة جيدة!',                ur:'اچھی کوشش!',             tr:'İyi Deneme!'            },
  keepLearning:    { en:'Keep Learning!',            ar:'واصل التعلم!',                ur:'سیکھتے رہیں!',           tr:'Öğrenmeye Devam Et!'    },
  correct:         { en:'correct',                   ar:'صحيح',                        ur:'درست',                   tr:'doğru'                  },
  q10Questions:    { en:'10 Questions',              ar:'١٠ أسئلة',                    ur:'10 سوالات',              tr:'10 Soru'                },
  q15s:           { en:'15s Per Q',                  ar:'١٥ث لكل سؤال',               ur:'15 سیکنڈ فی سوال',       tr:'Soru Başı 15s'          },
  qReview:         { en:'Score Review',              ar:'مراجعة النتيجة',              ur:'نتائج کا جائزہ',         tr:'Skor İncelemesi'        },

  // Habit Tracker
  habitsTitle:     { en:'Habit Tracker',             ar:'متابعة العبادات',             ur:'عبادت ٹریکر',            tr:'İbadet Takibi'          },
  habitsSub:       { en:"Today's worship",           ar:'عبادات اليوم',                ur:'آج کی عبادت',            tr:'Bugünün ibadetleri'     },
  todayProgress:   { en:"Today's Progress",          ar:'تقدم اليوم',                  ur:'آج کی پیشرفت',           tr:'Bugünkü İlerleme'       },
  streak:          { en:'streak',                    ar:'سلسلة أيام',                  ur:'سلسلہ',                  tr:'seri'                   },
  pts:             { en:'pts',                       ar:'نقاط',                        ur:'پوائنٹس',                tr:'puan'                   },
  habits_label:    { en:'habits',                    ar:'عبادات',                      ur:'عبادات',                 tr:'ibadetler'              },
  perfectDay:      { en:'Perfect Day! MashaAllah!',  ar:'يوم مثالي! ماشاء الله!',     ur:'کامل دن! ماشاء اللہ!',   tr:'Mükemmel Gün! MaşaAllah!' },
  perfectDaySub:   { en:'You completed all habits today. May Allah accept.', ar:'أتممت كل عبادات اليوم. تقبل الله.', ur:'آج کی تمام عبادات مکمل۔ اللہ قبول فرمائے۔', tr:'Bugün tüm ibadetleri tamamladınız. Allah kabul etsin.' },
  habitFajr:       { en:'Fajr Prayer',               ar:'صلاة الفجر',                  ur:'نمازِ فجر',               tr:'Sabah Namazı'           },
  habitDhuhr:      { en:'Dhuhr Prayer',               ar:'صلاة الظهر',                  ur:'نمازِ ظہر',               tr:'Öğle Namazı'            },
  habitAsr:        { en:'Asr Prayer',                 ar:'صلاة العصر',                  ur:'نمازِ عصر',               tr:'İkindi Namazı'          },
  habitMaghrib:    { en:'Maghrib Prayer',             ar:'صلاة المغرب',                 ur:'نمازِ مغرب',              tr:'Akşam Namazı'           },
  habitIsha:       { en:'Isha Prayer',                ar:'صلاة العشاء',                 ur:'نمازِ عشاء',              tr:'Yatsı Namazı'           },
  habitQuran:      { en:'Read Quran',                 ar:'قراءة القرآن',                ur:'قرآن پڑھنا',              tr:'Kuran Okumak'           },
  habitFasting:    { en:'Fasting',                    ar:'الصيام',                      ur:'روزہ',                    tr:'Oruç'                   },
  habitSadaqah:    { en:'Give Sadaqah',               ar:'الصدقة',                      ur:'صدقہ دینا',               tr:'Sadaka Vermek'          },
  habitMorning:    { en:'Morning Azkar',              ar:'أذكار الصباح',                ur:'صبح کے اذکار',            tr:'Sabah Zikirleri'        },
  habitEvening:    { en:'Evening Azkar',              ar:'أذكار المساء',                ur:'شام کے اذکار',            tr:'Akşam Zikirleri'        },
  habitTahajjud:   { en:'Tahajjud',                   ar:'صلاة التهجد',                 ur:'تہجد',                    tr:'Teheccüd'               },
  habitSalawat:    { en:'Send Salawat',               ar:'الصلاة على النبي ﷺ',           ur:'درود بھیجنا',             tr:'Salavat Getirmek'       },

  // Notifications
  notifsTitle:     { en:'Notifications',             ar:'الإشعارات',                   ur:'نوٹیفیکیشن',             tr:'Bildirimler'            },
  notifsSub:       { en:'Prayer & dhikr reminders',  ar:'تذكيرات الصلاة والذكر',       ur:'نماز اور ذکر کی یاد دہانی', tr:'Namaz ve zikir hatırlatmaları' },
  enableReminders: { en:'Enable Reminders',          ar:'تفعيل التذكيرات',             ur:'یاددہانی فعال کریں',     tr:'Hatırlatmaları Etkinleştir' },
  enableDesc:      { en:'Get reminded for every prayer, morning & evening azkar, and your daily dhikr.', ar:'احصل على تذكيرات لكل صلاة وأذكار الصباح والمساء.', ur:'ہر نماز، صبح و شام کے اذکار کی یاددہانی پائیں۔', tr:'Her namaz, sabah-akşam zikirler ve günlük zikirleriniz için hatırlatma alın.' },
  allowNotifs:     { en:'Allow Notifications',       ar:'السماح بالإشعارات',           ur:'نوٹیفیکیشن کی اجازت دیں', tr:'Bildirimlere İzin Ver'  },
  notifsEnabled:   { en:'✅ Notifications are enabled', ar:'✅ الإشعارات مفعّلة',       ur:'✅ نوٹیفیکیشن فعال ہیں',  tr:'✅ Bildirimler etkin'    },
  notifsBlocked:   { en:'Notifications are blocked.', ar:'الإشعارات محظورة.',         ur:'نوٹیفیکیشن بلاک ہیں۔',   tr:'Bildirimler engellendi.' },
  notifsBlockedFix:{ en:'Click the 🔒 lock icon → Notifications → Allow → Reload.', ar:'انقر على 🔒 ← الإشعارات ← سماح.', ur:'🔒 آئیکن پر کلک کریں → اجازت دیں۔', tr:'🔒 simgesine tıklayın → Bildirimler → İzin Ver.' },
  timeLabel:       { en:'Time:',                     ar:'الوقت:',                      ur:'وقت:',                   tr:'Saat:'                  },
  testBtn:         { en:'Test',                      ar:'اختبار',                      ur:'ٹیسٹ',                   tr:'Test'                   },
  savedSettings:   { en:'✓ Saved!',                  ar:'✓ تم الحفظ!',                 ur:'✓ محفوظ!',               tr:'✓ Kaydedildi!'          },
  saveSettings:    { en:'Save Reminder Settings',    ar:'حفظ إعدادات التذكير',         ur:'یاددہانی سیٹنگز محفوظ کریں', tr:'Hatırlatma Ayarlarını Kaydet' },
  howReminders:    { en:'📱 How reminders work:',    ar:'📱 كيف تعمل التذكيرات:',     ur:'📱 یاددہانی کیسے کام کرتی ہے:', tr:'📱 Hatırlatmalar nasıl çalışır:' },
  remindersNote:   { en:'Reminders appear as browser notifications. Install the app on your phone for best results.', ar:'تظهر التذكيرات كإشعارات متصفح. قم بتثبيت التطبيق للحصول على أفضل النتائج.', ur:'یاددہانیاں براؤزر نوٹیفیکیشن کے طور پر آتی ہیں۔ بہترین نتائج کے لیے ایپ انسٹال کریں۔', tr:'Hatırlatmalar tarayıcı bildirimi olarak görünür. En iyi sonuç için uygulamayı yükleyin.' },

  // Home interactive
  howAreYou:       { en:'How are you feeling today?',    ar:'كيف حالك اليوم؟',            ur:'آج آپ کیسا محسوس کر رہے ہیں؟', tr:'Bugün nasıl hissediyorsunuz?' },
  forYou:          { en:'A verse for you',               ar:'آية لك',                      ur:'آپ کے لیے ایک آیت',         tr:'Sana bir ayet'             },
  pickNumber:      { en:'Pick a Number',                 ar:'اختر رقماً',                  ur:'ایک نمبر چنیں',              tr:'Bir Numara Seç'            },
  pickNumberSub:   { en:'Enter 1–114 to reveal a verse from that Surah', ar:'أدخل ١–١١٤ لتظهر آية من تلك السورة', ur:'1–114 درج کریں اور اس سورت سے آیت دیکھیں', tr:'1–114 girin, o Sureden bir ayet görsün' },
  reveal:          { en:'Reveal ✨',                     ar:'اكشف ✨',                      ur:'ظاہر کریں ✨',               tr:'Göster ✨'                  },
  fromSurah:       { en:'From Surah',                    ar:'من سورة',                     ur:'سورت سے',                   tr:'Sureden'                   },
  verseOfDay:      { en:'Discover a Verse',               ar:'اكتشف آية',                   ur:'ایک آیت دریافت کریں',        tr:'Bir Ayet Keşfet'           },
  verseOfDaySub:   { en:'Enter a Surah number (1–114) and reveal a verse', ar:'أدخل رقم السورة (١–١١٤) واكتشف آية', ur:'سورت نمبر (1–114) ڈالیں اور آیت دیکھیں', tr:'Sure numarası girin (1–114) ve bir ayet keşfedin' },
  newVerse:        { en:'New',                           ar:'جديدة',                       ur:'نئی',                        tr:'Yeni'                      },
  verse:           { en:'Verse',                         ar:'آية',                         ur:'آیت',                        tr:'Ayet'                      },

  // Home
  dailyReminder:   { en:'Daily Reminder',            ar:'التذكير اليومي',              ur:'روزانہ یاددہانی',         tr:'Günlük Hatırlatma'      },
  timeRemaining:   { en:'Time remaining',            ar:'الوقت المتبقي',               ur:'باقی وقت',                tr:'Kalan süre'             },
  todayPrayersHdr: { en:"TODAY'S PRAYERS",           ar:'صلوات اليوم',                 ur:'آج کی نمازیں',            tr:'BUGÜNÜN NAMAZLARI'      },
  remMorning:      { en:'Start your morning with the remembrance of Allah.', ar:'ابدأ صباحك بذكر الله.', ur:'اپنی صبح اللہ کے ذکر سے شروع کریں۔', tr:'Sabahınıza Allah\'ın zikriyle başlayın.' },
  remNoon:         { en:'Keep your tongue moist with the remembrance of Allah.', ar:'أبقِ لسانك رطباً بذكر الله.', ur:'زبان کو اللہ کے ذکر سے تر رکھیں۔', tr:'Dilinizi Allah\'ın zikriyle ıslak tutun.' },
  remEvening:      { en:"Don't forget your evening azkar.", ar:'لا تنسَ أذكار المساء.', ur:'شام کے اذکار مت بھولیں۔', tr:'Akşam zikirlerinizi unutmayın.' },
  remNight:        { en:'End your day with dhikr and seek forgiveness.', ar:'اختم يومك بالذكر والاستغفار.', ur:'اپنا دن ذکر اور استغفار سے ختم کریں۔', tr:'Gününüzü zikir ve istiğfarla bitirin.' },

  // Prayer names
  Fajr:            { en:'Fajr',    ar:'الفجر',   ur:'فجر',    tr:'İmsak'   },
  Sunrise:         { en:'Sunrise', ar:'الشروق',  ur:'طلوع',   tr:'Güneş'   },
  Dhuhr:           { en:'Dhuhr',   ar:'الظهر',   ur:'ظہر',    tr:'Öğle'    },
  Asr:             { en:'Asr',     ar:'العصر',   ur:'عصر',    tr:'İkindi'  },
  Maghrib:         { en:'Maghrib', ar:'المغرب',  ur:'مغرب',   tr:'Akşam'   },
  Isha:            { en:'Isha',    ar:'العشاء',  ur:'عشاء',   tr:'Yatsı'   },

  // DhikrChains
  noTargetSet:     { en:'No target set',            ar:'لا هدف محدد',                  ur:'کوئی ہدف نہیں',           tr:'Hedef yok'              },
  recitationsToday:{ en:'recitations today',        ar:'مرات اليوم',                   ur:'آج کی تکرار',             tr:'bugün tekrar'           },
  joinedCount:     { en:'joined',                   ar:'منضم',                         ur:'شامل',                    tr:'katıldı'                },

  // How it works body lines
  howLine1:        { en:'Join a chain → tap +1 each time you recite → your count adds to the community total.', ar:'انضم إلى سلسلة ← اضغط +١ في كل مرة تذكر ← يُضاف عدادك إلى المجموع.', ur:'چین میں شامل ہوں ← ہر بار پڑھنے پر +1 دبائیں ← آپ کی گنتی کمیونٹی کل میں شامل ہوگی۔', tr:'Zincire katıl → her zikirde +1 bas → sayın topluma eklenir.' },
  howLine2:        { en:'Set a personal target (e.g. 100 Darood today) and track your own progress.', ar:'حدد هدفاً شخصياً (مثلاً ١٠٠ صلاة على النبي اليوم) وتابع تقدمك.', ur:'ذاتی ہدف مقرر کریں (مثلاً آج 100 درود) اور اپنی پیشرفت دیکھیں۔', tr:'Kişisel hedef belirle (ör. bugün 100 Darood) ve ilerlemeyi takip et.' },
  howLine3:        { en:'Start your own chain for any need — a dua for someone sick, a goal of 1000 Istighfar, or a dua for Gaza.', ar:'ابدأ سلسلتك الخاصة لأي حاجة — دعاء لمريض، أو هدف ١٠٠٠ استغفار، أو دعاء لغزة.', ur:'کسی بھی ضرورت کے لیے اپنی چین شروع کریں — کسی مریض کے لیے دعا، 1000 استغفار کا ہدف، یا غزہ کے لیے دعا۔', tr:'İstediğin amaç için kendi zincirinı başlat — hasta için dua, 1000 istiğfar hedefi veya Gazze için dua.' },
  howLine4:        { en:'Share the app link with friends so they can join your chain and multiply the reward together. 🤲', ar:'شارك رابط التطبيق مع أصدقائك ليشاركوا في سلسلتك ويتضاعف الأجر. 🤲', ur:'دوستوں کے ساتھ ایپ کا لنک شیئر کریں تاکہ وہ آپ کی چین میں شامل ہوں اور ثواب بڑھائیں۔ 🤲', tr:'Arkadaşlarınla app linkini paylaş, zincirine katılsınlar ve ödülü birlikte çoğaltsınlar. 🤲' },

  // Create chain modal labels
  chainTitlePlh:   { en:'e.g. Dua for my parents',  ar:'مثلاً: دعاء لوالديّ',          ur:'مثلاً: والدین کے لیے دعا', tr:'örn. Anne baba için dua' },
  chainArPlh:      { en:'Arabic text...',            ar:'النص العربي...',               ur:'عربی متن...',             tr:'Arapça metin...'        },
  chainEnPlh:      { en:'English name...',           ar:'الاسم بالإنجليزية...',         ur:'انگریزی نام...',          tr:'İngilizce adı...'       },
  chainDescPlh:    { en:'Why this chain?',           ar:'لماذا هذه السلسلة؟',           ur:'یہ چین کیوں؟',            tr:'Bu zincir neden?'       },
  goalLabel:       { en:'Goal (recitations)',        ar:'الهدف (عدد مرات الذكر)',       ur:'ہدف (تکرار)',             tr:'Hedef (tekrar)'         },
  noTargetShort:   { en:'No target',                ar:'بلا هدف',                      ur:'ہدف نہیں',                tr:'Hedef yok'              },

  // Error boundary
  errorBoundaryTitle: { en:'Something went wrong',    ar:'حدث خطأ ما',                  ur:'کچھ غلط ہو گیا',          tr:'Bir hata oluştu'        },
  errorBoundaryTap:   { en:'Tap to reload',           ar:'انقر لإعادة التحميل',          ur:'ری لوڈ کے لیے ٹیپ کریں', tr:'Yeniden yüklemek için dokunun' },
  retryLoad:          { en:'Retry',                   ar:'أعد المحاولة',                ur:'دوبارہ کوشش',             tr:'Tekrar Dene'            },
  illustrativeCounts: { en:'Illustrative counts',     ar:'أعداد توضيحية',               ur:'مثالی اعداد',              tr:'Örnek sayılar'          },
};

export const T = TR;

export function t(key, lang = 'en') {
  const entry = TR[key];
  if (!entry) return key;
  if (Array.isArray(entry)) return entry; // for greet array
  return entry[lang] || entry.en || key;
}

export function getGreeting(lang = 'en') {
  const h = new Date().getHours();
  const idx = h >= 4 && h < 12 ? 0 : h >= 12 && h < 17 ? 1 : h >= 17 && h < 21 ? 2 : 3;
  const arr = TR.greet[lang] || TR.greet.en;
  return arr[idx];
}
