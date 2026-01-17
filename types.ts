
export enum Language {
  // Arabic Dialects
  AR_MSA = 'العربية الفصحى',
  AR_EGY = 'اللهجة المصرية',
  AR_SAU = 'اللهجة السعودية (خليجي)',
  AR_UAE = 'اللهجة الإماراتية',
  AR_MAR = 'الدارجة المغربية',
  AR_ALG = 'الدارجة الجزائرية',
  AR_TUN = 'الدارجة التونسية',
  AR_LEV = 'اللهجة الشامية (سوريا/لبنان)',
  AR_IRQ = 'اللهجة العراقية',
  AR_SUD = 'اللهجة السودانية',
  AR_YEM = 'اللهجة اليمنية',
  // World Languages
  EN = 'الإنجليزية (English)',
  FR = 'الفرنسية (Français)',
  // Fixed typo in Spanish name
  ES = 'الإسبانية (Español)',
  RU = 'الروسية (Русский)',
  FA = 'الفارسية (فارسی)',
  KU = 'الكردية (Kurdî)',
  TR = 'التركية (Türkçe)',
  NL = 'الهولندية (Nederlands)'
}

export enum Industry {
  GENERAL = 'عام / تجاري (لكل المشاريع)',
  E_COMMERCE = 'التجارة الإلكترونية (بيع أونلاين)',
  PROFESSIONALS = 'المهنيين والحرفيين (معلمية الحرفة)',
  TECH_REPAIR = 'خدمات الهواتف (إصلاح وبيع الموبايلات)',
  COMPANIES = 'الشركات والمؤسسات والمكاتب الكبرى',
  RESTAURANTS = 'مطاعم وأكلات شعبية وسريعة',
  CAFES = 'مقاهي وقاعات شاي وجلسات',
  MAHLABA = 'محلبة ووجبات خفيفة وعصائر',
  BAKERY = 'مخبزة وحلويات عصرية وتقليدية',
  PIZZERIA = 'مطاعم بيتزا وفطاير',
  GRILL_HOUSE = 'شواء ولحوم مشوية',
  CATERING = 'تموين الحفلات والمناسبات',
  BUTCHER = 'جزار ولحوم طرية',
  FISH_MARKET = 'بائع سمك طري وفواكه البحر',
  SPICES_SHOP = 'عطارة وتوابل وأعشاب',
  SUPERMARKET = 'سوبر ماركت ومحلات بقالة',
  FRUITS_VEGGIES = 'بائع خضر وفواكه طرية',
  SWEETS_SHOP = 'محل حلويات وشوكولاتة',
  ICE_CREAM = 'محل آيس كريم ومرطبات',
  BARBER = 'حلاق للرجال وصالون حلاقة',
  BEAUTY_SALON = 'صالون تجميل وعناية للمرأة',
  SPA_HAMMAM = 'حمام تقليدي وسبا واسترخاء',
  LAUNDRY = 'مصبنة وغسل وتجهيز الملابس',
  TAILOR_MEN = 'خياط رجالي وبذل رسمية',
  TAILOR_WOMEN = 'خياطة عصرية وتقليدية (قفطان وجلابة)',
  WEDDING_HALL = 'قاعات أفراح ومناسبات',
  MAKEUP_ARTIST = 'خبيرة تجميل ومكياج سينمائي',
  PERFUMES = 'عطور وبخور ومواد تجميل',
  GYM_CLUB = 'قاعة رياضة ولياقة بدنية',
  YOGA_STUDIO = 'مركز يوغا وتأمل',
  BOUTIQUE_KIDS = 'بوتيك ملابس ولوازم الأطفال',
  BOUTIQUE_WOMEN = 'ملابس نسائية واكسسوارات',
  BOUTIQUE_MEN = 'ملابس رجالية وأحذية عصرية',
  SHOES_BAGS = 'أحذية وحقائب يدوية فخمة',
  JEWELRY = 'ذهب ومجوهرات وساعات ثمنية',
  BABY_SHOP = 'مستلزمات الرضع وحديثي الولادة',
  OPTICIAN = 'نظارات طبية وشمسية وبصريات',
  SPORTS_WEAR = 'ملابس ومعدات رياضية',
  LEATHER_GOODS = 'مصنوعات جلدية أصلية',
  CLINIC = 'عيادات طبية وتخصصات صحية',
  PHARMACY = 'صيدليات ومواد شبه طبية',
  MEDICAL_LAB = 'مختبرات تحاليل طبية متطورة',
  DENTIST = 'طبيب أسنان وتجميل الابتسامة',
  PHYSIOTHERAPY = 'ترويض طبي وعلاج طبيعي',
  VETERINARY = 'عيادة بيطرية ورعاية الحيوانات',
  RADIOLOGY = 'مركز أشعة وتشخيص طبي',
  PSYCHOLOGIST = 'استشارات نفسية وتطوير ذات',
  ALTERNATIVE_MED = 'طب بديل وتداوي طبيعي',
  REAL_ESTATE = 'بيع وكراء المنازل والعقارات',
  CONSTRUCTION = 'مقاولات بناء وتعمير وأشغال',
  INTERIOR_DESIGN = 'ديكور وتصميم داخلي للمنازل',
  FURNITURE = 'أثاث منزلي وتجهيز صالونات',
  CURTAINS = 'ستائر وتفريشات منزلية عصرية',
  HOUSEHOLD = 'أجهزة منزلية وكهرومنزلية',
  CARPENTRY = 'نجارة الخشب والألمنيوم',
  PLUMBING = 'رصاص وخدمات سباكة وصيانة',
  ELECTRICIAN = 'كهربائي منزلي وصناعي',
  PAINTER = 'صباغة وديكورات الحائط',
  HARDWARE_SHOP = 'بيع مواد البناء والعقاقير',
  GARDENING = 'بستنة وتنسيق حدائق',
  SOLAR_ENERGY = 'طاقة شمسية وحلول متجددة',
  AIR_CONDITIONING = 'تبريد وتكييف الهواء',
  SECURITY_SYSTEMS = 'كاميرات مراقبة وأنظمة أمان',
  SMART_HOME = 'تجهيز منازل ذكية رقمية',
  LAWYER = 'مكاتب محاماة واستشارات قانونية',
  ACCOUNTANT = 'محاسبة وتدبير مالي وضرائب',
  NOTARY = 'مكتب توثيق وعدول',
  TRAVEL_AGENCY = 'وكالة أسفار وحجز رحلات وعمرة',
  CAR_RENTAL = 'وكالة تأجير السيارات',
  INSURANCE = 'خدمات التأمين على السيارات والحياة',
  INVESTMENT = 'استشارات استثمارية وبورصة',
  BANKING = 'خدمات بنكية وتمويل قروض',
  RECRUITMENT = 'وكالة توظيف وموارد بشرية',
  TRANSLATION = 'ترجمة محلفة ولغات',
  PR_AGENCY = 'علاقات عامة وتواصل مؤسساتي',
  LOGISTICS = 'شحن وتوصيل وسلع دولية',
  CUSTOMS = 'تعشير جمركي واستيراد وتصدير',
  AUTO_DEALER = 'بيع وشراء السيارات الجديدة والمستعملة',
  MECHANIC = 'ميكانيك وإصلاح محركات السيارات',
  CAR_WASH = 'غسل وتلميع وتنظيف السيارات',
  AUTO_PARTS = 'قطع غيار السيارات الأصلية',
  TIRES_SHOP = 'بيع وإصلاح العجلات والموازنة',
  CAR_RENTAL_LUX = 'تأجير سيارات فخمة للمناسبات',
  SCHOOL_PRIVATE = 'مدارس خاصة وحضانات تعليمية',
  TRAINING_CENTER = 'مراكز تكوين مهني ولغات',
  DRIVING_SCHOOL = 'تعليم السياقة وقانون السير',
  UNIVERSITY = 'جامعات ومعاهد عليا',
  LIBRARY = 'مكتبة ولوازم مدرسية وأدوات',
  ONLINE_ACADEMY = 'أكاديمية تعليمية أونلاين',
  PHONE_SHOP = 'بيع الهواتف الذكية واكسسواراتها',
  COMPUTER_STORE = 'بيع وصيانة الحواسيب واللابتوب',
  DIGITAL_MARKETING = 'تسويق رقمي وإعلانات فيسبوك وإنستا',
  WEB_SERVICES = 'تصميم مواقع إنترنت وبرمجة',
  APP_DEVELOPMENT = 'صناعة تطبيقات الهاتف الجوال',
  GRAPHIC_DESIGN = 'تصميم لوغو وهويات بصرية',
  PHOTOGRAPHY = 'تصوير فوتوغرافي وفيديو مناسبات',
  PRINTING_SHOP = 'مطبعة وخدمات نسخ وتغليف مطبوعات',
  CYBER_CAFE = 'نادي إنترنت وألعاب إلكترونية',
  AI_CONSULTING = 'استشارات الذكاء الاصطناعي للأعمال',
  GAMING_SHOP = 'معدات ألعاب وإلكترونيات ترفيهية',
  PET_SHOP = 'محل حيوانات أليفة وأكل ولوازم',
  TO_STORE = 'محل ألعاب أطفال وهدايا',
  FLOWER_SHOP = 'محل زهور وهدايا وتزيين',
  CHARITY_NGO = 'جمعيات ومنظمات خيرية وتنموية',
  VIRTUAL_ASSISTANT = 'خدمات سكرتارية ومساعدة عن بعد'
}

export enum AdTone {
  PROFESSIONAL = 'رسمي احترافي',
  HUMOROUS = 'احترافي فكاهي',
  PSYCHOLOGICAL = 'سيكولوجي مقنع (تأثير عميق)',
  FAST = 'سريع وحماسي',
  EMOTIONAL = 'عاطفي ومؤثر',
  LUXURY = 'فاخر ونخبوي',
  URGENT = 'عاجل (خلق الندرة)',
  INSPIRATIONAL = 'ملهم ومحفز',
  AUTHORITATIVE = 'متمكن وسلطوي (ثقة مطلقة)',
  MYSTERIOUS = 'غامض وساحر (لجذب الفضول)',
  ANALYTICAL = 'تقني تحليلي (بالأرقام والدلائل)',
  DRAMATIC = 'قصصي درامي (سرد روائي)',
  PROVOCATIVE = 'استفزازي ذكي (لتحريك المشاعر)',
  WARM = 'دافئ وعائلي (حميمي)',
  COUNSELOR = 'ناصح أمين (صديق العميل)',
  STRICT = 'واقعي صارم (بلا مبالغة)',
  EPIC = 'ملحمي وتاريخي (للمشاريع الكبرى)',
  FUTURISTIC = 'مستقبلي ريادي (خارج الصندوق)'
}

export enum MediaType {
  RADIO = 'إذاعة',
  TV_AD = 'إعلان تلفزيوني',
  SOCIAL_POST = 'منشور منصات (Facebook/Insta)',
  TIKTOK_REELS = 'فيديو قصير (TikTok/Reels)',
  YOUTUBE = 'إعلان يوتيوب',
  PRESS = 'صحافة ومقالات',
  STREET_BILLBOARD = 'لوحات الشوارع'
}

export enum OutputFormat {
  SOCIAL_TEXT = 'نص للصورة (Social Copy)',
  VOICE_SCRIPT = 'سيناريو صوتي (Voice Script)'
}

export enum MarketingGoal {
  AWARENESS = 'بناء الوعي',
  SALES = 'تحقيق مبيعات فورية',
  LEADS = 'جذب العملاء',
  RE_TARGETING = 'إعادة الاستهداف',
  BREAK_FEAR = 'كسر حاجز الخوف والتردد',
  ELITE_LEADS = 'جذب النخبة والعملاء المميزين',
  COMPETITOR_SWITCH = 'سحب عملاء المنافسين',
  PRESTIGE_BOOST = 'تعزيز البرستيج الاجتماعي',
  TREND_MAKING = 'صناعة التريند والهوس',
  EDUTAINMENT = 'التعليم بالترفيه (Edutainment)',
  HIGH_PRICE_ANCHOR = 'تثبيت قيمة السعر المرتفع',
  TRUE_SCARCITY = 'خلق الندرة الحقيقية المبررة',
  TRIBE_BUILDING = 'بناء القبيلة والولاء المجتمعي',
  TRIAL_NUDGE = 'الحث على التجربة الأولى',
  // Added URGENT goal to resolve build error in offlineDatabase.ts
  URGENT = 'خلق حالة استعجال (عاجل)'
}

export enum LengthType {
  LINES = 'عدد الأسطر',
  CHARACTERS = 'عدد الحروف'
}

export enum CorrectionMode {
  SPELLING_ONLY = 'إصلاح إملاء فقط',
  CLEAN_CUES_ONLY = 'تصفية التعليمات فقط',
  BOTH = 'إملاء وتصفية تعليمات',
  BOOST_POWER = 'تثبيت الكلمات القوية',
  PEOPLE_LANG = 'تبسيط اللغة للعامة',
  ARTISTIC_TOUCH = 'إضافة لمسات فنية',
  SUMMARIZE = 'اختصار للمستعجل'
}

export interface AdRequest {
  originalText: string;
  language: Language;
  industry: Industry;
  tone: AdTone;
  mediaType: MediaType;
  outputFormat: OutputFormat;
  marketingGoal: MarketingGoal;
  targetDurationSeconds: number;
  emojiCount?: number;
  targetLengthType?: LengthType;
  targetLengthValue?: number;
  includeTechnicalCues?: boolean;
  correctionMode?: CorrectionMode;
  specialAdvantage?: string;
  customTextToInclude?: string;
}

export interface AdResult {
  improvedText: string;
  suggestions: string[];
  actualDurationSeconds: number;
  characterCount: number;
  psychologicalHook: string;
}

export interface HistoryItem extends AdResult {
  id: string;
  timestamp: number;
  requestParams: Partial<AdRequest>;
}
