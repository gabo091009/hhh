import { useState, useEffect } from 'react';
import { Map, CheckCircle2, Clock, Circle } from 'lucide-react';
import { fetchCompanyData } from '../api';
import type { CompanyData } from '../types';
import { SkeletonLoader } from './SkeletonLoader';

export function RegulatoryRoadmapPanel() {
  const [data, setData] = useState<CompanyData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCompanyData().then(setData).finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="glass-panel rounded-3xl p-10 min-h-[60vh] flex items-center justify-center"><SkeletonLoader lines={5} /></div>;
  if (!data) return null;

  return (
    <div className="space-y-12">
      <header className="mb-4">
        <h2 className="text-4xl font-black text-white tracking-tighter uppercase">Regulatory <span className="text-[var(--accent)]">Roadmap</span></h2>
        <p className="text-white/40 font-mono text-[10px] uppercase tracking-[0.3em] font-black mt-2">Institutional adoption & integration phases</p>
      </header>
      <div className="glass-panel rounded-3xl p-10 space-y-0">
        {data.roadmap.map((phase, i) => (
          <div key={i} className="relative">
            <div className="flex items-center gap-6 py-8">
              <div className="shrink-0">
                {phase.status === 'done' && <div className="w-10 h-10 rounded-full bg-[#10b981]/10 border border-[#10b981]/30 flex items-center justify-center"><CheckCircle2 className="text-[#10b981]" size={20} /></div>}
                {phase.status === 'in-progress' && <div className="w-10 h-10 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/30 flex items-center justify-center animate-pulse"><Clock className="text-[var(--accent)]" size={20} /></div>}
                {phase.status === 'pending' && <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center"><Circle className="text-white/20" size={20} /></div>}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white">{phase.phase}</h3>
                <p className="text-xs text-white/40 font-mono uppercase tracking-widest mt-1">{phase.status === 'done' ? '✓ Completed' : phase.status === 'in-progress' ? '⟳ In Progress' : '○ Pending'}</p>
              </div>
              {phase.status === 'in-progress' && <div className="w-32 h-1.5 bg-white/5 rounded-full overflow-hidden"><div className="h-full bg-[var(--accent)] rounded-full" style={{ width: '60%' }} /></div>}
            </div>
            {i < data.roadmap.length - 1 && <div className="absolute left-[19px] top-[72px] bottom-0 w-[2px] bg-white/5" />}
          </div>
        ))}
      </div>
      <div className="glass-panel rounded-3xl p-10 border-t border-[var(--accent)]/10">
        <div className="flex items-start gap-4">
          <Map className="text-[var(--accent)] shrink-0" size={32} />
          <div><h3 className="text-xl font-bold text-white mb-3">Final Vision</h3><p className="text-sm text-white/60 leading-relaxed">FlowTrace transforms fragmented financial data into a living layer of traceability, scoring, and capital monitoring for financial institutions in Latin America, using Open Finance, AI, and Avalanche.</p></div>
        </div>
      </div>
    </div>
  );
}
