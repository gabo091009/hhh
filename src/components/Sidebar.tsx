import { useState, useEffect } from 'react';
import { 
  Import, 
  BrainCircuit, 
  ShieldCheck, 
  Network, 
  Clock, 
  Lock, 
  Map,
  Wrench,
  Search,
  Menu,
  X,
  TrendingUp,
  Languages
} from 'lucide-react';
import { cn } from '../lib/utils';
import type { ViewType } from '../types';
import { useLanguage } from '../i18n/LanguageContext';

interface SidebarProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export function Sidebar({ currentView, onViewChange, isOpen, onToggle }: SidebarProps) {
  const { t, lang, setLang } = useLanguage();
  const primary = '#A855F7';
  const secondary = '#0BF2FF';
  
  // Detectar si es móvil
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Cerrar sidebar automáticamente al cambiar de vista en móvil
  const handleViewChange = (view: ViewType) => {
    onViewChange(view);
    if (isMobile && isOpen) {
      onToggle();
    }
  };

  const navItems = [
    { id: 'ingesta' as ViewType, label: t('nav_ingesta'), icon: Import },
    { id: 'scores' as ViewType, label: t('nav_scores'), icon: BrainCircuit },
    { id: 'aml' as ViewType, label: t('nav_aml'), icon: ShieldCheck },
    { id: 'flow' as ViewType, label: t('nav_flow'), icon: Network },
    { id: 'timeline' as ViewType, label: t('nav_timeline'), icon: Clock },
    { id: 'avalanche' as ViewType, label: t('nav_avalanche'), icon: Lock },
    { id: 'roadmap' as ViewType, label: t('nav_roadmap'), icon: Map },
    { id: 'analytics' as ViewType, label: 'Avalanche Analytics', icon: TrendingUp },
    { id: 'tools' as ViewType, label: t('nav_tools'), icon: Wrench },
  ];

  return (
    <>
      {/* Botón de hamburguesa */}
      <button 
        onClick={onToggle}
        className={cn(
          "fixed top-4 left-4 z-[70] p-2.5 rounded-xl glass-panel transition-all duration-300",
          "lg:hidden",
          "hover:bg-white/10 active:scale-95",
          !isOpen && "shadow-lg border-[var(--primary)]/30"
        )}
      >
        {isOpen ? <X size={20} className="text-white" /> : <Menu size={20} className="text-white" />}
      </button>

      {/* Overlay */}
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden transition-all duration-300"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed left-0 top-0 h-full z-50 transition-all duration-300 ease-[0.22,1,0.36,1]",
        "w-72",
        "bg-[#080b14]/95 backdrop-blur-3xl border-r border-white/10",
        "flex flex-col overflow-y-auto overflow-x-hidden",
        isMobile 
          ? `${isOpen ? 'translate-x-0' : '-translate-x-full'} w-80 max-w-[85vw]` 
          : 'translate-x-0'
      )}>
        
        {/* Logo y header */}
        <div className="sticky top-0 bg-[#080b14]/95 backdrop-blur-md z-10 px-6 py-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-500"
              style={{ 
                backgroundColor: `${primary}1a`, 
                borderColor: `${primary}33`,
                boxShadow: `0 0 15px ${primary}4d` 
              }}
            >
              <BrainCircuit style={{ color: primary }} size={20} />
            </div>
            <div>
              <h1 className="font-sans text-xl font-black text-white tracking-tighter">FLOWTRACE</h1>
              <p className="font-mono text-[9px] uppercase tracking-[0.3em] font-bold" style={{ color: secondary }}>OPERATIONAL AI</p>
            </div>
          </div>
        </div>

        {/* Búsqueda */}
        <div className="px-6 py-5">
          <label htmlFor="sidebar-search" className="sr-only">Search</label>
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-[var(--secondary)] transition-colors" size={16} />
            <input 
              id="sidebar-search"
              name="sidebar-search"
              type="text" 
              placeholder={t('sidebar_search') || "Search intelligence..."}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[var(--secondary)]/50 focus:bg-white/[0.08] transition-all"
            />
          </div>
        </div>

        {/* Navegación */}
        <nav className="flex-1 px-4 space-y-1.5">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleViewChange(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group text-sm font-medium tracking-wide",
                currentView === item.id 
                  ? "text-white bg-white/5 border-l-2 shadow-[inset_10px_0_20px_-10px_rgba(168,85,247,0.1)]" 
                  : "text-white/50 hover:text-white hover:bg-white/[0.03]"
              )}
              style={{ borderLeftColor: currentView === item.id ? primary : 'transparent' }}
            >
              <item.icon size={18} className={cn(
                "transition-all duration-300 flex-shrink-0",
                currentView === item.id ? "scale-110" : "group-hover:opacity-100 opacity-50"
              )} 
              style={{ color: currentView === item.id ? primary : 'inherit' }} />
              <span className="truncate">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="sticky bottom-0 bg-[#080b14]/95 backdrop-blur-md mt-auto pt-6 pb-8 px-6 border-t border-white/10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#A855F7] to-[#7c3aed] flex items-center justify-center text-white font-black text-sm flex-shrink-0">ER</div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold text-white truncate">Elena R.</p>
              <p className="text-[10px] text-white/40 truncate font-mono uppercase tracking-tighter">{t('sidebar_planner') || "Compliance Officer"}</p>
            </div>
          </div>

          <button 
            onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 group"
          >
            <Languages size={16} className="text-white/50 group-hover:text-[var(--secondary)] transition-colors" />
            <span className="text-xs font-mono uppercase tracking-wider text-white/70 group-hover:text-white transition-colors">
              {lang === 'es' ? '🇺🇸 ENGLISH' : '🇲🇽 ESPAÑOL'}
            </span>
          </button>
        </div>
      </aside>
    </>
  );
}