import Image from "next/image";
import { MessageCircle, Phone, Mail } from "lucide-react";

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "212600000000";

export default function ComingSoonPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-nauma-600 via-nauma-800 to-nauma-900 flex flex-col items-center justify-center px-6 text-white">
      {/* Logo */}
      <div className="w-28 h-28 bg-white/10 rounded-full flex items-center justify-center mb-8 border border-white/20 backdrop-blur-sm">
        <Image src="/logo-npit.png" alt="NPITPACKING" width={90} height={90} className="object-contain" />
      </div>

      {/* Titre */}
      <div className="text-center mb-10">
        <p className="text-nauma-teal font-semibold tracking-widest text-sm uppercase mb-3">
          NPITPACKING — Division NPTI
        </p>
        <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
          Bientôt <span className="text-nauma-teal italic">disponible</span>
        </h1>
        <p className="text-blue-100 text-base md:text-lg max-w-md mx-auto leading-relaxed">
          Notre site est en cours de préparation. Nous finalisons notre catalogue de produits d&apos;emballage professionnel.
        </p>
      </div>

      {/* Séparateur */}
      <div className="flex items-center gap-3 mb-10 w-full max-w-xs">
        <div className="flex-1 h-px bg-white/20" />
        <span className="text-white/40 text-xs uppercase tracking-widest">En attendant</span>
        <div className="flex-1 h-px bg-white/20" />
      </div>

      {/* Contact */}
      <div className="flex flex-col sm:flex-row gap-3 mb-10">
        <a
          href={`https://wa.me/${WHATSAPP}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
        >
          <MessageCircle className="w-4 h-4" />
          Commander via WhatsApp
        </a>
        <a
          href="mailto:contact@npitpacking.com"
          className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium px-6 py-3 rounded-xl transition-colors"
        >
          <Mail className="w-4 h-4" />
          contact@npitpacking.com
        </a>
      </div>

      {/* Avantages */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl w-full text-center">
        {[
          { emoji: "🚚", label: "Livraison Maroc" },
          { emoji: "📦", label: "Détail & Gros" },
          { emoji: "✅", label: "Qualité garantie" },
          { emoji: "💬", label: "Réponse rapide" },
        ].map((a) => (
          <div key={a.label} className="bg-white/5 border border-white/10 rounded-xl p-3">
            <p className="text-2xl mb-1">{a.emoji}</p>
            <p className="text-xs text-blue-100 font-medium">{a.label}</p>
          </div>
        ))}
      </div>

      <p className="mt-10 text-white/30 text-xs">© 2026 NPITPACKING — npitpacking.com</p>
    </div>
  );
}
