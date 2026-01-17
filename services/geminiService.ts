
import { GoogleGenAI, Type } from "@google/genai";
import { AdRequest, AdResult, AdTone, CorrectionMode, Language, OutputFormat } from "../types";
import { generateOfflineAd } from "./offlineDatabase";

// Always use named parameter for apiKey during initialization.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const getWordsPerSecondByTone = (tone: AdTone): number => {
  switch (tone) {
    case AdTone.FAST: return 3.0;
    case AdTone.URGENT: return 2.8;
    case AdTone.HUMOROUS: return 2.4;
    case AdTone.PROFESSIONAL: return 2.2;
    case AdTone.PSYCHOLOGICAL: return 1.9;
    case AdTone.EMOTIONAL: return 1.7;
    case AdTone.LUXURY: return 1.6;
    default: return 2.2;
  }
};

export const optimizeAdText = async (request: AdRequest, refinementMode?: string): Promise<AdResult> => {
  if (typeof navigator !== 'undefined' && !navigator.onLine) {
    console.warn("Offline detected. Using Local Database.");
    return generateOfflineAd(request);
  }

  const isSocial = request.outputFormat === OutputFormat.SOCIAL_TEXT;
  const isVoice = request.outputFormat === OutputFormat.VOICE_SCRIPT;
  const isQuickFix = !!request.correctionMode;
  const wordsPerSecond = getWordsPerSecondByTone(request.tone);
  const targetWordCount = Math.floor(request.targetDurationSeconds * wordsPerSecond);

  const isArabicDialect = request.language !== Language.EN && request.language !== Language.FR;
  const scriptConstraint = isArabicDialect 
    ? "تحذير صارم جداً وملزم: يُمنع منعاً باتاً وكلياً استخدام الحروف اللاتينية (الإنجليزية أو الفرنسية) أو لغة (الفرانكو) في الرد. يجب أن يكون النص كامل مكتوباً بالأحرف العربية فقط."
    : "استخدم الحروف اللاتينية المناسبة للغة المختارة.";
  
  const outputModeInstruction = isSocial 
    ? `\n- النمط المطلوب: منشور سوشيال ميديا (Social Copy).
- تعليمات التنسيق: استخدم الإيموجيات بشكل مكثف (حوالي ${request.emojiCount || 5} إيموجي). ركز على نصوص جذابة بصرية وقصيرة ومقسمة لفقرات. ممنوع إدراج أي تعليمات إخراجية صامتة بين أقواس.`
    : `\n- النمط المطلوب: سيناريو صوتي إذاعي (Voice Script).
- تعليمات التنسيق: ركز على الحوار والوصف الصوتي. يجب إدراج تعليمات إخراجية تقنية بين أقواس مربعة [مثلاً: صوت موسيقى حماسية، وقفة قصيرة، نبرة هادئة] بشكل متكرر ليوجه المؤدي. ممنوع استخدام الإيموجيات نهائياً.`;

  let prompt = "";

  if (isQuickFix) {
    let modeInstruction = "";
    switch(request.correctionMode) {
      case CorrectionMode.SPELLING_ONLY: modeInstruction = "- إصلاح الأخطاء الإملائية والنحوية فقط."; break;
      case CorrectionMode.CLEAN_CUES_ONLY: modeInstruction = "- حذف جميع تعليمات الإخراج والأقواس والوقفات والمؤثرات تماماً."; break;
      case CorrectionMode.BOTH: modeInstruction = "- إصلاح الأخطاء الإملائية وحذف جميع تعليمات الإخراج والأقواس والوقفات."; break;
      case CorrectionMode.BOOST_POWER: modeInstruction = "- تثبيت الكلمات القوية: استبدل الكلمات الضعيفة بكلمات تسويقية حماسية ومؤثرة جداً."; break;
      case CorrectionMode.PEOPLE_LANG: modeInstruction = "- تبسيط اللغة للعامة: اجعل النص قريباً جداً من لغة الشارع والمحادثات اليومية."; break;
      case CorrectionMode.ARTISTIC_TOUCH: modeInstruction = "- إضافة لمسات فنية: أضف أوصافاً جمالية وتشبيهات."; break;
      case CorrectionMode.SUMMARIZE: modeInstruction = "- اختصار للمستعجل: قم بتقليل عدد الكلمات لأقصى حد."; break;
    }

    prompt = `
      بصفتك مدقق لغوي ومحرر إعلاني محترف:
      العملية المطلوبة: ${modeInstruction}
      ${outputModeInstruction}
      قاعدة اللغة الصارمة: ${scriptConstraint}
      النص المراد معالجته: "${request.originalText}"
      يجب أن يكون الرد بصيغة JSON حصراً:
      {
        "improvedText": "النص بعد المعالجة المطلوبة فقط وفق النمط المختار",
        "psychologicalHook": "تم تنفيذ نمط [${request.correctionMode}] بنجاح.",
        "characterCount": 0,
        "actualDurationSeconds": 0,
        "suggestions": ["معالجة لغوية دقيقة"]
      }
    `;
  } else {
    const technicalCuesInstruction = (request.includeTechnicalCues && isVoice)
      ? `\n- قاعدة إخراجية إلزامية: يجب إدراج تعليمات فنية وصوتية إخراجية داخل النص الإعلاني بين أقواس مربعة [...] بشكل متكرر لضمان توجيه المؤدي الصوتي.`
      : `\n- قاعدة تصفية: يُمنع تماماً استخدام أي أقواس مربعة أو تعليمات إخراجية أو وقفات داخل النص.`;

    const smartRefinementInstruction = refinementMode ? `\n- التوجيه الاستراتيجي الإضافي: ${refinementMode}` : "";

    prompt = `
      بصفتك خبير عالمي في التسويق السيكولوجي (Neuromarketing):
      
      ${outputModeInstruction}
      قاعدة السيادة اللغوية: ${scriptConstraint}
      ${technicalCuesInstruction}
      ${smartRefinementInstruction}

      المعطيات الفنية:
      - المدة المستهدفة: ${request.targetDurationSeconds} ثانية.
      - النبرة: ${request.tone}.
      - عدد الكلمات المتوقع: حوالي ${targetWordCount} كلمة.
      - الفكرة الأصلية: "${request.originalText}"
      - اللغة: ${request.language}
      - المجال: ${request.industry}
      - الوسيلة: ${request.mediaType}
      ${request.specialAdvantage ? `- ميزة حصرية: "${request.specialAdvantage}"` : ''}
      ${request.customTextToInclude ? `- نص إضافي للدمج: "${request.customTextToInclude}"` : ''}

      يجب أن يكون الرد بصيغة JSON حصراً:
      {
        "improvedText": "النص الإعلاني المحسن بالكامل",
        "psychologicalHook": "شرح تكتيك الإقناع",
        "characterCount": 0,
        "actualDurationSeconds": 0,
        "suggestions": ["اقتراح 1", "اقتراح 2"]
      }
    `;
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            improvedText: { type: Type.STRING },
            psychologicalHook: { type: Type.STRING },
            characterCount: { type: Type.INTEGER },
            actualDurationSeconds: { type: Type.NUMBER },
            suggestions: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["improvedText", "psychologicalHook", "characterCount", "actualDurationSeconds", "suggestions"]
        }
      }
    });

    const text = response.text?.trim() || "{}";
    const result = JSON.parse(text);
    
    const wordCount = result.improvedText.split(/\s+/).filter(Boolean).length;
    const wordsPerSecondCalculated = getWordsPerSecondByTone(request.tone);
    const calculatedDuration = wordCount / wordsPerSecondCalculated;
    
    if (!result.characterCount) result.characterCount = result.improvedText.length;
    result.actualDurationSeconds = calculatedDuration;
    
    return result as AdResult;
  } catch (error) {
    return generateOfflineAd(request);
  }
};
