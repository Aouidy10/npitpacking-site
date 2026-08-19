"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X, MessageCircle, FileText, Package, Star } from "lucide-react";

const WA = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "212700700585";
const WA_MSG = encodeURIComponent("Bonjour NPIT Packing 👋, je suis intéressé(e) par vos produits d'emballage. Pouvez-vous m'aider ?");

export default function DevisPopup() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("devis_popup_closed") === "1") return;
    const t = setTimeout(() => setVisible(true), 2000);
    return () => clearTimeout(t);
  }, []);

  const close = () => {
    sessionStorage.setItem("devis_popup_closed", "1");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <>
      {/* Backdrop semi-transparent */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[150]"
        onClick={close}
      />

      {/* Popup centré */}
      <div className="fixed inset-0 z-[151] flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-slide-up">

          {/* Header avec dégradé */}
          <div className="relative bg-nauma-600 px-7 pt-8 pb-6 text-white overflow-hidden">
            {/* Cercles décoratifs */}
            <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/10" />
            <div className="absolute -bottom-4 -left-4 w-20 h-20 rounded-full bg-white/5" />

            <button
              onClick={close}
              className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-white/15 rounded-xl flex items-center justify-center">
                  <Package className="w-4 h-4" />
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-white/80 text-xs font-medium">NPIT Packing — En ligne</span>
                </div>
              </div>

              <h2 className="text-2xl font-extrabold leading-tight mb-2">
                Emballages professionnels<br />
                <span className="text-nauma-teal">au meilleur prix 🇲🇦</span>
              </h2>
              <p className="text-blue-100 text-sm leading-relaxed">
                Vente au détail &amp; en gros — Livraison dans tout le Maroc
              </p>
            </div>
          </div>

          {/* Avantages */}
          <div className="px-7 py-5 bg-gray-50 border-b border-gray-100">
            <div className="grid grid-cols-3 gap-3 text-center">
              {[
                { emoji: "⚡", label: "Réponse rapide" },
                { emoji: "📦", label: "Stock disponible" },
                { emoji: "🚚", label: "Livraison Maroc" },
              ].map((item) => (
                <div key={item.label} className="flex flex-col items-center gap-1">
                  <span className="text-xl">{item.emoji}</span>
                  <span className="text-[11px] text-gray-500 font-medium leading-tight">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="px-7 py-6 space-y-3">
            <Link
              href="/devis"
              onClick={close}
              className="flex items-center justify-center gap-2.5 w-full bg-nauma-600 hover:bg-nauma-700 text-white font-bold text-sm py-4 rounded-2xl transition-colors shadow-lg shadow-nauma-600/20"
            >
              <FileText className="w-4 h-4" />
              Demander un devis gratuit
            </Link>
            <a
              href={`https://wa.me/${WA}?text=${WA_MSG}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={close}
              className="flex items-center justify-center gap-2.5 w-full bg-green-500 hover:bg-green-600 text-white font-bold text-sm py-4 rounded-2xl transition-colors shadow-lg shadow-green-500/20"
            >
              <MessageCircle className="w-4 h-4" />
              Commander sur WhatsApp
            </a>

            <div className="flex items-center justify-center gap-1 pt-1">
              {[1,2,3,4,5].map((s) => (
                <Star key={s} className="w-3 h-3 fill-amber-400 text-amber-400" />
              ))}
              <span className="text-xs text-gray-400 ml-1">+500 clients satisfaits</span>
            </div>
          </div>

          {/* Fermer discret */}
          <div className="pb-4 text-center">
            <button onClick={close} className="text-xs text-gray-300 hover:text-gray-500 transition-colors">
              Continuer sans devis
            </button>
          </div>

        </div>
      </div>
    </>
  );
}
