"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { getCloudinaryUrl } from "@/lib/cloudinary";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";

interface FormData {
  nom: string;
  entreprise: string;
  telephone: string;
  email: string;
  adresse: string;
  message: string;
}

export default function CommandePage() {
  const { items, totalItems, clear } = useCart();
  const router = useRouter();

  const [form, setForm] = useState<FormData>({
    nom: "", entreprise: "", telephone: "", email: "", adresse: "", message: "",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "212700700585";

  if (items.length === 0) {
    return (
      <div className="container-main py-24 text-center">
        <ShoppingCart className="w-16 h-16 text-gray-200 mx-auto mb-5" />
        <h1 className="text-xl font-bold text-gray-700 mb-2">Votre panier est vide</h1>
        <p className="text-gray-400 text-sm mb-8">Ajoutez des produits avant de passer une demande.</p>
        <Link href="/catalogue" className="inline-flex items-center gap-2 bg-nauma-600 text-white font-bold px-8 py-3 rounded-full hover:bg-nauma-700 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Voir le catalogue
        </Link>
      </div>
    );
  }

  const validate = () => {
    const e: Partial<FormData> = {};
    if (!form.nom.trim())       e.nom       = "Champ obligatoire";
    if (!form.telephone.trim()) e.telephone = "Champ obligatoire";
    if (!form.email.trim())     e.email     = "Champ obligatoire";
    if (!form.adresse.trim())   e.adresse   = "Champ obligatoire";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    const produits = items.map((item) => {
      const varStr  = item.variante ? ` (${item.variante})` : "";
      const colisStr = item.colis ? ` — ${item.quantite} colis (${item.quantite * item.colis} unités)` : ` — qté : ${item.quantite}`;
      return `• ${item.produitNom}${varStr}${colisStr}`;
    }).join("\n");

    const msg = [
      `Bonjour NPIT Packing,`,
      ``,
      `Je souhaite passer une demande de devis :`,
      ``,
      `👤 *Informations client*`,
      `Nom : ${form.nom}`,
      form.entreprise ? `Entreprise : ${form.entreprise}` : null,
      `Téléphone : ${form.telephone}`,
      `Email : ${form.email}`,
      `Adresse : ${form.adresse}`,
      form.message ? `Message : ${form.message}` : null,
      ``,
      `🛒 *Produits demandés*`,
      produits,
      ``,
      `Merci de me contacter pour confirmer les prix et la livraison.`,
    ].filter((l) => l !== null).join("\n");

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`;
    clear();
    window.open(url, "_blank");
    router.push("/");
  };

  const field = (key: keyof FormData) => ({
    value: form[key],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((f) => ({ ...f, [key]: e.target.value }));
      if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
    },
  });

  return (
    <div className="container-main py-10 pb-28 md:pb-10">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link href="/panier" className="hover:text-nauma-600 flex items-center gap-1 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Retour au panier
        </Link>
        <span>/</span>
        <span className="text-gray-700 font-medium">Détails de la demande</span>
      </nav>

      <div className="grid lg:grid-cols-5 gap-10 items-start">

        {/* ── Formulaire ── */}
        <div className="lg:col-span-3 space-y-5">
          <h1 className="text-2xl font-bold text-gray-800">Détails de facturation</h1>

          {/* Nom */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Nom Complet <span className="text-red-500">*</span>
            </label>
            <input
              {...field("nom")}
              type="text"
              placeholder="Votre nom et prénom"
              className={`w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-nauma-teal transition-colors ${errors.nom ? "border-red-400 bg-red-50" : "border-gray-200"}`}
            />
            {errors.nom && <p className="text-xs text-red-500 mt-1">{errors.nom}</p>}
          </div>

          {/* Entreprise */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Entreprise <span className="text-gray-400 text-xs">(facultatif)</span>
            </label>
            <input
              {...field("entreprise")}
              type="text"
              placeholder="Nom de votre entreprise"
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-nauma-teal transition-colors"
            />
          </div>

          {/* Téléphone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Téléphone <span className="text-red-500">*</span>
            </label>
            <input
              {...field("telephone")}
              type="tel"
              placeholder="06 XX XX XX XX"
              className={`w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-nauma-teal transition-colors ${errors.telephone ? "border-red-400 bg-red-50" : "border-gray-200"}`}
            />
            {errors.telephone && <p className="text-xs text-red-500 mt-1">{errors.telephone}</p>}
          </div>

          {/* E-mail */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              E-mail <span className="text-red-500">*</span>
            </label>
            <input
              {...field("email")}
              type="email"
              placeholder="votre@email.com"
              className={`w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-nauma-teal transition-colors ${errors.email ? "border-red-400 bg-red-50" : "border-gray-200"}`}
            />
            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
          </div>

          {/* Adresse */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Adresse <span className="text-red-500">*</span>
            </label>
            <input
              {...field("adresse")}
              type="text"
              placeholder="Ville, quartier, rue…"
              className={`w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-nauma-teal transition-colors ${errors.adresse ? "border-red-400 bg-red-50" : "border-gray-200"}`}
            />
            {errors.adresse && <p className="text-xs text-red-500 mt-1">{errors.adresse}</p>}
          </div>

          {/* Message optionnel */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Message <span className="text-gray-400 text-xs">(facultatif)</span>
            </label>
            <textarea
              {...field("message")}
              rows={3}
              placeholder="Précisions sur votre commande, délai souhaité…"
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-nauma-teal transition-colors resize-none"
            />
          </div>
        </div>

        {/* ── Résumé commande ── */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-gray-100 p-6 sticky top-32">
            <h2 className="text-base font-bold text-gray-800 mb-4 pb-3 border-b border-gray-100">
              Votre commande
            </h2>

            <div className="space-y-4 mb-6">
              {items.map((item) => {
                const imgSrc = item.varianteImage
                  ? getCloudinaryUrl(item.varianteImage, 80)
                  : item.produitImage
                    ? getCloudinaryUrl(item.produitImage, 80)
                    : "/placeholder-product.svg";

                return (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="relative flex-shrink-0 w-14 h-14 bg-gray-50 border border-gray-100 overflow-hidden rounded">
                      <Image src={imgSrc} alt={item.produitNom} fill className="object-contain p-1" sizes="56px" />
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-nauma-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                        {item.quantite}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-800 line-clamp-2 leading-tight">{item.produitNom}</p>
                      {item.variante && (
                        <p className="text-xs text-nauma-teal mt-0.5">{item.variante}</p>
                      )}
                      {item.colis && (
                        <p className="text-xs text-gray-400">{item.quantite} colis · {item.quantite * item.colis} unités</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="border-t border-gray-100 pt-4 mb-5">
              <p className="text-xs text-gray-400 leading-relaxed">
                Les prix seront confirmés par notre équipe après réception de votre demande.
              </p>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-nauma-600 hover:bg-nauma-700 text-white font-bold py-4 rounded-full uppercase tracking-wider text-sm transition-colors"
            >
              Valider votre demande de devis
            </button>
            <p className="text-center text-xs text-gray-400 mt-3">Vous serez redirigé vers WhatsApp</p>
          </div>
        </div>

      </div>
    </div>
  );
}
