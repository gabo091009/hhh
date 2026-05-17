import { Fingerprint, Shield, ArrowRight, Lock, User } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../i18n/LanguageContext';

interface LoginViewProps {
  onLogin: () => void;
}

export function LoginView({ onLogin }: LoginViewProps) {
  const { t, lang, setLang } = useLanguage();

  return (
    <div className="fixed inset-0 z-[100] bg-[var(--bg)] flex items-center justify-center p-6 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-[var(--primary)]/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] bg-[var(--secondary)]/10 rounded-full blur-[100px]" />
        <div className="absolute inset-0 bg-[radial-gradient(var(--primary)_0.5px,transparent_0.5px)] [background-size:40px_40px] opacity-10" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-lg glass-panel rounded-[40px] p-12 relative z-10 border-t border-white/10 shadow-2xl"
      >
        <div className="flex flex-col items-center text-center mb-10">
          <div className="w-20 h-20 rounded-[28px] bg-[var(--primary)]/10 flex items-center justify-center border border-[var(--primary)]/20 shadow-[0_0_30px_var(--primary-glow)] mb-8">
            <Shield className="text-[var(--primary)]" size={36} />
          </div>
          <h1 className="text-4xl font-black text-white tracking-tighter uppercase mb-3">{t('login_title')}</h1>
          <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/30 font-black">{t('login_subtitle')}</p>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="username" className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/20 ml-4 font-black">
              {t('login_identifier')}
            </label>
            <div className="relative group">
              <User className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[var(--primary)] transition-colors" size={18} />
              <input 
                id="username"
                name="username"
                type="text" 
                placeholder="GENESIS_ADMIN_01"
                className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-5 pl-14 pr-6 font-mono text-sm tracking-widest text-white placeholder:text-white/10 focus:outline-none focus:border-[var(--primary)]/50 focus:bg-white/[0.05] transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/20 ml-4 font-black">
              {t('login_passkey')}
            </label>
            <div className="relative group">
              <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[var(--primary)] transition-colors" size={18} />
              <input 
                id="password"
                name="password"
                type="password" 
                placeholder="••••••••••••"
                className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-5 pl-14 pr-6 font-mono text-sm tracking-widest text-white placeholder:text-white/10 focus:outline-none focus:border-[var(--primary)]/50 focus:bg-white/[0.05] transition-all"
              />
            </div>
          </div>
        </div>

        <div className="mt-10 space-y-4">
          <button 
            onClick={onLogin}
            className="group w-full bg-[var(--primary)] hover:bg-[var(--primary)]/90 text-white py-6 rounded-2xl font-black font-mono text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-4 transition-all shadow-[0_20px_50px_rgba(168,85,247,0.3)] active:scale-95"
          >
            {t('login_button')}
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>

          <button className="w-full py-4 rounded-xl border border-white/5 text-white/20 font-mono text-[9px] uppercase tracking-[0.3em] font-black hover:text-white/40 hover:bg-white/5 transition-all flex items-center justify-center gap-2">
            <Fingerprint size={14} />
            {t('login_biometric')}
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-white/5 flex justify-center">
          <button 
            onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
            className="text-white/40 hover:text-white/80 text-[10px] font-mono uppercase tracking-[0.2em] font-black transition-all"
          >
            {lang === 'es' ? '🇺🇸 ENGLISH' : '🇲🇽 ESPAÑOL'}
          </button>
        </div>

        <div className="mt-6 pt-6 border-t border-white/5 flex justify-between items-center opacity-30">
          <div className="flex gap-4">
            <span className="font-mono text-[8px] uppercase tracking-widest font-black">ID_042</span>
            <span className="font-mono text-[8px] uppercase tracking-widest font-black">TLS_1.3</span>
          </div>
          <span className="font-mono text-[8px] uppercase tracking-widest font-black">© 2026 FlowTrace Neural Systems</span>
        </div>
      </motion.div>
    </div>
  );
}