"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { TR, type Lang } from "@/lib/translations";

interface LanguageCtx {
  lang: Lang;
  toggle: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageCtx>({
  lang: "fr",
  toggle: () => {},
  t: (k) => k,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("fr");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("npit_lang") as Lang | null;
      if (saved === "fr" || saved === "ar") setLang(saved);
    } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    // Met à jour dir + lang sur <html> côté client
    document.documentElement.lang = lang;
    document.documentElement.dir  = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  const toggle = useCallback(() => {
    setLang((l) => {
      const next: Lang = l === "fr" ? "ar" : "fr";
      try { localStorage.setItem("npit_lang", next); } catch { /* ignore */ }
      return next;
    });
  }, []);

  const t = useCallback(
    (key: string) => TR[key]?.[lang] ?? key,
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ lang, toggle, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
