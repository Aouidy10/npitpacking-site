"use client";

import { useCart } from "@/context/CartContext";
import { getCloudinaryUrl } from "@/lib/cloudinary";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, X, ShoppingCart, ArrowLeft, ChevronRight } from "lucide-react";

export default function PanierPage() {
  const { items, remove, setQty, totalItems } = useCart();

  const totalGeneral = items.reduce((s, i) => s + (i.prixUnit || 0) * i.quantite, 0);
  const hasAnyPrice  = items.some((i) => (i.prixUnit || 0) > 0);

  if (items.length === 0) {
    return (
      <div className="container-main py-24 text-center">
        <ShoppingCart className="w-16 h-16 text-gray-200 mx-auto mb-5" />
        <h1 className="text-xl font-bold text-gray-700 mb-2">Votre panier est vide</h1>
        <p className="text-gray-400 text-sm mb-8">Parcourez notre catalogue pour ajouter des produits à votre devis.</p>
        <Link href="/catalogue" className="inline-flex items-center gap-2 bg-nauma-600 text-white font-bold px-8 py-3 rounded-full hover:bg-nauma-700 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Voir le catalogue
        </Link>
      </div>
    );
  }

  return (
    <div className="container-main py-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-8">
        Panier
        <span className="ml-3 text-sm font-normal text-gray-400">{totalItems} article{totalItems > 1 ? "s" : ""}</span>
      </h1>

      <div className="grid lg:grid-cols-3 gap-8">

        {/* ── Liste produits ── */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-gray-100">

            {/* En-têtes */}
            <div className="grid grid-cols-12 gap-2 px-4 py-3 border-b border-gray-100 text-xs font-bold text-gray-400 uppercase tracking-wide">
              <div className="col-span-5">Produit</div>
              <div className="col-span-3 text-center">Quantité</div>
              <div className="col-span-3 text-right">Sous-total</div>
              <div className="col-span-1" />
            </div>

            {/* Lignes */}
            {items.map((item) => {
              const imgSrc = item.varianteImage
                ? getCloudinaryUrl(item.varianteImage, 120)
                : item.produitImage
                  ? getCloudinaryUrl(item.produitImage, 120)
                  : "/placeholder-product.svg";
              const sousTotal = (item.prixUnit || 0) * item.quantite;

              return (
                <div key={item.id} className="grid grid-cols-12 gap-2 px-4 py-4 border-b border-gray-50 items-center hover:bg-gray-50 transition-colors">

                  {/* Produit */}
                  <div className="col-span-5 flex items-center gap-3">
                    <Link href={`/produits/${item.produitSlug}`} className="relative flex-shrink-0 w-14 h-14 bg-gray-50 border border-gray-100 overflow-hidden">
                      <Image src={imgSrc} alt={item.produitNom} fill className="object-contain p-1" sizes="56px" />
                    </Link>
                    <div className="min-w-0">
                      <Link href={`/produits/${item.produitSlug}`} className="text-sm font-semibold text-gray-800 hover:text-nauma-600 transition-colors line-clamp-2 leading-tight">
                        {item.produitNom}
                      </Link>
                      {item.variante && (
                        <p className="text-xs text-nauma-teal font-medium mt-0.5">{item.variante}</p>
                      )}
                      {item.prixUnit > 0 && (
                        <p className="text-xs text-gray-400 mt-0.5">
                          {item.prixUnit.toFixed(2)} MAD {item.colis ? `/ colis (${item.colis} unités)` : "/ unité"}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Quantité */}
                  <div className="col-span-3 flex items-center justify-center">
                    <div className="flex items-center border border-gray-200 rounded-full overflow-hidden">
                      <button
                        onClick={() => setQty(item.id, item.quantite - 1)}
                        className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-10 text-center text-sm font-semibold text-gray-800">{item.quantite}</span>
                      <button
                        onClick={() => setQty(item.id, item.quantite + 1)}
                        className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Sous-total */}
                  <div className="col-span-3 text-right">
                    {sousTotal > 0 ? (
                      <span className="text-sm font-bold text-nauma-600">{sousTotal.toFixed(2)} MAD</span>
                    ) : (
                      <span className="text-xs text-gray-400">—</span>
                    )}
                  </div>

                  {/* Supprimer */}
                  <div className="col-span-1 flex justify-end">
                    <button onClick={() => remove(item.id)} className="text-gray-300 hover:text-red-400 transition-colors p-1" title="Retirer">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}

            {/* Continuer */}
            <div className="px-4 py-4">
              <Link href="/catalogue" className="flex items-center gap-2 text-sm text-gray-500 hover:text-nauma-600 transition-colors w-fit">
                <ArrowLeft className="w-4 h-4" />
                Continuer mes achats
              </Link>
            </div>
          </div>
        </div>

        {/* ── Récapitulatif ── */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-100 p-6 sticky top-32">
            <h2 className="text-lg font-bold text-gray-800 mb-5">Total panier</h2>

            <div className="space-y-2 mb-4 text-sm">
              {items.map((item) => {
                const st = (item.prixUnit || 0) * item.quantite;
                return (
                  <div key={item.id} className="flex justify-between gap-2">
                    <span className="text-gray-500 truncate leading-tight">
                      {item.produitNom}
                      {item.variante && <span className="text-nauma-teal ml-1 text-xs">({item.variante})</span>}
                      <span className="text-gray-400 ml-1">×{item.quantite}</span>
                    </span>
                    <span className="flex-shrink-0 font-semibold text-gray-700">
                      {st > 0 ? `${st.toFixed(2)} MAD` : "—"}
                    </span>
                  </div>
                );
              })}
            </div>

            {hasAnyPrice && (
              <div className="border-t border-gray-100 pt-4 mb-5">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-gray-800">Total estimé</span>
                  <span className="text-xl font-extrabold text-nauma-600">{totalGeneral.toFixed(2)} MAD</span>
                </div>
                <p className="text-xs text-gray-400 mt-1">Prix indicatifs — confirmés à la commande</p>
              </div>
            )}

            {!hasAnyPrice && (
              <div className="border-t border-gray-100 pt-4 mb-5">
                <p className="text-xs text-gray-400">Les prix seront confirmés après votre demande.</p>
              </div>
            )}

            <Link
              href="/commande"
              className="flex items-center justify-center gap-2 w-full bg-nauma-600 hover:bg-nauma-700 text-white font-bold py-3.5 rounded-full uppercase tracking-wider text-sm transition-colors"
            >
              Soumettre votre demande de devis
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
