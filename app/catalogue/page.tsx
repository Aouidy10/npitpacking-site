"use client";

import { useState, useMemo, Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import ProductCard from "@/components/ProductCard";
import { PRODUITS_DEMO } from "@/lib/produits";
import { Produit, Categorie } from "@/types";
import clsx from "clsx";

const CATEGORIES: { slug: Categorie | "tous"; label: string }[] = [
  { slug: "tous", label: "Tous" },
  { slug: "cellophane", label: "Cellophane" },
  { slug: "serviettes", label: "Serviettes" },
  { slug: "papier-cuisson", label: "Papier Cuisson" },
  { slug: "sacs", label: "Sacs & Rouleaux" },
];

const VALID_CATS: (Categorie | "tous")[] = ["cellophane", "serviettes", "papier-cuisson", "sacs"];

function CatalogueContent() {
  const searchParams = useSearchParams();
  const paramCat = searchParams.get("cat") as Categorie | null;
  const initialCat: Categorie | "tous" = paramCat && VALID_CATS.includes(paramCat) ? paramCat : "tous";

  const [categorie, setCategorie] = useState<Categorie | "tous">(initialCat);
  const [mode, setMode] = useState<"detail" | "gros">("detail");
  const [produits, setProduits] = useState<Produit[]>(PRODUITS_DEMO);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const snap = await getDocs(collection(db, "produits"));
        if (!snap.empty) {
          setProduits(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Produit)));
        }
      } catch {
        // Firestore indisponible → garder PRODUITS_DEMO
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const produitsFiltres = useMemo(
    () => (categorie === "tous" ? produits : produits.filter((p) => p.categorie === categorie)),
    [categorie, produits]
  );

  return (
    <div className="container-main py-10">
      <h1 className="section-title mb-2">Catalogue</h1>
      <p className="text-gray-500 mb-8">Tous nos produits d&apos;emballage — détail et gros.</p>

      {/* Filtres */}
      <div className="flex flex-wrap gap-3 mb-6">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.slug}
            onClick={() => setCategorie(cat.slug)}
            className={clsx(
              "px-4 py-2 rounded-full text-sm font-medium border transition-all",
              categorie === cat.slug
                ? "bg-emerald-600 text-white border-emerald-600"
                : "bg-white text-gray-600 border-gray-200 hover:border-emerald-400"
            )}
          >
            {cat.label}
          </button>
        ))}
        <div className="ml-auto flex bg-gray-100 rounded-full p-0.5 text-sm">
          <button
            onClick={() => setMode("detail")}
            className={clsx("px-4 py-1.5 rounded-full font-medium transition-all", mode === "detail" ? "bg-white text-emerald-700 shadow-sm" : "text-gray-500")}
          >
            Détail
          </button>
          <button
            onClick={() => setMode("gros")}
            className={clsx("px-4 py-1.5 rounded-full font-medium transition-all", mode === "gros" ? "bg-white text-emerald-700 shadow-sm" : "text-gray-500")}
          >
            Gros
          </button>
        </div>
      </div>

      <p className="text-sm text-gray-400 mb-4">
        {loading ? "Chargement…" : `${produitsFiltres.length} produit${produitsFiltres.length > 1 ? "s" : ""}`}
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
