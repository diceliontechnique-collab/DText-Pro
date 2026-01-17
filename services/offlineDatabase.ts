
import { Language, Industry, AdTone, AdRequest, AdResult, MarketingGoal } from '../types';

/**
 * Massive Dictionary of Linguistic Hooks and Industry-specific phrases
 * Expanded with Advanced Marketing Psychology (Incremental Update V2)
 */
export const OFFLINE_DICTIONARY: any = {
  [Language.AR_MSA]: {
    hooks: ["هل تبحث عن الجودة؟", "انطلق نحو التميز مع", "اكتشف السر وراء", "بوابتك نحو عالم من"، "لأنك تستحق الأفضل دائماً"],
    industries: {
      [Industry.RESTAURANTS]: "تذوق أشهى الأطباق مع مكونات طازجة يومياً ونكهات لا تُنسى.",
      [Industry.CLINIC]: "رعايتكم هي أولويتنا القصوى مع كادر طبي متميز وأحدث التقنيات.",
      [Industry.TECH_REPAIR]: "حلول تقنية سريعة ومضمونة لهواتفكم وأجهزتكم بأيدي خبراء.",
      [Industry.GENERAL]: "خدمات احترافية متكاملة مصممة خصيصاً لتلبية طموحاتكم.",
      [Industry.BOUTIQUE_MEN]: "أناقة عصرية تليق بمقامك، تشكيلة فاخرة لأرقى المناسبات."
    }
  },
  [Language.AR_MAR]: {
    hooks: ["باغي الجودة والمعقول؟", "تهلا فراسك مع", "الحل اللي كنتي كتقلب عليه", "مبغيتيش تضيع الفرصة؟", "الهمزة اللي مكاتفوتش"],
    industries: {
      [Industry.RESTAURANTS]: "ماكلة بنينة، نقية، وعلى حقها وطريقها. المذاق اللي غايخليك ترجع لعندنا.",
      [Industry.CLINIC]: "صحتك هي راس مالك، طاقم طبي في المستوى وتجهيزات عصرية.",
      [Industry.TECH_REPAIR]: "تليفونك خسر؟ حنا نصلحوه ليك في رمشة عين وبثمن مناسب.",
      [Industry.GENERAL]: "خدمة احترافية، ثقة، وضمان. حنا هنا باش نرضيوكم.",
      [Industry.BOUTIQUE_WOMEN]: "قفطان وجلابة بلمسة عصرية، فصالة وخياطة دايزها الكلام."
    }
  },
  [Language.AR_EGY]: {
    hooks: ["نفسك في إيه؟", "خليك في المضمون مع", "الحق العرض اللي ميتفوتش", "يا بلاش! عرض خاص جداً", "إحنا بتوع الثقة والضمان"],
    industries: {
      [Industry.RESTAURANTS]: "أكل بيتي يجنن وطعم ملوش زي، شاورما وكشري على أصوله ونضافة مية مية.",
      [Industry.CLINIC]: "صحتك غالية علينا، دكاترة خبرة وأمان تام بأحدث الأجهزة الطبية.",
      [Industry.TECH_REPAIR]: "موبايلك باظ؟ متقلقش إحنا هنرجعه جديد في ثانية وبأقل سعر.",
      [Industry.GENERAL]: "أعلى جودة وأفضل سعر في مصر، جرب ومش هتندم أبداً."
    }
  },
  [Language.AR_SAU]: {
    hooks: ["تبي الأفضل؟", "جرب الحين وبتشوف الفرق", "عرض خاص لعيونكم", "فخامة تليق بك"، "شيء خيالي ما يتفوت"],
    industries: {
      [Industry.RESTAURANTS]: "طعم الكبسة والمندي الأصيل، جودة تشرفك قدام ضيوفك بنكهاتنا الخاصة.",
      [Industry.CLINIC]: "رعاية صحية عالمية بأيادي خبيرة، راحتكم وصحتكم هي غايتنا.",
      [Industry.TECH_REPAIR]: "صيانة جوالات فورية بقطع غيار أصلية وضمان يريح بالك.",
      [Industry.GENERAL]: "خدمة تبيض الوجه، دقة في المواعيد وجودة في التنفيذ."
    }
  },
  [Language.AR_LEV]: {
    hooks: ["شو ناطر؟", "دلع حالك مع", "الجودة الشامية على أصولها", "لقطة العمر"، "خليك مرتاح مع"],
    industries: {
      [Industry.RESTAURANTS]: "لقمة هنية ونكهة شرقية، مشاوي ومقبلات بتشهي القلب.",
      [Industry.CLINIC]: "صحتك بأمان مع نخبة من الأطباء، اهتمام وعناية من القلب.",
      [Industry.TECH_REPAIR]: "تصليح سريع ومكفول، موبايلك بيرجع متل الليرة."
    }
  }
};

/**
 * Psychological Suffixes based on Marketing Goals
 */
const GOAL_STRATEGIES: any = {
  [MarketingGoal.SALES]: "اطلب الآن واستفد من خصم حصري لفترة محدودة جداً! 💰",
  [MarketingGoal.AWARENESS]: "نحن لا نبيع مجرد خدمة، نحن نبني مستقبلاً أفضل معكم. ✨",
  [MarketingGoal.URGENT]: "الكمية محدودة جداً! لا تدع الفرصة تفوتك، تواصل معنا فوراً! ⏳",
  [MarketingGoal.PRESTIGE_BOOST]: "انضم إلى صفوة المجتمع واستمتع بتجربة الرفاهية التي تستحقها. 👑",
  [MarketingGoal.BREAK_FEAR]: "ضمان حقيقي 100%.. جرب خدمتنا واسترجع مالك إن لم تكن راضياً. ✅",
  [MarketingGoal.TRUE_SCARCITY]: "باقي 3 قطع فقط في المخزن! كن أنت الفائز بها اليوم. 🔥"
};

/**
 * Tone-based Power Words
 */
const TONE_ENHANCERS: any = {
  [AdTone.PSYCHOLOGICAL]: "اكتشف القوة الكامنة، سر النجاح، التأثير المذهل.",
  [AdTone.FAST]: "بسرعة البرق، الآن، فوراً، انطلق، لا تتوقف.",
  [AdTone.LUXURY]: "نخبوية، فخامة مطلقة، رقي، تفرد، استثناء.",
  [AdTone.EMOTIONAL]: "من القلب، حنين، دفء، أمان، لحظات لا تنسى.",
  [AdTone.AUTHORITATIVE]: "نحن الخبراء، ثقة مطلقة، معايير عالمية، قوة الأداء."
};

export const generateOfflineAd = (request: AdRequest): AdResult => {
  // Select Language Template
  const langData = OFFLINE_DICTIONARY[request.language] || OFFLINE_DICTIONARY[Language.AR_MSA];
  
  // Pick a random hook from expanded list
  const hook = langData.hooks[Math.floor(Math.random() * langData.hooks.length)];
  
  // Pick Industry Text
  const industryText = langData.industries[request.industry] || langData.industries[Industry.GENERAL];
  
  // Get Goal Strategy
  const goalText = GOAL_STRATEGIES[request.marketingGoal] || "تواصل معنا للمزيد من المعلومات.";
  
  // Get Tone Suffix
  const tonePowerWords = TONE_ENHANCERS[request.tone] || "";
  
  let toneSuffix = "";
  if (request.tone === AdTone.HUMOROUS) toneSuffix = " (بلمسة مرحة تبهج يومك) 😊";
  if (request.tone === AdTone.PSYCHOLOGICAL) toneSuffix = ` (استراتيجية إقناع: ${tonePowerWords}) 🧠`;
  if (request.tone === AdTone.LUXURY) toneSuffix = ` (طابع نخبوي: ${tonePowerWords}) 💎`;

  // Build the improved text using the new layers
  const improvedText = `${hook}\n\n${request.originalText}\n\n${industryText}\n\n${request.specialAdvantage ? `💡 ميزة حصرية: ${request.specialAdvantage}\n` : ''}${request.customTextToInclude ? `✨ ملاحظة: ${request.customTextToInclude}\n` : ''}\n${goalText}\n${toneSuffix}`;

  return {
    improvedText: improvedText,
    psychologicalHook: `تطبيق تكتيك [${request.marketingGoal}] مع نبرة [${request.tone}] لضمان أقصى استجابة (نظام المحرك المحلي المطور V2)`,
    characterCount: improvedText.length,
    actualDurationSeconds: Math.max(5, improvedText.split(/\s+/).length * 0.6), // Smart duration estimate
    suggestions: [
      "استخدم نبرة واثقة ومخارج حروف واضحة جداً",
      "تأكد من الوقوف عند الفواصل لإعطاء فرصة للمستمع للاستيعاب",
      "ركز على الميزة الحصرية في نبرة صوتك"
    ]
  };
};
