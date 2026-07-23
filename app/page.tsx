import Link from "next/link";
import { Truck, BadgeCheck, Package, Phone, Star } from "lucide-react";
import HeroSlider from "@/components/HeroSlider";
import HomeSections from "@/components/HomeSections";
import { PRODUITS_DEMO } from "@/lib/produits";
import { CATEGORIES_CONFIG } from "@/lib/categories";
import {
  EmballageAlimentaireIcon,
  EmballageBiodegradableIcon,
  HygieneIcon,
  PapierIcon,
  PlastiqueIcon,
  VerreCristalIcon,
} from "@/components/CategoryIcons";
import { Categorie } from "@/types";

const CAT_ICONS: Record<Categorie, React.FC> = {
  "emballage-alimentaire":   EmballageAlimentaireIcon,
  "emballage-biodegradable": EmballageBiodegradableIcon,
  "hygiene":                 HygieneIcon,
  "papier":                  PapierIcon,
  "plastique":               PlastiqueIcon,
  "verre-cristal":           VerreCristalIcon,
};

const CAT_COLORS: Record<Categorie, string> = {
  "emballage-alimentaire":   "#1B3266",
  "emballage-biodegradable": "#2d6a4f",
  "hygiene":                 "#1a5c63",
  "papier":                  "#7b4f2a",
  "plastique":               "#3a1d6e",
  "verre-cristal":           "#1a3a5c",
};

const AVANTAGES = [
  { icon: Truck,      titre: "Livraison Maroc",  desc: "Livraison rapide dans toutes les villes" },
  { icon: BadgeCheck, titre: "Qualité garantie", desc: "Produits conformes aux normes alimentaires" },
  { icon: Package,    titre: "Détail & Gros",    desc: "Prix spéciaux à partir de certaines quantités" },
  { icon: Phone,      titre: "Support WhatsApp", desc: "Réponse rapide pour toute commande" },
];

const TEMOIGNAGES = [
  { nom: "Hassan B.", ville: "Casablanca", note: 5, texte: "Très bonne qualité, livraison rapide. J'achète régulièrement les rouleaux cellophane pour mon restaurant." },
  { nom: "Fatima Z.", ville: "Marrakech",  note: 5, texte: "Prix compétitifs et service professionnel. La commande gros est vraiment avantageuse pour mon café." },
  { nom: "Youssef M.", ville: "Fès",       note: 5, texte: "NPTI Packing est mon fournisseur principal. Les boîtes pizza et gobelets sont de très bonne qualité." },
  { nom: "Sara A.",    ville: "Rabat",     note: 4, texte: "Livraison dans tout le Maroc comme promis. Très satisfaite du papier aluminium et du film alimentaire." },
  { nom: "Omar K.",    ville: "Tanger",    note: 5, texte: "Excellente communication via WhatsApp, réponse rapide. Je recommande à tous les professionnels." },
];

export default function HomePage() {
  return (
    <>
      {/* ─── Hero Slider ─────────────────────────────────────── */}
      <HeroSlider />

      {/* ─── Catégories ─────────────────────────────────────── */}
      <section className="bg-white border-b border-gray-100">
        <div className="container-main py-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Nos Catégories</h2>
            <div className="w-12 h-0.5 bg-nauma-600 mx-auto mt-2" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {CATEGORIES_CONFIG.map((cat) => {
              const Icon = CAT_ICONS[cat.slug];
              const bg   = CAT_COLORS[cat.slug];
              const count = PRODUITS_DEMO.filter((p) => p.categorie === cat.slug).length;
              return (
                <div key={cat.slug} className="group relative">
                  <Link
                    href={`/catalogue?cat=${cat.slug}`}
                    className="flex flex-col items-center gap-3 p-5 border border-gray-100 bg-white hover:border-nauma-600 hover:shadow-md transition-all duration-200 text-center"
                  >
                    <div
                      className="w-14 h-14 flex items-center justify-center rounded-full text-white transition-transform group-hover:scale-110 duration-200"
                      style={{ background: bg }}
                    >
                      <Icon />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-800 leading-tight">{cat.label}</p>
                      <p className="text-[10px] text-gray-400 mt-0.5">{cat.labelAr}</p>
                      {count > 0 && (
                        <p className="text-[10px] text-nauma-teal mt-1 font-medium">{count} produits</p>
                      )}
                    </div>
                  </Link>

                  {/* Dropdown sous-catégories */}
                  {cat.sousCats.length > 0 && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-1 z-50 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-150 w-52">
                      <div className="bg-white shadow-xl border border-gray-100 overflow-hidden">
                        <div className="px-4 py-2 border-b border-gray-100" style={{ background: bg }}>
                          <span className="text-xs font-bold text-white">{cat.label}</span>
                        </div>
                        {cat.sousCats.map((sub) => (
                          <Link
                            key={sub.slug}
                            href={`/catalogue?cat=${cat.slug}&sub=${sub.slug}`}
                            className="flex items-center gap-2 px-4 py-2.5 text-xs text-gray-600 hover:bg-gray-50 hover:text-nauma-600 border-b border-gray-50 last:border-0 transition-colors"
                          >
                            <span className="w-1 h-1 rounded-full bg-nauma-teal flex-shrink-0" />
                            {sub.label}
                          </Link>
                        ))}
                        <Link
                          href={`/catalogue?cat=${cat.slug}`}
                          className="flex items-center justify-center px-4 py-2 text-xs font-bold text-nauma-600 hover:bg-nauma-600 hover:text-white transition-colors border-t border-gray-100"
                        >
                          Voir tout →
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Bannières promo ────────────────────────────────── */}
      <section className="bg-gray-50 border-b border-gray-100">
        <div className="container-main py-6">
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { titre: "Emballage alimentaire", desc: "Barquettes, gobelets, films alimentaires", href: "/catalogue?cat=emballage-alimentaire", bg: "#1B3266" },
              { titre: "Emballage biodégradable", desc: "Boîtes pizza, gobelets carton, éco-responsable", href: "/catalogue?cat=emballage-biodegradable", bg: "#2d6a4f" },
              { titre: "Commande en gros", desc: "Prix préférentiels — devis gratuit et rapide", href: "/devis", bg: "#C8A46E" },
            ].map((p) => (
              <Link
                key={p.href}
                href={p.href}
                className="flex items-center gap-4 p-5 text-white hover:opacity-90 transition-opacity"
                style={{ background: p.bg }}
              >
                <div className="flex-1">
                  <h3 className="font-bold text-sm">{p.titre}</h3>
                  <p className="text-white/70 text-xs mt-0.5">{p.desc}</p>
                </div>
                <span className="text-white/60 text-lg font-light">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Nouveautés + Best-Sellers (Firestore) ──────────── */}
      <div className="bg-gray-50">
        <HomeSections />
      </div>

      {/* ─── Avantages ──────────────────────────────────────── */}
      <section className="bg-white border-y border-gray-100">
        <div className="container-main py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {AVANTAGES.map((a) => (
              <div key={a.titre} className="flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 rounded-full bg-nauma-50 flex items-center justify-center text-nauma-600">
                  <a.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-gray-800">{a.titre}</h3>
                  <p className="text-gray-400 text-xs mt-1 leading-relaxed">{a.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Avis clients ───────────────────────────────────── */}
      <section className="bg-gray-50 border-b border-gray-100">
        <div className="container-main py-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Ce que disent nos clients</h2>
            <div className="w-12 h-0.5 bg-nauma-600 mx-auto mt-2" />
            <p className="text-gray-400 text-sm mt-3">Ils nous font confiance pour leur emballage professionnel</p>
          </div>
          <div className="grid md:grid-cols-5 gap-4">
            {TEMOIGNAGES.map((t) => (
              <div key={t.nom} className="bg-white border border-gray-100 p-5 flex flex-col gap-3 hover:shadow-md transition-shadow">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`w-3.5 h-3.5 ${i < t.note ? "fill-amber-400 text-amber-400" : "fill-gray-100 text-gray-100"}`} />
                  ))}
                </div>
                <p className="text-gray-500 text-xs leading-relaxed flex-1 italic">&ldquo;{t.texte}&rdquo;</p>
                <div className="pt-2 border-t border-gray-50">
                  <p className="font-bold text-xs text-gray-800">{t.nom}</p>
                  <p className="text-xs text-gray-400">{t.ville}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA Gros ───────────────────────────────────────── */}
      <section className="bg-nauma-600">
        <div className="container-main py-14 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-3">
            Vous commandez en grande quantité ?
          </h2>
          <p className="text-blue-100 mb-8 max-w-lg mx-auto text-sm">
            Bénéficiez de tarifs préférentiels pour les commandes gros. Devis gratuit et rapide sous 24h.
          </p>
          <Link
            href="/devis"
            className="inline-block bg-white text-nauma-600 font-bold px-10 py-3 hover:bg-nauma-50 transition-colors"
          >
            Demander un devis gratuit
          </Link>
        </div>
      </section>
    </>
  );
}
