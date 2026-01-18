
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  isDarkMode?: boolean;
  navActions?: React.ReactNode; // إضافة طبقة جديدة لاستقبال الأزرار
  onAboutClick?: () => void; // إضافة حدث الضغط على "عن التطبيق" بشكل تراكمي
}

/**
 * مكون الشعار التقني المتطور (DT Logo)
 * نسخة طبق الأصل من الهوية البصرية المزودة
 */
const DTLogo = ({ size = "w-10 h-10", glow = true }) => (
  <div className={`${size} relative flex items-center justify-center group cursor-pointer`}>
    {glow && <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full group-hover:bg-blue-400/30 transition-all duration-700"></div>}
    <svg viewBox="0 0 100 100" className="w-full h-full relative z-10 drop-shadow-[0_0_8px_rgba(14,165,233,0.8)]">
      <defs>
        <linearGradient id="dt-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#0ea5e9', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#2563eb', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      {/* خلفية الدوائر الإلكترونية */}
      <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-blue-500/20" strokeDasharray="2 2" />
      <path d="M20,50 Q50,20 80,50" fill="none" stroke="currentColor" strokeWidth="0.2" className="text-blue-400/40" />
      
      {/* حرف D */}
      <path d="M25,25 L45,25 Q65,25 65,50 Q65,75 45,75 L25,75 Z" fill="none" stroke="url(#dt-grad)" strokeWidth="8" strokeLinejoin="round" />
      
      {/* حرف T مع مسارات الدوائر */}
      <path d="M55,25 L90,25" fill="none" stroke="url(#dt-grad)" strokeWidth="8" strokeLinecap="round" />
      <path d="M72.5,25 L72.5,75" fill="none" stroke="url(#dt-grad)" strokeWidth="8" strokeLinecap="round" />
      
      {/* تفاصيل إلكترونية صغيرة (Circuit Nodes) */}
      <circle cx="72.5" cy="50" r="3" fill="#0ea5e9" className="animate-pulse" />
      <path d="M72.5,40 L85,40" fill="none" stroke="#0ea5e9" strokeWidth="1" />
      <circle cx="85" cy="40" r="1.5" fill="#0ea5e9" />
    </svg>
  </div>
);

export const Layout: React.FC<LayoutProps> = ({ children, isDarkMode = true, navActions, onAboutClick }) => {
  return (
    <div className={`min-h-screen overflow-x-hidden transition-colors duration-500 ${isDarkMode ? 'bg-slate-950 text-white' : 'bg-white text-slate-900'}`}>
      {/* Background Decor */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className={`absolute top-[-10%] left-[-10%] w-[40%] h-[40%] ${isDarkMode ? 'bg-blue-600/10' : 'bg-blue-500/5'} blur-[120px] rounded-full`}></div>
        <div className={`absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] ${isDarkMode ? 'bg-emerald-600/10' : 'bg-blue-600/5'} blur-[120px] rounded-full`}></div>
      </div>

      <nav className={`relative z-10 border-b ${isDarkMode ? 'border-slate-800 bg-slate-900/50' : 'border-slate-200 bg-white/90'} backdrop-blur-md px-6 py-4 flex justify-between items-center`}>
        {/* Right side: Logo (in RTL) - تم تحديثه ليطابق DT Logo التقني */}
        <div className="flex items-center gap-3 group">
          <DTLogo size="w-12 h-12" />
          <h1 className={`text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-300 tracking-tighter`}>
            DText Pro
          </h1>
        </div>
        
        {/* Left side: Navigation Actions (in RTL) */}
        <div className="flex items-center gap-4">
          <button 
            onClick={onAboutClick}
            className={`text-sm font-black ${isDarkMode ? 'text-slate-400 hover:text-white' : 'text-blue-700 hover:text-blue-900'} transition-colors cursor-pointer`}
          >
            عن التطبيق
          </button>
          <div id="theme-portal"></div>
          {navActions}
        </div>
      </nav>

      <main className="relative z-10 container mx-auto px-4 py-8">
        {children}
      </main>

      <footer className={`relative z-10 py-8 text-center text-slate-500 text-sm border-t ${isDarkMode ? 'border-slate-900' : 'border-slate-200'}`}>
        &copy; {new Date().getFullYear()} DText Pro - الذكاء الاصطناعي في خدمة الإعلان | DT-Designs 🚀
      </footer>
    </div>
  );
};
