"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, ChevronLeft, Minus, Plus, Package, MessageCircle } from "lucide-react";
import { Produit, Variante } from "@/types";
import { getCloudinaryUrl } from "@/lib/cloudinary";
import { PRODUITS_DEMO } from "@/lib/produits";
import { CATEGORIES_CONFIG } from "@/lib/categories";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import clsx from "clsx";

export default function ProduitDetail({ slug }: { slug: string }) {
  const [produit, setProduit] = useState<Produit | null>(
    PRODUITS_DEMO.find((p) => p.slug === slug) ?? null
  );
  const [loading, setLoading]   = useState(!produit);
  const [imgIdx, setImgIdx]     = useState(0);
  const [variante, setVariante] = useState<Variante | null>(null);
  const [quantite, setQuantite] = useState(1);

  useEffect(() => {
    if (produit) return;
    (async () => {
      try {
        const snap = await getDocs(
          query(collection(db, "produits"), where("slug", "==", slug))
        );
        if (!snap.empty)
          setProduit({ id: snap.docs[0].id, ...snap.docs[0].data() } as Produit);
      } finally {
        setLoading(false);
      }
    })();
  }, [slug, produit]);

  if (loading) {
    return <div className="container-main py-24 text-center text-gray-400">Chargement…</div>;
  }

  if (!produit) {
    return (
      <div className="container-main py-24 text-center">
        <Package className="w-12 h-12 text-gray-200 mx-auto mb-4" />
        <h1 className="text-xl font-bold text-gray-700 mb-2">Produit introuvable</h1>
        <p className="text-gray-400 text-sm mb-6">Ce produit n&apos;existe pas ou a été supprimé.</p>
        <Link href="/catalogue" className="btn-primary">Voir le catalogue</Link>
      </div>
    );
  }

  const hasVariantes  = (produit.variantes ?? []).length > 0;
  const activeVar     = variante ?? (hasVariantes ? produit.variantes![0] : null);
  const catConfig     = CATEGORIES_CONFIG.find((c) => c.slug === produit.categorie);
  const catLabel      = catConfig?.label ?? produit.categorie;

  const images = produit.images.length > 0 ? produit.images : [];
  const currentImg = images[imgIdx]
    ? getCloudinaryUrl(images[imgIdx], 800)
    : "/placeholder-product.svg";

  const whatsappMsg = `Bonjour, je voudrais commander :\n- Produit : ${produit.nom}${activeVar ? `\n- Type : ${activeVar.nom}` : ""}\n- Quantité : ${quantite} ${produit.unite}(s)`;
  const whatsappUrl = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "212600000000"}?text=${encodeURIComponent(whatsappMsg)}`;

  const prevImg = () => setImgIdx((i) => (i - 1 + images.length) % images.length);
  const nextImg = () => setImgIdx((i) => (i + 1) % images.length);

  return (
    <>
      {/* ─── Breadcrumb ─────────────────────────────────── */}
      <div className="border-b border-gray-100 bg-white">
        <div className="container-main py-3">
          <nav className="flex items-center gap-1.5 text-xs text-gray-400 flex-wrap">
            <Link href="/" className="hover:text-nauma-600 transition-colors">Accueil</Link>
            <span>/</span>
            <Link href="/catalogue" className="hover:text-nauma-600 transition-colors">Catalogue</Link>
            <span>/</span>
            <Link href={`/catalogue?cat=${produit.categorie}`} className="hover:text-nauma-600 transition-colors">
              {catLabel}
            </Link>
            {produit.sousCategorie && (
              <>
                <span>/</span>
                <Link
                  href={`/catalogue?cat=${produit.categorie}&sub=${produit.sousCategorie}`}
                  className="hover:text-nauma-600 transition-colors"
                >
                  {catConfig?.sousCats.find((s) => s.slug === produit.sousCategorie)?.label ?? produit.sousCategorie}
                </Link>
              </>
            )}
            <span>/</span>
            <span className="text-gray-600">{produit.nom}</span>
          </nav>
        </div>
      </div>

      {/* ─── Contenu produit ────────────────────────────── */}
      <div className="container-main py-10 pb-28 md:pb-10">
        <div className="grid md:grid-cols-2 gap-12 items-start">

          {/* ── Galerie image ─────────────────────────────── */}
          <div>
            {/* Image principale */}
            <div className="relative bg-gray-50 border border-gray-100 overflow-hidden"
              style={{ paddingBottom: "100%" }}>
              <Image
                src={currentImg}
                alt={produit.nom}
                fill
                className="object-contain p-6"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />

              {/* Badge */}
              {produit.badge && (
                <span className={clsx(
                  "absolute top-3 left-3 text-white text-[10px] font-extrabold px-2.5 py-1 uppercase tracking-widest",
                  produit.badge === "nouveau"    && "bg-nauma-teal",
                  produit.badge === "promo"      && "bg-red-500",
                  produit.badge === "bestseller" && "bg-nauma-gold",
                )}>
                  {produit.badge === "nouveau"    && "Nouveau"}
                  {produit.badge === "promo"      && "Promo"}
                  {produit.badge === "bestseller" && "Top vente"}
                </span>
              )}

              {/* Flèches navigation */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImg}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors border border-gray-100"
                  >
                    <ChevronLeft className="w-4 h-4 text-gray-600" />
                  </button>
                  <button
                    onClick={nextImg}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors border border-gray-100"
                  >
                    <ChevronRight className="w-4 h-4 text-gray-600" />
                  </button>
                </>
              )}
            </div>

            {/* Miniatures */}
            {images.length > 1 && (
              <div className="flex gap-2 mt-3 overflow-x-auto">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setImgIdx(i)}
                    className={clsx(
                      "relative flex-shrink-0 w-16 h-16 border-2 overflow-hidden bg-gray-50 transition-all",
                      imgIdx === i ? "border-nauma-600" : "border-gray-200 hover:border-gray-400"
                    )}
                  >
                    <Image
                      src={getCloudinaryUrl(img, 120)}
                      alt=""
                      fill
                      className="object-contain p-1"
                      sizes="64px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Infos produit ─────────────────────────────── */}
          <div className="flex flex-col gap-6">

            {/* Titre */}
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 leading-snug">
              {produit.nom}
            </h1>

            {/* Description */}
            {produit.description && (
              <p className="text-gray-500 text-sm leading-relaxed border-t border-gray-100 pt-5">
                {produit.description}
              </p>
            )}

            {/* ── Sélecteur de variantes / types ─── */}
            {hasVariantes && (
              <div className="space-y-3 border-t border-gray-100 pt-5">
                <p className="text-xs font-bold text-gray-600 uppercase tracking-widest">
                  {produit.variantesLabel || "Type"}
                  {activeVar && (
                    <span className="font-normal text-gray-800 ml-1.5 normal-case tracking-normal">
                      : {activeVar.nom}
                    </span>
                  )}
                </p>
                <div className="flex flex-wrap gap-2">
                  {produit.variantes!.map((v) => {
                    const isSelected = activeVar?.nom === v.nom;
                    return (
                      <button
                        key={v.nom}
                        type="button"
                        onClick={() => { setVariante(v); setQuantite(1); }}
                        className={clsx(
                          "px-4 py-2 border text-sm font-medium transition-all rounded-full",
                          isSelected
                            ? "border-nauma-600 bg-nauma-600 text-white"
                            : "border-gray-300 bg-white text-gray-600 hover:border-nauma-600 hover:text-nauma-600"
                        )}
                      >
                        {v.nom}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ── Quantité + Bouton ─── */}
            <div className="flex items-center gap-4 border-t border-gray-100 pt-5">
              {/* Selector quantité */}
              <div className="flex items-center border border-gray-200 rounded-full overflow-hidden">
                <button
                  onClick={() => setQuantite(Math.max(1, quantite - 1))}
                  className="w-10 h-10 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-10 text-center text-sm font-semibold text-gray-800">{quantite}</span>
                <button
                  onClick={() => setQuantite(quantite + 1)}
                  className="w-10 h-10 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* CTA principal */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 bg-nauma-600 hover:bg-nauma-700 text-white font-bold py-3 px-6 rounded-full uppercase tracking-wider text-sm transition-colors"
              >
                AJOUTER AU DEVIS
              </a>
            </div>

            {/* WhatsApp secondaire */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-green-600 hover:text-green-700 text-sm font-medium transition-colors w-fit"
            >
              <MessageCircle className="w-4 h-4" />
              Commander directement par WhatsApp
            </a>

            {/* ── Métadonnées ─── */}
            <div className="border-t border-gray-100 pt-5 space-y-2 text-sm text-gray-500">
              {produit.id && (
                <p><span className="font-medium text-gray-700">UGS :</span> {produit.id.toUpperCase().slice(0, 8)}</p>
              )}
              <p>
                <span className="font-medium text-gray-700">Catégorie :</span>{" "}
                <Link href={`/catalogue?cat=${produit.categorie}`} className="text-nauma-600 hover:underline">
                  {catLabel}
                </Link>
              </p>
              {produit.poids && (
                <p><span className="font-medium text-gray-700">Poids :</span> {produit.poids}</p>
              )}
              {(produit.colis ?? 0) > 0 && (
                <p><span className="font-medium text-gray-700">Conditionnement :</span> {produit.colis} unités / colis</p>
              )}
              {produit.unite && (
                <p><span className="font-medium text-gray-700">Unité :</span> {produit.unite}</p>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* ─── Sticky bar mobile ──────────────────────────── */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden bg-white border-t border-gray-100 px-4 py-3 z-40 shadow-[0_-4px_24px_rgba(0,0,0,0.08)]">
        <div className="flex items-center gap-3 max-w-lg mx-auto">
          <div className="flex items-center border border-gray-200 rounded-full overflow-hidden flex-shrink-0">
            <button
              onClick={() => setQuantite(Math.max(1, quantite - 1))}
              className="w-9 h-9 flex items-center justify-center text-gray-500"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="w-8 text-center text-sm font-semibold">{quantite}</span>
            <button
              onClick={() => setQuantite(quantite + 1)}
              className="w-9 h-9 flex items-center justify-center text-gray-500"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-nauma-600 text-white text-center py-3 rounded-full font-bold text-sm uppercase tracking-wider"
          >
            AJOUTER AU DEVIS
          </a>
        </div>
      </div>
    </>
  );
}
