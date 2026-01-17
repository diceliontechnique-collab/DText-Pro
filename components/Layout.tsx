
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  isDarkMode?: boolean;
  navActions?: React.ReactNode; // إضافة طبقة جديدة لاستقبال الأزرار
  onAboutClick?: () => void; // إضافة حدث الضغط على "عن التطبيق" بشكل تراكمي
}

export const Layout: React.FC<LayoutProps> = ({ children, isDarkMode = true, navActions, onAboutClick }) => {
  return (
    <div className={`min-h-screen overflow-x-hidden transition-colors duration-500 ${isDarkMode ? 'bg-slate-950 text-white' : 'bg-white text-slate-900'}`}>
      {/* Background Decor */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className={`absolute top-[-10%] left-[-10%] w-[40%] h-[40%] ${isDarkMode ? 'bg-blue-600/10' : 'bg-blue-500/5'} blur-[120px] rounded-full`}></div>
        <div className={`absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] ${isDarkMode ? 'bg-emerald-600/10' : 'bg-blue-600/5'} blur-[120px] rounded-full`}></div>
      </div>

      <nav className={`relative z-10 border-b ${isDarkMode ? 'border-slate-800 bg-slate-900/50' : 'border-slate-200 bg-white/90'} backdrop-blur-md px-6 py-4 flex justify-between items-center`}>
        {/* Right side: Logo (in RTL) */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-emerald-400 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
          </div>
          <h1 className={`text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-300`}>
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
        &copy; {new Date().getFullYear()} DText Pro - الذكاء الاصطناعي في خدمة الإعلان
      </footer>
    </div>
  );
};
