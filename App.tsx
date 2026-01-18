
import React, { useState, useEffect, useRef } from 'react';
import { Layout } from './components/Layout';
import { AdTone, MediaType, MarketingGoal, Language, Industry, OutputFormat, AdRequest, AdResult, HistoryItem, LengthType, CorrectionMode } from './types';
import { optimizeAdText } from './services/geminiService';

/**
 * مكون الشعار التقني المتطور (DT Logo) الموحد
 */
const DTLogo = ({ size = "w-10 h-10", glow = true, className = "" }) => (
  <div className={`${size} relative flex items-center justify-center group ${className}`}>
    {glow && <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full group-hover:bg-blue-400/40 transition-all duration-1000"></div>}
    <svg viewBox="0 0 100 100" className="w-full h-full relative z-10 drop-shadow-[0_0_15px_rgba(14,165,233,0.9)] transition-transform duration-500 group-hover:scale-110">
      <defs>
        <linearGradient id="dt-grad-main" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#0ea5e9', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#2563eb', stopOpacity: 1 }} />
        </linearGradient>
        <filter id="neon-glow-filter" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.3" className="text-blue-500/10" />
      <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="0.8" className="text-blue-500/20" strokeDasharray="10 5" />
      <path d="M10,50 L90,50 M50,10 L50,90" fill="none" stroke="currentColor" strokeWidth="0.1" className="text-blue-400/20" />
      <path d="M20,20 L45,20 Q70,20 70,50 Q70,80 45,80 L20,80 Z" fill="none" stroke="url(#dt-grad-main)" strokeWidth="10" strokeLinejoin="round" style={{ filter: 'url(#neon-glow-filter)' }} />
      <path d="M28,30 L40,30 Q58,30 58,50 Q58,70 40,70 L28,70 Z" fill="none" stroke="#0ea5e9" strokeWidth="1.5" opacity="0.4" />
      <path d="M50,20 L95,20" fill="none" stroke="url(#dt-grad-main)" strokeWidth="10" strokeLinecap="round" style={{ filter: 'url(#neon-glow-filter)' }} />
      <path d="M72.5,20 L72.5,80" fill="none" stroke="url(#dt-grad-main)" strokeWidth="10" strokeLinecap="round" style={{ filter: 'url(#neon-glow-filter)' }} />
      <circle cx="72.5" cy="50" r="4" fill="#fff" className="animate-pulse shadow-white shadow-xl" />
      <path d="M72.5,35 L90,35 M72.5,65 L90,65" fill="none" stroke="#0ea5e9" strokeWidth="1.5" strokeDasharray="2 2" />
      <circle cx="90" cy="35" r="2" fill="#0ea5e9" />
      <circle cx="90" cy="65" r="2" fill="#0ea5e9" />
    </svg>
  </div>
);

const App: React.FC = () => {
  // --- الحالات الأساسية ---
  const [originalText, setOriginalText] = useState('');
  const [language, setLanguage] = useState<Language>(Language.AR_MAR);
  const [industry, setIndustry] = useState<Industry>(Industry.GENERAL);
  const [tone, setTone] = useState<AdTone>(AdTone.PSYCHOLOGICAL);
  const [mediaType, setMediaType] = useState<MediaType>(MediaType.SOCIAL_POST);
  const [outputFormat, setOutputFormat] = useState<OutputFormat>(OutputFormat.SOCIAL_TEXT);
  const [marketingGoal, setMarketingGoal] = useState<MarketingGoal>(MarketingGoal.SALES);
  
  // --- الإعدادات الفنية التراكمية ---
  const [totalSeconds, setTotalSeconds] = useState(30);
  const [emojiCount, setEmojiCount] = useState(5);
  const [includeTechnicalCues, setIncludeTechnicalCues] = useState(true);
  const [lengthType, setLengthType] = useState<LengthType>(LengthType.CHARACTERS);
  const [lengthValue, setLengthValue] = useState(150);
  const [customText, setCustomText] = useState('');
  const [specialAdvantage, setSpecialAdvantage] = useState('');
  const [isEditingAdvantage, setIsEditingAdvantage] = useState(false);

  // --- حالات النظام والتحميل المئوي ---
  const [loading, setLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingStatus, setLoadingStatus] = useState('جاري البدء...');
  const [result, setResult] = useState<AdResult | null>(null);
  const [manualText, setManualText] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [inputCopied, setInputCopied] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [appStarted, setAppStarted] = useState(false);

  // --- المودالات ---
  const [showDevModal, setShowDevModal] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showGuideModal, setShowGuideModal] = useState(false); 

  // --- مراجع التحرير والتمرير التراكمي ---
  const [isEditingInput, setIsEditingInput] = useState(false);
  const [isEditingResult, setIsEditingResult] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const resultRef = useRef<HTMLTextAreaElement>(null);
  const loadingAreaRef = useRef<HTMLDivElement>(null); 

  // --- منطق التبعية الوظيفية ---
  const isVoiceMode = outputFormat === OutputFormat.VOICE_SCRIPT;
  const isSocialMode = outputFormat === OutputFormat.SOCIAL_TEXT;

  // --- تهيئة التفضيلات ---
  useEffect(() => {
    const hasInit = localStorage.getItem('adtext_pro_init_v5');
    if (!hasInit) {
      setLanguage(Language.AR_MAR);
      setMediaType(MediaType.SOCIAL_POST);
      setOutputFormat(OutputFormat.SOCIAL_TEXT);
      setTone(AdTone.PSYCHOLOGICAL);
      setMarketingGoal(MarketingGoal.SALES);
      localStorage.setItem('adtext_pro_init_v5', 'true');
    }
    const savedHistory = localStorage.getItem('adtext_pro_history');
    if (savedHistory) setHistory(JSON.parse(savedHistory));
    const savedTheme = localStorage.getItem('adtext_pro_theme');
    if (savedTheme === 'light') {
      setIsDarkMode(false);
      document.body.classList.add('light-mode');
    }
  }, []);

  useEffect(() => {
    setIsEditingInput(true);
    setIsEditingResult(true);
  }, []);

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        loadingAreaRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
    }
  }, [loading]);

  /**
   * محرك التقدم التناقصي (Asymptotic Progress Engine) - إضافة تراكمية V6
   * يحل مشكلة التجمد البصري عند 99.9% ويضمن حركة مجهرية لامتناهية حتى اكتمال المهمة
   */
  useEffect(() => {
    let interval: any;
    let currentVal = 0;
    const microMessages = [
      "Optimizing Strategic Hooks...",
      "Finalizing Neural Response...",
      "Refining Marketing Output...",
      "Deep Semantic Processing...",
      "Polishing Tone Alignment...",
      "Injecting Power Words...",
      "Verifying Cognitive Impact...",
      "Structuring Persuasion Flow..."
    ];
    
    if (loading) {
      const complexity = Math.max(originalText.length / 400, 1);
      const baseSpeed = 1.6 / complexity; 

      interval = setInterval(() => {
        if (currentVal < 90) {
          // المرحلة الأولى: انطلاق ديناميكي حسب حجم البيانات
          currentVal += baseSpeed;
          setLoadingStatus("جاري تحليل النبرة والسياق...");
        } else if (currentVal < 99) {
          // المرحلة الثانية: تباطؤ تناقصي (Asymptotic Slowdown)
          const gap = 99.5 - currentVal;
          currentVal += gap * 0.08;
          setLoadingStatus("المعالجة العميقة والتدقيق...");
        } else {
          // المرحلة الثالثة: الزحف المجهري اللامتناهي (Infinite Micro-Crawling)
          // نستخدم كسوراً مجهرية لمنع الإيهام بالتوقف
          const microGap = 100 - currentVal;
          currentVal += microGap * 0.012; 
          
          // تدوير الرسائل التقنية للإيحاء بالنشاط المستمر
          if (Math.random() > 0.90) {
            setLoadingStatus(microMessages[Math.floor(Math.random() * microMessages.length)]);
          }
        }
        
        setLoadingProgress(currentVal);
      }, 100);
    } else {
      // النهاية: القفز الفوري إلى 100% عند استلام الرد الفعلي
      if (appStarted) {
        setLoadingProgress(100);
        setLoadingStatus("اكتمل التحسين بنجاح! ✅");
        const t = setTimeout(() => { if(!loading) setLoadingProgress(0); }, 2000);
        return () => clearTimeout(t);
      }
    }
    
    return () => clearInterval(interval);
  }, [loading, originalText.length, appStarted]);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('adtext_pro_theme', newMode ? 'dark' : 'light');
    if (!newMode) {
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
    }
  };

  // --- وظائف التحكم في النص ---
  const handleInputInsertCue = () => setOriginalText(prev => prev + "\n[توجيه: نبرة هادئة / وقفة]");
  const handleInputInsertCTA = () => setOriginalText(prev => prev + "\n\n📣 للطلب والاستفسار، تواصلوا معنا الآن عبر: [أدخل الهاتف أو الرابط هنا]");
  const handleStripCuesInput = () => setOriginalText(prev => prev.replace(/\[.*?\]/g, '').replace(/\s+/g, ' ').trim());
  const handleSelectAllInput = () => { setIsEditingInput(true); setTimeout(() => { inputRef.current?.focus(); inputRef.current?.select(); }, 50); };
  const handleCutInput = () => { if (!originalText) return; navigator.clipboard.writeText(originalText).then(() => { setOriginalText(''); setInputCopied(true); setTimeout(() => setInputCopied(false), 2000); }); };
  const handlePasteInput = async () => { try { setIsEditingInput(true); window.focus(); const text = await navigator.clipboard.readText(); if (text) { setOriginalText(prev => prev + text); setInputCopied(true); setTimeout(() => setInputCopied(false), 1500); setTimeout(() => inputRef.current?.focus(), 100); } } catch (err) { alert('استخدم (Ctrl+V) يدوياً.'); } };
  const handleQuickCopyInput = () => { navigator.clipboard.writeText(originalText); setInputCopied(true); setTimeout(() => setInputCopied(false), 2000); };
  const handleClearInput = () => { if(window.confirm('مسح النص؟')) setOriginalText(''); };
  const handleTrimInput = () => setOriginalText(originalText.replace(/\s+/g, ' ').trim());
  const handleDuplicateInput = () => setOriginalText(prev => prev + "\n" + prev);

  // --- وظائف النتائج ---
  const handleManualInsertCue = () => setManualText(prev => prev + "\n[توجيه صوتي هنا: نبرة هادئة / وقفة قصيرة]");
  const handleManualInsertPause = () => setManualText(prev => prev + " [وقفة مطولة ..] ");
  const handleManualGoldFrame = () => setManualText(prev => "✨🏆━━━━━━━━━━━━🏆✨\n" + prev + "\n✨🏆━━━━━━━━━━━━🏆✨");
  const handleManualPoeticLines = () => setManualText(prev => prev.split('\n').filter(l => l.trim()).map(line => `💎 ${line} 💎`).join('\n'));
  const handleManualNumbering = () => setManualText(prev => prev.split('\n').map((line, index) => line.trim() ? `${index + 1}. ${line}` : line).join('\n'));
  const handleManualSceneBreak = () => setManualText(prev => prev + "\n\n---------------- [مشهد جديد] ----------------\n");
  const handleSelectAllResult = () => { setIsEditingResult(true); setTimeout(() => { resultRef.current?.focus(); resultRef.current?.select(); }, 50); };
  const handleCutResult = () => { if (!manualText) return; navigator.clipboard.writeText(manualText).then(() => { setManualText(''); setCopied(true); setTimeout(() => setCopied(false), 2000); }); };
  const handlePasteResult = async () => { try { setIsEditingResult(true); window.focus(); const text = await navigator.clipboard.readText(); if (text) { setManualText(prev => prev + text); setCopied(true); setTimeout(() => setCopied(false), 1500); setTimeout(() => resultRef.current?.focus(), 100); } } catch (err) { alert('المتصفح يمنع اللصق.'); } };
  const handleStripCuesResult = () => setManualText(manualText.replace(/\[.*?\]/g, '').replace(/\s+/g, ' ').trim());
  const handleSpellFixResult = () => handleOptimize("إصلاح الأخطاء الإملائية");
  const handleExpressionFixResult = () => handleOptimize("تحسين الصياغة والبلاغة");
  const handleSaveResult = () => { if (result) { const newItem: HistoryItem = { ...result, improvedText: manualText, id: Date.now().toString(), timestamp: Date.now(), requestParams: { language, industry, tone } }; setHistory([newItem, ...history]); localStorage.setItem('adtext_pro_history', JSON.stringify([newItem, ...history])); alert('تم الحفظ 💾'); } };

  const formatDuration = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = Math.floor(s % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleOptimize = async (refineMsg?: string, quickMode?: CorrectionMode) => {
    if (!originalText.trim() && !manualText.trim()) { setError('اكتب فكرتك أولاً.'); return; }
    setAppStarted(true); setLoading(true); setError(null); setResult(null);
    try {
      const adRequest: AdRequest = {
        originalText: quickMode ? originalText : (refineMsg ? manualText || originalText : originalText),
        language, industry, tone, mediaType, outputFormat, marketingGoal, targetDurationSeconds: totalSeconds,
        emojiCount: outputFormat === OutputFormat.SOCIAL_TEXT ? emojiCount : undefined,
        targetLengthType: outputFormat === OutputFormat.SOCIAL_TEXT ? lengthType : undefined,
        targetLengthValue: outputFormat === OutputFormat.SOCIAL_TEXT ? lengthValue : undefined,
        includeTechnicalCues: includeTechnicalCues,
        correctionMode: quickMode, specialAdvantage: specialAdvantage.trim() || undefined,
        customTextToInclude: customText.trim() || undefined
      };
      const optimized = await optimizeAdText(adRequest, refineMsg);
      setResult(optimized); 
      setManualText(optimized.improvedText); 
      setLoading(false); 
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) { setError(err.message || 'خطأ فني.'); setLoading(false); }
  };

  const ResultSection = () => (
    <div className="w-full animate-in slide-in-from-top duration-700 scroll-target">
      {result && (
        <div className={`glass-card rounded-[2.5rem] p-8 border-emerald-500/20 shadow-2xl relative neon-playing mb-10`}>
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-3">
              <span className="px-5 py-2 bg-emerald-500/10 text-emerald-400 rounded-full text-[10px] font-black border border-emerald-500/30 neon-text-blue">المحتوى الإعلاني المحسن</span>
              <button onClick={() => { setIsEditingResult(!isEditingResult); if(!isEditingResult) setTimeout(() => resultRef.current?.focus(), 100); }} className={`px-4 py-1.5 rounded-xl text-[10px] font-black border ${isEditingResult ? 'bg-emerald-600 text-white' : 'bg-slate-900 text-emerald-400 border-slate-700'}`}>
                {isEditingResult ? 'حفظ وإغلاق ✅' : 'تعديل حر 📝'}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-10 xl:grid-cols-10 gap-2 mb-6 bg-slate-950/40 p-4 rounded-3xl border border-slate-800/60 shadow-inner overflow-x-auto custom-scrollbar">
             <button onClick={handleSaveResult} className="min-w-[70px] px-3 py-2.5 rounded-xl bg-blue-600/10 text-blue-300 border border-blue-500/20 text-[9px] font-black hover:bg-blue-600 hover:text-white transition-all text-center">حفظ 💾</button>
             <button onClick={() => { if(navigator.share) navigator.share({title: 'نص إعلاني', text: manualText}); }} className="min-w-[70px] px-3 py-2.5 rounded-xl bg-purple-600/10 text-purple-300 border border-purple-500/20 text-[9px] font-black hover:bg-purple-600 hover:text-white transition-all text-center">مشاركة 📤</button>
             <button onClick={() => { navigator.clipboard.writeText(manualText); setCopied(true); setTimeout(() => setCopied(false), 2000); }} className="min-w-[70px] px-3 py-2.5 rounded-xl bg-emerald-600/10 text-emerald-300 border border-emerald-500/20 text-[9px] font-black hover:bg-emerald-600 hover:text-white transition-all text-center">{copied ? 'تم ! ✓' : 'نسخ سريع 📋'}</button>
             <button onClick={handlePasteResult} className="min-w-[70px] px-3 py-2.5 rounded-xl bg-slate-900 text-slate-300 border border-slate-800 text-[9px] font-black hover:bg-slate-700 hover:text-white transition-all text-center">لصق إضافي 📥</button>
             <button onClick={handleCutResult} className="min-w-[70px] px-3 py-2.5 rounded-xl bg-slate-900 text-slate-300 border border-slate-800 text-[9px] font-black hover:bg-red-600/40 transition-all text-center">قص النص ✂️</button>
             <button onClick={handleSelectAllResult} className="min-w-[70px] px-3 py-2.5 rounded-xl bg-slate-900 text-slate-300 border border-slate-800 text-[9px] font-black hover:bg-blue-500/40 transition-all text-center">تحديد الكل 🎯</button>
             <button onClick={handleSpellFixResult} className="min-w-[70px] px-3 py-2.5 rounded-xl bg-emerald-600/10 text-emerald-400 border border-emerald-500/10 text-[9px] font-black hover:bg-emerald-600 transition-all text-center">إصلاح إملاء ✍️</button>
             <button onClick={handleExpressionFixResult} className="min-w-[70px] px-3 py-2.5 rounded-xl bg-purple-600/10 text-purple-400 border border-purple-500/10 text-[9px] font-black hover:bg-purple-600 transition-all text-center">إصلاح تعبير 🪄</button>
             <button onClick={handleStripCuesResult} className="min-w-[70px] px-3 py-2.5 rounded-xl bg-yellow-600/10 text-yellow-400 border border-yellow-500/10 text-[9px] font-black hover:bg-yellow-600 transition-all text-center">تصفية [..] 🧹</button>
             <button onClick={handleManualInsertCue} className="min-w-[70px] px-3 py-2.5 rounded-xl bg-slate-900 text-blue-300 border border-blue-500/20 text-[9px] font-black hover:bg-blue-600 transition-all text-center">توجيه صامت 🎙️</button>
          </div>

          <textarea ref={resultRef} value={manualText} onChange={(e) => setManualText(e.target.value)} readOnly={!isEditingResult} className={`w-full ${isDarkMode ? 'bg-slate-950/90 text-slate-100 border-slate-800' : 'bg-slate-50 text-slate-900 border-slate-200'} rounded-3xl p-8 border leading-relaxed text-xl font-medium min-h-[350px] shadow-inner outline-none transition-all resize-y`} spellCheck="false" />

          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="p-5 bg-slate-950 border border-slate-800 rounded-3xl text-center"><p className="text-[10px] uppercase font-bold text-slate-600 mb-2">عدد الحروف</p><p className="text-blue-400 font-black text-3xl neon-text-blue">{manualText.length}</p></div>
            <div className="p-5 bg-slate-950 border border-slate-800 rounded-3xl text-center"><p className="text-[10px] uppercase font-bold text-slate-600 mb-2">المدة الفعلية</p><p className="text-emerald-400 font-black text-3xl">{formatDuration(result.actualDurationSeconds)}</p></div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <Layout isDarkMode={isDarkMode} onAboutClick={() => setShowAboutModal(true)} navActions={<div className="flex gap-2"><button onClick={() => setShowGuideModal(true)} className="px-3 py-1.5 rounded-xl font-black text-[10px] bg-emerald-600/20 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-600 transition-all">دليل الاستخدام 📖</button><button onClick={() => setShowDevModal(true)} className="px-3 py-1.5 rounded-xl font-black text-[10px] bg-blue-600/20 border border-blue-500/40 text-blue-300">عن المطور</button><button onClick={toggleTheme} className="px-3 py-1.5 rounded-xl font-black text-[10px] bg-slate-900 border border-slate-800 text-yellow-400">{isDarkMode ? 'الوضع الساطع' : 'الداكن'}</button><button onClick={() => setShowHistory(!showHistory)} className="px-3 py-1.5 rounded-xl font-black text-[10px] bg-slate-900 border border-slate-800 text-emerald-400">{showHistory ? 'إغلاق السجل' : 'عرض السجل'}</button></div>}>
      <div className="max-w-7xl mx-auto space-y-10 pb-20 px-4">
        <div className="text-center space-y-4">
          <div className="inline-block px-5 py-2 bg-blue-600/10 border border-blue-500/30 rounded-full mb-4 neon-playing"><span className="text-blue-400 text-xs font-black tracking-widest uppercase neon-text-blue">الذكاء الاصطناعي للتسويق السيكولوجي</span></div>
          <h2 className="text-5xl lg:text-6xl font-black leading-tight text-white">صناعة <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">النص الإعلاني</span> الخارق</h2>
        </div>

        <div ref={loadingAreaRef} className="scroll-target">
          {loading && (
            <div className="w-full min-h-[400px] glass-card rounded-[3rem] p-12 flex flex-col items-center justify-center text-center space-y-10 border-blue-500/30 shadow-2xl">
              <div className="relative w-72 h-72 flex items-center justify-center">
                 <div className="absolute inset-0 border-[14px] border-blue-500/5 rounded-full"></div>
                 {/* إضافة نبض بصري (Heartbeat) عند تجاوز 99% للإيحاء بالنشاط الكثيف */}
                 <div className={`absolute inset-0 border-t-[14px] border-blue-500 rounded-full animate-spin shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-all duration-700 ${loadingProgress >= 99 ? 'animate-pulse scale-105' : ''}`} style={{ transform: `rotate(${loadingProgress * 3.6}deg)` }}></div>
                 <div className="absolute inset-8 bg-slate-950/70 rounded-full flex flex-col items-center justify-center border border-white/5 backdrop-blur-sm">
                    {/* استخدام دقة أعلى للأرقام بعد 99% لضمان رؤية الحركة المجهرية */}
                    <span className="text-6xl font-black text-blue-400 font-mono tracking-tighter transition-all">
                      {loadingProgress >= 99 ? loadingProgress.toFixed(3) : Math.floor(loadingProgress)}%
                    </span>
                    <p className={`text-[10px] font-black text-slate-500 mt-2 uppercase tracking-widest transition-all ${loadingProgress >= 99 ? 'text-blue-500 animate-pulse' : ''}`}>
                      {loadingProgress >= 99 ? 'Deep Processing' : 'Processing'}
                    </p>
                 </div>
              </div>
              <div className="space-y-3">
                 <h3 className="text-3xl font-black text-blue-400 animate-pulse">{loadingStatus}</h3>
                 <p className="text-slate-500 text-xs font-medium">الرجاء عدم إغلاق الصفحة لضمان دقة التحسين...</p>
              </div>
            </div>
          )}
        </div>

        {result && <ResultSection />}

        <div className={`glass-card rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden neon-playing`}>
            <div className="flex justify-between items-center mb-6">
              <label className="text-blue-400 font-black text-2xl neon-text-blue">مختبر الإدخال</label>
              <div className="px-5 py-2 rounded-full border border-blue-500/30 bg-blue-500/5 text-blue-400 font-mono text-sm">{originalText.length} حرف</div>
            </div>

            <div className={`p-5 rounded-2xl border mb-6 flex items-center gap-4 ${isDarkMode ? 'bg-blue-600/5 border-blue-500/20' : 'bg-blue-50 border-blue-100'}`}>
               <input type="text" value={specialAdvantage} onChange={(e) => setSpecialAdvantage(e.target.value)} readOnly={!isEditingAdvantage} placeholder="أدخل نقطة القوة الحصرية لدمجها..." className="flex-1 bg-transparent outline-none text-sm font-medium text-white placeholder-slate-600" />
               <button onClick={() => setIsEditingAdvantage(!isEditingAdvantage)} className={`text-[10px] font-black px-6 py-2.5 rounded-xl border transition-all ${isEditingAdvantage ? 'bg-blue-500 text-white shadow-lg' : 'bg-slate-900 text-blue-400 border-slate-700'}`}>{isEditingAdvantage ? 'حفظ 🔒' : 'تعديل 🔓'}</button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2 mb-4 border-b border-slate-800 pb-4 overflow-x-auto custom-scrollbar">
               <button onClick={handleSelectAllInput} className="min-w-[80px] px-2 py-2 rounded-xl text-[10px] font-black bg-slate-900 text-blue-400 border border-slate-700 hover:bg-blue-600 hover:text-white transition-all">تحديد الكل 🎯</button>
               <button onClick={handleCutInput} className="min-w-[80px] px-2 py-2 rounded-xl text-[10px] font-black bg-slate-900 text-blue-400 border border-slate-700 hover:bg-red-600 hover:text-white transition-all">قص النص ✂️</button>
               <button onClick={handleStripCuesInput} className="min-w-[80px] px-2 py-2 rounded-xl text-[10px] font-black bg-slate-900 text-yellow-400 border border-slate-700 hover:bg-yellow-600 hover:text-white transition-all">حذف الإخراج 🧹</button>
               <button onClick={() => { localStorage.setItem('adtext_pro_draft', originalText); alert('تم حفظ المسودة'); }} className="min-w-[80px] px-2 py-2 rounded-xl text-[10px] font-black bg-slate-900 text-blue-400 border border-slate-700 hover:bg-yellow-600 hover:text-white transition-all">حفظ مسودة 💾</button>
               <button onClick={() => setOriginalText(localStorage.getItem('adtext_pro_draft') || '')} className="min-w-[80px] px-2 py-2 rounded-xl text-[10px] font-black bg-slate-800 text-slate-400 border border-slate-700">استعادة 🔄</button>
               <button onClick={() => { setIsEditingInput(!isEditingInput); if(!isEditingInput) setTimeout(() => inputRef.current?.focus(), 100); }} className={`min-w-[80px] px-2 py-2 rounded-xl text-[10px] font-black border transition-all ${isEditingInput ? 'bg-blue-600 text-white' : 'bg-slate-900 text-blue-400 border-slate-700'}`}>تعديل يدوي 🔓</button>
               <button onClick={handleQuickCopyInput} className="min-w-[80px] px-2 py-2 rounded-xl text-[10px] font-black bg-slate-900 text-slate-300 border border-slate-700 hover:bg-blue-500 transition-all">نسخ سريع 📋</button>
               <button onClick={handleClearInput} className="min-w-[80px] px-2 py-2 rounded-xl text-[10px] font-black bg-slate-900 text-red-400 border border-slate-700 hover:bg-red-600 hover:text-white transition-all">تفريغ 🗑️</button>
               <button onClick={handleTrimInput} className="min-w-[80px] px-2 py-2 rounded-xl text-[10px] font-black bg-slate-900 text-emerald-400 border border-slate-700 hover:bg-emerald-600 hover:text-white transition-all">تصفية 🧹</button>
               <button onClick={handleDuplicateInput} className="min-w-[80px] px-2 py-2 rounded-xl text-[10px] font-black bg-slate-900 text-purple-400 border border-slate-700 hover:bg-purple-600 hover:text-white transition-all">مضاعفة 👥</button>
            </div>

            <textarea ref={inputRef} value={originalText} onChange={(e) => setOriginalText(e.target.value)} readOnly={!isEditingInput} placeholder="اكتب فكرة إعلانك هنا..." className="w-full h-56 bg-slate-950/60 border border-slate-800 rounded-[2rem] p-8 text-xl text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none mb-6" />

            <div className="mb-10 space-y-6">
              <div className="flex items-center gap-3">
                 <div className="h-[2px] flex-1 bg-gradient-to-r from-transparent to-blue-500/30"></div>
                 <span className="px-6 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-[11px] font-black uppercase tracking-widest neon-text-blue animate-pulse">صندوق الأدوات التسويقية</span>
                 <div className="h-[2px] flex-1 bg-gradient-to-l from-transparent to-blue-500/30"></div>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-10 gap-3">
                <button onClick={handleInputInsertCue} className="flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-900 border border-blue-500/40 hover:bg-blue-600/20 transition-all group h-24 shadow-sm">
                   <span className="text-xl mb-1">🎙️</span>
                   <span className="text-[9px] font-black text-blue-300 text-center">توجيه صامت</span>
                </button>
                <button onClick={handleInputInsertCTA} className="flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-900 border border-blue-400/30 hover:bg-blue-500/20 transition-all group h-24 shadow-lg shadow-blue-500/5">
                   <span className="text-xl mb-1">📣</span>
                   <span className="text-[9px] font-black text-blue-200 text-center">نداء (CTA)</span>
                </button>
                <button onClick={() => handleOptimize("حول النص إلى لغز تسويقي يثير الفضول الشديد")} className="flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-900 border border-fuchsia-500/30 hover:bg-fuchsia-600/20 transition-all group h-24">
                   <span className="text-xl mb-1">🧲</span>
                   <span className="text-[9px] font-black text-fuchsia-300 text-center">مغناطيس الفضول</span>
                </button>
                <button onClick={() => handleOptimize("أعد صياغة النص ليعتمد على الدليل الاجتماعي")} className="flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-900 border border-teal-500/30 hover:bg-teal-600/20 transition-all group h-24">
                   <span className="text-xl mb-1">🤝</span>
                   <span className="text-[9px] font-black text-teal-300 text-center">دليل اجتماعي</span>
                </button>
                <button onClick={() => handleOptimize("أضف للنص لمسة من الندرة")} className="flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-900 border border-orange-500/30 hover:bg-orange-600/20 transition-all group h-24">
                   <span className="text-xl mb-1">⏳</span>
                   <span className="text-[9px] font-black text-orange-300 text-center">خلق ندرة</span>
                </button>
                <button onClick={() => handleOptimize("اجعل النص ذو نبرة سلطوية قوية")} className="flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-900 border border-blue-500/20 hover:bg-blue-600/20 transition-all group h-24">
                   <span className="text-xl mb-1">👑</span>
                   <span className="text-[9px] font-black text-blue-300 text-center">ثقة سلطوية</span>
                </button>
                <button onClick={() => handleOptimize("أضف لمسة فكاهية ذكية ومقبولة")} className="flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-900 border border-yellow-500/30 hover:bg-yellow-600/20 transition-all h-24">
                   <span className="text-xl mb-1">🎭</span>
                   <span className="text-[9px] font-black text-yellow-300 text-center">لمسة مرح</span>
                </button>
                <button onClick={() => handleOptimize("عزز التأثير السيكولوجي العميق")} className="flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-900 border border-purple-500/30 hover:bg-purple-600/20 transition-all h-24">
                   <span className="text-xl mb-1">🧠</span>
                   <span className="text-[9px] font-black text-purple-300 text-center">تأثير عميق</span>
                </button>
                <button onClick={() => handleOptimize("ارفع منسوب الطاقة والحماس")} className="flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-900 border border-orange-500/30 hover:bg-orange-600/20 transition-all h-24">
                   <span className="text-xl mb-1">⚡</span>
                   <span className="text-[9px] font-black text-orange-300 text-center">طاقة قصوى</span>
                </button>
                <button onClick={() => handleOptimize("اجعل النص عاطفياً يلمس القلب")} className="flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-900 border border-red-500/30 hover:bg-red-600/20 transition-all h-24">
                   <span className="text-xl mb-1">❤️</span>
                   <span className="text-[9px] font-black text-red-300 text-center">لمس القلب</span>
                </button>

                <button onClick={() => handleOptimize("أضف طابع النخبوية والرفاهية")} className="flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-900 border border-indigo-500/30 hover:bg-indigo-600/20 transition-all h-24">
                   <span className="text-xl mb-1">💎</span>
                   <span className="text-[9px] font-black text-indigo-300 text-center">نخبوية فخمة</span>
                </button>
                <button onClick={() => handleOptimize("اجعل النص ملهماً ومحفزاً للعمل")} className="flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-900 border border-blue-400/30 hover:bg-blue-500/20 transition-all h-24">
                   <span className="text-xl mb-1">✨</span>
                   <span className="text-[9px] font-black text-blue-300 text-center">إلهام فوري</span>
                </button>
                <button onClick={() => handleOptimize("حول النص لقصة قصيرة مشوقة")} className="flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-900 border border-pink-500/30 hover:bg-pink-600/20 transition-all h-24">
                   <span className="text-xl mb-1">📖</span>
                   <span className="text-[9px] font-black text-pink-300 text-center">سرد قصصي</span>
                </button>
                <button onClick={() => handleOptimize("أضف أجواء دافئة وعائلية حميمية")} className="flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-900 border border-amber-500/30 hover:bg-amber-600/20 transition-all h-24">
                   <span className="text-xl mb-1">🏠</span>
                   <span className="text-[9px] font-black text-amber-300 text-center">أجواء دافئة</span>
                </button>
                <button onClick={() => handleOptimize("اجعل النص مستقبلياً وريادياً")} className="flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-900 border border-cyan-500/30 hover:bg-cyan-600/20 transition-all h-24">
                   <span className="text-xl mb-1">🚀</span>
                   <span className="text-[9px] font-black text-cyan-300 text-center">رؤية ريادية</span>
                </button>
                <button onClick={() => handleOptimize("ركز على البيع الفوري والمباشر")} className="flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-900 border border-green-500/30 hover:bg-green-600/20 transition-all h-24">
                   <span className="text-xl mb-1">💰</span>
                   <span className="text-[9px] font-black text-green-300 text-center">بيع مباشر</span>
                </button>
                <button onClick={() => handleOptimize("أكد على الضمان والثقة المطلقة")} className="flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-900 border border-emerald-600/30 hover:bg-emerald-700/20 transition-all h-24">
                   <span className="text-xl mb-1">🎖️</span>
                   <span className="text-[9px] font-black text-emerald-300 text-center">ثقة وضمان</span>
                </button>
                <button onClick={() => handleOptimize("بسط النص ليكون واضحاً للمستعجلين")} className="flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-900 border border-lime-500/30 hover:bg-lime-600/20 transition-all h-24">
                   <span className="text-xl mb-1">📉</span>
                   <span className="text-[9px] font-black text-lime-300 text-center">بساطة مطلقة</span>
                </button>
                <button onClick={() => handleOptimize("استبدل الكلمات العادية بكلمات طاقة قوية")} className="flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-900 border border-red-600/30 hover:bg-red-700/20 transition-all h-24">
                   <span className="text-xl mb-1">🔥</span>
                   <span className="text-[9px] font-black text-red-400 text-center">كلمات طاقة</span>
                </button>
                <button onClick={() => handleOptimize("أضف لمسة من السحر والجاذبية")} className="flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-900 border border-violet-500/30 hover:bg-violet-600/20 transition-all h-24">
                   <span className="text-xl mb-1">🪄</span>
                   <span className="text-[9px] font-black text-violet-300 text-center">لمسة ساحرة</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 border-t border-slate-800 pt-8">
              <div className="space-y-3"><label className="text-[11px] text-slate-500 font-black uppercase tracking-wider">اللغة / اللهجة</label><select value={language} onChange={(e) => setLanguage(e.target.value as Language)} className="w-full bg-slate-900 border border-slate-800 p-4 rounded-2xl text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all">{Object.values(Language).map(v => <option key={v} value={v}>{v}</option>)}</select></div>
              <div className="space-y-3"><label className="text-[11px] text-slate-500 font-black uppercase tracking-wider">مجال التخصص (النيش)</label><select value={industry} onChange={(e) => setIndustry(e.target.value as Industry)} className="w-full bg-slate-900 border border-slate-800 p-4 rounded-2xl text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all">{Object.values(Industry).map(v => <option key={v} value={v}>{v}</option>)}</select></div>
              <div className="space-y-3"><label className="text-[11px] text-slate-500 font-black uppercase tracking-wider">نبرة الصوت (Tone)</label><select value={tone} onChange={(e) => setTone(e.target.value as AdTone)} className="w-full bg-slate-900 border border-slate-800 p-4 rounded-2xl text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all">{Object.values(AdTone).map(v => <option key={v} value={v}>{v}</option>)}</select></div>
              <div className="space-y-3"><label className="text-[11px] text-slate-500 font-black uppercase tracking-wider">الوسيلة الإعلامية</label><select value={mediaType} onChange={(e) => setMediaType(e.target.value as MediaType)} className="w-full bg-slate-900 border border-slate-800 p-4 rounded-2xl text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all">{Object.values(MediaType).map(v => <option key={v} value={v}>{v}</option>)}</select></div>
              <div className="space-y-3"><label className="text-[11px] text-slate-500 font-black uppercase tracking-wider">الهدف التسويقي</label><select value={marketingGoal} onChange={(e) => setMarketingGoal(e.target.value as MarketingGoal)} className="w-full bg-slate-900 border border-slate-800 p-4 rounded-2xl text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all">{Object.values(MarketingGoal).map(v => <option key={v} value={v}>{v}</option>)}</select></div>
              <div className="space-y-3"><label className="text-[11px] text-slate-500 font-black uppercase tracking-wider">نمط المخرج النهائي</label><select value={outputFormat} onChange={(e) => setOutputFormat(e.target.value as OutputFormat)} className="w-full bg-slate-900 border border-slate-800 p-4 rounded-2xl text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all">{Object.values(OutputFormat).map(v => <option key={v} value={v}>{v}</option>)}</select></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 mt-10">
              <div className={`p-6 bg-slate-950/40 border border-slate-800 rounded-[2rem] text-center space-y-4 transition-all duration-500 ${!isVoiceMode ? 'opacity-30 grayscale pointer-events-none' : 'opacity-100'}`}>
                <h3 className="text-[11px] font-black text-slate-400">زمن السيناريو الصوتي</h3>
                <div className="text-2xl font-black text-blue-400">{formatDuration(totalSeconds)}</div>
                <input type="range" min="5" max="600" value={totalSeconds} onChange={(e) => setTotalSeconds(parseInt(e.target.value))} disabled={!isVoiceMode} className="w-full accent-blue-500" />
              </div>

              <div className={`p-6 bg-slate-950/40 border border-slate-800 rounded-[2rem] text-center space-y-4 transition-all duration-500 ${!isSocialMode ? 'opacity-30 grayscale pointer-events-none' : 'opacity-100'}`}>
                <h3 className="text-[11px] font-black text-slate-400">طول النص (ذكي)</h3>
                <div className="flex justify-center gap-2 mb-2">
                  <button onClick={() => setLengthType(LengthType.CHARACTERS)} className={`px-3 py-1 rounded-lg text-[9px] font-black transition-all ${lengthType === LengthType.CHARACTERS ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'}`}>حروف</button>
                  <button onClick={() => setLengthType(LengthType.LINES)} className={`px-3 py-1 rounded-lg text-[9px] font-black transition-all ${lengthType === LengthType.LINES ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'}`}>سطور</button>
                </div>
                <div className="text-2xl font-black text-blue-400">{lengthValue} <span className="text-[10px] text-slate-500">{lengthType === LengthType.CHARACTERS ? 'حرف' : 'سطر'}</span></div>
                <input type="range" min={lengthType === LengthType.CHARACTERS ? 50 : 1} max={lengthType === LengthType.CHARACTERS ? 2000 : 50} value={lengthValue} onChange={(e) => setLengthValue(parseInt(e.target.value))} disabled={!isSocialMode} className="w-full accent-blue-500" />
              </div>

              <div className={`p-6 bg-slate-950/40 border border-slate-800 rounded-[2rem] text-center space-y-4 transition-all duration-500 ${!isSocialMode ? 'opacity-30 grayscale pointer-events-none' : 'opacity-100'}`}>
                <h3 className="text-[11px] font-black text-slate-400">كثافة الإيموجيات</h3>
                <div className="text-2xl font-black text-yellow-400">{emojiCount}</div>
                <input type="range" min="0" max="25" value={emojiCount} onChange={(e) => setEmojiCount(parseInt(e.target.value))} disabled={!isSocialMode} className="w-full accent-yellow-500" />
              </div>
              
              <div className="p-6 bg-slate-950/40 border border-slate-800 rounded-[2rem] space-y-4 shadow-inner">
                 <h3 className="text-[11px] font-black text-slate-400 text-center">نص إضافي مدمج</h3>
                 <input type="text" value={customText} onChange={(e) => setCustomText(e.target.value)} placeholder="جملة إضافية..." className="w-full bg-transparent border-b border-slate-700 py-2 outline-none text-xs text-center focus:border-blue-500 transition-all" />
              </div>
              <div className={`p-6 bg-slate-950/40 border border-slate-800 rounded-[2rem] flex flex-col items-center justify-center space-y-4 transition-all duration-500 ${!isVoiceMode ? 'opacity-30 grayscale pointer-events-none' : 'opacity-100'}`}>
                 <h3 className="text-[11px] font-black text-slate-400">تعليمات الإخراج</h3>
                 <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={includeTechnicalCues} onChange={() => setIncludeTechnicalCues(!includeTechnicalCues)} disabled={!isVoiceMode} className="sr-only peer" />
                    <div className="w-14 h-7 bg-slate-800 rounded-full peer peer-checked:bg-emerald-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:after:translate-x-full"></div>
                 </label>
              </div>
            </div>

            <button onClick={() => handleOptimize()} disabled={loading} className="w-full h-20 rounded-[2rem] mt-12 bg-gradient-to-r from-blue-600 to-emerald-500 text-white font-black text-2xl shadow-2xl hover:scale-[1.01] transition-all flex items-center justify-center gap-4 relative overflow-hidden group">
              <span className="relative z-10">{loading ? 'جاري التحسين الذكي...' : 'توليد النص الإعلاني الخارق 🚀'}</span>
              <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            </button>
        </div>
      </div>

      {/* --- مودال دليل الاستخدام --- */}
      {showGuideModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-3xl animate-in fade-in duration-300">
          <div className={`max-w-4xl w-full h-[85vh] ${isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'} border rounded-[3.5rem] p-10 shadow-2xl relative flex flex-col`}>
             <button onClick={() => setShowGuideModal(false)} className="absolute top-8 left-8 w-12 h-12 flex items-center justify-center rounded-full bg-red-500 text-white hover:scale-110 transition-all font-black z-50 shadow-lg">✕</button>
             <div className="overflow-y-auto custom-scrollbar flex-1 pr-4 space-y-12 text-center">
               <div className="space-y-4 flex flex-col items-center">
                 <DTLogo size="w-32 h-32" />
                 <h2 className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">دليل الاستخدام الشامل DText Pro</h2>
                 <p className="text-slate-500 font-medium max-w-lg mx-auto">دليلك الاحترافي لصناعة محتوى تسويقي خارق يعتمد على الذكاء الاصطناعي السيكولوجي</p>
               </div>
               <section className="space-y-6 text-right">
                 <h3 className="text-2xl font-black flex items-center gap-3 text-blue-400 border-b border-blue-500/20 pb-2"><span>01</span> مختبر الإدخال & الأبنية النصية</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="space-y-4">
                     <p className="font-bold text-lg">💡 حقل النص الأساسي:</p>
                     <p className="text-sm opacity-80 leading-relaxed">ضع هنا فكرتك الخام بأي لغة أو لهجة، الذكاء الاصطناعي سيقوم بإعادة الهيكلة.</p>
                   </div>
                   <div className="space-y-4">
                     <p className="font-bold text-lg">🔐 ميزة حصرية:</p>
                     <p className="text-sm opacity-80 leading-relaxed">أهم ميزة تجعل العميل يختارك، سيسعى النظام لدمجها بشكل طبيعي ومقنع.</p>
                   </div>
                 </div>
               </section>
               <div className="pt-10 border-t border-slate-800 text-center space-y-4">
                 <p className="text-emerald-400 font-black italic">"DText Pro هو بوابتك لهذا العالم."</p>
                 <button onClick={() => setShowGuideModal(false)} className="px-10 py-3 bg-blue-600 rounded-full font-black text-sm hover:bg-blue-500 transition-all shadow-lg">ابدأ الآن 🚀</button>
               </div>
             </div>
          </div>
        </div>
      )}

      {showAboutModal && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-2xl animate-in fade-in zoom-in duration-300">
          <div className={`max-w-2xl w-full ${isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'} border rounded-[3rem] p-12 shadow-2xl relative overflow-hidden text-center`}>
             <button onClick={() => setShowAboutModal(false)} className="absolute top-8 left-8 w-12 h-12 flex items-center justify-center rounded-full bg-slate-800/40 text-white hover:bg-red-500 transition-all font-black z-20">✕</button>
             <div className="relative z-10 flex flex-col items-center">
               <DTLogo size="w-32 h-32" className="mb-8" />
               <h3 className="text-4xl font-black mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-emerald-400">عن تطبيق DText Pro</h3>
               <div className="space-y-6 text-xl leading-relaxed opacity-90 text-right">
                 <p>تطبيق <strong className="text-blue-500">DText Pro 2026</strong> هو الجيل القادم من منصات تحسين المحتوى الإعلاني المعتمدة على الذكاء الاصطناعي السيادي.</p>
                 <ul className="space-y-3 list-disc list-inside marker:text-emerald-500">
                   <li>أدوات تحسين سيكولوجية متقدمة (Neuro-Copywriting).</li>
                   <li>دعم شامل للهجات العربية واللغات العالمية.</li>
                 </ul>
               </div>
             </div>
          </div>
        </div>
      )}

      {showDevModal && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-2xl animate-in fade-in zoom-in duration-300">
          <div className={`max-w-lg w-full ${isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'} border rounded-[3rem] p-12 shadow-2xl relative overflow-hidden text-center`}>
             <button onClick={() => setShowDevModal(false)} className="absolute top-8 left-8 w-12 h-12 flex items-center justify-center rounded-full bg-slate-800/40 text-white hover:bg-red-500 transition-all font-black z-20">✕</button>
             
             {/* طبقة الهوية البصرية للمطور */}
             <div className="relative w-56 h-56 mx-auto mb-8 group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-emerald-500 rounded-[3rem] blur-2xl opacity-40 group-hover:opacity-80 transition-opacity duration-700"></div>
                <div className="relative w-full h-full rounded-[3rem] overflow-hidden border-4 border-white/10 shadow-[0_0_50px_rgba(59,130,246,0.5)] transform transition-all duration-700 group-hover:scale-105">
                   <img 
                      src="https://raw.githubusercontent.com/StackBlitz/stackblitz-images/main/dev-profile-placeholder.jpg" 
                      alt="Developer" 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                         e.currentTarget.src = "https://ui-avatars.com/api/?name=DT+Designs&background=020617&color=3b82f6&size=512";
                      }}
                   />
                </div>
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-8 py-2 rounded-2xl text-xs font-black shadow-2xl border border-white/20">
                  DT-Designs 🚀
                </div>
             </div>

             <h3 className="text-3xl font-black mb-2 tracking-tighter">فريق التطوير السيادي</h3>
             <p className="text-blue-500 font-black mb-8 text-lg uppercase tracking-widest">Senior AI Solutions Engineering</p>
             <div className="space-y-4 text-lg opacity-80 leading-relaxed text-right">
                <p>تم تطوير هذا النظام بدمج تقنيات React 19 ونماذج Gemini المتطورة.</p>
                <div className="flex flex-wrap justify-center gap-3 pt-6 border-t border-slate-800/50">
                   <span className="px-5 py-2 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-[11px] font-black uppercase text-blue-400">Gemini Native AI</span>
                </div>
             </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default App;
