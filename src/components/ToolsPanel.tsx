import { Cpu, Hash, Globe, Shield, Terminal } from 'lucide-react';

export function ToolsPanel() {
  const logs = [
    '[SYSTEM] Core initialized.',
    '[SCAN] Initializing Layer 2 sweep...',
    '[AUTH] Admin token verified: FLOW_X_992',
    '[WARN] Anomaly in Block #12,894,031',
    '[SCAN] Re-linking shards [31, 42, 11]...',
    '[API] Fetching Avalanche state...',
    '[SYSTEM] WebSocket stable. Latency: 1.2ms'
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-black tracking-tighter">INTELLIGENCE TOOLKIT</h2>
        <p className="text-white/50 text-sm mt-1">ENHANCED ANALYTICAL PRIMITIVES FOR DEEP TRACE PROTOCOLS</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-5 rounded-xl bg-white/5 border border-white/10">
          <Cpu className="text-[var(--primary)] mb-3" size={24} />
          <h3 className="font-mono text-sm font-bold">CAPITAL VELOCITY</h3>
          <p className="text-xs text-white/50 mt-1">Predictive modeling of capital flow acceleration across border nodes.</p>
        </div>
        <div className="p-5 rounded-xl bg-white/5 border border-white/10">
          <Hash className="text-[var(--secondary)] mb-3" size={24} />
          <h3 className="font-mono text-sm font-bold">NEURAL HASH</h3>
          <p className="text-xs text-white/50 mt-1">De-anonymize complex layering sequences using institutional pattern recognition.</p>
        </div>
        <div className="p-5 rounded-xl bg-white/5 border border-white/10">
          <Globe className="text-[var(--tertiary)] mb-3" size={24} />
          <h3 className="font-mono text-sm font-bold">GEO-PROXY</h3>
          <p className="text-xs text-white/50 mt-1">Detect origin masking and jurisdictional anomalies.</p>
        </div>
        <div className="p-5 rounded-xl bg-white/5 border border-white/10">
          <Shield className="text-[var(--neutral)] mb-3" size={24} />
          <h3 className="font-mono text-sm font-bold">CONTRACT SENTINEL</h3>
          <p className="text-xs text-white/50 mt-1">Real-time smart contract vulnerability scanner.</p>
        </div>
      </div>

      <div className="p-5 rounded-xl bg-black/40 border border-white/10">
        <div className="flex items-center gap-2 mb-4">
          <Terminal size={16} className="text-[var(--secondary)]" />
          <h3 className="font-mono text-xs font-bold">NEURAL CONSOLE</h3>
        </div>
        <div className="space-y-1 font-mono text-[10px]">
          {logs.map((log, i) => (
            <p key={i} className={log.includes('WARN') ? 'text-yellow-400' : log.includes('SYSTEM') ? 'text-[var(--tertiary)]' : 'text-white/50'}>
              {log}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}