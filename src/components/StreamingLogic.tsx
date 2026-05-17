import { Zap, MapPin, AlertCircle } from 'lucide-react';

export function StreamingLogic() {
  const events = [
    { type: 'CRITICAL', time: '14:22:01', title: 'CAPITAL VELOCITY SPIKE', description: 'Wallet [0x71...ea2] disseminated $4.2M across 14 layers in 40s.', action: 'EXECUTE_LOCK' },
    { type: 'DRIFT', time: '12:15:45', title: 'GEO-PROXY DETECTED', description: 'Origin switched from London Institutional to Cayman Private Cloud.' }
  ];

  return (
    <div className="space-y-3">
      <h3 className="font-mono text-[10px] uppercase tracking-wider text-white/40">STREAMING LOGIC</h3>
      {events.map((event, i) => (
        <div key={i} className="p-3 rounded-lg bg-white/5 border border-white/10">
          <div className="flex items-center gap-2 mb-1">
            {event.type === 'CRITICAL' ? (
              <Zap size={12} className="text-red-400" />
            ) : (
              <MapPin size={12} className="text-yellow-400" />
            )}
            <span className={`text-[9px] font-mono font-bold ${event.type === 'CRITICAL' ? 'text-red-400' : 'text-yellow-400'}`}>
              {event.type} • {event.time}
            </span>
          </div>
          <p className="text-xs font-mono font-bold">{event.title}</p>
          <p className="text-[10px] text-white/50 mt-1">{event.description}</p>
          {event.action && <p className="text-[9px] font-mono text-[var(--tertiary)] mt-1">{event.action}</p>}
        </div>
      ))}
    </div>
  );
}