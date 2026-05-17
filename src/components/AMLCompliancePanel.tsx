import { useEffect, useState } from 'react';
import { fetchHighRiskTransfers, fetchAMLScore, runAMLScreening } from '../api';
import { Loader2, AlertTriangle, Shield, Network, Zap } from 'lucide-react';

export function AMLCompliancePanel() {
  const [loading, setLoading] = useState(true);
  const [highRiskTransfers, setHighRiskTransfers] = useState<any[]>([]);
  const [amlScores, setAmlScores] = useState<any[]>([]);
  const [selectedEntity, setSelectedEntity] = useState<string>('');
  const [screeningResult, setScreeningResult] = useState<any>(null);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const [transfers, scores] = await Promise.all([
        fetchHighRiskTransfers(),
        fetchAMLScore()
      ]);
      setHighRiskTransfers(transfers.slice(0, 10));
      setAmlScores(scores.slice(0, 5));
      if (scores.length > 0) {
        setSelectedEntity(scores[0].entity);
        const result = await runAMLScreening(scores[0].entity);
        setScreeningResult(result);
      }
      setLoading(false);
    }
    loadData();
  }, []);

  const handleScreening = async (entity: string) => {
    setSelectedEntity(entity);
    const result = await runAMLScreening(entity);
    setScreeningResult(result);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="animate-spin text-[var(--primary)]" size={40} />
        <span className="ml-3 text-white/50">Cargando datos AML...</span>
      </div>
    );
  }

  const criticalCount = highRiskTransfers.filter(t => t.amount > 5000000).length;
  const warningCount = highRiskTransfers.filter(t => t.amount <= 5000000 && t.amount > 2000000).length;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-black tracking-tighter">AML & Compliance</h2>
        <p className="text-white/50 text-sm mt-1">Monitoreo en tiempo real desde Avalanche C-Chain</p>
      </div>

      {/* Alertas dinámicas */}
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="text-xs font-mono font-bold text-red-400">{criticalCount} ALERTAS CRÍTICAS</span>
          </div>
          <p className="text-sm text-white/60 mt-1">Transferencias &gt; $5M detectadas</p>
        </div>
        <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
          <span className="text-xs font-mono font-bold text-yellow-400">{warningCount} ADVERTENCIAS</span>
          <p className="text-sm text-white/60 mt-1">Transferencias de $2M-$5M</p>
        </div>
      </div>

      {/* Entity Screening dinámico */}
      <div className="p-5 rounded-xl bg-white/5 border border-white/10">
        <h3 className="font-mono text-xs font-bold text-[var(--secondary)] mb-3">🔍 ENTITY SCREENING</h3>
        <select 
          className="w-full mb-4 p-2 rounded-lg bg-white/10 border border-white/20 text-white font-mono text-sm"
          onChange={(e) => handleScreening(e.target.value)}
          value={selectedEntity}
        >
          {amlScores.map(score => (
            <option key={score.entity} value={score.entity}>
              {score.entity.slice(0, 16)}...
            </option>
          ))}
        </select>
        
        {screeningResult && (
          <div>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-bold">Riesgo AML</p>
                <p className="font-mono text-[10px] text-white/40">{selectedEntity.slice(0, 16)}...</p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold" style={{ 
                  color: screeningResult.score > 70 ? '#ef4444' : screeningResult.score > 40 ? '#f59e0b' : '#0DFF88'
                }}>
                  {screeningResult.score.toFixed(1)}%
                </span>
                <p className="text-[9px] font-mono text-white/40">CONFIANZA</p>
              </div>
            </div>
            {screeningResult.matches.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {screeningResult.matches.map((match: string) => (
                  <span key={match} className="px-2 py-0.5 bg-red-500/20 rounded text-[9px] font-mono text-red-400">
                    {match}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* High Risk Transfers dinámicas */}
      <div className="p-5 rounded-xl bg-white/5 border border-white/10">
        <h3 className="font-mono text-xs font-bold text-red-400 mb-3">🚨 TRANSFERENCIAS DE ALTO RIESGO</h3>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {highRiskTransfers.slice(0, 5).map((tx, idx) => (
            <div key={idx} className="p-2 rounded-lg bg-red-500/5 border border-red-500/20">
              <div className="flex justify-between text-xs">
                <span className="font-mono text-white/60">{tx.from.slice(0, 10)}...</span>
                <span className="text-red-400">→</span>
                <span className="font-mono text-white/60">{tx.to.slice(0, 10)}...</span>
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-[9px] text-white/30">{new Date(tx.timestamp).toLocaleDateString()}</span>
                <span className="text-xs font-bold text-red-400">${(tx.amount / 1e6).toFixed(2)}M</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}