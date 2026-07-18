import Link from "next/link";
import Image from "next/image";
import { Truck, BadgeCheck, Package, Phone, Star } from "lucide-react";
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

const TEMOIGNAGES = [
  { nom: "Hassan B.", ville: "Casablanca", note: 5, texte: "Très bonne qualité, livraison rapide. J'achète régulièrement les rouleaux cellophane et le papier cuisson pour mon restaurant." },
  { nom: "Fatima Z.", ville: "Marrakech", note: 5, texte: "Prix compétitifs et service professionnel. La commande gros est vraiment avantageuse. Mon café est bien approvisionné." },
  { nom: "Youssef M.", ville: "Fès", note: 5, texte: "NPTI Packing est mon fournisseur principal depuis un an. Les boîtes pizza et gobelets sont de très bonne qualité." },
  { nom: "Sara A.", ville: "Rabat", note: 4, texte: "Livraison dans tout le Maroc comme promis. Très satisfaite du papier aluminium et du film alimentaire pour ma pâtisserie." },
  { nom: "Omar K.", ville: "Tanger", note: 5, texte: "Excellente communication via WhatsApp, réponse rapide. Je recommande à tous les professionnels de la restauration." },
];

const AVANTAGES = [
  { icon: Truck,       titre: "Livraison Maroc",  desc: "Livraison rapide dans toutes les villes du Maroc" },
  { icon: BadgeCheck,  titre: "Qualité garantie", desc: "Produits certifiés conformes aux normes alimentaires" },
  { icon: Package,     titre: "Détail & Gros",    desc: "Prix spéciaux à partir de certaines quantités" },
  { icon: Phone,       titre: "Support WhatsApp", desc: "Réponse rapide via WhatsApp pour toute commande" },
];

const PROMOS = [
  {
    titre: "Des emballages pour vos besoins",
    desc: "Barquettes, gobelets, films — solutions professionnelles",
    bg: "bg-nauma-teal",
    href: "/catalogue?cat=emballage-alimentaire",
  },
  {
    titre: "Emballage biodégradable",
    desc: "Boîtes pizza, gobelets carton, solutions éco-responsables",
    bg: "bg-amber-600",
    href: "/catalogue?cat=emballage-biodegradable",
  },
  {
    titre: "Une qualité digne de confiance",
    desc: "Produits testés et approuvés pour les professionnels",
    bg: "bg-nauma-700",
    href: "/devis",
  },
];


export default function HomePage() {
  return (
    <>
      {/* ─── Hero ──────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-nauma-600 to-nauma-900 text-white">
        <div className="container-main pt-14 pb-6 md:pt-20 md:pb-8">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">

            {/* Texte */}
            <div className="text-center md:text-left flex flex-col gap-5 order-2 md:order-1">
              <span className="bg-white/20 text-white text-sm font-medium px-4 py-1.5 rounded-full w-fit mx-auto md:mx-0">
                🇲🇦 Livraison dans tout le Maroc
              </span>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Leader de
                <br />
                <span className="text-nauma-teal italic">l&apos;emballage</span>
                <br />
                <span className="text-xl md:text-2xl font-semibold tracking-widest uppercase opacity-80 not-italic">
                  Professionnel au Maroc
                </span>
              </h1>
              <p className="text-blue-100 text-base max-w-md leading-relaxed mx-auto md:mx-0">
                Papier hygiène, film alimentaire, aluminium, barquettes,
                gobelets, boîtes pizza — vente détail et gros.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                <Link href="/catalogue" className="btn-primary bg-white text-nauma-600 hover:bg-nauma-50">
                  Voir le catalogue
                </Link>
                <Link href="/devis" className="btn-outline border-white text-white hover:bg-white hover:text-nauma-600">
                  Commander en gros
                </Link>
              </div>
            </div>

            {/* Logo */}
            <div className="flex justify-center order-1 md:order-2">
              <div className="relative">
                <div className="w-60 h-60 md:w-80 md:h-80 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20">
                  <Image
                    src="/logo-npit.png"
                    alt="NPITPACKING"
                    width={220}
                    height={220}
                    priority
                    className="object-contain drop-shadow-2xl"
                  />
                </div>
                {/* Badges flottants */}
                <span className="absolute -top-3 -right-2 md:-right-6 bg-nauma-teal text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg whitespace-nowrap">
                  Détail &amp; Gros
                </span>
                <span className="absolute -bottom-3 -left-2 md:-left-6 bg-nauma-gold text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg whitespace-nowrap">
                  🚚 Tout le Maroc
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* Vague séparatrice */}
        <svg
          viewBox="0 0 1440 80"
          xmlns="http://www.w3.org/2000/svg"
          style={{ display: "block", width: "100%" }}
        >
          <path d="M0,0 Q720,80 1440,0 L1440,80 L0,80 Z" fill="white" />
        </svg>
      </section>

      {/* ─── Bannières promo ────────────────────────────────────── */}
      <section className="container-main pb-8 -mt-2">
        <div className="grid md:grid-cols-3 gap-4">
          {PROMOS.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              className={`${p.bg} text-white rounded-2xl p-6 hover:brightness-110 transition-all group`}
            >
              <h3 className="font-bold text-sm md:text-base mb-1.5 leading-snug">{p.titre}</h3>
              <p className="text-white/80 text-xs leading-relaxed mb-3">{p.desc}</p>
              <span className="text-xs font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                Achetez maintenant →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── Catégories ─────────────────────────────────────────── */}
      <section className="container-main py-12">
        <div className="text-center mb-10">
          <h2 className="section-title">Nos Catégories</h2>
          <p className="text-gray-500 text-sm mt-2">
            Gamme complète de produits d&apos;emballage professionnel
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {CATEGORIES_CONFIG.map((cat) => {
            const Icon = CAT_ICONS[cat.slug];
            const count = PRODUITS_DEMO.filter((p) => p.categorie === cat.slug).length;
            return (
              /* Wrapper — group pour déclencher le hover sur la carte ET le dropdown */
              <div key={cat.slug} className="group relative">

                {/* Carte catégorie principale */}
                <Link
                  href={`/catalogue?cat=${cat.slug}`}
                  className="flex flex-col items-center text-center p-5 bg-white rounded-2xl border-2 border-gray-100 group-hover:border-nauma-teal group-hover:shadow-lg transition-all duration-200 block"
                >
                  <div className="w-16 h-16 bg-nauma-50 group-hover:bg-nauma-teal-50 rounded-xl flex items-center justify-center mb-3 p-3 text-nauma-600 group-hover:text-nauma-teal transition-colors">
                    <Icon />
                  </div>
                  <span className="font-bold text-xs text-gray-800 leading-tight">{cat.label}</span>
                  <span className="text-xs text-gray-400 mt-0.5">{cat.labelAr}</span>
                  {count > 0 && (
                    <span className="text-xs text-nauma-teal mt-1.5 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      {count} produits
                    </span>
                  )}
                </Link>

                {/* Dropdown sous-catégories — visible au hover */}
                {cat.sousCats.length > 0 && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-150 w-52">
                    <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
                      {/* En-tête */}
                      <div className="px-4 py-2.5 bg-nauma-50 border-b border-gray-100 flex items-center justify-between">
                        <span className="text-xs font-bold text-nauma-600">{cat.label}</span>
                        <span className="text-xs text-gray-400">{cat.labelAr}</span>
                      </div>
                      {/* Liens sous-catégories */}
                      {cat.sousCats.map((sub) => (
                        <Link
                          key={sub.slug}
                          href={`/catalogue?cat=${cat.slug}&sub=${sub.slug}`}
                          className="flex items-center gap-2.5 px-4 py-2.5 text-xs text-gray-600 hover:bg-nauma-50 hover:text-nauma-600 transition-colors border-b border-gray-50 last:border-0"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-nauma-teal flex-shrink-0" />
                          {sub.label}
                        </Link>
                      ))}
                      {/* Voir tout */}
                      <Link
                        href={`/catalogue?cat=${cat.slug}`}
                        className="flex items-center justify-center gap-1 px-4 py-2.5 text-xs font-semibold text-nauma-teal bg-nauma-teal-50 hover:bg-nauma-teal hover:text-white transition-colors"
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
      </section>

      {/* ─── Nouveautés + Best-Sellers (depuis Firestore) ──────── */}
      <HomeSections />


      {/* ─── Avis clients ───────────────────────────────────────── */}
      <section className="bg-nauma-50 border-y border-nauma-100">
        <div className="container-main py-14">
          <div className="text-center mb-10">
            <h2 className="section-title">Ce que disent nos clients</h2>
            <p className="text-gray-500 text-sm mt-2">Ils nous font confiance pour leur emballage professionnel</p>
          </div>
          <div className="grid md:grid-cols-5 gap-4">
            {TEMOIGNAGES.map((t) => (
              <div key={t.nom} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col gap-3">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${i < t.note ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"}`}
                    />
                  ))}
                </div>
                <p className="text-gray-600 text-xs leading-relaxed flex-1">&ldquo;{t.texte}&rdquo;</p>
                <div className="pt-2 border-t border-gray-50">
                  <p className="font-semibold text-xs text-gray-800">{t.nom}</p>
                  <p className="text-xs text-gray-400">{t.ville}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Avantages ──────────────────────────────────────────── */}
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

      {/* ─── CTA Gros ───────────────────────────────────────────── */}
      <section className="container-main py-14">
        <div className="bg-gradient-to-r from-nauma-600 to-nauma-800 rounded-3xl p-10 text-white text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Vous commandez en grande quantité ?
          </h2>
          <p className="text-blue-100 mb-6 max-w-lg mx-auto">
            Bénéficiez de tarifs préférentiels pour les commandes gros. Devis gratuit et rapide.
          </p>
          <Link
            href="/devis"
            className="bg-white text-nauma-600 hover:bg-nauma-50 font-semibold px-8 py-3 rounded-xl transition-colors inline-block"
          >
            Demander un devis gratuit
          </Link>
        </div>
      </section>
    </>
  );
}
