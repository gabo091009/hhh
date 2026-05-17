import { Upload, FileText } from 'lucide-react';
import { useState } from 'react';

export function IngestaPanel() {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl font-black tracking-tighter text-white">Financial Ingesta</h2>
        <p className="text-white/50 text-sm mt-1">Neural parsing of distributed ledgers</p>
      </div>

      <div 
        className="relative border-2 border-dashed rounded-2xl p-12 text-center transition-all"
        style={{ 
          borderColor: isDragging ? '#0BF2FF' : 'rgba(255,255,255,0.1)',
          backgroundColor: isDragging ? 'rgba(11,242,255,0.05)' : 'rgba(255,255,255,0.03)'
        }}
        onDragEnter={() => setIsDragging(true)}
        onDragLeave={() => setIsDragging(false)}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
        }}
      >
        <Upload className="mx-auto mb-4 text-white/30" size={40} />
        <p className="text-sm font-mono text-white/70 mb-2">Drop financial ledgers here</p>
        <p className="text-[10px] font-mono text-white/30">PDF · JSON · CSV · XML (Max 500MB)</p>
        <button className="mt-6 px-6 py-2 rounded-full text-xs font-mono transition-all"
          style={{ backgroundColor: 'rgba(168,85,247,0.2)', border: '1px solid rgba(168,85,247,0.3)', color: 'white' }}>
          BROWSE FILES
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="p-4 rounded-xl text-center" style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)' }}>
          <p className="text-[9px] font-mono text-white/40">ALPHA SCORE</p>
          <p className="text-xl font-bold" style={{ color: '#A855F7' }}>740</p>
          <p className="text-[9px]" style={{ color: '#0DFF88' }}>INSTITUTIONAL</p>
        </div>
        <div className="p-4 rounded-xl text-center" style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)' }}>
          <p className="text-[9px] font-mono text-white/40">TRUST INDEX</p>
          <p className="text-xl font-bold" style={{ color: '#0BF2FF' }}>STABLE</p>
          <p className="text-[9px]" style={{ color: '#0DFF88' }}>+4.2%</p>
        </div>
        <div className="p-4 rounded-xl text-center" style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)' }}>
          <p className="text-[9px] font-mono text-white/40">LIQUIDITY</p>
          <p className="text-xl font-bold" style={{ color: '#0BF2FF' }}>82%</p>
        </div>
        <div className="p-4 rounded-xl text-center" style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)' }}>
          <p className="text-[9px] font-mono text-white/40">COMPLIANCE</p>
          <p className="text-xl font-bold" style={{ color: '#0DFF88' }}>95%</p>
        </div>
      </div>
    </div>
  );
}