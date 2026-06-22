"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle, ChevronRight, Package } from "lucide-react";
import { Produit } from "@/types";
import { getCloudinaryUrl } from "@/lib/cloudinary";
import clsx from "clsx";

export default function ProduitDetail({ produit }: { produit: Produit }) {
  const [mode, setMode] = useState<"detail" | "gros">("detail");
  const [quantite, setQuantite] = useState(1);
  const [imgIdx, setImgIdx] = useState(0);

  const prix = mode === "gros" ? produit.prixGros : produit.prixDetail;
  const total = prix * quantite;
  const remise = Math.round((1 - produit.prixGros / produit.prixDetail) * 100);

  const imageUrl = produit.images[imgIdx]
    ? getCloudinaryUrl(produit.images[imgIdx], 800)
    : "/placeholder-product.svg";

  const whatsappMsg = `Bonjour, je voudrais commander :\n- Produit : ${produit.nom}\n- Mode : ${mode === "gros" ? "Gros" : "Détail"}\n- Quantité : ${quantite} ${produit.unite}(s)\n- Total estimé : ${total.toFixed(2)} MAD`;
  const whatsappUrl = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "212600000000"}?text=${encodeURIComponent(whatsappMsg)}`;

  return (
    <div className="container-main py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-sm text-gray-400 mb-8">
        <Link href="/" className="hover:text-nauma-600">Accueil</Link>
        <ChevronRight className="w-3 h-3" />
        <Link href="/catalogue" className="hover:text-nauma-600">Catalogue</Link>
        <ChevronRight className="w-3 h-3" />
        <Link href={`/catalogue?cat=${produit.categorie}`} className="hover:text-nauma-600 capitalize">
          {produit.categorie.replace("-", " ")}
        </Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-gray-700">{produit.nom}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Images */}
        <div>
          <div className="relative h-80 md:h-96 bg-gray-100 rounded-2xl overflow-hidden">
            <Image src={imageUrl} alt={produit.nom} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
          </div>
          {produit.images.length > 1 && (
            <div className="flex gap-2 mt-3">
              {produit.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setImgIdx(i)}
                  className={clsx("relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all", imgIdx === i ? "border-nauma-teal" : "border-gray-200")}
                >
                  <Image src={getCloudinaryUrl(img, 100)} alt="" fill className="object-cover" sizes="64px" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Infos produit */}
        <div className="flex flex-col gap-5">
          <div>
            <span className="bg-nauma-teal-50 text-nauma-teal text-xs font-medium px-2 py-1 rounded-full capitalize">
              {produit.categorie.replace("-", " ")}
            </span>
            <h1 className="text-2xl font-bold text-gray-800 mt-2">{produit.nom}</h1>
            <p className="text-gray-400 text-sm">{produit.nomAr}</p>
          </div>

          <p className="text-gray-600 text-sm leading-relaxed">{produit.description}</p>

          {/* Toggle détail / gros */}
          <div>
            <p className="text-xs text-gray-500 mb-2 font-medium uppercase tracking-wide">Mode de commande</p>
            <div className="flex bg-gray-100 rounded-xl p-1 text-sm w-fit">
              <button
                onClick={() => setMode("detail")}
                className={clsx("px-5 py-2 rounded-lg font-medium transition-all", mode === "detail" ? "bg-white text-nauma-600 shadow-sm" : "text-gray-500")}
              >
                Détail
              </button>
              <button
                onClick={() => setMode("gros")}
                className={clsx("px-5 py-2 rounded-lg font-medium transition-all", mode === "gros" ? "bg-white text-nauma-600 shadow-sm" : "text-gray-500")}
              >
                Gros (min {produit.seuilGros} {produit.unite}s)
              </button>
            </div>
          </div>

          {/* Prix */}
          <div className="bg-gray-50 rounded-2xl p-5">
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold text-nauma-600">{prix.toFixed(2)}</span>
              <span className="text-gray-400 pb-1">MAD / {produit.unite}</span>
            </div>
            {mode === "gros" && (
              <p className="text-sm font-medium mt-1" style={{ color: "#C8A46E" }}>Économisez {remise}% par rapport au prix détail</p>
            )}
            {mode === "detail" && (
              <p className="text-xs text-gray-400 mt-1">
                Prix gros disponible à partir de {produit.seuilGros} {produit.unite}s ({produit.prixGros.toFixed(2)} MAD/{produit.unite})
              </p>
            )}
          </div>

          {/* Quantité */}
          <div>
            <p className="text-xs text-gray-500 mb-2 font-medium uppercase tracking-wide">Quantité</p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantite(Math.max(1, quantite - 1))}
                className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:border-nauma-teal transition-colors"
              >
                −
              </button>
              <span className="w-12 text-center font-semibold">{quantite}</span>
              <button
                onClick={() => setQuantite(quantite + 1)}
                className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:border-nauma-teal transition-colors"
              >
                +
              </button>
              <span className="text-sm text-gray-400">{produit.unite}(s)</span>
            </div>
          </div>

          {/* Total + CTA */}
          <div className="border-t border-gray-100 pt-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-600 font-medium">Total estimé</span>
              <span className="text-xl font-bold text-nauma-600">{total.toFixed(2)} MAD</span>
            </div>
            <div className="flex flex-col gap-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-medium py-3 rounded-xl transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                Commander via WhatsApp
              </a>
              <Link
                href="/devis"
                className="flex items-center justify-center gap-2 border-2 border-nauma-600 text-nauma-600 hover:bg-nauma-600 hover:text-white font-medium py-3 rounded-xl transition-all text-sm"
              >
                <Package className="w-4 h-4" />
                {mode === "gros" ? "Demander un devis formel" : "Commander en gros"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
