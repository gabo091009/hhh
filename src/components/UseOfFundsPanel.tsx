import { AlertTriangle, TrendingUp } from 'lucide-react';

export function UseOfFundsPanel() {
  const allocations = [
    { name: 'INVENTORY', declared: 40, actual: 35 },
    { name: 'PAYROLL', declared: 30, actual: 28 },
    { name: 'LOGISTICS', declared: 20, actual: 22 },
    { name: 'MARKETING', declared: 10, actual: 8 },
    { name: 'UNKNOWN', declared: 0, actual: 7 }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-black tracking-tighter">USE OF FUNDS</h2>
        <p className="text-white/50 text-sm mt-1">REAL-TIME CAPITAL ALLOCATION TRACKING & DRIFT DETECTION</p>
      </div>

      <div className="space-y-3">
        {allocations.map(item => (
          <div key={item.name}>
            <div className="flex justify-between text-xs font-mono mb-1">
              <span>{item.name}</span>
              <span>Declared: {item.declared}% | Actual: {item.actual}%</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-[var(--primary)] rounded-full" style={{ width: `${item.declared}%` }} />
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center justify-between">
        <div>
          <p className="text-sm font-bold text-red-400 flex items-center gap-2"><AlertTriangle size={16} /> ALLOCATION DRIFT DETECTED</p>
          <p className="text-xs text-white/60">7% of capital routed to unknown destination</p>
        </div>
        <button className="px-4 py-2 bg-red-500/20 rounded-lg text-xs font-mono hover:bg-red-500/30 transition-all">INVESTIGATE DRIFT</button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
          <p className="text-[9px] font-mono text-white/40">Capital Trust</p>
          <p className="text-2xl font-bold text-[var(--tertiary)]">82%</p>
        </div>
        <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
          <p className="text-[9px] font-mono text-white/40">Compliance</p>
          <p className="text-2xl font-bold text-[var(--secondary)]">88%</p>
        </div>
      </div>
    </div>
  );
}