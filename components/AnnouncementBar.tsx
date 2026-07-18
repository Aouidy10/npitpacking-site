"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "212600000000";

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(sessionStorage.getItem("ann_closed") !== "1");
  }, []);

  const close = () => {
    sessionStorage.setItem("ann_closed", "1");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="bg-nauma-600 text-white text-xs py-2 px-4 flex items-center justify-center gap-4 relative">
      <div className="flex items-center gap-4 overflow-hidden">
        <span className="whitespace-nowrap">🚚 Livraison dans tout le Maroc</span>
        <span className="hidden sm:block opacity-40">|</span>
        <a
          href={`https://wa.me/${WHATSAPP}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:block whitespace-nowrap hover:text-nauma-teal transition-colors font-medium"
        >
          📞 Commander par WhatsApp →
        </a>
        <span className="hidden md:block opacity-40">|</span>
        <span className="hidden md:block whitespace-nowrap text-nauma-teal font-semibold">
          ⭐ Prix spéciaux pour commandes gros
        </span>
      </div>
      <button
        onClick={close}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
        aria-label="Fermer"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
