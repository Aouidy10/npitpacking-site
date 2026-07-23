"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle, ChevronRight, Package } from "lucide-react";
import { Produit, Variante } from "@/types";
import { getCloudinaryUrl } from "@/lib/cloudinary";
import { PRODUITS_DEMO } from "@/lib/produits";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import clsx from "clsx";

export default function ProduitDetail({ slug }: { slug: string }) {
  const [produit, setProduit] = useState<Produit | null>(
    PRODUITS_DEMO.find((p) => p.slug === slug) ?? null
  );
  const [loading, setLoading]     = useState(!produit);
  const [mode, setMode]           = useState<"detail" | "gros">("detail");
  const [quantite, setQuantite]   = useState(1);
  const [imgIdx, setImgIdx]       = useState(0);
  const [variante, setVariante]   = useState<Variante | null>(null);

  /* Si pas trouvé dans PRODUITS_DEMO → chercher dans Firestore */
  useEffect(() => {
    if (produit) return;
    (async () => {
      try {
        const snap = await getDocs(
          query(collection(db, "produits"), where("slug", "==", slug))
        );
        if (!snap.empty) {
          setProduit({ id: snap.docs[0].id, ...snap.docs[0].data() } as Produit);
        }
      } finally {
        setLoading(false);
      }
    })();
  }, [slug, produit]);

  if (loading) {
    return (
      <div className="container-main py-20 text-center text-gray-400">
        Chargement du produit…
      </div>
    );
  }

  if (!produit) {
    return (
      <div className="container-main py-20 text-center">
        <Package className="w-12 h-12 text-gray-200 mx-auto mb-4" />
        <h1 className="text-xl font-bold text-gray-700 mb-2">Produit introuvable</h1>
        <p className="text-gray-400 text-sm mb-6">Ce produit n&apos;existe pas ou a été supprimé.</p>
        <Link href="/catalogue" className="btn-primary">Voir le catalogue</Link>
      </div>
    );
  }

  const hasVariantes = (produit.variantes ?? []).length > 0;
  const activeVar    = variante ?? (hasVariantes ? produit.variantes![0] : null);
  const prixDetail   = activeVar ? activeVar.prixDetail : produit.prixDetail;
  const prixGros     = activeVar ? activeVar.prixGros   : produit.prixGros;
  const seuilGros    = activeVar ? activeVar.seuilGros  : produit.seuilGros;

  const prix   = mode === "gros" ? prixGros : prixDetail;
  const total  = prix * quantite;
  const remise = Math.round((1 - prixGros / prixDetail) * 100);

  const imageUrl = produit.images[imgIdx]
    ? getCloudinaryUrl(produit.images[imgIdx], 800)
    : "/placeholder-product.svg";

  const whatsappMsg = `Bonjour, je voudrais commander :\n- Produit : ${produit.nom}\n- Mode : ${mode === "gros" ? "Gros" : "Détail"}\n- Quantité : ${quantite} ${produit.unite}(s)\n- Total estimé : ${total.toFixed(2)} MAD`;
  const whatsappUrl = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "212600000000"}?text=${encodeURIComponent(whatsappMsg)}`;

  return (
    <>
    <div className="container-main py-10 pb-28 md:pb-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-sm text-gray-400 mb-8">
        <Link href="/" className="hover:text-nauma-600">Accueil</Link>
        <ChevronRight className="w-3 h-3" />
        <Link href="/catalogue" className="hover:text-nauma-600">Catalogue</Link>
        <ChevronRight className="w-3 h-3" />
        <Link href={`/catalogue?cat=${produit.categorie}`} className="hover:text-nauma-600 capitalize">
          {produit.categorie.replace(/-/g, " ")}
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
              {produit.categorie.replace(/-/g, " ")}
            </span>
            {produit.badge && (
              <span className={clsx(
                "ml-2 text-white text-xs font-bold px-2 py-1 rounded-full",
                produit.badge === "nouveau"    && "bg-nauma-teal",
                produit.badge === "promo"      && "bg-red-500",
                produit.badge === "bestseller" && "bg-nauma-gold",
              )}>
                {produit.badge === "nouveau" && "✦ Nouveau"}
                {produit.badge === "promo" && "🔥 Promo"}
                {produit.badge === "bestseller" && "⭐ Best-seller"}
              </span>
            )}
            <h1 className="text-2xl font-bold text-gray-800 mt-2">{produit.nom}</h1>
            <p className="text-gray-400 text-sm">{produit.nomAr}</p>
            {(produit.poids || produit.colis) && (
              <div className="flex gap-2 mt-2">
                {produit.poids && <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-md font-medium">{produit.poids}</span>}
                {(produit.colis ?? 0) > 0 && <span className="text-xs bg-amber-50 text-amber-700 px-2 py-0.5 rounded-md font-medium">{produit.colis} u/colis</span>}
              </div>
            )}
          </div>

          <p className="text-gray-600 text-sm leading-relaxed">{produit.description}</p>

          {/* ─── Sélecteur de variantes ─── */}
          {hasVariantes && (
            <div>
              <p className="text-xs text-gray-500 mb-2 font-medium uppercase tracking-wide">
                {produit.variantesLabel ? `Choisir : ${produit.variantesLabel}` : "Choisir le type"}
              </p>
              <div className="flex flex-wrap gap-2">
                {produit.variantes!.map((v) => {
                  const isSelected = (activeVar?.nom === v.nom);
                  return (
                    <button
                      key={v.nom}
                      type="button"
                      onClick={() => { setVariante(v); setMode("detail"); setQuantite(1); }}
                      className={clsx(
                        "px-4 py-2 rounded-xl border-2 text-sm font-semibold transition-all",
                        isSelected
                          ? "border-nauma-600 bg-nauma-600 text-white shadow-md scale-105"
                          : "border-gray-200 bg-white text-gray-700 hover:border-nauma-teal hover:text-nauma-teal"
                      )}
                    >
                      {v.nom}
                    </button>
                  );
                })}
              </div>
              {activeVar && (
                <p className="text-xs text-nauma-teal mt-2 font-medium">
                  ✓ Sélectionné : <strong>{activeVar.nom}</strong> — {activeVar.prixDetail.toFixed(2)} MAD / {produit.unite}
                </p>
              )}
            </div>
          )}

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
                Gros (min {seuilGros} {produit.unite}s)
              </button>
            </div>
          </div>

          {/* Prix + Calculateur */}
          <div className="bg-gray-50 rounded-2xl p-5 space-y-4">
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold text-nauma-600">{prix.toFixed(2)}</span>
              <span className="text-gray-400 pb-1">MAD / {produit.unite}</span>
              {mode === "gros" && (
                <span className="ml-auto bg-nauma-gold text-white text-xs font-bold px-2 py-1 rounded-full">-{remise}%</span>
              )}
            </div>

            {/* Tableau comparatif */}
            <div className="border border-gray-200 rounded-xl overflow-hidden text-sm">
              <div className="grid grid-cols-3 bg-nauma-600 text-white text-xs font-semibold">
                <div className="px-3 py-2">Quantité</div>
                <div className="px-3 py-2">Prix / unité</div>
                <div className="px-3 py-2">Total</div>
              </div>
              {[1, Math.ceil(seuilGros / 2), seuilGros, seuilGros * 2].map((qty) => {
                const isGros    = qty >= seuilGros;
                const unitPrice = isGros ? prixGros : prixDetail;
                const isActive  = quantite === qty;
                return (
                  <button
                    key={qty}
                    type="button"
                    onClick={() => { setQuantite(qty); setMode(isGros ? "gros" : "detail"); }}
                    className={clsx(
                      "grid grid-cols-3 w-full text-left border-t border-gray-100 transition-colors",
                      isActive ? "bg-nauma-50 font-semibold" : "hover:bg-gray-50"
                    )}
                  >
                    <div className={clsx("px-3 py-2 text-xs", isGros ? "text-nauma-teal font-bold" : "text-gray-600")}>
                      {qty} {produit.unite}{qty > 1 ? "s" : ""}
                      {isGros && <span className="ml-1 text-[10px] bg-nauma-teal text-white px-1 rounded">GROS</span>}
                    </div>
                    <div className="px-3 py-2 text-xs text-gray-700">{unitPrice.toFixed(2)} MAD</div>
                    <div className={clsx("px-3 py-2 text-xs font-semibold", isGros ? "text-nauma-teal" : "text-gray-700")}>
                      {(unitPrice * qty).toFixed(2)} MAD
                    </div>
                  </button>
                );
              })}
            </div>
            <p className="text-xs text-gray-400">
              👆 Clique sur une ligne pour sélectionner — Prix gros à partir de {seuilGros} {produit.unite}s
            </p>
          </div>

          {/* Quantité manuelle */}
          <div>
            <p className="text-xs text-gray-500 mb-2 font-medium uppercase tracking-wide">Quantité</p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantite(Math.max(1, quantite - 1))}
                className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:border-nauma-teal transition-colors"
              >−</button>
              <span className="w-12 text-center font-semibold">{quantite}</span>
              <button
                onClick={() => setQuantite(quantite + 1)}
                className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:border-nauma-teal transition-colors"
              >+</button>
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

    {/* Sticky Commander — mobile uniquement */}
    <div className="fixed bottom-0 left-0 right-0 md:hidden bg-white/95 backdrop-blur-sm border-t border-gray-200 px-4 py-3 z-40 shadow-[0_-4px_24px_rgba(0,0,0,0.10)]">
      <div className="flex items-center gap-3 max-w-lg mx-auto">
        <div className="flex-shrink-0">
          <p className="text-[10px] text-gray-400 leading-tight uppercase tracking-wide">Total estimé</p>
          <p className="font-bold text-nauma-600 text-base leading-tight">{total.toFixed(2)} MAD</p>
        </div>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 bg-green-500 active:bg-green-600 text-white text-center py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-colors"
        >
          <MessageCircle className="w-4 h-4" />
          Commander
        </a>
      </div>
    </div>
    </>
  );
}
