"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, ChevronLeft, Minus, Plus, Package, MessageCircle, X, ZoomIn, ShoppingCart, Check } from "lucide-react";
import { Produit, Variante } from "@/types";
import { getCloudinaryUrl } from "@/lib/cloudinary";
import { PRODUITS_DEMO } from "@/lib/produits";
import { CATEGORIES_CONFIG } from "@/lib/categories";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useCart } from "@/context/CartContext";
import { buildCartId } from "@/lib/cart";
import ProductCard from "@/components/ProductCard";
import clsx from "clsx";

export default function ProduitDetail({ slug }: { slug: string }) {
  const [produit, setProduit] = useState<Produit | null>(
    PRODUITS_DEMO.find((p) => p.slug === slug) ?? null
  );
  const [loading, setLoading]         = useState(!produit);
  const [imgIdx, setImgIdx]           = useState(0);
  const [variante, setVariante]       = useState<Variante | null>(null);
  const [quantite, setQuantite]       = useState(1);
  const [lightbox, setLightbox]       = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState(0);
  const [added, setAdded]             = useState(false);
  const [similaires, setSimilaires]   = useState<Produit[]>([]);
  const { add: addToCart }            = useCart();

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

  /* Produits similaires — même catégorie, hors produit actuel */
  useEffect(() => {
    if (!produit) return;
    const demoSim = PRODUITS_DEMO
      .filter((p) => p.categorie === produit.categorie && p.slug !== produit.slug)
      .slice(0, 6);
    setSimilaires(demoSim);
    (async () => {
      try {
        const snap = await getDocs(
          query(collection(db, "produits"), where("categorie", "==", produit.categorie))
        );
        const all = snap.docs
          .map((d) => ({ id: d.id, ...d.data() } as Produit))
          .filter((p) => p.slug !== produit.slug)
          .slice(0, 6);
        if (all.length > 0) setSimilaires(all);
      } catch { /* garder démo */ }
    })();
  }, [produit]);

  /* Clavier pour le lightbox */
  useEffect(() => {
    if (!lightbox) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(false);
      if (e.key === "ArrowRight") setLightboxIdx((i) => (i + 1) % gallery.length);
      if (e.key === "ArrowLeft")  setLightboxIdx((i) => (i - 1 + gallery.length) % gallery.length);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightbox]);

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

  const hasVariantes = (produit.variantes ?? []).length > 0;
  const activeVar    = variante ?? (hasVariantes ? produit.variantes![0] : null);
  const catConfig    = CATEGORIES_CONFIG.find((c) => c.slug === produit.categorie);
  const catLabel     = catConfig?.label ?? produit.categorie;

  /* Prix : par unité → par colis */
  const prixUnitBase = activeVar?.prixDetail || produit.prixDetail || 0;
  const colisCount   = produit.colis ?? 0;
  const prixParColis = colisCount > 0 ? prixUnitBase * colisCount : prixUnitBase;

  /* ── Galerie combinée : images de base + images des variantes ── */
  type GalleryEntry = { src: string; varianteIdx?: number };
  const gallery: GalleryEntry[] = [
    ...produit.images.filter(Boolean).map((src) => ({ src })),
    ...(produit.variantes ?? [])
      .map((v, vi): GalleryEntry | null => v.image ? { src: v.image, varianteIdx: vi } : null)
      .filter((x): x is GalleryEntry => x !== null),
  ];
  if (gallery.length === 0) gallery.push({ src: "" });

  /* Index courant dans la galerie (synchronisé avec variant sélectionné) */
  const activeSrc = activeVar?.image || "";
  const galleryIdx = activeSrc
    ? gallery.findIndex((g) => g.src === activeSrc)
    : imgIdx;
  const safeIdx = galleryIdx >= 0 ? galleryIdx : imgIdx;
  const currentSrc = gallery[safeIdx]?.src;
  const currentImg = currentSrc
    ? getCloudinaryUrl(currentSrc, 800)
    : "/placeholder-product.svg";

  const prevImg = () => {
    const next = (safeIdx - 1 + gallery.length) % gallery.length;
    const entry = gallery[next];
    if (entry.varianteIdx !== undefined) {
      setVariante(produit.variantes![entry.varianteIdx]);
    } else {
      setVariante(null);
      setImgIdx(next);
    }
  };
  const nextImg = () => {
    const next = (safeIdx + 1) % gallery.length;
    const entry = gallery[next];
    if (entry.varianteIdx !== undefined) {
      setVariante(produit.variantes![entry.varianteIdx]);
    } else {
      setVariante(null);
      setImgIdx(next);
    }
  };

  const uniteLabel  = colisCount > 0 ? `colis (${quantite * colisCount} unités)` : (produit.unite || "unité") + "(s)";
  const whatsappMsg = `Bonjour, je voudrais commander :\n- Produit : ${produit.nom}${activeVar ? `\n- Type : ${activeVar.nom}` : ""}\n- Quantité : ${quantite} ${uniteLabel}`;
  const whatsappUrl = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "212600000000"}?text=${encodeURIComponent(whatsappMsg)}`;

  const handleAddToCart = () => {
    if (!produit) return;
    addToCart({
      id: buildCartId(produit.id, activeVar?.nom),
      produitId: produit.id,
      produitNom: produit.nom,
      produitSlug: produit.slug,
      produitImage: produit.images[0] ?? "",
      variante: activeVar?.nom,
      varianteImage: activeVar?.image,
      quantite,
      prixUnit: prixParColis,
      colis: colisCount > 0 ? colisCount : undefined,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

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
            {/* Image principale — cliquable pour ouvrir le lightbox */}
            <div
              className="relative bg-gray-50 border border-gray-100 overflow-hidden cursor-zoom-in"
              style={{ paddingBottom: "100%" }}
              onClick={() => { setLightboxIdx(safeIdx); setLightbox(true); }}
            >
              <Image
                src={currentImg}
                alt={produit.nom}
                fill
                className="object-contain p-6"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />

              {/* Icône zoom */}
              <div className="absolute bottom-3 right-3 bg-white/80 p-1.5 rounded-full shadow-sm pointer-events-none">
                <ZoomIn className="w-4 h-4 text-gray-500" />
              </div>

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
              {gallery.length > 1 && (
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

            {/* Miniatures — images de base + images des variantes */}
            {gallery.length > 1 && (
              <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
                {gallery.map((entry, i) => {
                  const isActive = i === safeIdx;
                  const thumbSrc = entry.src ? getCloudinaryUrl(entry.src, 120) : "/placeholder-product.svg";
                  /* Nom du type si c'est une variante */
                  const varLabel = entry.varianteIdx !== undefined
                    ? produit.variantes![entry.varianteIdx].nom
                    : null;
                  return (
                    <button
                      key={i}
                      onClick={() => {
                        if (entry.varianteIdx !== undefined) {
                          setVariante(produit.variantes![entry.varianteIdx]);
                        } else {
                          setVariante(null);
                          setImgIdx(i);
                        }
                      }}
                      className={clsx(
                        "relative flex-shrink-0 w-16 h-16 border-2 overflow-hidden bg-gray-50 transition-all",
                        isActive ? "border-nauma-600" : "border-gray-200 hover:border-gray-400"
                      )}
                      title={varLabel ?? undefined}
                    >
                      <Image
                        src={thumbSrc}
                        alt={varLabel ?? ""}
                        fill
                        className="object-contain p-1"
                        sizes="64px"
                      />
                      {/* Badge type sur la miniature variante */}
                      {varLabel && (
                        <span className="absolute bottom-0 left-0 right-0 text-[8px] font-bold text-center bg-nauma-600/80 text-white py-0.5 truncate px-1">
                          {varLabel}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* ── Infos produit ─────────────────────────────── */}
          <div className="flex flex-col gap-6">

            {/* Titre */}
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 leading-snug">
              {produit.nom}
            </h1>

            {/* Info colis (sans prix) */}
            {colisCount > 0 && (
              <p className="text-xs text-amber-700 bg-amber-50 border border-amber-100 rounded-full px-3 py-1.5 w-fit">
                Vendu par colis de {colisCount} unités — minimum 1 colis
              </p>
            )}

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

              {/* Bouton Ajouter au panier */}
              <button
                onClick={handleAddToCart}
                className={clsx(
                  "flex-1 flex items-center justify-center gap-2 font-bold py-3 px-6 rounded-full uppercase tracking-wider text-sm transition-all",
                  added
                    ? "bg-green-500 text-white"
                    : "bg-nauma-600 hover:bg-nauma-700 text-white"
                )}
              >
                {added ? (
                  <><Check className="w-4 h-4" /> Ajouté au panier !</>
                ) : (
                  <><ShoppingCart className="w-4 h-4" /> Ajouter au devis</>
                )}
              </button>
            </div>

            {/* Lien panier + WhatsApp direct */}
            <div className="flex items-center gap-4">
              <Link href="/panier" className="flex items-center gap-2 text-nauma-600 hover:text-nauma-700 text-sm font-semibold transition-colors">
                <ShoppingCart className="w-4 h-4" />
                Voir le panier
              </Link>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-green-600 hover:text-green-700 text-sm font-medium transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                Commander par WhatsApp
              </a>
            </div>

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

      {/* ─── Produits similaires ────────────────────────── */}
      {similaires.length > 0 && (
        <section className="border-t border-gray-100 bg-gray-50">
          <div className="container-main py-10 pb-28 md:pb-10">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-bold text-gray-800">Produits similaires</h2>
                <div className="w-10 h-0.5 bg-nauma-600 mt-1" />
              </div>
              <Link
                href={`/catalogue?cat=${produit.categorie}`}
                className="text-xs text-nauma-600 hover:underline font-medium"
              >
                Voir toute la catégorie →
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
              {similaires.map((p) => (
                <ProductCard key={p.id} produit={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── Lightbox plein écran ───────────────────────── */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center"
          onClick={() => setLightbox(false)}
        >
          {/* Image */}
          <div
            className="relative w-full h-full max-w-4xl max-h-[90vh] m-4"
            onClick={(e) => e.stopPropagation()}
          >
            {gallery[lightboxIdx]?.src && (
              <Image
                src={getCloudinaryUrl(gallery[lightboxIdx].src, 1200)}
                alt=""
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            )}
          </div>

          {/* Fermer */}
          <button
            onClick={() => setLightbox(false)}
            className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white w-10 h-10 rounded-full flex items-center justify-center transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Flèche gauche */}
          {gallery.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); setLightboxIdx((i) => (i - 1 + gallery.length) % gallery.length); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/25 text-white w-12 h-12 rounded-full flex items-center justify-center transition-colors z-10"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {/* Flèche droite */}
          {gallery.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); setLightboxIdx((i) => (i + 1) % gallery.length); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/25 text-white w-12 h-12 rounded-full flex items-center justify-center transition-colors z-10"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}

          {/* Indicateur position */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {gallery.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setLightboxIdx(i); }}
                className={clsx(
                  "h-1.5 rounded-full transition-all",
                  i === lightboxIdx ? "bg-white w-5" : "bg-white/40 w-1.5"
                )}
              />
            ))}
          </div>

          {/* Nom variante si c'est une image de type */}
          {gallery[lightboxIdx]?.varianteIdx !== undefined && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white/10 text-white text-xs font-bold px-4 py-1.5 rounded-full z-10">
              {produit.variantes![gallery[lightboxIdx].varianteIdx!].nom}
            </div>
          )}
        </div>
      )}

      {/* ─── Sticky bar mobile ──────────────────────────── */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden bg-white border-t border-gray-100 px-4 py-3 z-40 shadow-[0_-4px_24px_rgba(0,0,0,0.08)]">
        <div className="flex items-center gap-3 max-w-lg mx-auto">
          <div className="flex items-center border border-gray-200 rounded-full overflow-hidden flex-shrink-0">
            <button onClick={() => setQuantite(Math.max(1, quantite - 1))} className="w-9 h-9 flex items-center justify-center text-gray-500">
              <Minus className="w-3 h-3" />
            </button>
            <span className="w-8 text-center text-sm font-semibold">{quantite}</span>
            <button onClick={() => setQuantite(quantite + 1)} className="w-9 h-9 flex items-center justify-center text-gray-500">
              <Plus className="w-3 h-3" />
            </button>
          </div>
          <button
            onClick={handleAddToCart}
            className={clsx(
              "flex-1 text-center py-3 rounded-full font-bold text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2",
              added ? "bg-green-500 text-white" : "bg-nauma-600 text-white"
            )}
          >
            {added ? <><Check className="w-4 h-4" /> Ajouté !</> : <><ShoppingCart className="w-4 h-4" /> Ajouter au devis</>}
          </button>
        </div>
      </div>
    </>
  );
}
