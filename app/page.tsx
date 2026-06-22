import Link from "next/link";
import { Package, Truck, BadgeCheck, Phone } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { PRODUITS_DEMO } from "@/lib/produits";

const CATEGORIES = [
  { slug: "cellophane", label: "Cellophane", labelAr: "سولوفان", emoji: "🎁", color: "bg-nauma-50 border-nauma-200 text-nauma-600" },
  { slug: "serviettes", label: "Serviettes", labelAr: "سيرفيت", emoji: "🗒️", color: "bg-nauma-teal-50 border-nauma-teal-100 text-nauma-teal" },
  { slug: "papier-cuisson", label: "Papier Cuisson", labelAr: "بابي كوسون", emoji: "🍳", color: "bg-nauma-gold-50 border-amber-200 text-amber-700" },
  { slug: "sacs", label: "Sacs & Rouleaux", labelAr: "مشوار", emoji: "🛍️", color: "bg-nauma-50 border-nauma-100 text-nauma-700" },
];

const AVANTAGES = [
  { icon: Truck, titre: "Livraison Maroc", desc: "Livraison rapide dans toutes les villes du Maroc" },
  { icon: BadgeCheck, titre: "Qualité garantie", desc: "Produits certifiés, conformes aux normes alimentaires" },
  { icon: Package, titre: "Détail & Gros", desc: "Prix spéciaux à partir de certaines quantités" },
  { icon: Phone, titre: "Support WhatsApp", desc: "Réponse rapide via WhatsApp pour toute commande" },
];

const PRODUITS_VEDETTES = PRODUITS_DEMO.filter((p) => p.vedette);

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-nauma-600 to-nauma-900 text-white">
        <div className="container-main py-20 flex flex-col items-center text-center gap-6">
          <span className="bg-white/20 text-white text-sm font-medium px-4 py-1 rounded-full">
            🇲🇦 Livraison dans tout le Maroc
          </span>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight max-w-3xl">
            Papier & Emballage de qualité au <span className="text-nauma-teal">Meilleur Prix</span>
          </h1>
          <p className="text-blue-100 text-lg max-w-xl leading-relaxed">
            Cellophane, serviettes, papier cuisson, sacs kraft — vente détail et gros pour professionnels et particuliers.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mt-2">
            <Link href="/catalogue" className="btn-primary bg-white text-nauma-600 hover:bg-nauma-50">
              Voir le catalogue
            </Link>
            <Link href="/devis" className="btn-outline border-white text-white hover:bg-white hover:text-nauma-600">
              Commander en gros
            </Link>
          </div>
        </div>
      </section>

      {/* Catégories */}
      <section className="container-main py-14">
        <h2 className="section-title text-center mb-8">Nos Catégories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/catalogue?cat=${cat.slug}`}
              className={`border-2 rounded-2xl p-5 text-center hover:scale-105 transition-transform ${cat.color}`}
            >
              <div className="text-3xl mb-2">{cat.emoji}</div>
              <div className="font-semibold text-sm">{cat.label}</div>
              <div className="text-xs opacity-75 mt-0.5">{cat.labelAr}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Produits vedettes */}
      <section className="container-main pb-14">
        <div className="flex items-center justify-between mb-8">
          <h2 className="section-title">Produits Vedettes</h2>
          <Link href="/catalogue" className="text-nauma-600 hover:text-nauma-700 text-sm font-medium">
            Voir tout →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {PRODUITS_VEDETTES.map((p) => (
            <ProductCard key={p.id} produit={p} />
          ))}
        </div>
      </section>

      {/* Avantages */}
      <section className="bg-white border-t border-gray-100">
        <div className="container-main py-14 grid grid-cols-2 md:grid-cols-4 gap-6">
          {AVANTAGES.map((a) => (
            <div key={a.titre} className="flex flex-col items-center text-center gap-3">
              <div className="bg-nauma-teal-50 text-nauma-600 p-3 rounded-xl">
                <a.icon className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-sm">{a.titre}</h3>
              <p className="text-gray-500 text-xs leading-relaxed">{a.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Gros */}
      <section className="container-main py-14">
        <div className="bg-gradient-to-r from-nauma-600 to-nauma-800 rounded-3xl p-10 text-white text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Vous commandez en grande quantité ?</h2>
          <p className="text-blue-100 mb-6 max-w-lg mx-auto">
            Bénéficiez de tarifs préférentiels pour les commandes gros. Devis gratuit et rapide.
          </p>
          <Link href="/devis" className="bg-white text-nauma-600 hover:bg-nauma-50 font-semibold px-8 py-3 rounded-xl transition-colors inline-block">
            Demander un devis gratuit
          </Link>
        </div>
      </section>
    </>
  );
}
