import { Activity } from 'lucide-react';

interface ScoreCardProps {
  label: string;
  value: string | number;
  color?: string;
}

export function ScoreCard({ label, value, color }: ScoreCardProps) {
  const defaultColor = 'var(--primary)';
  const usedColor = color || defaultColor;
  
  return (
    <div className="p-5 rounded-xl bg-white/[0.03] border border-white/10 group hover:border-white/20 hover:bg-white/[0.05] transition-all">
      <p className="text-[9px] font-mono font-bold uppercase tracking-[0.2em] text-white/40 mb-2">{label}</p>
      <div className="flex items-end gap-3">
        <span className="text-2xl font-bold tracking-tighter" style={{ color: usedColor }}>{value}</span>
        <Activity size={16} className="mb-2 opacity-30" style={{ color: usedColor }} />
      </div>
    </div>
  );
}