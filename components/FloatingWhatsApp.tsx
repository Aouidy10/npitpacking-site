"use client";

import { useState } from "react";

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "212700700585";
const DEFAULT_MESSAGE = "Bonjour NPIT Packing 👋, je suis intéressé(e) par vos produits d'emballage. Pouvez-vous m'aider ?";

export default function FloatingWhatsApp() {
  const [hovered, setHovered] = useState(false);
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(DEFAULT_MESSAGE)}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {/* Bulle message */}
      {hovered && (
        <div className="bg-white rounded-2xl rounded-br-sm shadow-xl border border-gray-100 px-4 py-3 max-w-[200px] text-sm text-gray-700 animate-fade-in">
          <p className="font-semibold text-green-600 mb-0.5">Bonjour 👋</p>
          <p className="text-xs text-gray-500 leading-snug">Commandez facilement via WhatsApp — réponse rapide !</p>
        </div>
      )}

      {/* Bouton */}
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Commander sur WhatsApp"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-full shadow-lg transition-all duration-200 hover:scale-105"
      >
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-30 pointer-events-none" />

        {/* WhatsApp icon SVG */}
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white flex-shrink-0" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.136.565 4.14 1.547 5.877L.057 23.882a.5.5 0 0 0 .61.61l6.007-1.49A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.956 9.956 0 0 1-5.176-1.448l-.37-.222-3.867.959.975-3.87-.24-.386A9.956 9.956 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
        </svg>

        <span className="text-sm font-semibold hidden sm:block">Commander</span>
      </a>
    </div>
  );
}
