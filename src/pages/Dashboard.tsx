import { useState, useEffect } from 'react';
import { Sidebar } from '../components/Sidebar';
import type { ViewType } from '../types';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { Menu } from 'lucide-react';
import { IngestaPanel } from '../components/IngestaPanel';
import { AMLCompliancePanel } from '../components/AMLCompliancePanel';
import { FlowGraphPanel } from '../components/FlowGraphPanel';
import { AvalancheAnchoringPanel } from '../components/AvalancheAnchoringPanel';
import { RegulatoryRoadmapPanel } from '../components/RegulatoryRoadmapPanel';
import { ScoresAIPanel } from '../components/ScoresAIPanel';
import { TimelinePanel } from '../components/TimelinePanel';
import { UseOfFundsPanel } from '../components/UseOfFundsPanel';
import { ToolsPanel } from '../components/ToolsPanel';
import { AvalancheAnalytics } from '../components/AvalancheAnalytics';
import { AIChatbot } from '../components/AIChatbot';

interface DashboardProps {
  onLogout?: () => void;
}

export function Dashboard({ onLogout }: DashboardProps) {
  const [currentView, setCurrentView] = useState<ViewType>('ingesta');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Detectar tamaño de pantalla
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      // En móvil, sidebar empieza cerrada
      if (mobile) setIsSidebarOpen(false);
      else setIsSidebarOpen(true);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Cerrar sidebar al cambiar a desktop si estaba abierta
  useEffect(() => {
    if (!isMobile && !isSidebarOpen) {
      setIsSidebarOpen(true);
    }
  }, [isMobile]);

  return (
    <div className="min-h-screen bg-[var(--bg)] text-white selection:bg-[var(--primary)]/30 font-sans antialiased overflow-x-hidden">
      <div className="ambient-bg" />
      
      <Sidebar 
        currentView={currentView} 
        onViewChange={setCurrentView} 
        isOpen={isSidebarOpen} 
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)} 
      />
      
      {/* Botón flotante para abrir sidebar en móvil (solo cuando está cerrada) */}
      {isMobile && !isSidebarOpen && (
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="fixed bottom-6 right-6 z-40 p-4 rounded-full bg-[var(--primary)] shadow-lg shadow-[var(--primary)]/30 lg:hidden transition-all duration-300 hover:scale-105 active:scale-95"
        >
          <Menu size={24} className="text-white" />
        </button>
      )}
      
      <main className={cn(
        "min-h-screen relative transition-all duration-500 ease-[0.22,1,0.36,1]",
        // En desktop: margen izquierdo cuando sidebar está abierta
        !isMobile && (isSidebarOpen ? "ml-72" : "ml-0"),
        // En móvil: sin margen porque sidebar flota
        isMobile && "ml-0"
      )}>
        <div className="p-4 md:p-6 lg:p-8">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={currentView}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              {currentView === 'ingesta' && <IngestaPanel />}
              {currentView === 'aml' && <AMLCompliancePanel />}
              {currentView === 'flow' && <FlowGraphPanel />}
              {currentView === 'avalanche' && <AvalancheAnchoringPanel />}
              {currentView === 'scores' && <ScoresAIPanel />}
              {currentView === 'timeline' && <TimelinePanel />}
              {currentView === 'use-of-funds' && <UseOfFundsPanel />}
              {currentView === 'roadmap' && <RegulatoryRoadmapPanel />}
              {currentView === 'analytics' && <AvalancheAnalytics />}
              {currentView === 'tools' && <ToolsPanel />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      <AIChatbot />
    </div>
  );
}