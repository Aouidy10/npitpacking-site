"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X, MessageCircle, FileText } from "lucide-react";

const WA = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "212700700585";
const WA_MSG = encodeURIComponent("Bonjour NPIT Packing 👋, je suis intéressé(e) par vos produits d'emballage. Pouvez-vous m'aider ?");

export default function DevisPopup() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Afficher 1 seule fois par session, après 6 secondes
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
    <div className="fixed bottom-24 left-4 z-[60] animate-slide-up">
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 w-72 overflow-hidden">

        {/* Header */}
        <div className="bg-nauma-600 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-white text-xs font-semibold">NPIT Packing — En ligne</span>
          </div>
          <button onClick={close} className="text-white/60 hover:text-white transition-colors">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Corps */}
        <div className="p-4">
          <p className="text-sm font-bold text-gray-800 mb-1">
            Besoin d&apos;emballages professionnels ? 📦
          </p>
          <p className="text-xs text-gray-500 leading-relaxed mb-4">
            Demandez votre devis gratuitement — réponse rapide sous 24h. Vente au détail et en gros.
          </p>

          <div className="flex flex-col gap-2">
            <Link
              href="/devis"
              onClick={close}
              className="flex items-center justify-center gap-2 bg-nauma-600 hover:bg-nauma-700 text-white font-semibold text-xs py-2.5 rounded-xl transition-colors"
            >
              <FileText className="w-3.5 h-3.5" />
              Demander un devis
            </Link>
            <a
              href={`https://wa.me/${WA}?text=${WA_MSG}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={close}
              className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold text-xs py-2.5 rounded-xl transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              Commander sur WhatsApp
            </a>
          </div>
        </div>

        {/* Footer discret */}
        <div className="px-4 pb-3 text-center">
          <button onClick={close} className="text-[10px] text-gray-300 hover:text-gray-500 transition-colors">
            Non merci, continuer sans devis
          </button>
        </div>
      </div>
    </div>
  );
}
