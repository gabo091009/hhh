import { useEffect, useState } from 'react';
import { 
  fetchTopEntities, fetchTopVolume, fetchHubs, 
  fetchHighRiskTransfers, fetchAMLScore, fetchAllAnalytics 
} from '../api';
import { Loader2, TrendingUp, DollarSign, Network, AlertTriangle, Zap, RefreshCw } from 'lucide-react';

export function AvalancheAnalytics() {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState<any>(null);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  async function loadData(showRefresh = false) {
    if (showRefresh) setRefreshing(true);
    else setLoading(true);
    
    const analyticsData = await fetchAllAnalytics();
    setData(analyticsData);
    setLastUpdate(new Date());
    
    if (showRefresh) setRefreshing(false);
    else setLoading(false);
  }

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-96 gap-4">
        <Loader2 className="animate-spin text-[var(--primary)]" size={40} />
        <p className="text-white/50 font-mono text-sm">Sincronizando con Avalanche C-Chain...</p>
        <p className="text-white/30 font-mono text-[10px]">La primera carga puede tardar ~2 segundos</p>
      </div>
    );
  }

  const { topEntities, topVolume, hubs, highRisk, amlScore } = data;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-black tracking-tighter">Avalanche Network Intelligence</h2>
          <p className="text-white/50 text-sm mt-1">Datos en tiempo real de la red Avalanche C-Chain</p>
        </div>
        <button 
          onClick={() => loadData(true)}
          disabled={refreshing}
          className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all flex items-center gap-2"
        >
          <RefreshCw size={14} className={refreshing ? "animate-spin" : ""} />
          <span className="text-[10px] font-mono">{refreshing ? "Actualizando..." : "Actualizar"}</span>
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-[var(--secondary)]/30 transition-all">
          <TrendingUp size={18} className="text-[var(--secondary)] mb-2" />
          <p className="text-2xl font-bold text-white">{topEntities?.reduce((a: number, b: any) => a + b.transactions, 0) || 0}</p>
          <p className="text-[9px] font-mono text-white/40">TRANSACCIONES TOTALES</p>
        </div>
        <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-[var(--tertiary)]/30 transition-all">
          <DollarSign size={18} className="text-[var(--tertiary)] mb-2" />
          <p className="text-2xl font-bold text-white">${((topVolume?.reduce((a: number, b: any) => a + b.volume, 0) || 0) / 1e6).toFixed(0)}M</p>
          <p className="text-[9px] font-mono text-white/40">VOLUMEN TOTAL</p>
        </div>
        <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-[var(--primary)]/30 transition-all">
          <Network size={18} className="text-[var(--primary)] mb-2" />
          <p className="text-2xl font-bold text-white">{hubs?.reduce((a: number, b: any) => a + b.connections, 0) || 0}</p>
          <p className="text-[9px] font-mono text-white/40">CONEXIONES TOTALES</p>
        </div>
        <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-red-500/30 transition-all">
          <AlertTriangle size={18} className="text-red-400 mb-2" />
          <p className="text-2xl font-bold text-white">{highRisk?.length || 0}</p>
          <p className="text-[9px] font-mono text-white/40">ALERTAS DE ALTO RIESGO</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-5 rounded-xl bg-white/5 border border-white/10">
          <h3 className="font-mono text-xs font-bold text-[var(--secondary)] mb-4">🏆 TOP ENTIDADES (más TXs)</h3>
          <div className="space-y-2">
            {topEntities?.slice(0, 5).map((item: any, idx: number) => (
              <div key={item.entity} className="flex justify-between items-center p-2 border-b border-white/10 hover:bg-white/5 transition-all">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-white/40">#{idx + 1}</span>
                  <span className="font-mono text-xs">{item.entity.slice(0, 12)}...</span>
                </div>
                <span className="text-xs font-bold text-[var(--tertiary)]">{item.transactions} txs</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-5 rounded-xl bg-white/5 border border-white/10">
          <h3 className="font-mono text-xs font-bold text-[var(--tertiary)] mb-4">🐋 WHALES (mayor volumen)</h3>
          <div className="space-y-2">
            {topVolume?.slice(0, 5).map((item: any, idx: number) => (
              <div key={item.entity} className="flex justify-between items-center p-2 border-b border-white/10 hover:bg-white/5 transition-all">
                <span className="font-mono text-xs">{item.entity.slice(0, 12)}...</span>
                <span className="text-xs font-bold text-[var(--secondary)]">${(item.volume / 1e6).toFixed(1)}M</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-5 rounded-xl bg-white/5 border border-white/10">
          <h3 className="font-mono text-xs font-bold text-[var(--primary)] mb-4">🔗 HUBS (más conexiones)</h3>
          <div className="space-y-2">
            {hubs?.slice(0, 5).map((item: any, idx: number) => (
              <div key={item.entity} className="flex justify-between items-center p-2 border-b border-white/10 hover:bg-white/5 transition-all">
                <span className="font-mono text-xs">{item.entity.slice(0, 12)}...</span>
                <span className="text-xs font-bold text-[var(--secondary)]">{item.connections} connects</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-5 rounded-xl bg-white/5 border border-white/10">
          <h3 className="font-mono text-xs font-bold text-red-400 mb-4">⚠️ AML RISK SCORE (top 5)</h3>
          <div className="space-y-2">
            {amlScore?.slice(0, 5).map((item: any, idx: number) => (
              <div key={item.entity} className="flex justify-between items-center p-2 border-b border-white/10 hover:bg-white/5 transition-all">
                <div>
                  <span className="font-mono text-xs">{item.entity.slice(0, 12)}...</span>
                  <p className="text-[9px] text-white/40">{item.txs} txs · ${(item.volume / 1e6).toFixed(1)}M</p>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold" style={{ 
                    color: item.risk_score > 10000000 ? '#ef4444' : item.risk_score > 5000000 ? '#f59e0b' : '#0DFF88'
                  }}>
                    {(item.risk_score / 1e6).toFixed(1)}M
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="p-5 rounded-xl bg-white/5 border border-white/10">
        <div className="flex items-center gap-2 mb-4">
          <Zap size={16} className="text-red-400" />
          <h3 className="font-mono text-xs font-bold text-red-400">🚨 TRANSFERENCIAS DE ALTO RIESGO</h3>
        </div>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {highRisk?.slice(0, 10).map((tx: any, idx: number) => (
            <div key={idx} className="p-2 rounded-lg bg-red-500/5 border border-red-500/20 hover:bg-red-500/10 transition-all">
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

      <div className="flex justify-between items-center text-[8px] font-mono text-white/20 pt-4 border-t border-white/5">
        <span>Datos actualizados desde Avalanche C-Chain</span>
        <span>Última sincronización: {lastUpdate.toLocaleTimeString()}</span>
      </div>
    </div>
  );
}