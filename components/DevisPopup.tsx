"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X, MessageCircle } from "lucide-react";

const WA = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "212700700585";
const WA_MSG = encodeURIComponent("Bonjour NPIT Packing 👋, je suis intéressé(e) par vos produits d'emballage. Pouvez-vous m'aider ?");

export default function DevisPopup() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("devis_popup_closed") === "1") return;
    const t = setTimeout(() => setVisible(true), 6000);
    return () => clearTimeout(t);
  }, []);

  const close = () => {
    sessionStorage.setItem("devis_popup_closed", "1");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 left-4 z-[60] animate-slide-up">
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 w-56 overflow-hidden">

        {/* Header compact */}
        <div className="bg-nauma-600 px-3 py-2 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-white text-[11px] font-semibold">NPIT Packing</span>
          </div>
          <button onClick={close} className="text-white/60 hover:text-white transition-colors">
            <X className="w-3 h-3" />
          </button>
        </div>

        {/* Corps compact */}
        <div className="p-3">
          <p className="text-xs font-bold text-gray-800 mb-0.5">Besoin d&apos;emballages ? 📦</p>
          <p className="text-[11px] text-gray-400 leading-snug mb-3">
            Devis gratuit · Détail &amp; Gros · Livraison Maroc
          </p>

          <div className="flex gap-1.5">
            <Link
              href="/devis"
              onClick={close}
              className="flex-1 text-center bg-nauma-600 hover:bg-nauma-700 text-white font-semibold text-[11px] py-2 rounded-lg transition-colors"
            >
              Devis
            </Link>
            <a
              href={`https://wa.me/${WA}?text=${WA_MSG}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={close}
              className="flex items-center justify-center gap-1 bg-green-500 hover:bg-green-600 text-white font-semibold text-[11px] py-2 px-2.5 rounded-lg transition-colors"
            >
              <MessageCircle className="w-3 h-3" />
              WA
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
