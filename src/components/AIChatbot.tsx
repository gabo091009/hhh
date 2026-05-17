import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, BrainCircuit, Minimize2, Bot, User, MoreHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import type { ChatMessage } from '../types';

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([{ role: 'assistant', text: 'Hello Administrator. I am the FlowTrace Neural Agent. How can I assist your analytical operations today?' }]);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isOpen]);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { role: 'user', text: input }]);
    const currentInput = input;
    setInput('');
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'assistant', text: 'Analysis of "' + currentInput + '" complete. Layering patterns in block #12.8M suggest institutional anchoring success. No critical anomalies detected.' }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-10 right-10 z-[60]">
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, scale: 0.9, y: 20, transformOrigin: 'bottom right' }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="absolute bottom-24 right-0 w-[420px] h-[600px] glass-panel rounded-[40px] flex flex-col overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.5)] border-t border-white/10">
            <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[var(--accent)]/10 flex items-center justify-center border border-[var(--accent)]/20 shadow-[0_0_15px_var(--accent-glow)]"><BrainCircuit size={24} className="text-[var(--accent)]" /></div>
                <div><h3 className="text-sm font-black uppercase tracking-tight">Neural Agent</h3><div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" /><span className="text-[9px] font-mono font-black uppercase tracking-widest text-[#10b981]">Core Active</span></div></div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2.5 rounded-xl hover:bg-white/5 text-white/20 transition-all"><Minimize2 size={18} /></button>
                <button onClick={() => setIsOpen(false)} className="p-2.5 rounded-xl hover:bg-[#ef4444]/10 text-[#ef4444] transition-all"><X size={18} /></button>
              </div>
            </div>
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-6 scrollbar-hide">
              {messages.map((msg, idx) => (
                <div key={idx} className={cn("flex gap-4 max-w-[85%]", msg.role === 'user' ? "ml-auto flex-row-reverse" : "")}>
                  <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border", msg.role === 'user' ? "bg-white/5 border-white/10" : "bg-[var(--accent)]/10 border-[var(--accent)]/20")}>{msg.role === 'user' ? <User size={14} className="text-white/40" /> : <Bot size={14} className="text-[var(--accent)]" />}</div>
                  <div className={cn("p-5 rounded-2xl text-sm leading-relaxed", msg.role === 'user' ? "bg-white/[0.03] text-white/70 rounded-tr-none border border-white/5" : "bg-[var(--accent)]/5 text-white/80 rounded-tl-none border border-[var(--accent)]/10")}>{msg.text}</div>
                </div>
              ))}
            </div>
            <div className="p-8 border-t border-white/5 bg-white/[0.01]">
              <div className="relative flex items-center">
                <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()} placeholder="Ask Agent about Trace protocols..." className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-5 pl-6 pr-20 text-sm focus:outline-none focus:border-[var(--accent)]/30 transition-all font-medium" />
                <div className="absolute right-3 flex items-center gap-2">
                  <button className="p-3 text-white/20 hover:text-white/40"><Sparkles size={18} /></button>
                  <button onClick={handleSend} className="p-3 bg-[var(--accent)] text-white rounded-xl shadow-[0_5px_15px_rgba(124,58,237,0.3)] hover:scale-105 active:scale-95 transition-all"><Send size={18} /></button>
                </div>
              </div>
              <div className="mt-4 flex justify-between items-center opacity-20"><span className="font-mono text-[8px] uppercase tracking-widest font-black">Powered by Genesis Neural</span><MoreHorizontal size={14} /></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setIsOpen(!isOpen)} className={cn("w-16 h-16 rounded-[24px] flex items-center justify-center transition-all duration-500 shadow-2xl relative group", isOpen ? "bg-[#ef4444]" : "bg-[var(--accent)]")}>
        <div className="absolute inset-0 rounded-[24px] blur-2xl group-hover:blur-3xl opacity-40 transition-all" style={{ backgroundColor: isOpen ? '#ef4444' : 'var(--accent)' }} />
        {isOpen ? <X className="relative z-10 text-white" size={24} /> : <MessageSquare className="relative z-10 text-white" size={24} />}
        {!isOpen && <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#10b981] rounded-full border-2 border-[var(--bg)] animate-pulse" />}
      </motion.button>
    </div>
  );
}
