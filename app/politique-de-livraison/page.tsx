import { Metadata } from "next";
import { Truck, Clock, MapPin, Phone, Package, AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Politique de livraison",
  description:
    "Livraison d'emballages dans tout le Maroc — délais, zones couvertes, frais et conditions. NPIT Packing livre à Casablanca, Rabat, Marrakech, Fès, Tanger et toutes les villes du Maroc.",
  alternates: { canonical: "https://npitpacking.com/politique-de-livraison" },
};

const ZONES = [
  { ville: "Casablanca",  delai: "24 – 48h" },
  { ville: "Rabat",       delai: "24 – 48h" },
  { ville: "Marrakech",   delai: "24 – 72h" },
  { ville: "Fès",         delai: "24 – 72h" },
  { ville: "Tanger",      delai: "48 – 72h" },
  { ville: "Agadir",      delai: "48 – 72h" },
  { ville: "Meknès",      delai: "24 – 72h" },
  { ville: "Oujda",       delai: "48 – 96h" },
  { ville: "Kénitra",     delai: "24 – 48h" },
  { ville: "Autres villes",delai: "2 – 5 jours ouvrés" },
];

export default function PolitiqueLivraisonPage() {
  return (
    <div className="bg-white">

      {/* ── Hero ── */}
      <section className="bg-nauma-600 text-white">
        <div className="container-main py-14 text-center">
          <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-5">
            <Truck className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-3">Politique de livraison</h1>
          <p className="text-blue-100 text-sm max-w-md mx-auto">
            Tout ce que vous devez savoir sur l&apos;expédition et la réception de vos commandes.
          </p>
        </div>
      </section>

      <div className="container-main py-14 space-y-14">

        {/* ── Zones de livraison ── */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 bg-nauma-50 rounded-xl flex items-center justify-center flex-shrink-0">
              <MapPin className="w-4 h-4 text-nauma-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-800">Zones de livraison</h2>
          </div>
          <p className="text-sm text-gray-500 mb-6 leading-relaxed">
            Nous livrons dans <strong className="text-gray-700">toutes les villes du Maroc</strong> via des transporteurs partenaires de confiance (Amana, Maersk, transporteurs locaux). Retrait en magasin également disponible.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {ZONES.map((z) => (
              <div key={z.ville} className="flex items-center justify-between bg-gray-50 border border-gray-100 rounded-xl px-4 py-3">
                <span className="text-sm font-medium text-gray-700">{z.ville}</span>
                <span className="text-xs text-nauma-teal font-semibold bg-teal-50 px-2.5 py-1 rounded-full">{z.delai}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Délais ── */}
        <section className="border-t border-gray-100 pt-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 bg-nauma-50 rounded-xl flex items-center justify-center flex-shrink-0">
              <Clock className="w-4 h-4 text-nauma-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-800">Délais de traitement</h2>
          </div>
          <div className="space-y-4">
            {[
              { titre: "Traitement de la commande", desc: "Votre commande est traitée dans les 24h suivant la validation de votre devis et la confirmation de paiement (jours ouvrés, lun–sam)." },
              { titre: "Expédition", desc: "L'expédition a lieu le jour même ou le lendemain du traitement. Vous recevez le numéro de suivi par WhatsApp ou email." },
              { titre: "Délai total estimé", desc: "Comptez en général 1 à 5 jours ouvrés selon votre ville, à partir de la confirmation de commande." },
              { titre: "Commandes urgentes", desc: "Pour toute livraison urgente, contactez-nous directement par WhatsApp avant de passer commande afin que nous vérifions les disponibilités." },
            ].map((item) => (
              <div key={item.titre} className="flex gap-4">
                <div className="w-1.5 h-1.5 rounded-full bg-nauma-600 flex-shrink-0 mt-2" />
                <div>
                  <p className="font-semibold text-gray-800 text-sm mb-0.5">{item.titre}</p>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Frais ── */}
        <section className="border-t border-gray-100 pt-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 bg-nauma-50 rounded-xl flex items-center justify-center flex-shrink-0">
              <Package className="w-4 h-4 text-nauma-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-800">Frais de livraison</h2>
          </div>
          <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 space-y-3 text-sm text-gray-600 leading-relaxed">
            <p>Les frais de livraison sont calculés en fonction du <strong className="text-gray-800">poids total</strong> et de la <strong className="text-gray-800">destination</strong> de votre commande.</p>
            <p>Ils vous seront communiqués au moment de la validation de votre devis, avant tout engagement de paiement.</p>
            <p>Pour les commandes de <strong className="text-gray-800">grande quantité</strong> (gros), des conditions tarifaires spéciales peuvent s&apos;appliquer — contactez-nous pour un devis personnalisé.</p>
          </div>
        </section>

        {/* ── Réception & réclamations ── */}
        <section className="border-t border-gray-100 pt-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 bg-amber-50 rounded-xl flex items-center justify-center flex-shrink-0">
              <AlertCircle className="w-4 h-4 text-amber-500" />
            </div>
            <h2 className="text-xl font-bold text-gray-800">Réception & réclamations</h2>
          </div>
          <div className="space-y-4 text-sm text-gray-500 leading-relaxed">
            <p>À la réception de votre colis, nous vous recommandons de <strong className="text-gray-700">vérifier l&apos;état de l&apos;emballage</strong> en présence du livreur. En cas de dommage visible, signalez-le immédiatement sur le bon de livraison.</p>
            <p>Pour toute réclamation (produit manquant, endommagé ou non conforme), contactez-nous dans les <strong className="text-gray-700">48h suivant la réception</strong> par WhatsApp avec photos à l&apos;appui.</p>
            <p>Nous nous engageons à traiter chaque réclamation dans les meilleurs délais et à trouver une solution satisfaisante (remplacement, avoir ou remboursement selon les cas).</p>
          </div>
        </section>

        {/* ── CTA contact ── */}
        <section className="border-t border-gray-100 pt-12">
          <div className="bg-nauma-600 rounded-2xl p-8 text-white text-center">
            <Phone className="w-8 h-8 mx-auto mb-4 opacity-80" />
            <h3 className="font-bold text-lg mb-2">Une question sur votre livraison ?</h3>
            <p className="text-blue-100 text-sm mb-5">Notre équipe est disponible du lundi au samedi, de 9h à 18h.</p>
            <a
              href={`https://wa.me/212700700585?text=${encodeURIComponent("Bonjour NPIT Packing 👋, j'ai une question concernant la livraison.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-nauma-600 font-bold px-8 py-3 rounded-full text-sm hover:bg-nauma-50 transition-colors"
            >
              Nous contacter sur WhatsApp
            </a>
          </div>
        </section>

      </div>
    </div>
  );
}
