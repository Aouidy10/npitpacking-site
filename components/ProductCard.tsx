import Link from "next/link";
import Image from "next/image";
import { Produit } from "@/types";
import { getCloudinaryUrl } from "@/lib/cloudinary";
import clsx from "clsx";

const PLACEHOLDER_BY_CAT: Record<string, string> = {
  "hygiene":                 "/placeholder-hygiene.svg",
  "emballage-alimentaire":   "/placeholder-alimentaire.svg",
  "emballage-biodegradable": "/placeholder-biodegradable.svg",
  "papier":                  "/placeholder-papier.svg",
  "plastique":               "/placeholder-plastique.svg",
  "verre-cristal":           "/placeholder-verre.svg",
};

export default function ProductCard({ produit }: { produit: Produit }) {
  const placeholder = PLACEHOLDER_BY_CAT[produit.categorie] ?? "/placeholder-product.svg";
  const imageUrl = produit.images[0]
    ? getCloudinaryUrl(produit.images[0], 500)
    : placeholder;

  const hasVariants = (produit.variantes ?? []).length > 0;

  return (
    <div className="bg-white border border-gray-100 group flex flex-col hover:shadow-md transition-shadow duration-300">
      {/* Image — carré 1:1 */}
      <Link
        href={`/produits/${produit.slug}`}
        className="block relative overflow-hidden bg-gray-50"
        style={{ paddingBottom: "100%" }}
      >
        <Image
          src={imageUrl}
          alt={produit.nom}
          fill
          className="object-contain p-3 group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />

        {/* Badge */}
        {produit.badge && (
          <span className={clsx(
            "absolute top-2 left-2 text-white text-[10px] font-extrabold px-2 py-0.5 uppercase tracking-widest",
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
      <div className="p-3 flex flex-col flex-1 items-center text-center">
        <Link href={`/produits/${produit.slug}`} className="flex-1 w-full mb-3">
          <h3 className="text-sm text-gray-700 leading-snug hover:text-nauma-600 transition-colors line-clamp-3">
            {produit.nom}
          </h3>
        </Link>

        {/* CTA — bouton arrondi pleine largeur */}
        <Link
          href={`/produits/${produit.slug}`}
          className={clsx(
            "w-full text-center text-xs font-semibold py-2 px-3 rounded-full transition-colors",
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
