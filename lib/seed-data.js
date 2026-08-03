/**
 * Canonical content for Elham Online Education.
 *
 * This module is the single source of truth for the site's content. It is used
 * two ways:
 *   1. `npm run seed` writes it into MongoDB.
 *   2. `lib/data.js` falls back to it when MongoDB is unreachable, so the site
 *      always renders (useful for local dev and static previews).
 *
 * Note: this is a showcase site for a non-profit educational institution.
 * Nothing is sold online — every course is free, with a 50% scholarship offered
 * where a programme carries an unavoidable external cost. There is no cart, no
 * checkout and no payment processing anywhere in this project.
 */

export const site = {
  name: 'Elham Online Education',
  nameDari: 'الهام',
  tagline: 'Free Online Education for Afghan Girls and Women',
  description:
    'Elham Online Education is a non-profit online educational institution providing free, accessible learning for Afghan girls and women — and for Afghan youth — so they can build a better future for themselves and their communities through education, skills and continuous learning.',
  email: 'info@elhamonline.af',
  supportEmail: 'support@elhamonline.af',
  phone: '+93 79 123 4567',
  whatsapp: '+93 79 123 4567',
  address: 'Kolola Pushta Road, Karte Char, District 3, Kabul, Afghanistan',
  hours: 'Saturday – Thursday, 8:00 – 17:00 (Kabul time)',
  social: {
    facebook: 'https://facebook.com/elhamonline',
    x: 'https://x.com/elhamonline',
    instagram: 'https://instagram.com/elhamonline',
    youtube: 'https://youtube.com/@elhamonline',
  },
  languages: ['Dari (دری)', 'Pashto (پښتو)', 'English'],
};

export const stats = [
  { label: 'Girls & Women Learning', value: 24800, suffix: '+' },
  { label: 'Free Courses', value: 120, suffix: '+' },
  { label: 'Volunteer Teachers', value: 45, suffix: '' },
  { label: 'Provinces Reached', value: 34, suffix: '' },
];

/**
 * About Us — supplied by the institution in Dari, with an English rendering
 * beside it. Both are shown on the About page; the Dari is the original.
 */
export const about = {
  whatIs: {
    heading: { en: 'What is Elham Online Education?', fa: 'Elham Online Education چیست؟' },
    fa: 'Elham Online Education یک نهاد آموزشی آنلاین است که با هدف فراهم‌سازی آموزش رایگان، و قابل دسترس برای دختران و زنان افغان ایجاد شده است. این نهاد در راستای توانمندسازی دختران و زنان تأسیس شده تا آنان بتوانند از طریق آموزش، مهارت‌آموزی و یادگیری، آینده‌ای بهتر برای خود و جامعه‌شان بسازند. این نهاد از طریق آموزش‌های آنلاین تلاش می‌کند فرصت‌های یادگیری را برای کسانی فراهم سازد که به دلیل شرایط اقتصادی، اجتماعی یا محدودیت‌های موجود از آموزش محروم شده‌اند.',
    en: 'Elham Online Education is an online educational institution created to provide free and accessible education for Afghan girls and women. It was founded to empower girls and women so that, through education, skills training and learning, they can build a better future for themselves and for their communities. Through online teaching, the institution works to open learning opportunities to those who have been deprived of education by economic or social circumstances, or by the restrictions placed on them.',
  },
  why: {
    heading: { en: 'Why was it founded?', fa: 'چرا تأسیس شد؟' },
    icon: 'target',
    fa: 'این نهاد به هدف پاسخ‌گویی به نیاز جدی آموزش آنلاین و حمایت از دخترانی تأسیس شد که در نقاط دوردست زندگی می‌کنند و دسترسی کافی به آموزش حضوری برایشان فراهم نیست. هدف اصلی، ایجاد یک محیط آموزشی امن، ساده و الهام‌بخش برای یادگیری، رشد مهارت‌ها و توانمندسازی دختران و زنان افغان از طریق آموزش است.',
    en: 'Elham was founded to answer a serious need for online education, and to support girls living in remote areas where in-person schooling is not adequately available to them. The central aim is a safe, simple and inspiring learning environment for study, for the growth of skills, and for the empowerment of Afghan girls and women through education.',
  },
  whoFor: {
    heading: { en: 'Who uses it?', fa: 'چه کسانی از خدمات آن استفاده می‌کنند؟' },
    icon: 'users',
    fa: 'خدمات Elham Online Education برای دختران و زنان افغان و همچنان جوانان افغان طراحی شده است، به‌ویژه کسانی که:',
    en: 'The services of Elham Online Education are designed for Afghan girls and women, and for Afghan youth — especially those who:',
    points: [
      { fa: 'از آموزش رسمی محروم هستند', en: 'have been deprived of formal education' },
      { fa: 'به دنبال یادگیری مهارت‌های جدید اند', en: 'are seeking to learn new skills' },
      {
        fa: 'می‌خواهند در آینده تحصیلی یا شغلی خود پیشرفت کنند',
        en: 'want to progress in their studies or their working life',
      },
      {
        fa: 'به دنبال توانمندسازی از طریق آموزش و ایجاد فرصت‌های بهتر برای زندگی خود هستند',
        en: 'are looking for empowerment through education, and better opportunities in their own lives',
      },
    ],
  },
  mission: {
    heading: { en: 'Mission', fa: 'مأموریت' },
    icon: 'target',
    fa: 'مأموریت Elham Online Education ارائه آموزش آنلاین رایگان، و در صورت نیاز به شکل بورسیه ۵۰٪ باکیفیت و قابل دسترس برای دختران و زنان افغان است تا آنان بتوانند از طریق آموزش، مهارت‌آموزی و یادگیری مستمر توانمند شوند و در مسیر ساختن آینده‌ای بهتر برای خود و جامعه‌شان گام بردارند.',
    en: 'The mission of Elham Online Education is to provide free online education — and, where needed, a 50% scholarship — that is high in quality and accessible to Afghan girls and women, so that through education, skills training and continuous learning they become empowered and take real steps towards building a better future for themselves and their communities.',
  },
  vision: {
    heading: { en: 'Vision', fa: 'چشم‌انداز' },
    icon: 'globe',
    fa: 'چشم‌انداز Elham Online Education این است که در ۵ تا ۱۰ سال آینده به یک نهاد پیشرو در زمینه آموزش آنلاین برای دختران و زنان جهان تبدیل شود. این نهاد می‌خواهد یک سیستم آموزشی گسترده، پایدار و قابل دسترس ایجاد کند که بتواند هزاران دختر و زن را در مسیر آموزش، مهارت‌آموزی و توانمندسازی حمایت کند و آنان را به افراد مستقل، آگاه و مؤثر در جامعه تبدیل نماید.',
    en: 'Elham Online Education’s vision is to become, within the next five to ten years, a leading institution in online education for girls and women worldwide. The institution intends to build a broad, sustainable and accessible educational system capable of supporting thousands of girls and women through study, skills training and empowerment — so that they become independent, informed and effective members of their societies.',
  },
};

export const categories = [
  {
    slug: 'design',
    name: 'Design',
    icon: 'palette',
    description: 'Graphic design, branding, UI/UX and the tools studios actually use.',
    courseCount: 18,
  },
  {
    slug: 'development',
    name: 'Development',
    icon: 'code',
    description: 'Web and mobile development, from your first HTML tag to full-stack apps.',
    courseCount: 24,
  },
  {
    slug: 'marketing',
    name: 'Marketing',
    icon: 'megaphone',
    description: 'Social media, content and ads for Afghan businesses and NGOs.',
    courseCount: 14,
  },
  {
    slug: 'it-software',
    name: 'IT & Software',
    icon: 'monitor',
    description: 'Computer literacy, ICDL, spreadsheets, networking and cybersecurity basics.',
    courseCount: 21,
  },
  {
    slug: 'business',
    name: 'Business',
    icon: 'briefcase',
    description: 'Freelancing, accounting, project management and small business skills.',
    courseCount: 12,
  },
  {
    slug: 'kankor-prep',
    name: 'Kankor Prep',
    icon: 'graduation',
    description: 'Full preparation for the national university entrance exam (کانکور).',
    courseCount: 16,
  },
  {
    slug: 'languages',
    name: 'Languages',
    icon: 'globe',
    description: 'English, Turkish and German for study, work and scholarships.',
    courseCount: 11,
  },
  {
    slug: 'photography',
    name: 'Photography',
    icon: 'camera',
    description: 'Photography, photo editing and visual storytelling on any camera.',
    courseCount: 4,
  },
];

export const instructors = [
  {
    slug: 'najibullah-karimi',
    name: 'Najibullah Karimi',
    role: 'Lead English Teacher',
    bio: 'Fifteen years teaching English in Kabul, including six years preparing students for IELTS and scholarship interviews. Has taught more than 4,000 learners.',
    location: 'Kabul',
    courses: 7,
    learners: 6400,
  },
  {
    slug: 'farhad-sadat',
    name: 'Farhad Sadat',
    role: 'Software Engineer, Volunteer',
    bio: 'Full-stack engineer working remotely with teams abroad. Records his courses in the evenings so that girls who cannot attend a training centre can still learn to build software.',
    location: 'Herat',
    courses: 5,
    learners: 3900,
  },
  {
    slug: 'zahra-rahimi',
    name: 'Zahra Rahimi',
    role: 'Graphic Designer & Volunteer Teacher',
    bio: 'Brand designer for Afghan organisations. Believes a design education should never depend on an expensive laptop or a paid subscription.',
    location: 'Kabul',
    courses: 4,
    learners: 2750,
  },
  {
    slug: 'rahmatullah-nazari',
    name: 'Rahmatullah Nazari',
    role: 'Mathematics Teacher, Kankor Prep',
    bio: 'Prepared Kankor candidates for eleven years. His students have entered medicine and engineering faculties across the country.',
    location: 'Mazar-i-Sharif',
    courses: 6,
    learners: 8100,
  },
  {
    slug: 'sohaila-ahmadi',
    name: 'Sohaila Ahmadi',
    role: 'Digital Skills Teacher',
    bio: 'Teaches the online skills that let a woman run a small business from home — on a modest budget and a slow connection.',
    location: 'Kabul',
    courses: 3,
    learners: 2100,
  },
  {
    slug: 'basira-hakimi',
    name: 'Basira Hakimi',
    role: 'ICDL Trainer',
    bio: 'Certified ICDL trainer who has taught computer literacy in schools and women’s training centres since 2014.',
    location: 'Bamyan',
    courses: 4,
    learners: 3300,
  },
  {
    slug: 'mustafa-jalali',
    name: 'Mustafa Jalali',
    role: 'Online Work Mentor, Volunteer',
    bio: 'Works with international clients online. Mentors learners on finding remote work they can do from home, which for many of our students is the only work available.',
    location: 'Kabul',
    courses: 2,
    learners: 1850,
  },
  {
    slug: 'latifa-noori',
    name: 'Latifa Noori',
    role: 'Photographer & Volunteer Teacher',
    bio: 'Documentary photographer whose work on daily life in Afghanistan has been published internationally.',
    location: 'Herat',
    courses: 2,
    learners: 980,
  },
  {
    slug: 'ishaq-barakzai',
    name: 'Ishaq Barakzai',
    role: 'Data & AI Teacher',
    bio: 'Data scientist and university lecturer. Explains machine learning without assuming a mathematics degree.',
    location: 'Kabul',
    courses: 3,
    learners: 1600,
  },
  {
    slug: 'marwa-amiri',
    name: 'Marwa Amiri',
    role: 'Product Designer, Volunteer',
    bio: 'Designs mobile products for teams in the region. Teaches UI/UX using real project briefs, and reviews every learner’s final portfolio herself.',
    location: 'Kabul',
    courses: 3,
    learners: 2400,
  },
  {
    slug: 'ahmad-wali-sediqi',
    name: 'Ahmad Wali Sediqi',
    role: 'Data Analyst, Volunteer',
    bio: 'Monitoring and evaluation analyst for humanitarian programmes. Spreadsheets are his first language.',
    location: 'Jalalabad',
    courses: 3,
    learners: 2900,
  },
  {
    slug: 'naqibullah-wardak',
    name: 'Naqibullah Wardak',
    role: 'Translator & Language Teacher',
    bio: 'Professional Pashto–Dari–English translator for media and legal organisations for over a decade.',
    location: 'Kabul',
    courses: 2,
    learners: 1200,
  },
];

/** Lesson durations are filled in by `distributeDurations` once the course total is known. */
const lessonSet = (titles) => titles.map((t, i) => ({ title: t, duration: 0, preview: i === 0 }));

export const courses = [
  {
    slug: 'english-for-beginners',
    title: 'English for Beginners',
    subtitle: 'From the alphabet to everyday conversation',
    category: 'languages',
    categoryName: 'Languages',
    instructor: 'Najibullah Karimi',
    instructorSlug: 'najibullah-karimi',
    level: 'Beginner',
    minutes: 320,
    hours: 5.3,
    access: 'Free',
    language: 'Dari & English',
    type: 'Self Guided',
    rating: 4.9,
    reviews: 412,
    students: 6120,
    featured: true,
    popular: true,
    accent: 'brand',
    icon: 'globe',
    excerpt:
      'Start English from zero. Reading, writing, listening and speaking taught in Dari, with practice you can do on a phone.',
    description:
      'This is the course we recommend to every learner who says “I want to study, but my English is weak.” Every explanation is given in Dari, every new word is written and pronounced slowly, and every lesson ends with a short exercise you can finish in ten minutes. By the end you can introduce yourself, ask for what you need, read simple English text and understand the basics of grammar well enough to continue into our intermediate track.',
    requirements: [
      'No previous English study required — we begin with the alphabet.',
      'A phone or computer and roughly 30 minutes a day.',
      'A notebook. Writing by hand is part of the homework.',
    ],
    outcomes: [
      'Read and write the English alphabet and 800 common words',
      'Introduce yourself and hold a simple conversation',
      'Understand present, past and future tense',
      'Sit our placement test and move into Intermediate English',
    ],
    included: [
      { label: '4.5 Hrs of Video Instruction', icon: 'play' },
      { label: '12 Written Lesson Notes (PDF)', icon: 'doc' },
      { label: '30 Practice Worksheets', icon: 'file' },
      { label: 'Certificate of Completion', icon: 'award' },
    ],
    curriculum: [
      {
        title: 'Getting Started',
        summary: 'Letters, sounds and your first fifty words.',
        lessons: lessonSet([
          'How this course works',
          'The English alphabet',
          'Vowel sounds you will hear every day',
          'Greetings and introductions',
        ]),
      },
      {
        title: 'Words for Daily Life',
        summary: 'The vocabulary you need in a shop, a clinic and a classroom.',
        lessons: lessonSet([
          'Numbers, prices and bargaining',
          'Family and relationships',
          'Food, market and money',
          'Directions around the city',
        ]),
      },
      {
        title: 'Grammar Without Fear',
        summary: 'The three tenses that cover most of what you need to say.',
        lessons: lessonSet([
          'Present simple',
          'Past simple and irregular verbs',
          'Talking about the future',
          'Asking questions correctly',
        ]),
      },
      {
        title: 'Speaking With Confidence',
        summary: 'Pronunciation drills and your first real conversations.',
        lessons: lessonSet([
          'Sounds that are hard for Dari speakers',
          'Phone conversations',
          'A short interview, start to finish',
          'What to study next',
        ]),
      },
    ],
  },
  {
    slug: 'web-development-javascript',
    title: 'Web Development with JavaScript',
    subtitle: 'Build and deploy real websites',
    category: 'development',
    categoryName: 'Development',
    instructor: 'Farhad Sadat',
    instructorSlug: 'farhad-sadat',
    level: 'Intermediate',
    minutes: 540,
    hours: 9,
    access: 'Free',
    language: 'Dari & English',
    type: 'Self Guided',
    rating: 4.8,
    reviews: 236,
    students: 3140,
    featured: true,
    popular: true,
    accent: 'teal',
    icon: 'code',
    excerpt:
      'HTML, CSS and JavaScript from the ground up, then React and Next.js — ending with a portfolio site you deploy live.',
    description:
      'A complete path from your first HTML file to a deployed web application. You write code in every lesson, and the projects are the kind of work clients actually pay for: a business landing page, a course catalogue, a dashboard. The final module covers how to put your work online for free and how to present it to an employer or a freelance client.',
    requirements: [
      'A laptop or desktop computer (a phone is not enough for this one).',
      'Basic computer skills — files, folders, installing software.',
      'Willingness to type out every example yourself.',
    ],
    outcomes: [
      'Write clean HTML, modern CSS and real JavaScript',
      'Build interactive interfaces with React and Next.js',
      'Connect a front end to a database and an API',
      'Deploy a live site and hand it over to a client',
    ],
    included: [
      { label: '9 Hrs of Video Instruction', icon: 'play' },
      { label: '6 Guided Projects', icon: 'doc' },
      { label: '40+ Source Files', icon: 'file' },
      { label: 'Code Review on Final Project', icon: 'award' },
    ],
    curriculum: [
      {
        title: 'Foundations',
        summary: 'Your environment, the browser, and how the web actually works.',
        lessons: lessonSet([
          'Setting up your editor and browser tools',
          'HTML structure and semantics',
          'CSS layout with Flexbox',
          'Responsive design for slow connections',
        ]),
      },
      {
        title: 'JavaScript',
        summary: 'The language itself, carefully and in order.',
        lessons: lessonSet([
          'Variables, types and functions',
          'Arrays, objects and loops',
          'Working with the DOM',
          'Fetching data from an API',
          'Debugging like an engineer',
        ]),
      },
      {
        title: 'React & Next.js',
        summary: 'Components, state and routing in a modern framework.',
        lessons: lessonSet([
          'Thinking in components',
          'State and events',
          'Routing and layouts in Next.js',
          'Server rendering and data loading',
        ]),
      },
      {
        title: 'Ship It',
        summary: 'Databases, deployment and getting paid for your work.',
        lessons: lessonSet([
          'Storing data in MongoDB',
          'Environment variables and secrets',
          'Deploying to production',
          'Presenting your portfolio to clients',
        ]),
      },
    ],
  },
  {
    slug: 'graphic-design-illustrator',
    title: 'Graphic Design with Illustrator',
    subtitle: 'Logos, posters and brand identity',
    category: 'design',
    categoryName: 'Design',
    instructor: 'Zahra Rahimi',
    instructorSlug: 'zahra-rahimi',
    level: 'Beginner',
    minutes: 240,
    hours: 4,
    access: 'Free',
    language: 'Dari',
    type: 'Self Guided',
    rating: 4.9,
    reviews: 198,
    students: 2410,
    featured: true,
    popular: true,
    accent: 'coral',
    icon: 'palette',
    excerpt:
      'Learn the design tools and the design thinking together — and finish with a logo and brand kit for a real client brief.',
    description:
      'Most design courses teach you the buttons. This one teaches you why a logo works, then shows you the buttons. You will complete a full identity project for an Afghan business brief: research, sketches, vector logo, colour palette, business card and a simple brand guide you can hand to a client.',
    requirements: [
      'A computer that can run Adobe Illustrator or the free alternative Inkscape.',
      'No drawing skill needed — everything is done with vector shapes.',
      'Paper and a pencil for the sketching lessons.',
    ],
    outcomes: [
      'Draw precise vector artwork with the pen and shape tools',
      'Build a logo system that works at any size',
      'Choose type and colour with intent',
      'Deliver a professional brand kit to a client',
    ],
    included: [
      { label: '3.5 Hrs of Video Instruction', icon: 'play' },
      { label: '2 Written Design Guides', icon: 'doc' },
      { label: '14 Source Files', icon: 'file' },
      { label: 'Client-ready Brand Kit Template', icon: 'award' },
    ],
    curriculum: [
      {
        title: 'Introduction',
        summary: 'What design is for, and how to read a client brief.',
        lessons: lessonSet([
          'What makes a design work',
          'Reading and questioning a brief',
          'Your workspace in Illustrator',
          'Sketching before you click',
        ]),
      },
      {
        title: 'Logo Design',
        summary: 'From twenty rough sketches to one finished mark.',
        lessons: lessonSet([
          'Shapes, paths and the pen tool',
          'Building a wordmark',
          'Icon and symbol construction',
          'Testing a logo at small sizes',
        ]),
      },
      {
        title: 'Branding Collateral',
        summary: 'Applying the identity everywhere it needs to live.',
        lessons: lessonSet([
          'Colour palettes that print correctly',
          'Choosing and pairing typefaces',
          'Business cards and signage',
          'Social media templates',
        ]),
      },
      {
        title: 'Client Handoff',
        summary: 'Files, formats and expectations.',
        lessons: lessonSet([
          'Exporting for print and screen',
          'Writing a one-page brand guide',
          'Presenting your work',
          'Pricing a design project in Afghanistan',
        ]),
      },
    ],
  },
  {
    slug: 'kankor-mathematics',
    title: 'Mathematics for Kankor',
    subtitle: 'Complete preparation for the national entrance exam',
    category: 'kankor-prep',
    categoryName: 'Kankor Prep',
    instructor: 'Rahmatullah Nazari',
    instructorSlug: 'rahmatullah-nazari',
    level: 'Intermediate',
    minutes: 420,
    hours: 7,
    access: 'Free',
    language: 'Dari',
    type: 'Self Guided + Live Q&A',
    rating: 5.0,
    reviews: 604,
    students: 8100,
    featured: true,
    popular: true,
    accent: 'gold',
    icon: 'graduation',
    excerpt:
      'Every mathematics topic on the Kankor syllabus, worked through with past-paper questions and full solutions.',
    description:
      'Built directly on the Kankor syllabus and eleven years of past papers. Each topic follows the same rhythm: the concept explained plainly, three worked examples, then a timed set of real exam questions with full solutions. Weekly live question sessions are included so you never stay stuck on a problem for a week.',
    requirements: [
      'School mathematics up to grade 11.',
      'A notebook and a scientific calculator.',
      'Two hours a week for the timed practice sets.',
    ],
    outcomes: [
      'Cover the entire Kankor mathematics syllabus',
      'Solve algebra, geometry and trigonometry questions under time pressure',
      'Recognise the question patterns that repeat every year',
      'Sit six full mock exams with scoring',
    ],
    included: [
      { label: '7 Hrs of Video Instruction', icon: 'play' },
      { label: '11 Years of Past Papers', icon: 'doc' },
      { label: '6 Full Mock Exams', icon: 'file' },
      { label: 'Weekly Live Q&A Sessions', icon: 'award' },
    ],
    curriculum: [
      {
        title: 'Algebra',
        summary: 'The foundation half the exam is built on.',
        lessons: lessonSet([
          'Equations and inequalities',
          'Functions and graphs',
          'Sequences and series',
          'Exam patterns in algebra',
        ]),
      },
      {
        title: 'Geometry',
        summary: 'Plane and solid geometry with exam shortcuts.',
        lessons: lessonSet([
          'Triangles and circles',
          'Areas and volumes',
          'Coordinate geometry',
          'Timed geometry set',
        ]),
      },
      {
        title: 'Trigonometry',
        summary: 'Identities and equations, drilled until automatic.',
        lessons: lessonSet([
          'Ratios and the unit circle',
          'Identities worth memorising',
          'Trigonometric equations',
          'Timed trigonometry set',
        ]),
      },
      {
        title: 'Mock Exams',
        summary: 'Six full papers under real conditions.',
        lessons: lessonSet([
          'How to manage the clock',
          'Mock exam 1 with solutions',
          'Mock exam 2 with solutions',
          'Reviewing your mistakes properly',
        ]),
      },
    ],
  },
  {
    slug: 'digital-marketing-for-small-business',
    title: 'Digital Marketing for Small Business',
    subtitle: 'Grow a business on a small budget',
    category: 'marketing',
    categoryName: 'Marketing',
    instructor: 'Sohaila Ahmadi',
    instructorSlug: 'sohaila-ahmadi',
    level: 'Beginner',
    minutes: 260,
    hours: 4.3,
    access: 'Free',
    language: 'Dari & Pashto',
    type: 'Self Guided',
    rating: 4.7,
    reviews: 142,
    students: 2080,
    featured: false,
    popular: true,
    accent: 'coral',
    icon: 'megaphone',
    excerpt:
      'Facebook, Instagram and WhatsApp marketing that actually brings customers to an Afghan shop, service or online store.',
    description:
      'A practical marketing course for the businesses that exist here: a fabric shop, a tailoring service, a small bakery, a tutoring centre. You will build a content plan, write posts that get replies, set up a WhatsApp catalogue and run your first paid advertisement with a budget as small as 500 AFN.',
    requirements: [
      'A smartphone with Facebook, Instagram and WhatsApp installed.',
      'A business or business idea to work on through the course.',
      'No marketing experience needed.',
    ],
    outcomes: [
      'Write posts and captions that bring in customers',
      'Shoot good product photos with a phone',
      'Set up a WhatsApp Business catalogue and auto-replies',
      'Run and measure a small paid ad campaign',
    ],
    included: [
      { label: '4 Hrs of Video Instruction', icon: 'play' },
      { label: '30-Day Content Calendar', icon: 'doc' },
      { label: '25 Post Templates', icon: 'file' },
      { label: 'Ad Budget Planner', icon: 'award' },
    ],
    curriculum: [
      {
        title: 'Foundations',
        summary: 'Who your customer is and where they already are.',
        lessons: lessonSet([
          'Finding your real customer',
          'Choosing the right platform',
          'Setting up a business profile properly',
          'What to post in your first week',
        ]),
      },
      {
        title: 'Content That Sells',
        summary: 'Photos, captions and a plan you can keep.',
        lessons: lessonSet([
          'Product photography with a phone',
          'Writing captions in Dari and Pashto',
          'A content calendar you can actually follow',
          'Reels and short video',
        ]),
      },
      {
        title: 'Selling on WhatsApp',
        summary: 'The channel most Afghan sales actually close on.',
        lessons: lessonSet([
          'WhatsApp Business setup',
          'Building a catalogue',
          'Replying in a way that closes a sale',
          'Handling delivery and payment',
        ]),
      },
      {
        title: 'Paid Ads',
        summary: 'Spending a small budget without wasting it.',
        lessons: lessonSet([
          'Your first 500 AFN campaign',
          'Targeting by city and interest',
          'Reading the results',
          'Scaling what works',
        ]),
      },
    ],
  },
  {
    slug: 'data-analysis-with-excel',
    title: 'Data Analysis with Excel',
    subtitle: 'From basic formulas to real reports',
    category: 'it-software',
    categoryName: 'IT & Software',
    instructor: 'Ahmad Wali Sediqi',
    instructorSlug: 'ahmad-wali-sediqi',
    level: 'Beginner',
    minutes: 180,
    hours: 3,
    access: 'Free',
    language: 'Dari',
    type: 'Self Guided',
    rating: 4.8,
    reviews: 175,
    students: 2930,
    featured: false,
    popular: true,
    accent: 'teal',
    icon: 'chart',
    excerpt:
      'The Excel skills that appear in almost every office, NGO and government job advertisement in the country.',
    description:
      'A short, dense course built from the tasks a junior analyst is actually given: clean a messy list, summarise it, chart it, and present it. Every lesson uses a real dataset — a school enrolment sheet, a distribution log, a monthly budget — that you download and work through with the instructor.',
    requirements: [
      'Microsoft Excel, LibreOffice Calc or Google Sheets.',
      'Comfortable using a computer keyboard and mouse.',
    ],
    outcomes: [
      'Clean and structure messy data',
      'Use VLOOKUP, XLOOKUP, IF and the formulas employers ask about',
      'Build pivot tables and dashboards',
      'Produce a monthly report a manager can read',
    ],
    included: [
      { label: '3 Hrs of Video Instruction', icon: 'play' },
      { label: '8 Practice Datasets', icon: 'doc' },
      { label: 'Report Template Pack', icon: 'file' },
      { label: 'Certificate of Completion', icon: 'award' },
    ],
    curriculum: [
      {
        title: 'Spreadsheet Basics',
        summary: 'Getting fast at the fundamentals.',
        lessons: lessonSet([
          'Cells, rows and ranges',
          'Formatting that stays readable',
          'Sorting and filtering',
          'Keyboard shortcuts worth learning',
        ]),
      },
      {
        title: 'Formulas',
        summary: 'The dozen formulas that do ninety percent of the work.',
        lessons: lessonSet([
          'SUM, AVERAGE and COUNTIF',
          'IF and nested conditions',
          'VLOOKUP and XLOOKUP',
          'Text and date functions',
        ]),
      },
      {
        title: 'Analysis',
        summary: 'Summarising thousands of rows in seconds.',
        lessons: lessonSet([
          'Pivot tables from scratch',
          'Charts that communicate',
          'Conditional formatting',
          'Building a simple dashboard',
        ]),
      },
      {
        title: 'Reporting',
        summary: 'Turning a sheet into a decision.',
        lessons: lessonSet([
          'Structuring a monthly report',
          'Common data mistakes',
          'Exporting and sharing',
          'A full report, start to finish',
        ]),
      },
    ],
  },
  {
    slug: 'ui-ux-design-fundamentals',
    title: 'UI / UX Design Fundamentals',
    subtitle: 'Design apps people can use',
    category: 'design',
    categoryName: 'Design',
    instructor: 'Marwa Amiri',
    instructorSlug: 'marwa-amiri',
    level: 'Beginner',
    minutes: 200,
    hours: 3.3,
    access: 'Free',
    language: 'English & Dari',
    type: 'Self Guided',
    rating: 4.8,
    reviews: 121,
    students: 1980,
    featured: false,
    popular: true,
    accent: 'brand',
    icon: 'layers',
    excerpt:
      'Wireframes, prototypes and design systems in Figma, using briefs from real regional products.',
    description:
      'Learn how product designers work: research the problem, sketch the flow, build the interface, test it with a person, then hand it to a developer. You will complete a full mobile app design — a money transfer app — and finish with a Figma portfolio piece.',
    requirements: [
      'A computer with a browser (Figma runs free in the browser).',
      'No design background required.',
    ],
    outcomes: [
      'Run a simple user research session',
      'Wireframe and prototype in Figma',
      'Build a reusable component library',
      'Hand off a design a developer can build',
    ],
    included: [
      { label: '3.5 Hrs of Video Instruction', icon: 'play' },
      { label: 'Figma Starter Files', icon: 'doc' },
      { label: 'UI Component Library', icon: 'file' },
      { label: 'Portfolio Case Study Template', icon: 'award' },
    ],
    curriculum: [
      {
        title: 'Understanding Users',
        summary: 'Design starts before the screen.',
        lessons: lessonSet([
          'What UX really means',
          'Interviewing five users',
          'Mapping a user flow',
          'Defining the problem',
        ]),
      },
      {
        title: 'Interface Design',
        summary: 'Layout, type, colour and hierarchy.',
        lessons: lessonSet([
          'Figma fundamentals',
          'Grids and spacing',
          'Typography for interfaces',
          'Colour and contrast (including accessibility)',
        ]),
      },
      {
        title: 'Prototyping',
        summary: 'Making it feel real before it is built.',
        lessons: lessonSet([
          'Components and variants',
          'Interactive prototypes',
          'Testing with a real person',
          'Iterating on feedback',
        ]),
      },
      {
        title: 'Handoff',
        summary: 'Working with developers.',
        lessons: lessonSet([
          'Design tokens and specs',
          'Documenting states',
          'Working with a developer',
          'Writing your case study',
        ]),
      },
    ],
  },
  {
    slug: 'freelancing-and-getting-paid',
    title: 'Freelancing & Getting Paid Online',
    subtitle: 'Find international clients from Afghanistan',
    category: 'business',
    categoryName: 'Business',
    instructor: 'Mustafa Jalali',
    instructorSlug: 'mustafa-jalali',
    level: 'Beginner',
    minutes: 150,
    hours: 2.5,
    access: 'Free',
    language: 'Dari & English',
    type: 'Self Guided',
    rating: 4.9,
    reviews: 208,
    students: 1840,
    featured: true,
    popular: true,
    accent: 'gold',
    icon: 'briefcase',
    excerpt:
      'Build a profile that wins work, write proposals clients answer, and solve the hardest part — receiving your money.',
    description:
      'The honest version of this subject. We cover building a portfolio when you have no clients yet, writing proposals that get replies, pricing your work, and the payment problem: which platforms and methods currently work for Afghan freelancers, what documentation you need, and how to avoid the scams that target this exact situation.',
    requirements: [
      'A skill you can sell — design, writing, development, data entry, translation.',
      'An email address and a phone or computer.',
    ],
    outcomes: [
      'Build a freelance profile and portfolio from nothing',
      'Write proposals with a high reply rate',
      'Price and scope work confidently',
      'Receive payment reliably and recognise scams',
    ],
    included: [
      { label: '2.5 Hrs of Video Instruction', icon: 'play' },
      { label: 'Proposal Template Library', icon: 'doc' },
      { label: 'Contract & Invoice Templates', icon: 'file' },
      { label: 'Payment Methods Guide (updated quarterly)', icon: 'award' },
    ],
    curriculum: [
      {
        title: 'Getting Ready',
        summary: 'What to sell and how to prove you can do it.',
        lessons: lessonSet([
          'Choosing your service',
          'A portfolio with no clients',
          'Setting up your profile',
          'English that is good enough',
        ]),
      },
      {
        title: 'Winning Work',
        summary: 'Proposals, interviews and first jobs.',
        lessons: lessonSet([
          'Reading a job post properly',
          'The proposal formula',
          'Client calls and messages',
          'Your first small job',
        ]),
      },
      {
        title: 'Money',
        summary: 'Pricing, invoicing and getting paid.',
        lessons: lessonSet([
          'How to price your work',
          'Payment methods that work here',
          'Invoices and contracts',
          'Avoiding scams and non-payers',
        ]),
      },
      {
        title: 'Growing',
        summary: 'From one job to a steady income.',
        lessons: lessonSet([
          'Getting repeat clients',
          'Raising your rates',
          'Managing several projects',
          'Building a small team',
        ]),
      },
    ],
  },
  {
    slug: 'computer-literacy-icdl',
    title: 'Computer Literacy (ICDL)',
    subtitle: 'The certificate employers ask for',
    category: 'it-software',
    categoryName: 'IT & Software',
    instructor: 'Basira Hakimi',
    instructorSlug: 'basira-hakimi',
    level: 'Beginner',
    minutes: 200,
    hours: 3.3,
    access: 'Free',
    language: 'Dari & Pashto',
    type: 'Self Guided',
    rating: 4.7,
    reviews: 289,
    students: 3320,
    featured: false,
    popular: false,
    accent: 'teal',
    icon: 'monitor',
    excerpt:
      'Windows, Word, Excel, PowerPoint, email and safe internet use — the full ICDL syllabus, free for every learner.',
    description:
      'Our free foundation course, sponsored so that cost is never the reason someone cannot start. It covers the complete ICDL syllabus in Dari and Pashto: operating a computer, word processing, spreadsheets, presentations, email, and staying safe online. Finish the practice tests and you are ready to sit the official certification.',
    requirements: [
      'Access to a computer for at least three hours a week.',
      'No prior computer experience at all.',
    ],
    outcomes: [
      'Operate Windows and manage files confidently',
      'Produce documents, spreadsheets and presentations',
      'Use email and the internet safely',
      'Be ready for the official ICDL examination',
    ],
    included: [
      { label: '3.5 Hrs of Video Instruction', icon: 'play' },
      { label: 'ICDL Practice Tests', icon: 'doc' },
      { label: 'Printable Exercise Book', icon: 'file' },
      { label: 'Certificate of Completion', icon: 'award' },
    ],
    curriculum: [
      {
        title: 'Using a Computer',
        summary: 'Hardware, Windows and files.',
        lessons: lessonSet([
          'Parts of a computer',
          'Windows basics',
          'Files, folders and USB drives',
          'Printing and scanning',
        ]),
      },
      {
        title: 'Documents & Presentations',
        summary: 'Word and PowerPoint to a professional standard.',
        lessons: lessonSet([
          'Word: formatting a letter',
          'Word: tables and layout',
          'PowerPoint: building a deck',
          'Presenting well',
        ]),
      },
      {
        title: 'Spreadsheets',
        summary: 'Enough Excel for any office job.',
        lessons: lessonSet([
          'Entering and formatting data',
          'Basic formulas',
          'Simple charts',
          'Printing a clean sheet',
        ]),
      },
      {
        title: 'Internet & Safety',
        summary: 'Email, search and protecting yourself online.',
        lessons: lessonSet([
          'Setting up and using email',
          'Searching effectively',
          'Passwords and account security',
          'Recognising scams',
        ]),
      },
    ],
  },
  {
    slug: 'ai-and-machine-learning-intro',
    title: 'AI & Machine Learning Intro',
    subtitle: 'Understand the technology changing every field',
    category: 'development',
    categoryName: 'Development',
    instructor: 'Ishaq Barakzai',
    instructorSlug: 'ishaq-barakzai',
    level: 'Intermediate',
    minutes: 260,
    hours: 4.3,
    access: 'Free',
    language: 'English & Dari',
    type: 'Self Guided',
    rating: 4.7,
    reviews: 96,
    students: 1210,
    featured: false,
    popular: true,
    accent: 'brand',
    icon: 'sparkles',
    excerpt:
      'Python, data and models explained from first principles — build a working classifier by the end of week three.',
    description:
      'A grounded introduction to machine learning for people who can already program a little. You learn just enough Python and mathematics to train, evaluate and deploy a real model, and you finish with a clear understanding of what these systems can and cannot do.',
    requirements: [
      'Basic programming experience in any language.',
      'School-level algebra.',
      'A computer with an internet connection for the notebooks.',
    ],
    outcomes: [
      'Write Python for data work with pandas and scikit-learn',
      'Train and evaluate classification and regression models',
      'Understand how neural networks and language models work',
      'Deploy a model behind a simple API',
    ],
    included: [
      { label: '4.5 Hrs of Video Instruction', icon: 'play' },
      { label: '10 Jupyter Notebooks', icon: 'doc' },
      { label: 'Project Datasets', icon: 'file' },
      { label: 'Capstone Project Review', icon: 'award' },
    ],
    curriculum: [
      {
        title: 'Python for Data',
        summary: 'The tools before the theory.',
        lessons: lessonSet([
          'Python refresher',
          'pandas and dataframes',
          'Cleaning real data',
          'Plotting and exploring',
        ]),
      },
      {
        title: 'Core Machine Learning',
        summary: 'Models you can explain to your manager.',
        lessons: lessonSet([
          'What learning from data means',
          'Regression',
          'Classification',
          'Evaluating a model honestly',
        ]),
      },
      {
        title: 'Neural Networks',
        summary: 'From a single neuron to a language model.',
        lessons: lessonSet([
          'How a neural network learns',
          'Training your first network',
          'How language models work',
          'Limits, bias and failure modes',
        ]),
      },
      {
        title: 'Deployment',
        summary: 'Getting a model out of the notebook.',
        lessons: lessonSet([
          'Saving and loading models',
          'A simple prediction API',
          'Monitoring a live model',
          'Capstone project',
        ]),
      },
    ],
  },
  {
    slug: 'photography-basics',
    title: 'Photography Basics',
    subtitle: 'Better photos with the camera you own',
    category: 'photography',
    categoryName: 'Photography',
    instructor: 'Latifa Noori',
    instructorSlug: 'latifa-noori',
    level: 'Beginner',
    minutes: 165,
    hours: 2.75,
    access: 'Free',
    language: 'Dari',
    type: 'Self Guided',
    rating: 4.9,
    reviews: 87,
    students: 970,
    featured: false,
    popular: false,
    accent: 'coral',
    icon: 'camera',
    excerpt:
      'Light, composition and editing — taught so it works equally on a phone or a DSLR.',
    description:
      'A course about seeing, not equipment. You learn how light behaves, how to compose a frame, and how to edit a photo without ruining it. Assignments are shot in your own street, market and home, and reviewed against clear criteria.',
    requirements: [
      'Any camera, including a phone camera.',
      'A free editing app (Snapseed or Lightroom Mobile).',
    ],
    outcomes: [
      'Control exposure, whatever camera you use',
      'Compose photographs that hold attention',
      'Edit photos to a consistent, natural look',
      'Build a small portfolio of ten strong images',
    ],
    included: [
      { label: '2.5 Hrs of Video Instruction', icon: 'play' },
      { label: '8 Shooting Assignments', icon: 'doc' },
      { label: 'Editing Presets', icon: 'file' },
      { label: 'Portfolio Review Checklist', icon: 'award' },
    ],
    curriculum: [
      {
        title: 'Light',
        summary: 'The only real subject of photography.',
        lessons: lessonSet([
          'How your camera sees',
          'Exposure in plain language',
          'Working with hard sunlight',
          'Golden hour and indoor light',
        ]),
      },
      {
        title: 'Composition',
        summary: 'Where to stand and what to leave out.',
        lessons: lessonSet([
          'Framing and balance',
          'Lines, layers and depth',
          'Portraits of people',
          'Photographing places respectfully',
        ]),
      },
      {
        title: 'Editing',
        summary: 'Improving a photo without overworking it.',
        lessons: lessonSet([
          'A simple editing workflow',
          'Colour and tone',
          'Black and white',
          'Consistency across a set',
        ]),
      },
      {
        title: 'Your Portfolio',
        summary: 'Choosing and showing your best work.',
        lessons: lessonSet([
          'Selecting ten images',
          'Sequencing a set',
          'Sharing online',
          'Getting your first paid shoot',
        ]),
      },
    ],
  },
  {
    slug: 'pashto-dari-translation',
    title: 'Pashto–Dari Translation Skills',
    subtitle: 'A profession in high demand',
    category: 'languages',
    categoryName: 'Languages',
    instructor: 'Naqibullah Wardak',
    instructorSlug: 'naqibullah-wardak',
    level: 'Advanced',
    minutes: 130,
    hours: 2.2,
    access: 'Free',
    language: 'Pashto & Dari',
    type: 'Self Guided',
    rating: 4.8,
    reviews: 64,
    students: 1190,
    featured: false,
    popular: false,
    accent: 'gold',
    icon: 'languages',
    excerpt:
      'Professional translation technique between Pashto, Dari and English for media, legal and NGO work.',
    description:
      'For fluent speakers who want to translate professionally. The course covers register, terminology management, legal and medical vocabulary, subtitling, and the practical business of quoting and delivering translation work on deadline.',
    requirements: [
      'Fluency in Pashto and Dari; working English.',
      'A computer for the terminology and subtitling exercises.',
    ],
    outcomes: [
      'Translate accurately while preserving register and intent',
      'Build and maintain a terminology glossary',
      'Handle legal, medical and media vocabulary',
      'Quote, schedule and deliver professional translation work',
    ],
    included: [
      { label: '2 Hrs of Video Instruction', icon: 'play' },
      { label: 'Terminology Glossary Starter', icon: 'doc' },
      { label: '20 Graded Translation Exercises', icon: 'file' },
      { label: 'Certificate of Completion', icon: 'award' },
    ],
    curriculum: [
      {
        title: 'Principles',
        summary: 'What a translator is responsible for.',
        lessons: lessonSet([
          'Meaning over words',
          'Register and audience',
          'Common traps between Pashto and Dari',
          'Ethics and confidentiality',
        ]),
      },
      {
        title: 'Specialised Vocabulary',
        summary: 'The fields that pay.',
        lessons: lessonSet([
          'Legal terminology',
          'Medical terminology',
          'Media and news style',
          'Building a glossary',
        ]),
      },
      {
        title: 'Tools & Formats',
        summary: 'Working the way agencies expect.',
        lessons: lessonSet([
          'Translation memory basics',
          'Subtitling and timing',
          'Document formatting',
          'Quality checking your own work',
        ]),
      },
      {
        title: 'The Business',
        summary: 'Turning skill into income.',
        lessons: lessonSet([
          'Rates and quoting',
          'Working with agencies',
          'Deadlines and volume',
          'Building a client base',
        ]),
      },
    ],
  },
];

/**
 * Spread each course's stated running time across its lessons so that the
 * per-module totals shown on the course page add up to the course duration,
 * with enough variation that no two modules look identical. Deterministic — the
 * same input always produces the same durations, so builds stay reproducible.
 */
function distributeDurations(course) {
  const lessons = (course.curriculum || []).flatMap((module) => module.lessons || []);
  if (lessons.length === 0) return;

  const variation = [-4, 3, 0, 5, -2, 1, 4, -3, 2, -1];
  const base = Math.floor(course.minutes / lessons.length);

  let assigned = 0;
  lessons.forEach((lesson, i) => {
    lesson.duration = Math.max(5, base + variation[i % variation.length]);
    assigned += lesson.duration;
  });

  // Absorb the rounding remainder into the final lesson so the total is exact.
  const last = lessons[lessons.length - 1];
  last.duration = Math.max(5, last.duration + (course.minutes - assigned));
}

courses.forEach(distributeDurations);

export const features = [
  {
    title: 'Self Guided Courses',
    icon: 'compass',
    description:
      'Study at your own speed, at the hour that suits you. Your progress is saved, so a week away does not cost you your place.',
  },
  {
    title: 'Learn In Your Language',
    icon: 'globe',
    description:
      'Every course is taught in Dari, Pashto or English — often all three — because learning is hard enough without a language barrier.',
  },
  {
    title: 'Virtual Office Hours',
    icon: 'video',
    description:
      'Weekly live sessions with your instructor. Bring the question you have been stuck on and leave with an answer.',
  },
  {
    title: 'Works On Any Connection',
    icon: 'wifi',
    description:
      'Video compressed for slow networks, and every lesson downloadable so you can study offline when the internet is out.',
  },
  {
    title: 'Goals & Achievements',
    icon: 'target',
    description:
      'Set a weekly study goal and track it. Small, visible progress is what carries a learner to the end of a course.',
  },
  {
    title: 'Homework & Tests',
    icon: 'clipboard',
    description:
      'Graded exercises and quizzes after each module, plus a certificate when you finish — not just a video you watched.',
  },
];

export const whyFeatures = [
  {
    title: 'Progress Analytics',
    icon: 'chart',
    description:
      'See exactly which lessons you have finished, where your quiz scores dropped, and what to review before an exam.',
  },
  {
    title: 'Content For Your Classroom',
    icon: 'users',
    description:
      'Schools and training centres can assign courses to groups, follow every student, and add their own material.',
  },
  {
    title: 'Certification Prep',
    icon: 'award',
    description:
      'Structured preparation for Kankor, IELTS and ICDL, built from past papers and the current official syllabus.',
  },
];

export const aboutFeatures = [
  {
    title: 'A Safe Place to Learn',
    icon: 'shield',
    description:
      'Study privately, from home, at your own hour. We ask for the minimum information needed to enrol you, we never publish a learner’s name or photograph, and lessons can be watched without anyone else seeing your screen.',
  },
  {
    title: 'Access From Anywhere, In Three Languages',
    icon: 'globe',
    description:
      'A girl in Badakhshan and a girl in Kandahar open the same lessons on the same day, in Dari, Pashto or English. Everything downloads for the days the connection fails.',
  },
  {
    title: 'Self-Guided, Self-Paced Growth',
    icon: 'compass',
    description:
      'Our learners have families and responsibilities. Courses are built in short modules that fit into a real day, and your progress waits for you.',
  },
];

export const values = [
  {
    title: 'Education is a right, not a privilege',
    description:
      'Every course is free and always will be. Where an outside examination fee is unavoidable, our scholarship covers half of it. Cost is never the reason a girl stops studying here.',
  },
  {
    title: 'The girls furthest away come first',
    description:
      'Our priority is learners in remote districts and those shut out of formal schooling — the people for whom online teaching is not a convenience but the only route left.',
  },
  {
    title: 'Built for the connection you have',
    description:
      'Light pages, compressed video, offline downloads. We test on 3G because that is what most of our learners use.',
  },
  {
    title: 'Finish, do not just enrol',
    description:
      'Short modules, graded homework and live support exist for one reason: completion. A course you finish changes something.',
  },
];

export const milestones = [
  {
    year: '2019',
    title: 'A single English class',
    description:
      'Elham began as one evening English class of nineteen girls in a borrowed room in Kabul.',
  },
  {
    year: '2021',
    title: 'Everything moves online',
    description:
      'When attending in person became impossible for most of our students, we recorded the entire curriculum and put it online, free. Enrolment tripled in four months.',
  },
  {
    year: '2023',
    title: 'Kankor and ICDL tracks',
    description:
      'We added structured exam preparation after our learners told us plainly what they needed most.',
  },
  {
    year: '2026',
    title: 'Reaching all 34 provinces',
    description:
      'Elham Online Education now has learners in every province of Afghanistan and a catalogue of more than 120 free courses.',
  },
];

/**
 * How to join. These are access routes, not products — there is no price on any
 * of them and nothing is bought on this site.
 */
export const plans = [
  {
    slug: 'learner',
    name: 'For a Learner',
    tagline: 'One girl, one course, no cost',
    cost: 'Free',
    costNote: 'No fee, no card, no trial period.',
    audience: 'Any Afghan girl, woman or young person with a phone or a computer.',
    cta: 'Register Free',
    ctaHref: '/contact',
    featured: false,
    features: [
      'All 120+ courses, completely free',
      'Tests, quizzes and homework',
      'Downloadable lesson notes and files',
      'Offline lesson downloads',
      'Certificate of completion',
    ],
    notIncluded: ['Group dashboard for a teacher'],
  },
  {
    slug: 'scholarship',
    name: 'Scholarship Support',
    tagline: 'When a programme has an unavoidable outside cost',
    cost: '50% Scholarship',
    costNote:
      'Our courses are free. Where an external body charges an examination fee, we cover half of it.',
    audience: 'Learners sitting an official ICDL or IELTS examination.',
    cta: 'Apply for a Scholarship',
    ctaHref: '/contact',
    featured: true,
    features: [
      'Everything in For a Learner',
      '50% of the official exam fee covered',
      'Guided exam registration',
      'Full past-paper practice sets',
      'A mock examination with feedback',
    ],
    notIncluded: [],
  },
  {
    slug: 'schools',
    name: 'For Schools & Groups',
    tagline: 'For schools, community classes and partner organisations',
    cost: 'Free',
    costNote: 'Also free. We ask only for a named teacher we can coordinate with.',
    audience: 'Schools, training centres, NGOs and community learning groups.',
    cta: 'Partner With Us',
    ctaHref: '/contact',
    featured: false,
    features: [
      'All 120+ courses for every student',
      'Group progress dashboard for the teacher',
      'Assign courses to a class',
      'Printable workbooks',
      'Teacher training session',
    ],
    notIncluded: [],
  },
];

export const testimonials = [
  {
    name: 'Fereshta Amini',
    role: 'High School Teacher, Herat',
    quote:
      'I use the Kankor mathematics course with my grade twelve girls every week. The past-paper solutions are clearer than anything I had, and my students are no longer afraid of the exam.',
    rating: 5,
  },
  {
    name: 'Sadaf Yaqubi',
    role: 'Learner, Mazar-i-Sharif',
    quote:
      'The lessons download, so I study when the electricity and the internet are gone. That one detail is the reason I was able to finish.',
    rating: 5,
  },
  {
    name: 'Roya Hashimi',
    role: 'Learner, Badakhshan',
    quote:
      'I had not been inside a classroom for two years. I started with English for Beginners on my brother’s phone, thirty minutes a day. I am now in the intermediate course and I teach my two younger sisters what I learn.',
    rating: 5,
  },
  {
    name: 'Marzia Rahmani',
    role: 'Learner, Kabul',
    quote:
      'The graphic design course cost me nothing, and I now design wedding cards and shop signs from home. It is the first money I have earned myself.',
    rating: 5,
  },
  {
    name: 'Nasrin Ebrahimi',
    role: 'Women’s Training Centre Director, Kabul',
    quote:
      'We put forty women through the free ICDL course. Eleven have office jobs now. The group dashboard made reporting to our donor straightforward.',
    rating: 5,
  },
];

export const faqs = [
  {
    question: 'Is it really free?',
    answer:
      'Yes — every course on this site is free, permanently. There is no fee, no trial period, no card and nothing to buy anywhere on this website. Elham is a non-profit institution funded by donors and volunteer teachers. Where an outside body charges an unavoidable examination fee, such as an official ICDL or IELTS test, we cover 50% of it through our scholarship.',
  },
  {
    question: 'Who can register?',
    answer:
      'Our courses are for Afghan girls and women, and for Afghan young people generally — particularly those who have been deprived of formal education, who want to learn a new skill, or who are trying to move forward in their studies or their working life. You do not need a diploma, a reference or any previous certificate to register.',
  },
  {
    question: 'Do I need a fast internet connection to study?',
    answer:
      'No. Every video is compressed for slow networks and can be downloaded before you watch it, so you can study with the internet off. Most of our learners study on mobile data, and the site itself is built to load on a 3G connection.',
  },
  {
    question: 'Which languages are the courses taught in?',
    answer:
      'Dari, Pashto and English. Each course page states its language of instruction. Many courses are recorded in more than one language, and technical terms are always given in English as well so you recognise them later.',
  },
  {
    question: 'Can I study if I only have access to a shared phone?',
    answer:
      'Yes, and many of our learners do. Lessons are short enough to finish in one sitting, they download for offline viewing, and your progress is saved to your own account rather than to the device. If you can borrow a phone for thirty minutes a day, you can complete a course.',
  },
  {
    question: 'Will I get a certificate?',
    answer:
      'You receive an Elham Online Education certificate of completion for every course you finish, with a verification code an employer can check. For ICDL and IELTS, our courses prepare you for the official examination, which is awarded by those bodies rather than by us — and our 50% scholarship helps with that fee.',
  },
  {
    question: 'Can my school or organisation join as a group?',
    answer:
      'Yes, and also at no cost. Schools, training centres, NGOs and community classes get accounts for every student, a dashboard so the teacher can follow each learner, printable workbooks and a teacher training session. Write to us with the number of learners and the province.',
  },
  {
    question: 'How can I support the institution?',
    answer:
      'By teaching or by sponsoring. Volunteer teachers record one course a year; sponsors cover recording costs and examination scholarships. Both are arranged by writing to us — there is no donation form on this site.',
  },
];

export const posts = [
  {
    slug: 'how-to-study-when-the-internet-keeps-cutting-out',
    title: 'How to Study Online When the Internet Keeps Cutting Out',
    category: 'Study Skills',
    author: 'Sohaila Ahmadi',
    date: '2026-07-14',
    readTime: 6,
    featured: true,
    accent: 'brand',
    icon: 'wifi',
    excerpt:
      'A practical system for downloading lessons, batching your study time and never losing a week to a bad connection.',
    body: [
      'Almost every learner who writes to us mentions the same obstacle, and it is rarely motivation. It is the connection. The video stops loading at the twelve-minute mark, the electricity goes at eight in the evening, and a week disappears.',
      'The fix is not a better connection — most of us cannot arrange that. The fix is changing when you use the connection. Treat internet time and study time as two separate activities. When you have signal, you download; when you have quiet, you study. Those two things never need to happen at once.',
      'Start each week by downloading the next three lessons and their worksheets while the connection is good, usually early morning. Every Elham course has a download button on each lesson for exactly this purpose. Keep them on your phone, not in the browser cache, so a cleared cache does not cost you the files.',
      'Then set a fixed study hour that does not depend on power. Daylight hours are safest. Thirty minutes of concentrated work on a downloaded lesson beats two hours of waiting for a video to buffer, and it is far less discouraging.',
      'Write your answers on paper and enter them into the quiz later, in one batch, the next time you are online. Your progress syncs when the connection returns. Learners who work this way finish courses at nearly twice the rate of those who study only when they happen to have internet.',
    ],
  },
  {
    slug: 'kankor-preparation-six-month-plan',
    title: 'A Realistic Six-Month Kankor Preparation Plan',
    category: 'Kankor Prep',
    author: 'Rahmatullah Nazari',
    date: '2026-07-02',
    readTime: 9,
    featured: false,
    accent: 'gold',
    icon: 'graduation',
    excerpt:
      'Eleven years of teaching Kankor candidates, reduced to a week-by-week plan you can actually keep.',
    body: [
      'Most students begin Kankor preparation by trying to study everything at once, and stop within three weeks. A plan that works has fewer subjects per week and more repetition.',
      'Months one and two are for coverage. Two subjects a week, no timed practice yet — the goal is only to have seen every topic on the syllabus once and to know honestly which topics frighten you.',
      'Months three and four are for the frightening ones. Return to your weak topics with worked examples, and begin timed sets of ten questions. Ten questions in twelve minutes, twice a week, is enough to start building exam speed.',
      'Month five is past papers. One complete paper a week under real conditions: same time of day, no notes, no phone. Then spend as long reviewing your mistakes as you spent sitting the paper. This review is where the marks actually come from.',
      'Month six is consolidation and rest. No new topics. Two mock exams, a light review of your error notebook, and proper sleep in the final week. Students who study hardest in the last seven days almost always score below their practice average.',
    ],
  },
  {
    slug: 'getting-paid-as-an-afghan-freelancer',
    title: 'Getting Paid as an Afghan Freelancer: What Actually Works',
    category: 'Freelancing',
    author: 'Mustafa Jalali',
    date: '2026-06-21',
    readTime: 8,
    featured: false,
    accent: 'teal',
    icon: 'briefcase',
    excerpt:
      'Finding the client is the easy half. Here is how to receive your money, and the scams that target this exact problem.',
    body: [
      'I have watched capable designers and developers give up freelancing not because they could not find work, but because they could not collect payment for it. This is a solvable problem, but only if you plan for it before you accept the job.',
      'Decide your payment route before you send a proposal. Never take work first and hope to work it out afterwards — that is the position clients exploit, and it is the position scammers look for.',
      'Ask for a deposit. Thirty to fifty percent before you begin is standard professional practice everywhere, and it tests whether a client is real. A client who refuses any deposit on a first project is telling you something useful.',
      'Be careful with anyone who wants to pay you more than you asked, or wants to send money through an unusual route and have you forward part of it. That is a well-known fraud, and it is aimed at freelancers in exactly our situation.',
      'Keep records: a signed scope, an invoice for every payment, and screenshots of every agreement. If a platform dispute happens, documentation decides it. Our freelancing course includes the current, tested payment guide, updated every quarter because these options change.',
    ],
  },
  {
    slug: 'why-we-teach-in-dari-and-pashto',
    title: 'Why We Teach Technical Subjects in Dari and Pashto',
    category: 'Our Approach',
    author: 'Farhad Sadat',
    date: '2026-06-08',
    readTime: 5,
    featured: false,
    accent: 'brand',
    icon: 'languages',
    excerpt:
      'Learning to code in a second language means learning two hard things at once. We separate them.',
    body: [
      'When I learned to program, every tutorial was in English. I was translating in my head before I could even begin to think about the actual problem. It took me a year longer than it should have.',
      'A learner working in a second language is doing two difficult things simultaneously: understanding a new concept, and decoding the language it arrives in. Remove one and the other becomes much easier.',
      'So we explain in Dari and Pashto, and we keep every technical term in English. You hear "حلقه" for the idea and "loop" for the word, together. The concept lands in the language you think in, and the vocabulary you will need to read documentation and job advertisements stays intact.',
      'This is not a compromise on rigour. Our development course covers the same material as any international bootcamp, and graduates work with clients abroad. They simply did not have to learn English grammar to understand a for-loop.',
    ],
  },
  {
    slug: 'five-jobs-you-can-get-with-icdl',
    title: 'Five Jobs You Can Apply For With an ICDL Certificate',
    category: 'Careers',
    author: 'Basira Hakimi',
    date: '2026-05-27',
    readTime: 6,
    featured: false,
    accent: 'coral',
    icon: 'monitor',
    excerpt:
      'Computer literacy is a listed requirement in most office job advertisements here. Here is where it leads.',
    body: [
      'Read twenty job advertisements from any Afghan employment site this week and you will find computer literacy required in most of them. It is the quietest, most reliable entry qualification we teach.',
      'Data entry is the most common first step. It asks for accuracy and speed in spreadsheets, and it is often the door into an organisation rather than the destination.',
      'Administrative and finance assistant roles in NGOs and private companies expect confident Word and Excel work. Our graduates fill these positions constantly, and they usually pay better than the advertisements suggest.',
      'School and clinic record keeping is growing quickly as institutions move from paper to digital systems, and it values reliability over speed.',
      'Shop and inventory management is the fifth, and the most underrated: a small business owner who can run their own stock and accounts in a spreadsheet keeps far more of their margin than one who cannot.',
      'All five start from the same free course. If you finish the ICDL track and the practice tests, you can apply to every one of them.',
    ],
  },
  {
    slug: 'meet-the-instructors-2026',
    title: 'Meet the Instructors Teaching at Elham This Year',
    category: 'Community',
    author: 'Elham Academy',
    date: '2026-05-12',
    readTime: 7,
    featured: false,
    accent: 'gold',
    icon: 'users',
    excerpt:
      'Forty-five instructors across eleven provinces — a teacher, an engineer and a photographer among them.',
    body: [
      'Elham now has forty-five instructors teaching from eleven provinces. Almost all of them do this alongside another job, and that is deliberate: we want people who are still working in the field they teach.',
      'Ustad Rahmatullah Nazari has been preparing Kankor candidates in Mazar-i-Sharif for eleven years. His students have entered medicine and engineering faculties across the country, and he still marks practice papers by hand.',
      'Farhad Sadat writes software for clients in Dubai and Berlin from Herat. Every project in his course is a version of something a client has actually paid him to build.',
      'Latifa Noori photographs daily life in Herat, and her course is the one learners most often say changed how they see, not just what they can do.',
      'If you teach something well and you would like to reach learners in all thirty-four provinces, our instructor applications are open. We provide the recording equipment, the editing and the audience; you bring the subject you know.',
    ],
  },
];

export const instructorPerks = [
  'Recording equipment and editing provided by our Kabul studio',
  'Reach girls and women in all 34 provinces from your first lesson',
  'Teach one course a year — most of our teachers have another job',
  'Full analytics on completion and on the questions students ask',
];

export const supportWays = [
  {
    title: 'Teach a course',
    icon: 'video',
    description:
      'One course a year, recorded and edited by our studio. You bring a subject you know well; we handle everything else.',
    action: { href: '/contact', label: 'Volunteer to teach' },
  },
  {
    title: 'Sponsor a scholarship',
    icon: 'award',
    description:
      'Sponsors cover the 50% examination scholarships and the cost of recording new courses. Arranged directly with us.',
    action: { href: '/contact', label: 'Talk about sponsoring' },
  },
  {
    title: 'Bring us to a classroom',
    icon: 'users',
    description:
      'If you run a school, a community class or a training centre, we will set up free accounts for every student.',
    action: { href: '/enrollment', label: 'Partner with us' },
  },
];

export const contactChannels = [
  {
    title: 'Email Us',
    icon: 'mail',
    value: 'info@elhamonline.af',
    description: 'We reply to every message within one working day.',
    href: 'mailto:info@elhamonline.af',
    action: 'Send an email',
  },
  {
    title: 'Live Support',
    icon: 'chat',
    value: 'WhatsApp: +93 79 123 4567',
    description: 'Saturday to Thursday, 8:00 – 17:00 Kabul time.',
    href: 'https://wa.me/93791234567',
    action: 'Chat Now',
  },
  {
    title: 'Visit Our Office',
    icon: 'pin',
    value: 'Karte Char, District 3, Kabul',
    description: 'Kolola Pushta Road. Come in to register in person or to use a computer.',
    href: '#',
    action: 'Get directions',
  },
];
