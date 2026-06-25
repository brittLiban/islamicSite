export type LessonMeta = { title: string; duration: string; free?: boolean }
export type ModuleMeta = { title: string; lessons: LessonMeta[] }

export type CourseData = {
  id: string
  slug: string
  cat: string
  catLabel: string
  title: string
  arabic: string
  somali?: string
  coverColor: 'forest' | 'clay' | 'umber' | 'gold' | 'slate'
  stamp: string
  price: number
  duration: string
  lessons: number
  students: number
  rating: number
  level: string
  enrolled?: boolean
  progress?: number
  blurb: string
  lede?: string
}

export type TestimonialData = {
  body: string
  name: string
  title: string
  initial: string
}

export const instructor = {
  name: 'Sheikh Abdulhakim',
  title: 'Imam · Mufassir · Founder',
  initials: 'ع',
  bio: "Sheikh Abdulhakim is a graduate of the Islamic University of Madinah and holds an ijazah in the recitation of Ḥafṣ ʿan ʿĀṣim. He has spent the last fifteen years teaching the Qur'an, Fiqh, and the Arabic sciences in East Africa and the diaspora — and now, at last, on this platform.",
  courses: 8,
  students: 4612,
  rating: 4.9,
}

export const categories = [
  { id: 'all',     label: 'All',     count: 24 },
  { id: 'quran',   label: "Qur'an",  count: 8,  arabic: 'القرآن' },
  { id: 'arabic',  label: 'Arabic',  count: 5,  arabic: 'العربية' },
  { id: 'fiqh',    label: 'Fiqh',    count: 4,  arabic: 'الفقه' },
  { id: 'aqeedah', label: 'Aqeedah', count: 3,  arabic: 'العقيدة' },
  { id: 'seerah',  label: 'Seerah',  count: 2,  arabic: 'السيرة' },
  { id: 'hadith',  label: 'Hadith',  count: 2,  arabic: 'الحديث' },
]

export const courses: CourseData[] = [
  {
    id: 'tajweed-foundations', slug: 'tajweed-foundations',
    cat: 'quran', catLabel: "Qur'an",
    title: 'Foundations of Tajwīd', arabic: 'أساسيات التجويد', somali: 'Aasaaska Tajwiidka',
    coverColor: 'forest', stamp: 'I', price: 89, duration: '12 weeks', lessons: 32,
    students: 1248, rating: 4.9, level: 'Beginner', enrolled: true, progress: 0.42,
    blurb: 'The rules of pronunciation that shape every recitation — taught from the first letter.',
    lede: 'Begin where you are. Master the points of articulation, the qualities of the letters, and the patterns of stopping.',
  },
  {
    id: 'arabic-grammar-1', slug: 'arabic-grammar-1',
    cat: 'arabic', catLabel: 'Arabic',
    title: 'Classical Arabic I', arabic: 'العربية الفصحى', somali: 'Carabi: Qaybta Kowaad',
    coverColor: 'clay', stamp: 'II', price: 129, duration: '16 weeks', lessons: 48,
    students: 892, rating: 4.8, level: 'Beginner', enrolled: true, progress: 0.18,
    blurb: 'Nahw and sarf from first principles, taught the way the early madrasas taught.',
  },
  {
    id: 'fiqh-worship', slug: 'fiqh-worship',
    cat: 'fiqh', catLabel: 'Fiqh',
    title: 'Fiqh of Worship', arabic: 'فقه العبادات', somali: 'Fiqhi cibaadada',
    coverColor: 'umber', stamp: 'III', price: 99, duration: '10 weeks', lessons: 28,
    students: 1431, rating: 4.9, level: 'All levels',
    blurb: 'Wudu, prayer, fasting, zakat, hajj — the four schools compared with care.',
  },
  {
    id: 'aqeedah-tahawiyyah', slug: 'aqeedah-tahawiyyah',
    cat: 'aqeedah', catLabel: 'Aqeedah',
    title: 'Al-ʿAqīdah aṭ-Ṭaḥāwiyyah', arabic: 'العقيدة الطحاوية', somali: 'Caqiidada Ṭaḥaawiyyah',
    coverColor: 'forest', stamp: 'IV', price: 109, duration: '14 weeks', lessons: 36,
    students: 624, rating: 5.0, level: 'Intermediate',
    blurb: 'A careful reading of the great primer of Sunni creed.',
  },
  {
    id: 'seerah-meccan', slug: 'seerah-meccan',
    cat: 'seerah', catLabel: 'Seerah',
    title: 'The Meccan Years', arabic: 'السيرة المكية', somali: 'Sennada Maka',
    coverColor: 'gold', stamp: 'V', price: 79, duration: '8 weeks', lessons: 22,
    students: 2104, rating: 4.9, level: 'All levels', enrolled: true, progress: 0.78,
    blurb: 'The first thirteen years of the prophetic mission, narrated with the major sources side by side.',
  },
  {
    id: 'hadith-nawawi', slug: 'hadith-nawawi',
    cat: 'hadith', catLabel: 'Hadith',
    title: 'Forty Hadith of an-Nawawī', arabic: 'الأربعون النووية',
    coverColor: 'slate', stamp: 'VI', price: 69, duration: '10 weeks', lessons: 40,
    students: 3210, rating: 4.9, level: 'All levels',
    blurb: 'Forty narrations the scholars considered the pillars of the religion.',
  },
  {
    id: 'tafsir-juz-amma', slug: 'tafsir-juz-amma',
    cat: 'quran', catLabel: "Qur'an",
    title: "Tafsīr of Juz' ʿAmma", arabic: "تفسير جزء عمّ",
    coverColor: 'umber', stamp: 'VII', price: 89, duration: '12 weeks', lessons: 30,
    students: 1876, rating: 4.9, level: 'All levels',
    blurb: 'The short surahs of the thirtieth juz — recited, parsed, and explained.',
  },
  {
    id: 'arabic-grammar-2', slug: 'arabic-grammar-2',
    cat: 'arabic', catLabel: 'Arabic',
    title: 'Classical Arabic II', arabic: 'العربية الفصحى II',
    coverColor: 'clay', stamp: 'VIII', price: 139, duration: '18 weeks', lessons: 54,
    students: 412, rating: 4.8, level: 'Intermediate',
    blurb: 'Continuing from Classical Arabic I — balagha, advanced sarf, and reading classical texts.',
  },
]

export const values = [
  { icon: 'Book',   title: 'One Sheikh, one method', body: 'No rotating instructors. One chain of transmission — from his teachers to you.' },
  { icon: 'Lamp',   title: 'Classical sciences', body: 'Tajwīd, Nahw, Fiqh, ʿAqīdah, Seerah — the core of the traditional curriculum.' },
  { icon: 'Globe',  title: 'Trilingual', body: 'Courses delivered in English, with Arabic text and Somali translation throughout.' },
  { icon: 'Ribbon', title: 'Ijazah upon completion', body: 'Finish a course and pass the oral exam — earn a certificate of study, hand-signed.' },
]

export const curricula: Record<string, ModuleMeta[]> = {
  'tajweed-foundations': [
    { title: 'The Science of Tajwīd', lessons: [
      { title: 'What is Tajwīd?', duration: '22 min', free: true },
      { title: 'Virtues of correct recitation', duration: '18 min', free: true },
      { title: 'Overview of the course', duration: '12 min', free: true },
    ]},
    { title: 'Makhārij al-Ḥurūf — Points of Articulation', lessons: [
      { title: 'Al-Jawf — the empty space', duration: '28 min' },
      { title: 'Al-Ḥalq — the throat', duration: '34 min' },
      { title: 'Al-Lisān — the tongue', duration: '42 min' },
      { title: 'Al-Shafatān — the lips', duration: '26 min' },
    ]},
    { title: 'Sifāt al-Ḥurūf — Letter Characteristics', lessons: [
      { title: 'Sifāt lāzimah — permanent characteristics', duration: '36 min' },
      { title: 'Sifāt ʿāriḍah — temporary characteristics', duration: '30 min' },
      { title: 'Al-Qalqalah', duration: '24 min' },
      { title: 'Al-Ghunnah', duration: '28 min' },
    ]},
    { title: 'Rules of Nūn Sākinah and Tanwīn', lessons: [
      { title: 'Al-Iẓhār', duration: '22 min' },
      { title: 'Al-Idghām', duration: '30 min' },
      { title: 'Al-Iqlab', duration: '18 min' },
      { title: 'Al-Ikhfāʾ', duration: '26 min' },
    ]},
    { title: 'Al-Madd — Prolongation', lessons: [
      { title: 'Al-Madd al-Ṭabīʿī', duration: '20 min' },
      { title: 'Al-Madd al-Muttaṣil', duration: '24 min' },
      { title: 'Al-Madd al-Munfaṣil', duration: '22 min' },
      { title: 'Al-Madd al-Lāzim', duration: '28 min' },
    ]},
    { title: 'Al-Waqf — Stopping Rules', lessons: [
      { title: 'Types of stopping', duration: '30 min' },
      { title: 'Stopping signs in the muṣḥaf', duration: '20 min' },
      { title: 'Al-Sakt', duration: '15 min' },
    ]},
    { title: 'Practical Recitation', lessons: [
      { title: 'Sūrat al-Fātiḥah — full analysis', duration: '45 min' },
      { title: 'Sūrat al-Baqarah (1–20)', duration: '52 min' },
      { title: 'Final review and assessment', duration: '38 min' },
    ]},
  ],
  'arabic-grammar-1': [
    { title: 'Foundations of Arabic Grammar', lessons: [
      { title: 'What is Naḥw?', duration: '20 min', free: true },
      { title: 'The three types of words: ism, fiʿl, ḥarf', duration: '28 min', free: true },
      { title: 'Iʿrāb — grammatical inflection', duration: '32 min', free: true },
    ]},
    { title: 'The Nominal Sentence', lessons: [
      { title: 'Al-Mubtadaʾ and al-Khabar', duration: '36 min' },
      { title: 'Types of khabar', duration: '28 min' },
      { title: 'Quasi-sentences as khabar', duration: '24 min' },
    ]},
    { title: 'Definiteness and Indefiniteness', lessons: [
      { title: 'Al-Maʿrifah and al-Nakira', duration: '30 min' },
      { title: 'Al-Iḍāfah — the construct state', duration: '38 min' },
      { title: 'The definite article al-', duration: '20 min' },
    ]},
    { title: 'The Verbal Sentence', lessons: [
      { title: 'Al-Fiʿl and al-Fāʿil', duration: '42 min' },
      { title: 'Al-Mafʿūl bihi', duration: '28 min' },
      { title: 'The passive voice', duration: '34 min' },
    ]},
    { title: 'Ṣarf — Morphology', lessons: [
      { title: 'The trilateral root', duration: '26 min' },
      { title: 'Patterns of the maṣdar', duration: '38 min' },
      { title: 'Ism al-fāʿil and ism al-mafʿūl', duration: '30 min' },
    ]},
    { title: 'Reading Classical Texts', lessons: [
      { title: "Al-Ājurrūmiyyah — Bāb al-Kalām", duration: '40 min' },
      { title: "Al-Ājurrūmiyyah — Bāb al-Iʿrāb", duration: '44 min' },
      { title: 'Parsing drill — selected Quranic verses', duration: '50 min' },
    ]},
  ],
  'fiqh-worship': [
    { title: 'Introduction to Islamic Law', lessons: [
      { title: 'The four schools of law', duration: '25 min', free: true },
      { title: 'How to study Fiqh', duration: '18 min', free: true },
    ]},
    { title: 'Ṭahārah — Purification', lessons: [
      { title: 'Types of water and their rulings', duration: '30 min' },
      { title: 'Wuḍūʾ — ablution', duration: '42 min' },
      { title: 'Ghusl — full ritual bath', duration: '36 min' },
      { title: 'Tayammum — dry purification', duration: '28 min' },
    ]},
    { title: 'Al-Ṣalāh — Prayer', lessons: [
      { title: 'Conditions and pillars of prayer', duration: '44 min' },
      { title: 'The times of the five prayers', duration: '30 min' },
      { title: 'The Friday prayer', duration: '38 min' },
      { title: 'Prayer of the sick and traveller', duration: '34 min' },
    ]},
    { title: 'Al-Ṣawm — Fasting', lessons: [
      { title: 'The rulings of Ramaḍān', duration: '40 min' },
      { title: 'What breaks the fast', duration: '36 min' },
      { title: 'Expiation and missed fasts', duration: '28 min' },
    ]},
    { title: 'Al-Zakāh — Almsgiving', lessons: [
      { title: 'Nisāb and calculation', duration: '38 min' },
      { title: 'Recipients of zakāh', duration: '30 min' },
    ]},
    { title: 'Al-Ḥajj — Pilgrimage', lessons: [
      { title: 'Conditions and pillars of Ḥajj', duration: '42 min' },
      { title: "ʿUmrah — the lesser pilgrimage", duration: '28 min' },
    ]},
  ],
  'aqeedah-tahawiyyah': [
    { title: 'Introduction to the Text', lessons: [
      { title: 'Imam al-Ṭaḥāwī and his time', duration: '22 min', free: true },
      { title: 'The importance of studying ʿAqīdah', duration: '18 min', free: true },
    ]},
    { title: 'The Oneness of God', lessons: [
      { title: 'Tawḥīd al-Rubūbiyyah', duration: '38 min' },
      { title: 'Tawḥīd al-Ulūhiyyah', duration: '42 min' },
      { title: "The Divine Attributes — God's names and qualities", duration: '50 min' },
    ]},
    { title: "The Prophets and Messengers", lessons: [
      { title: 'Belief in the prophets', duration: '34 min' },
      { title: 'The seal of the prophets ﷺ', duration: '40 min' },
      { title: "The Prophet's ﷺ night journey", duration: '30 min' },
    ]},
    { title: 'The Last Day', lessons: [
      { title: 'The signs of the Hour', duration: '36 min' },
      { title: 'The resurrection and judgement', duration: '42 min' },
      { title: 'Paradise and Hellfire', duration: '38 min' },
    ]},
    { title: 'Faith and Its Pillars', lessons: [
      { title: 'The definition of īmān', duration: '30 min' },
      { title: 'The angels and the unseen', duration: '28 min' },
      { title: 'Divine decree — al-Qadar', duration: '44 min' },
    ]},
  ],
  'seerah-meccan': [
    { title: 'Arabia Before the Prophet ﷺ', lessons: [
      { title: 'The Arabian Peninsula', duration: '24 min', free: true },
      { title: 'Makkah and the Quraysh', duration: '28 min', free: true },
    ]},
    { title: 'Birth and Early Life', lessons: [
      { title: 'The Year of the Elephant', duration: '30 min' },
      { title: 'Birth and early childhood', duration: '26 min' },
      { title: 'The opening of the chest', duration: '22 min' },
    ]},
    { title: 'The Call Begins', lessons: [
      { title: 'The first revelation', duration: '36 min' },
      { title: 'The first believers', duration: '28 min' },
      { title: 'The secret call', duration: '24 min' },
      { title: 'The public call', duration: '30 min' },
    ]},
    { title: 'Persecution and Steadfastness', lessons: [
      { title: 'The early persecution', duration: '38 min' },
      { title: 'The migration to Abyssinia', duration: '32 min' },
      { title: 'The Year of Sorrow', duration: '34 min' },
    ]},
    { title: 'The Night Journey and Ascension', lessons: [
      { title: "Al-Isrāʾ — the night journey", duration: '40 min' },
      { title: 'Al-Miʿrāj — the ascension', duration: '38 min' },
    ]},
    { title: 'Preparation for Hijra', lessons: [
      { title: 'The pledges of ʿAqabah', duration: '30 min' },
      { title: 'The migration to Madinah', duration: '44 min' },
    ]},
  ],
  'hadith-nawawi': [
    { title: 'Introduction', lessons: [
      { title: 'Imam al-Nawawī and the Forty Hadith', duration: '20 min', free: true },
      { title: 'How to study hadith', duration: '16 min', free: true },
    ]},
    { title: 'Hadith 1–10: Foundations of the Religion', lessons: [
      { title: 'Hadith 1: Actions by intentions', duration: '36 min' },
      { title: 'Hadith 2: Islam, Iman, Ihsan', duration: '44 min' },
      { title: 'Hadith 3: The pillars of Islam', duration: '38 min' },
      { title: 'Hadith 4–6: Creation and divine will', duration: '42 min' },
      { title: 'Hadith 7–10: Religion is sincerity', duration: '40 min' },
    ]},
    { title: 'Hadith 11–20: Character and Conduct', lessons: [
      { title: 'Hadith 11–13: Leaving the doubtful', duration: '38 min' },
      { title: 'Hadith 14–16: Inviolability of a Muslim', duration: '36 min' },
      { title: 'Hadith 17–20: Excellence of character', duration: '42 min' },
    ]},
    { title: 'Hadith 21–30: Social and Spiritual Duties', lessons: [
      { title: 'Hadith 21–23: Commanding good', duration: '38 min' },
      { title: 'Hadith 24–26: Prohibition of wrongdoing', duration: '40 min' },
      { title: 'Hadith 27–30: Righteousness is good character', duration: '36 min' },
    ]},
    { title: 'Hadith 31–40: Spiritual Refinement', lessons: [
      { title: 'Hadith 31–33: Zuhd and detachment', duration: '38 min' },
      { title: 'Hadith 34–36: Trust and reliance on God', duration: '34 min' },
      { title: 'Hadith 37–40: The mercy of God', duration: '40 min' },
    ]},
  ],
  'tafsir-juz-amma': [
    { title: 'Introduction to Tafsīr', lessons: [
      { title: 'The science of Tafsīr', duration: '22 min', free: true },
      { title: 'Approaching the thirtieth juz', duration: '16 min', free: true },
    ]},
    { title: 'The Early Meccan Surahs', lessons: [
      { title: "Sūrat al-Nāzʿāt", duration: '34 min' },
      { title: "Sūrat ʿAbasa", duration: '30 min' },
      { title: "Sūrat al-Takwīr", duration: '28 min' },
      { title: "Sūrat al-Infiṭār and al-Muṭaffifīn", duration: '36 min' },
    ]},
    { title: 'Promises and Warnings', lessons: [
      { title: "Sūrat al-Inshiqāq and al-Burūj", duration: '32 min' },
      { title: "Sūrat al-Ṭāriq and al-Aʿlā", duration: '28 min' },
      { title: "Sūrat al-Ghāshiyah", duration: '26 min' },
    ]},
    { title: 'The Short Makkan Surahs', lessons: [
      { title: "Sūrat al-Fajr and al-Balad", duration: '36 min' },
      { title: "Sūrat al-Shams and al-Layl", duration: '34 min' },
      { title: "Sūrat al-Ḍuḥā and al-Sharḥ", duration: '30 min' },
      { title: "Sūrat al-Tīn and al-ʿAlaq", duration: '38 min' },
    ]},
    { title: 'The Final Surahs', lessons: [
      { title: "Sūrat al-Qadr and al-Bayyinah", duration: '32 min' },
      { title: "Sūrat al-Zalzalah through al-ʿĀdiyāt", duration: '36 min' },
      { title: "Sūrat al-Qāriʿah through al-Humazah", duration: '34 min' },
      { title: "Sūrat al-Fīl through al-Kāfirūn", duration: '38 min' },
      { title: "Sūrat al-Naṣr, al-Masad, al-Ikhlāṣ, al-Falaq, al-Nās", duration: '44 min' },
    ]},
  ],
  'arabic-grammar-2': [
    { title: 'Review and Orientation', lessons: [
      { title: 'Review of Classical Arabic I', duration: '30 min', free: true },
      { title: 'What we will cover in Part II', duration: '18 min', free: true },
    ]},
    { title: 'Advanced Naḥw', lessons: [
      { title: 'The absolute object (al-mafʿūl al-muṭlaq)', duration: '36 min' },
      { title: 'The circumstantial clause (ḥāl)', duration: '38 min' },
      { title: 'Specification (tamyīz)', duration: '30 min' },
      { title: 'The exception (istithnāʾ)', duration: '34 min' },
    ]},
    { title: 'Balāghah — Rhetoric', lessons: [
      { title: 'Tasbīh — simile', duration: '32 min' },
      { title: "Istiʿārah — metaphor", duration: '38 min' },
      { title: "Kināyah — metonymy", duration: '28 min' },
    ]},
    { title: 'Advanced Ṣarf', lessons: [
      { title: 'The augmented verb forms (II–X)', duration: '50 min' },
      { title: 'Weak verbs — the hollow and defective', duration: '44 min' },
      { title: 'Broken plurals — the major patterns', duration: '40 min' },
    ]},
    { title: 'Reading Classical Texts', lessons: [
      { title: 'Selections from Ibn Kathīr', duration: '55 min' },
      { title: 'Selections from Ṣaḥīḥ al-Bukhārī', duration: '52 min' },
      { title: 'Selections from al-Ghazālī', duration: '48 min' },
      { title: 'Final parsing examination', duration: '60 min' },
    ]},
  ],
}

export const testimonials: TestimonialData[] = [
  {
    body: "I have studied with many online teachers. This is the first time the pace felt like a real madrasa. Sheikh Abdulhakim doesn't rush. He expects you to sit with it.",
    name: 'Fatima A.',
    title: 'Enrolled student · Tajwīd',
    initial: 'F',
  },
  {
    body: "My Arabic had stalled for years. After three months with Classical Arabic I, I can finally parse a sentence from Ibn Kathīr. The drills are brutal and exactly right.",
    name: 'Yusuf M.',
    title: 'Enrolled student · Arabic',
    initial: 'Y',
  },
  {
    body: "The Fiqh of Worship course answered questions I had been too embarrassed to ask anyone. The four-school comparison is handled with care and no polemics.",
    name: 'Amina H.',
    title: 'Enrolled student · Fiqh',
    initial: 'A',
  },
]
