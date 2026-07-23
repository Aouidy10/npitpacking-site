import Link from "next/link";
import Image from "next/image";
import { Produit } from "@/types";
import { getCloudinaryUrl } from "@/lib/cloudinary";
import clsx from "clsx";

export default function ProductCard({ produit }: { produit: Produit }) {
  const imageUrl = produit.images[0]
    ? getCloudinaryUrl(produit.images[0], 500)
    : "/placeholder-product.svg";

  const hasVariants = (produit.variantes ?? []).length > 0;

  return (
    <div className="bg-white border border-gray-100 group flex flex-col hover:shadow-lg transition-shadow duration-300">
      {/* Image — ratio portrait 4:5 comme proxymarket */}
      <Link href={`/produits/${produit.slug}`} className="block relative overflow-hidden bg-gray-50" style={{ paddingBottom: "125%" }}>
        <Image
          src={imageUrl}
          alt={produit.nom}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />

        {/* Badge */}
        {produit.badge && (
          <span className={clsx(
            "absolute top-0 left-0 text-white text-[10px] font-extrabold px-2.5 py-1 uppercase tracking-widest",
            produit.badge === "nouveau"    && "bg-nauma-teal",
            produit.badge === "promo"      && "bg-red-500",
            produit.badge === "bestseller" && "bg-nauma-gold",
          )}>
            {produit.badge === "nouveau"    && "Nouveau"}
            {produit.badge === "promo"      && "Promo"}
            {produit.badge === "bestseller" && "Top vente"}
          </span>
        )}

        {/* Indisponible */}
        {!produit.disponible && (
          <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
            <span className="bg-gray-700 text-white text-xs font-bold px-3 py-1">Indisponible</span>
          </div>
        )}
      </Link>

      {/* Infos */}
      <div className="p-3 flex flex-col flex-1">
        <Link href={`/produits/${produit.slug}`} className="flex-1">
          <h3 className="text-sm font-medium text-gray-800 leading-snug hover:text-nauma-600 transition-colors line-clamp-2 text-center mb-1">
            {produit.nom}
          </h3>
        </Link>

        {/* Prix */}
        {produit.prixDetail > 0 && (
          <p className="text-center text-xs text-gray-400 mb-3">
            À partir de{" "}
            <span className="text-nauma-600 font-bold text-sm">{produit.prixDetail.toFixed(2)} MAD</span>
            <span className="text-gray-400"> / {produit.unite}</span>
          </p>
        )}

        {/* CTA */}
        <Link
          href={`/produits/${produit.slug}`}
          className={clsx(
            "block text-center text-xs font-bold py-2.5 px-3 uppercase tracking-wider transition-colors",
            produit.disponible
              ? "bg-nauma-600 text-white hover:bg-nauma-700"
              : "bg-gray-100 text-gray-400 pointer-events-none"
          )}
        >
          {hasVariants ? "Choix des options" : "Ajouter au devis"}
        </Link>
      </div>
    </div>
  );
}
