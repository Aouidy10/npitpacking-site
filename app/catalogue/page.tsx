"use client";

import { useState, useMemo, Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import ProductCard from "@/components/ProductCard";
import { PRODUITS_DEMO } from "@/lib/produits";
import { CATEGORIES_CONFIG } from "@/lib/categories";
import { Produit, Categorie } from "@/types";
import clsx from "clsx";
import { ChevronRight } from "lucide-react";

const VALID_CATS = CATEGORIES_CONFIG.map((c) => c.slug) as Categorie[];

function CatalogueContent() {
  const searchParams = useSearchParams();
  const paramCat = searchParams.get("cat") as Categorie | null;
  const paramSub = searchParams.get("sub") ?? "";

  const initialCat: Categorie | "tous" =
    paramCat && VALID_CATS.includes(paramCat) ? paramCat : "tous";

  const [categorie, setCategorie]       = useState<Categorie | "tous">(initialCat);
  const [sousCategorie, setSousCategorie] = useState<string>(paramSub);
  const [mode, setMode]                 = useState<"detail" | "gros">("detail");
  const [produits, setProduits]         = useState<Produit[]>(PRODUITS_DEMO);
  const [loading, setLoading]           = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const snap = await getDocs(collection(db, "produits"));
        if (!snap.empty)
          setProduits(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Produit)));
      } catch { /* Firestore indisponible → garder PRODUITS_DEMO */ }
      finally { setLoading(false); }
    })();
  }, []);

  const handleMainCat = (slug: Categorie | "tous") => {
    setCategorie(slug);
    setSousCategorie("");
  };

  const sousCats =
    categorie !== "tous"
      ? CATEGORIES_CONFIG.find((c) => c.slug === categorie)?.sousCats ?? []
      : [];

  const produitsFiltres = useMemo(() => {
    let list = produits;
    if (categorie !== "tous") list = list.filter((p) => p.categorie === categorie);
    if (sousCategorie)         list = list.filter((p) => p.sousCategorie === sousCategorie);
    return list;
  }, [categorie, sousCategorie, produits]);

  const mainCatLabel =
    categorie !== "tous"
      ? CATEGORIES_CONFIG.find((c) => c.slug === categorie)?.label
      : null;

  const subCatLabel = sousCategorie
    ? sousCats.find((s) => s.slug === sousCategorie)?.label
    : null;

  return (
    <div className="container-main py-10">
      {/* Header + breadcrumb */}
      <div className="mb-6">
        <h1 className="section-title mb-1">Catalogue</h1>
        <div className="flex items-center gap-1 text-sm text-gray-400">
          <button onClick={() => handleMainCat("tous")} className="hover:text-nauma-600 transition-colors">
            Tous les produits
          </button>
          {mainCatLabel && (
            <>
              <ChevronRight className="w-3.5 h-3.5" />
              <button
                onClick={() => setSousCategorie("")}
                className="hover:text-nauma-600 transition-colors"
              >
                {mainCatLabel}
              </button>
            </>
          )}
          {subCatLabel && (
            <>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-gray-700">{subCatLabel}</span>
            </>
          )}
        </div>
      </div>

      {/* Filtre catégories principales */}
      <div className="flex flex-wrap gap-2 mb-3">
        <button
          onClick={() => handleMainCat("tous")}
          className={clsx(
            "px-4 py-2 rounded-full text-sm font-medium border transition-all",
            categorie === "tous"
              ? "bg-nauma-600 text-white border-nauma-600"
              : "bg-white text-gray-600 border-gray-200 hover:border-nauma-600 hover:text-nauma-600"
          )}
        >
          Tous
        </button>
        {CATEGORIES_CONFIG.map((cat) => (
          <button
            key={cat.slug}
            onClick={() => handleMainCat(cat.slug)}
            className={clsx(
              "px-4 py-2 rounded-full text-sm font-medium border transition-all",
              categorie === cat.slug
                ? "bg-nauma-600 text-white border-nauma-600"
                : "bg-white text-gray-600 border-gray-200 hover:border-nauma-600 hover:text-nauma-600"
            )}
          >
            {cat.label}
          </button>
        ))}

        {/* Toggle Détail / Gros */}
        <div className="ml-auto flex bg-gray-100 rounded-full p-0.5 text-sm">
          <button
            onClick={() => setMode("detail")}
            className={clsx(
              "px-4 py-1.5 rounded-full font-medium transition-all",
              mode === "detail" ? "bg-white text-nauma-700 shadow-sm" : "text-gray-500"
            )}
          >
            Détail
          </button>
          <button
            onClick={() => setMode("gros")}
            className={clsx(
              "px-4 py-1.5 rounded-full font-medium transition-all",
              mode === "gros" ? "bg-white text-nauma-700 shadow-sm" : "text-gray-500"
            )}
          >
            Gros
          </button>
        </div>
      </div>

      {/* Filtre sous-catégories */}
      {sousCats.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6 pl-1 border-l-2 border-nauma-teal">
          <button
            onClick={() => setSousCategorie("")}
            className={clsx(
              "px-3 py-1 rounded-full text-xs font-medium border transition-all",
              !sousCategorie
                ? "bg-nauma-teal text-white border-nauma-teal"
                : "bg-white text-gray-500 border-gray-200 hover:border-nauma-teal hover:text-nauma-teal"
            )}
          >
            Tous
          </button>
          {sousCats.map((sub) => (
            <button
              key={sub.slug}
              onClick={() => setSousCategorie(sub.slug)}
              className={clsx(
                "px-3 py-1 rounded-full text-xs font-medium border transition-all",
                sousCategorie === sub.slug
                  ? "bg-nauma-teal text-white border-nauma-teal"
                  : "bg-white text-gray-500 border-gray-200 hover:border-nauma-teal hover:text-nauma-teal"
              )}
            >
              {sub.label}
            </button>
          ))}
        </div>
      )}

      <p className="text-sm text-gray-400 mb-4">
        {loading
          ? "Chargement…"
          : `${produitsFiltres.length} produit${produitsFiltres.length > 1 ? "s" : ""}`}
      </p>

      {produitsFiltres.length === 0 ? (
        <div className="text-center py-20 text-gray-400">Aucun produit dans cette catégorie.</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {produitsFiltres.map((p) => (
            <ProductCard key={p.id} produit={p} defaultMode={mode} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function CataloguePage() {
  return (
    <Suspense fallback={<div className="container-main py-10 text-gray-400">Chargement du catalogue…</div>}>
      <CatalogueContent />
    </Suspense>
  );
}
