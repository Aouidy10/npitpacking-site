import { Phone, Mail, MapPin, MessageCircle, Clock } from "lucide-react";

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "212600000000";

export default function ContactPage() {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Bonjour, je souhaite avoir des informations sur vos produits.")}`;

  return (
    <div className="container-main py-14">
      <h1 className="section-title mb-2">Contact</h1>
      <p className="text-gray-500 mb-10">Contactez-nous par WhatsApp, téléphone ou email.</p>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Coordonnées */}
        <div className="space-y-5">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-4 bg-green-50 border border-green-200 rounded-2xl p-5 hover:bg-green-100 transition-colors group"
          >
            <div className="bg-green-500 text-white p-3 rounded-xl">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-green-800 group-hover:underline">WhatsApp (recommandé)</p>
              <p className="text-green-700 text-sm mt-0.5">+212 600-000000</p>
              <p className="text-green-600 text-xs mt-1">Réponse rapide — cliquer pour ouvrir WhatsApp</p>
            </div>
          </a>

          <div className="flex items-start gap-4 bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
            <div className="bg-nauma-teal-50 text-nauma-600 p-3 rounded-xl">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-gray-800">Téléphone</p>
              <p className="text-gray-600 text-sm mt-0.5">+212 600-000000</p>
            </div>
          </div>

          <div className="flex items-start gap-4 bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
            <div className="bg-nauma-teal-50 text-nauma-600 p-3 rounded-xl">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-gray-800">Email</p>
              <p className="text-gray-600 text-sm mt-0.5">contact@placeholder.ma</p>
            </div>
          </div>

          <div className="flex items-start gap-4 bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
            <div className="bg-nauma-teal-50 text-nauma-600 p-3 rounded-xl">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-gray-800">Zone de livraison</p>
              <p className="text-gray-600 text-sm mt-0.5">Tout le Maroc 🇲🇦</p>
            </div>
          </div>

          <div className="flex items-start gap-4 bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
            <div className="bg-nauma-teal-50 text-nauma-600 p-3 rounded-xl">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-gray-800">Horaires</p>
              <p className="text-gray-600 text-sm mt-0.5">Lun – Sam : 8h00 – 20h00</p>
            </div>
          </div>
        </div>

        {/* Info gros */}
        <div className="bg-gradient-to-br from-nauma-600 to-nauma-800 rounded-3xl p-8 text-white flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold mb-3">Commande en gros ?</h2>
            <p className="text-emerald-100 text-sm leading-relaxed mb-6">
              Pour les commandes importantes, remplissez notre formulaire de devis.
              Vous recevrez une réponse avec des prix préférentiels dans les meilleurs délais.
            </p>
            <ul className="space-y-2 text-sm text-emerald-100">
              {["Devis gratuit et sans engagement", "Prix négociables selon volume", "Livraison sécurisée", "Facture disponible"].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-emerald-300 rounded-full" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <a
            href="/devis"
            className="mt-8 bg-white text-emerald-700 hover:bg-emerald-50 font-semibold px-6 py-3 rounded-xl transition-colors text-center text-sm block"
          >
            Formulaire de devis →
          </a>
        </div>
      </div>
    </div>
  );
}
