import { BadgeCheck, Users, MapPin, Clock } from "lucide-react";

const STATS = [
  { icon: Users, valeur: "500+", label: "Clients satisfaits" },
  { icon: BadgeCheck, valeur: "4", label: "Catégories produits" },
  { icon: MapPin, valeur: "Maroc", label: "Livraison nationale" },
  { icon: Clock, valeur: "Rapide", label: "Réponse WhatsApp" },
];

export default function AProposPage() {
  return (
    <div className="container-main py-14">
      {/* Header */}
      <div className="max-w-2xl mb-12">
        <h1 className="section-title mb-4">À propos de nous</h1>
        <p className="text-gray-600 leading-relaxed">
          Nous sommes spécialistes en papier et emballage au Maroc depuis plusieurs années.
          Notre mission : fournir des produits de qualité à des prix accessibles, aussi bien pour les particuliers
          que pour les professionnels — commerçants, restaurateurs, pâtissiers, et grossistes.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-14">
        {STATS.map((s) => (
          <div key={s.label} className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100">
            <div className="flex justify-center mb-3">
              <div className="bg-nauma-teal-50 text-nauma-600 p-3 rounded-xl">
                <s.icon className="w-5 h-5" />
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-800">{s.valeur}</div>
            <div className="text-sm text-gray-500 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Notre histoire */}
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-4">Notre engagement qualité</h2>
          <div className="space-y-3 text-gray-600 text-sm leading-relaxed">
            <p>
              Tous nos produits sont sélectionnés avec soin pour garantir une qualité optimale.
              Notre cellophane, nos serviettes et notre papier cuisson sont conformes aux normes alimentaires marocaines et européennes.
            </p>
            <p>
              Nous travaillons avec des fournisseurs fiables pour vous offrir des prix compétitifs,
              que vous commandiez en petite quantité ou en gros.
            </p>
            <p>
              Notre équipe est disponible via WhatsApp pour répondre à toutes vos questions
              et traiter vos commandes rapidement.
            </p>
          </div>
        </div>
        <div className="bg-nauma-50 rounded-3xl p-8 space-y-4">
          <h3 className="font-semibold text-nauma-700 mb-2">Pourquoi nous choisir ?</h3>
          {[
            "Prix détail et gros transparents",
            "Livraison dans tout le Maroc",
            "Produits conformes normes alimentaires",
            "Commande facile via WhatsApp",
            "Devis gros rapide et gratuit",
            "Service client réactif",
          ].map((item) => (
            <div key={item} className="flex items-center gap-3 text-sm text-nauma-600">
              <BadgeCheck className="w-4 h-4 flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
