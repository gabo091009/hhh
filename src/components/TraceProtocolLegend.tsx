export function TraceProtocolLegend() {
  return (
    <div className="flex gap-6 font-mono text-[10px] uppercase tracking-wider">
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 bg-[var(--tertiary)] rounded-full"></div>
        <span className="text-white/60">VALIDATED FLOW</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 bg-[var(--secondary)] rounded-full"></div>
        <span className="text-white/60">SETTLED CAPITAL</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
        <span className="text-white/60">ANOMALY/BLOCKED</span>
      </div>
    </div>
  );
}