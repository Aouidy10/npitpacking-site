"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ACTIVITES } from "@/lib/activites";

export default function ActivityPopup() {
  const [visible, setVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    try {
      if (sessionStorage.getItem("activite_selectee")) return;
    } catch { /* ignore */ }
    const t = setTimeout(() => setVisible(true), 400);
    return () => clearTimeout(t);
  }, []);

  const select = (id: string) => {
    try { sessionStorage.setItem("activite_selectee", id); } catch { /* ignore */ }
    setVisible(false);
    router.push(`/catalogue?activite=${id}`);
  };

  const skip = () => {
    try { sessionStorage.setItem("activite_selectee", "tous"); } catch { /* ignore */ }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[150]"
        onClick={skip}
      />

      {/* Popup */}
      <div className="fixed inset-0 z-[151] flex items-center justify-center px-4 py-6">
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-[520px] overflow-hidden animate-slide-up">

          {/* Header navy */}
          <div className="relative bg-nauma-600 px-7 pt-7 pb-6 text-white text-center overflow-hidden">
            {/* Cercles déco */}
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/5 pointer-events-none" />
            <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-white/5 pointer-events-none" />

            <div className="relative">
              <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-3 py-1 mb-4">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs font-semibold text-white/80 tracking-wide">NPIT Packing — Maroc</span>
              </div>
              <h2 className="text-2xl font-extrabold leading-tight mb-1.5">
                Quel est votre secteur d&apos;activité ?
              </h2>
              <p className="text-blue-200 text-sm">
                Nous sélectionnons les emballages idéaux pour votre métier
              </p>
            </div>
          </div>

          {/* Grille des activités */}
          <div className="px-5 py-5">
            <div className="flex flex-wrap justify-center gap-3">
              {ACTIVITES.map((act) => (
                <button
                  key={act.id}
                  onClick={() => select(act.id)}
                  className={`
                    flex flex-col items-center gap-2 p-4 rounded-2xl border-2
                    transition-all duration-150 w-[calc(50%-6px)] sm:w-[130px]
                    ${act.couleur}
                    hover:scale-[1.03] hover:shadow-md active:scale-100
                  `}
                >
                  <div className={`w-14 h-14 rounded-2xl ${act.emojisBg} flex items-center justify-center text-3xl`}>
                    {act.emoji}
                  </div>
                  <span className="text-sm font-bold text-gray-700 text-center leading-tight">
                    {act.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="pb-5 text-center border-t border-gray-100 pt-4 mx-5">
            <button
              onClick={skip}
              className="text-xs text-gray-400 hover:text-gray-600 transition-colors underline underline-offset-2"
            >
              Voir tous les produits sans filtre
            </button>
          </div>

        </div>
      </div>
    </>
  );
}
