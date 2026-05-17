import { createContext, useContext, useState, type ReactNode } from 'react';
import { translations, type Language } from './translations';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string, vars?: Record<string, string>) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'es',
  setLang: () => {},
  t: (key: string) => key,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>('es');

  const t = (key: string, vars?: Record<string, string>): string => {
    const langTranslations = translations[lang] as Record<string, string>;
    let text = langTranslations[key] || translations['en'][key as keyof typeof translations['en']] || key;
    
    if (vars) {
      Object.entries(vars).forEach(([k, v]) => {
        text = text.replace('${' + k + '}', v);
      });
    }
    
    return text;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
