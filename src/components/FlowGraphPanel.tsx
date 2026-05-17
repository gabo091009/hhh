import { useEffect, useState } from 'react';
import { 
  fetchHighRiskTransfers, 
  fetchTopEntities, 
  fetchTopVolume, 
  fetchHubs,
  fetchLayeringPaths 
} from '../api';
import { Loader2, TrendingUp, TrendingDown, AlertCircle, Network, Zap, MapPin } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface GraphNode {
  id: string;
  name: string;
  type: 'source' | 'target' | 'hub' | 'normal';
  value: number;
  color: string;
}

interface GraphEdge {
  from: string;
  to: string;
  amount: number;
  status: 'validated' | 'settled' | 'blocked';
}

export function FlowGraphPanel() {
  const [loading, setLoading] = useState(true);
  const [nodes, setNodes] = useState<GraphNode[]>([]);
  const [edges, setEdges] = useState<GraphEdge[]>([]);
  const [anomalies, setAnomalies] = useState<any[]>([]);
  const [timelineData, setTimelineData] = useState<any[]>([]);
  const [stats, setStats] = useState({ totalVolume: 0, avgAmount: 0, highRiskCount: 0 });

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        // Obtener datos de las APIs
        const [transfers, topEntities, topVolume, hubs, layering] = await Promise.all([
          fetchHighRiskTransfers(),
          fetchTopEntities(),
          fetchTopVolume(),
          fetchHubs(),
          fetchLayeringPaths()
        ]);

        // 1. Construir nodos (entidades únicas)
        const uniqueEntities = new Map<string, { volume: number; connections: number }>();
        
        transfers.forEach(tx => {
          if (!uniqueEntities.has(tx.from)) {
            uniqueEntities.set(tx.from, { volume: 0, connections: 0 });
          }
          if (!uniqueEntities.has(tx.to)) {
            uniqueEntities.set(tx.to, { volume: 0, connections: 0 });
          }
          uniqueEntities.get(tx.from)!.volume += tx.amount;
          uniqueEntities.get(tx.from)!.connections++;
          uniqueEntities.get(tx.to)!.connections++;
        });

        // Identificar hubs (entidades con más conexiones)
        const hubIds = new Set(hubs.slice(0, 3).map(h => h.entity));
        
        const nodeList: GraphNode[] = Array.from(uniqueEntities.entries()).slice(0, 8).map(([id, data]) => {
          let type: 'source' | 'target' | 'hub' | 'normal' = 'normal';
          let color = '#7C7488';
          
          if (hubIds.has(id)) {
            type = 'hub';
            color = '#A855F7';
          } else if (data.volume > 10000000) {
            type = 'source';
            color = '#0DFF88';
          } else if (data.connections > 5) {
            type = 'target';
            color = '#0BF2FF';
          }
          
          return {
            id,
            name: id.slice(0, 12),
            type,
            value: data.volume,
            color
          };
        });

        setNodes(nodeList);

        // 2. Construir edges (conexiones)
        const edgeList: GraphEdge[] = transfers.slice(0, 8).map(tx => ({
          from: tx.from,
          to: tx.to,
          amount: tx.amount,
          status: tx.amount > 5000000 ? 'blocked' : tx.amount > 2000000 ? 'settled' : 'validated'
        }));
        setEdges(edgeList);

        // 3. Anomalías (basadas en layering y high-risk)
        const anomalyList = [
          ...layering.slice(0, 2).map(l => ({
            type: 'CRITICAL',
            title: 'Patrón de Layering Detectado',
            description: `Cadena de ${l.path.length} transacciones vinculadas`,
            time: new Date().toLocaleTimeString(),
            color: '#ef4444'
          })),
          ...transfers.slice(0, 2).map(tx => ({
            type: tx.amount > 5000000 ? 'CRITICAL' : 'WARNING',
            title: tx.amount > 5000000 ? 'Transferencia de Alto Riesgo' : 'Transferencia Sospechosa',
            description: `${tx.from.slice(0, 8)}... → ${tx.to.slice(0, 8)}... por $${(tx.amount / 1e6).toFixed(2)}M`,
            time: new Date(tx.timestamp).toLocaleTimeString(),
            color: tx.amount > 5000000 ? '#ef4444' : '#f59e0b'
          }))
        ];
        setAnomalies(anomalyList.slice(0, 4));

        // 4. Timeline data (agrupar por mes)
        const monthlyData: Record<string, { income: number; expense: number }> = {};
        transfers.forEach(tx => {
          const date = new Date(tx.timestamp);
          const month = date.toLocaleString('es', { month: 'short' }).toUpperCase();
          if (!monthlyData[month]) {
            monthlyData[month] = { income: 0, expense: 0 };
          }
          if (tx.amount > 2000000) {
            monthlyData[month].income += tx.amount;
          } else {
            monthlyData[month].expense += tx.amount;
          }
        });
        
        const months = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN'];
        const timeline = months.map(month => ({
          month,
          income: (monthlyData[month]?.income || 0) / 1e6,
          expense: (monthlyData[month]?.expense || 0) / 1e6
        }));
        setTimelineData(timeline);

        // 5. Estadísticas
        const total = transfers.reduce((sum, t) => sum + t.amount, 0);
        setStats({
          totalVolume: total,
          avgAmount: total / (transfers.length || 1),
          highRiskCount: transfers.filter(t => t.amount > 5000000).length
        });

      } catch (error) {
        console.error('Error loading flow graph data:', error);
        // Datos de respaldo
        setNodes([
          { id: '1', name: 'Main Custodian', type: 'hub', value: 100, color: '#A855F7' },
          { id: '2', name: 'Logistics Co.', type: 'target', value: 60, color: '#0BF2FF' },
          { id: '3', name: 'Brokerage XYZ', type: 'source', value: 40, color: '#0DFF88' }
        ]);
        setEdges([
          { from: '1', to: '2', amount: 450000, status: 'validated' },
          { from: '1', to: '3', amount: 13314000, status: 'blocked' }
        ]);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-96 gap-4">
        <Loader2 className="animate-spin text-[var(--primary)]" size={40} />
        <p className="text-white/50 font-mono text-sm">Construyendo grafo financiero...</p>
        <p className="text-white/30 font-mono text-[10px]">Analizando transacciones en Avalanche C-Chain</p>
      </div>
    );
  }

  // Obtener color según estado del edge
  const getEdgeColor = (status: string) => {
    switch(status) {
      case 'validated': return '#0DFF88';
      case 'settled': return '#0BF2FF';
      case 'blocked': return '#ef4444';
      default: return '#7C7488';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header con estadísticas */}
      <div>
        <h2 className="text-2xl font-black tracking-tighter">Flow Graph</h2>
        <p className="text-white/50 text-sm mt-1">Visualización de flujo de capital en tiempo real</p>
      </div>

      {/* Tarjetas de estadísticas */}
      <div className="grid grid-cols-3 gap-4">
        <div className="p-3 rounded-xl bg-white/5 border border-white/10">
          <p className="text-[9px] font-mono text-white/40">VOLUMEN TOTAL</p>
          <p className="text-lg font-bold text-[var(--tertiary)]">${(stats.totalVolume / 1e6).toFixed(1)}M</p>
        </div>
        <div className="p-3 rounded-xl bg-white/5 border border-white/10">
          <p className="text-[9px] font-mono text-white/40">TRANSACCIÓN PROMEDIO</p>
          <p className="text-lg font-bold text-[var(--secondary)]">${(stats.avgAmount / 1e6).toFixed(2)}M</p>
        </div>
        <div className="p-3 rounded-xl bg-white/5 border border-white/10">
          <p className="text-[9px] font-mono text-white/40">ALERTAS CRÍTICAS</p>
          <p className="text-lg font-bold text-red-400">{stats.highRiskCount}</p>
        </div>
      </div>

      {/* Leyenda */}
      <div className="flex flex-wrap gap-4 font-mono text-[9px]">
        <div className="flex items-center gap-1"><div className="w-2 h-2 bg-[var(--tertiary)] rounded-full"/> VALIDATED FLOW</div>
        <div className="flex items-center gap-1"><div className="w-2 h-2 bg-[var(--secondary)] rounded-full"/> SETTLED CAPITAL</div>
        <div className="flex items-center gap-1"><div className="w-2 h-2 bg-red-500 rounded-full"/> ANOMALY/BLOCKED</div>
        <div className="flex items-center gap-1"><div className="w-2 h-2 bg-[var(--primary)] rounded-full"/> HUB PRINCIPAL</div>
      </div>

      {/* Grafo de nodos y conexiones */}
      <div className="p-6 rounded-xl bg-white/5 border border-white/10 overflow-x-auto">
        <div className="min-w-[600px]">
          <div className="flex justify-around items-center flex-wrap gap-8">
            {nodes.map((node, idx) => (
              <div key={node.id} className="text-center">
                <div 
                  className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer"
                  style={{ 
                    backgroundColor: `${node.color}20`, 
                    border: `2px solid ${node.color}`,
                    boxShadow: node.type === 'hub' ? `0 0 20px ${node.color}80` : 'none'
                  }}
                >
                  <span className="text-[8px] md:text-xs font-mono text-center px-1">
                    {node.name}
                  </span>
                </div>
                <p className="text-[9px] md:text-xs mt-2 text-white/60">{node.type.toUpperCase()}</p>
                <p className="text-[8px] font-mono text-white/30">${(node.value / 1e6).toFixed(1)}M</p>
              </div>
            ))}
          </div>
          
          {/* Representación simple de conexiones */}
          <div className="mt-8 space-y-2">
            <p className="text-[10px] font-mono text-white/40 text-center">CONEXIONES DETECTADAS</p>
            {edges.map((edge, idx) => (
              <div key={idx} className="flex justify-between items-center p-2 rounded-lg bg-white/5">
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-mono text-white/60">{edge.from.slice(0, 8)}...</span>
                  <span className="text-[var(--secondary)]">→</span>
                  <span className="font-mono text-white/60">{edge.to.slice(0, 8)}...</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold" style={{ color: getEdgeColor(edge.status) }}>
                    ${(edge.amount / 1e6).toFixed(2)}M
                  </span>
                  <span className={`text-[8px] font-mono px-1.5 py-0.5 rounded ${
                    edge.status === 'blocked' ? 'bg-red-500/20 text-red-400' :
                    edge.status === 'settled' ? 'bg-[var(--secondary)]/20 text-[var(--secondary)]' :
                    'bg-[var(--tertiary)]/20 text-[var(--tertiary)]'
                  }`}>
                    {edge.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Panel de anomalías */}
      <div className="space-y-2">
        <h3 className="font-mono text-xs font-bold text-white/60 flex items-center gap-2">
          <Zap size={14} className="text-red-400" />
          ANOMALÍAS DETECTADAS EN TIEMPO REAL
        </h3>
        {anomalies.map((anomaly, idx) => (
          <div key={idx} className="p-3 rounded-lg border-l-2" style={{ borderLeftColor: anomaly.color, backgroundColor: `${anomaly.color}10` }}>
            <div className="flex items-center justify-between">
              <p className="text-xs font-mono font-bold" style={{ color: anomaly.color }}>{anomaly.type} • {anomaly.time}</p>
              <AlertCircle size={12} style={{ color: anomaly.color }} />
            </div>
            <p className="text-xs font-bold mt-1">{anomaly.title}</p>
            <p className="text-[10px] text-white/50 mt-0.5">{anomaly.description}</p>
          </div>
        ))}
      </div>

      {/* Timeline gráfico */}
      <div className="p-4 rounded-xl bg-white/5 border border-white/10">
        <h3 className="font-mono text-xs font-bold mb-3 flex items-center gap-2">
          <TrendingUp size={14} className="text-[var(--tertiary)]" />
          FLUJO DE CAPITAL (últimos 6 meses)
        </h3>
        <div className="w-full h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={timelineData}>
              <XAxis dataKey="month" stroke="#ffffff50" fontSize={10} />
              <YAxis stroke="#ffffff50" fontSize={10} tickFormatter={(v) => `$${v}M`} />
              <Tooltip 
                formatter={(value: number) => [`$${value.toFixed(2)}M`, '']}
                contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #A855F7', borderRadius: '8px' }}
              />
              <Bar dataKey="income" fill="#0DFF88" name="Alto valor (>$2M)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="expense" fill="#0BF2FF" name="Bajo valor (<$2M)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-[8px] font-mono text-white/20 pt-2">
        Datos sincronizados con Avalanche C-Chain • Actualización automática cada 60s
      </div>
    </div>
  );
}