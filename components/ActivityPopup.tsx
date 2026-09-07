"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { ACTIVITES } from "@/lib/activites";
import { useLanguage } from "@/context/LanguageContext";

export default function ActivityPopup() {
  const [visible, setVisible] = useState(false);
  const router = useRouter();
  const { t } = useLanguage();

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 400);
    return () => clearTimeout(t);
  }, []);

  const select = (id: string) => {
    setVisible(false);
    router.push(`/catalogue?activite=${id}`);
  };

  const skip = () => setVisible(false);

  if (!visible) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[150]"
        onClick={skip}
      />

      {/* Card */}
      <div className="fixed inset-0 z-[151] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-[460px] overflow-hidden animate-slide-up">

          {/* Barre accent */}
          <div className="h-1 w-full bg-gradient-to-r from-[#1B3266] via-[#3DAAB5] to-[#C8A46E]" />

          {/* Header */}
          <div className="px-6 pt-5 pb-3 flex items-start justify-between">
            <div>
              <div className="flex items-center gap-1.5 mb-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#3DAAB5]">NPIT Packing</span>
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-[10px] text-gray-400">{t("popup.online")}</span>
              </div>
              <h2 className="text-lg font-extrabold text-gray-900 leading-tight">
                {t("popup.title")}
              </h2>
              <p className="text-xs text-gray-400 mt-0.5">
                {t("popup.sub")}
              </p>
            </div>
            <button
              onClick={skip}
              className="text-gray-300 hover:text-gray-500 transition-colors mt-0.5 flex-shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Grille activités */}
          <div className="px-5 pb-4 flex flex-wrap justify-center gap-2">
            {ACTIVITES.map((act) => (
              <button
                key={act.id}
                onClick={() => select(act.id)}
                style={{ width: "calc(25% - 6px)", minWidth: "90px" }}
                className="flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl border border-gray-100 hover:border-[#1B3266] hover:bg-[#1B3266]/5 transition-all duration-150 group active:scale-95"
              >
                <div className="w-10 h-10 rounded-xl bg-gray-50 group-hover:bg-[#1B3266]/8 flex items-center justify-center text-xl transition-colors">
                  {act.emoji}
                </div>
                <span className="text-[10px] font-semibold text-gray-600 group-hover:text-[#1B3266] text-center leading-tight transition-colors">
                  {t(`act.${act.id}`)}
                </span>
              </button>
            ))}
          </div>

          {/* Footer */}
          <div className="border-t border-gray-50 py-3 text-center">
            <button
              onClick={skip}
              className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
            >
              {t("popup.skip")}
            </button>
          </div>

        </div>
      </div>
    </>
  );
}
