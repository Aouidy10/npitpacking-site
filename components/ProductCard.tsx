"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { Produit } from "@/types";
import { getCloudinaryUrl } from "@/lib/cloudinary";
import clsx from "clsx";

interface ProductCardProps {
  produit: Produit;
  defaultMode?: "detail" | "gros";
}

export default function ProductCard({ produit, defaultMode = "detail" }: ProductCardProps) {
  const [mode, setMode] = useState<"detail" | "gros">(defaultMode);

  const prix = mode === "gros" ? produit.prixGros : produit.prixDetail;
  const imageUrl = produit.images[0]
    ? getCloudinaryUrl(produit.images[0], 400)
    : "/placeholder-product.svg";

  const whatsappMsg = `Bonjour, je voudrais commander : ${produit.nom} (${mode === "gros" ? "gros" : "détail"})`;
  const whatsappUrl = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "212600000000"}?text=${encodeURIComponent(whatsappMsg)}`;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group">
      <Link href={`/produits/${produit.slug}`}>
        <div className="relative h-48 bg-gray-50 overflow-hidden">
          <Image
            src={imageUrl}
            alt={produit.nom}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
          <div className="absolute top-2 left-2 bg-nauma-teal-50 text-nauma-teal text-xs font-medium px-2 py-0.5 rounded-full capitalize">
            {produit.categorie.replace("-", " ")}
          </div>
        </div>
      </Link>

      <div className="p-4">
        <Link href={`/produits/${produit.slug}`}>
          <h3 className="font-semibold text-gray-800 text-sm leading-tight hover:text-nauma-600 transition-colors">
            {produit.nom}
          </h3>
          <p className="text-gray-400 text-xs mt-0.5">{produit.nomAr}</p>
        </Link>

        {/* Toggle détail / gros */}
        <div className="flex mt-3 bg-gray-100 rounded-lg p-0.5 text-xs">
          <button
            onClick={() => setMode("detail")}
            className={clsx(
              "flex-1 py-1 rounded-md font-medium transition-all",
              mode === "detail" ? "bg-white text-nauma-600 shadow-sm" : "text-gray-500"
            )}
          >
            Détail
          </button>
          <button
            onClick={() => setMode("gros")}
            className={clsx(
              "flex-1 py-1 rounded-md font-medium transition-all",
              mode === "gros" ? "bg-white text-nauma-600 shadow-sm" : "text-gray-500"
            )}
          >
            Gros +{produit.seuilGros}
          </button>
        </div>

        <div className="mt-3 flex items-end justify-between">
          <div>
            <span className="text-lg font-bold text-nauma-600">{prix.toFixed(2)}</span>
            <span className="text-xs text-gray-400 ml-1">MAD / {produit.unite}</span>
            {mode === "gros" && (
              <p className="text-xs text-nauma-gold font-medium mt-0.5">
                -{Math.round((1 - produit.prixGros / produit.prixDetail) * 100)}% sur le gros
              </p>
            )}
          </div>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white text-xs px-3 py-1.5 rounded-lg transition-colors"
          >
            <MessageCircle className="w-3 h-3" />
            Commander
          </a>
        </div>
      </div>
    </div>
  );
}
