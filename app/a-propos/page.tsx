import { Metadata } from "next";
import Link from "next/link";
import { Package, MapPin, Phone, Mail, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "À propos de NPIT Packing",
  description:
    "NPIT Packing est le spécialiste de la vente d'emballages professionnels au Maroc : cellophane, serviettes, sacs kraft, boîtes alimentaires. Découvrez notre histoire et nos valeurs.",
  alternates: { canonical: "https://npitpacking.com/a-propos" },
  openGraph: {
    title: "À propos de NPIT Packing — Spécialiste emballage au Maroc",
    description: "Découvrez NPIT Packing, votre fournisseur d'emballages professionnels au Maroc. Détail & gros, livraison nationale.",
    url: "https://npitpacking.com/a-propos",
  },
};

const VALEURS = [
  { titre: "Qualité",            desc: "Produits conformes aux normes alimentaires et d'hygiène en vigueur au Maroc." },
  { titre: "Proximité",          desc: "Équipe disponible par WhatsApp pour répondre rapidement à chaque demande." },
  { titre: "Large gamme",        desc: "Des milliers de références : emballage alimentaire, biodégradable, papier, plastique, verre." },
  { titre: "Prix compétitifs",   desc: "Tarifs adaptés aussi bien aux petits commerces qu'aux grandes entreprises." },
];

const CATEGORIES = [
  "Emballage alimentaire",
  "Emballage biodégradable",
  "Hygiène & Papier",
  "Plastique",
  "Verre & Cristal",
  "Papier d'emballage",
];

export default function AProposPage() {
  return (
    <div className="bg-white">

      {/* ── Hero ── */}
      <section className="bg-nauma-600 text-white">
        <div className="container-main py-16 text-center">
          <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-5">
            <Package className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-4">À propos de NPIT Packing</h1>
          <p className="text-blue-100 max-w-xl mx-auto text-sm leading-relaxed">
            Division de NPIT, marque N-NOUMA — Votre partenaire de confiance pour l&apos;emballage professionnel au Maroc.
          </p>
        </div>
      </section>

      {/* ── Qui sommes-nous ── */}
      <section className="container-main py-14">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs font-bold text-nauma-teal uppercase tracking-widest mb-3">Notre histoire</p>
            <h2 className="text-2xl font-bold text-gray-800 mb-5 leading-snug">
              L&apos;emballage professionnel, accessible à tous les commerces du Maroc
            </h2>
            <div className="space-y-4 text-sm text-gray-500 leading-relaxed">
              <p>
                NPITPACKING est la division emballage du groupe NPIT, opérant sous la marque <strong className="text-gray-700">N-NOUMA</strong>. Nous proposons une gamme complète d&apos;emballages professionnels destinés aux restaurants, cafés, pâtisseries, épiceries et toute entreprise ayant besoin de solutions d&apos;emballage fiables.
              </p>
              <p>
                Notre mission est simple : fournir des emballages de qualité, à des prix compétitifs, avec un service rapide et personnalisé via WhatsApp — disponible pour la vente au détail comme en gros.
              </p>
              <p>
                Nous livrons dans <strong className="text-gray-700">toutes les villes du Maroc</strong> et accompagnons nos clients avec des conseils adaptés à leurs besoins spécifiques.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { val: "6",     label: "Catégories de produits" },
              { val: "100+",  label: "Références disponibles" },
              { val: "Maroc", label: "Livraison nationale" },
              { val: "7j/7",  label: "Support WhatsApp" },
            ].map((s) => (
              <div key={s.label} className="bg-gray-50 border border-gray-100 rounded-2xl p-6 text-center">
                <p className="text-3xl font-extrabold text-nauma-600 mb-1">{s.val}</p>
                <p className="text-xs text-gray-500">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Nos valeurs ── */}
      <section className="bg-gray-50 border-y border-gray-100">
        <div className="container-main py-14">
          <div className="text-center mb-10">
            <p className="text-xs font-bold text-nauma-teal uppercase tracking-widest mb-2">Ce qui nous distingue</p>
            <h2 className="text-2xl font-bold text-gray-800">Nos valeurs</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {VALEURS.map((v) => (
              <div key={v.titre} className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-md transition-shadow">
                <div className="w-8 h-8 bg-nauma-50 rounded-lg flex items-center justify-center mb-4">
                  <CheckCircle className="w-4 h-4 text-nauma-600" />
                </div>
                <h3 className="font-bold text-gray-800 mb-2">{v.titre}</h3>
                <p className="text-gray-400 text-xs leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Catégories ── */}
      <section className="container-main py-14">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-gray-800">Nos catégories de produits</h2>
          <div className="w-12 h-0.5 bg-nauma-600 mx-auto mt-2" />
        </div>
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {CATEGORIES.map((c) => (
            <span key={c} className="border border-gray-200 text-gray-600 text-sm px-5 py-2 rounded-full">
              {c}
            </span>
          ))}
        </div>
        <div className="text-center">
          <Link href="/catalogue" className="inline-flex items-center gap-2 bg-nauma-600 hover:bg-nauma-700 text-white font-bold px-8 py-3 rounded-full transition-colors text-sm">
            Voir tout le catalogue →
          </Link>
        </div>
      </section>

      {/* ── Contact rapide ── */}
      <section className="bg-nauma-600 text-white">
        <div className="container-main py-12">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            {[
              { icon: Phone,   titre: "WhatsApp",  desc: "Réponse rapide 7j/7" },
              { icon: Mail,    titre: "Email",      desc: "contact@npitpacking.com" },
              { icon: MapPin,  titre: "Maroc",      desc: "Livraison nationale" },
            ].map((c) => (
              <div key={c.titre} className="flex flex-col items-center gap-3">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                  <c.icon className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-sm">{c.titre}</p>
                  <p className="text-blue-100 text-xs mt-0.5">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
