"use client";

import { useState, useMemo, Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import ProductCard from "@/components/ProductCard";
import { PRODUITS_DEMO } from "@/lib/produits";
import { CATEGORIES_CONFIG } from "@/lib/categories";
import { ACTIVITE_CATS, getActivite } from "@/lib/activites";
import { Produit, Categorie } from "@/types";
import clsx from "clsx";
import { ChevronRight, Search, SlidersHorizontal, X } from "lucide-react";

const VALID_CATS = CATEGORIES_CONFIG.map((c) => c.slug) as Categorie[];

const TRI_OPTIONS = [
  { value: "default", label: "Tri par défaut" },
  { value: "az",      label: "Nom A → Z" },
  { value: "za",      label: "Nom Z → A" },
  { value: "nouveau", label: "Nouveautés" },
];

function CatalogueContent() {
  const searchParams = useSearchParams();
  const paramCat    = searchParams.get("cat") as Categorie | null;
  const paramSub    = searchParams.get("sub") ?? "";
  const paramActivite = searchParams.get("activite") ?? "";

  const activiteInfo   = getActivite(paramActivite);
  const activiteCats   = paramActivite ? (ACTIVITE_CATS[paramActivite] ?? null) : null;

  const initialCat: Categorie | "tous" =
    paramCat && VALID_CATS.includes(paramCat) ? paramCat : "tous";

  const [categorie, setCategorie]         = useState<Categorie | "tous">(initialCat);
  const [sousCategorie, setSousCategorie] = useState<string>(paramSub);
  const [produits, setProduits]           = useState<Produit[]>(PRODUITS_DEMO);
  const [loading, setLoading]             = useState(true);
  const [search, setSearch]               = useState("");
  const [tri, setTri]                     = useState("default");
  const [catOpen, setCatOpen]             = useState<Record<string, boolean>>({});
  const [sidebarOpen, setSidebarOpen]     = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const snap = await getDocs(collection(db, "produits"));
        if (!snap.empty)
          setProduits(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Produit)));
      } catch { /* garder PRODUITS_DEMO */ }
      finally { setLoading(false); }
    })();
  }, []);

  const handleMainCat = (slug: Categorie | "tous") => {
    setCategorie(slug);
    setSousCategorie("");
  };

  const toggleCatOpen = (slug: string) =>
    setCatOpen((prev) => ({ ...prev, [slug]: !prev[slug] }));

  const sousCats =
    categorie !== "tous"
      ? CATEGORIES_CONFIG.find((c) => c.slug === categorie)?.sousCats ?? []
      : [];

  const produitsFiltres = useMemo(() => {
    let list = produits;
    // Filtre par activité (si pas de catégorie spécifique sélectionnée)
    if (activiteCats && categorie === "tous")
      list = list.filter((p) => activiteCats.includes(p.categorie));
    if (categorie !== "tous") list = list.filter((p) => p.categorie === categorie);
    if (sousCategorie)        list = list.filter((p) => p.sousCategorie === sousCategorie);
    if (search.trim().length >= 2) {
      const q = search.toLowerCase();
      list = list.filter((p) =>
        p.nom.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    }
    if (tri === "az")      list = [...list].sort((a, b) => a.nom.localeCompare(b.nom));
    if (tri === "za")      list = [...list].sort((a, b) => b.nom.localeCompare(a.nom));
    if (tri === "nouveau") list = [...list].filter((p) => p.badge === "nouveau").concat(list.filter((p) => p.badge !== "nouveau"));
    return list;
  }, [categorie, sousCategorie, produits, search, tri]);

  const mainCatLabel =
    categorie !== "tous"
      ? CATEGORIES_CONFIG.find((c) => c.slug === categorie)?.label
      : null;

  const subCatLabel = sousCategorie
    ? sousCats.find((s) => s.slug === sousCategorie)?.label
    : null;

  /* ── Sidebar (partagé desktop + mobile) ── */
  const Sidebar = () => (
    <div className="space-y-1">
      {/* Barre de recherche */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Rechercher des produits"
          className="w-full pl-9 pr-3 py-2 border border-gray-200 text-sm placeholder-gray-400 focus:outline-none focus:border-nauma-600 rounded-sm"
        />
      </div>

      <p className="text-sm font-bold text-gray-700 mb-3">Nos Produits</p>

      {/* Tous */}
      <button
        onClick={() => { handleMainCat("tous"); setSidebarOpen(false); }}
        className={clsx(
          "w-full text-left text-sm py-1.5 px-2 transition-colors",
          categorie === "tous" ? "text-nauma-600 font-semibold" : "text-gray-500 hover:text-nauma-600"
        )}
      >
        Tous les produits
      </button>

      {/* Catégories avec sous-catégories */}
      {CATEGORIES_CONFIG.map((cat) => {
        const isActive = categorie === cat.slug;
        const isOpen   = catOpen[cat.slug] ?? isActive;
        return (
          <div key={cat.slug}>
            <button
              onClick={() => {
                handleMainCat(cat.slug);
                toggleCatOpen(cat.slug);
                setSidebarOpen(false);
              }}
              className={clsx(
                "w-full flex items-center justify-between text-sm py-1.5 px-2 transition-colors",
                isActive ? "text-nauma-600 font-semibold" : "text-gray-500 hover:text-nauma-600"
              )}
            >
              <span>{cat.label}</span>
              {cat.sousCats.length > 0 && (
                <ChevronRight className={clsx("w-3.5 h-3.5 transition-transform", isOpen && "rotate-90")} />
              )}
            </button>

            {/* Sous-catégories */}
            {isOpen && cat.sousCats.map((sub) => (
              <button
                key={sub.slug}
                onClick={() => { setSousCategorie(sub.slug); setCategorie(cat.slug); setSidebarOpen(false); }}
                className={clsx(
                  "w-full text-left text-xs py-1.5 pl-5 pr-2 flex items-center gap-1.5 transition-colors",
                  sousCategorie === sub.slug
                    ? "text-nauma-600 font-semibold"
                    : "text-gray-400 hover:text-nauma-600"
                )}
              >
                <span className="w-1 h-1 rounded-full bg-current flex-shrink-0" />
                {sub.label}
              </button>
            ))}
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="container-main py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1 text-xs text-gray-400 mb-6">
        <button onClick={() => handleMainCat("tous")} className="hover:text-nauma-600">Catalogue</button>
        {mainCatLabel && (
          <>
            <ChevronRight className="w-3 h-3" />
            <button onClick={() => setSousCategorie("")} className="hover:text-nauma-600">{mainCatLabel}</button>
          </>
        )}
        {subCatLabel && (
          <>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gray-700">{subCatLabel}</span>
          </>
        )}
      </div>

      <div className="flex gap-8">

        {/* ─── Sidebar desktop ───────────────────────────── */}
        <aside className="hidden md:block w-56 flex-shrink-0">
          <Sidebar />
        </aside>

        {/* ─── Contenu principal ─────────────────────────── */}
        <div className="flex-1 min-w-0">

          {/* Bannière activité sélectionnée */}
          {activiteInfo && (
            <div className="flex items-center justify-between gap-3 mb-4 bg-nauma-600/5 border border-nauma-600/20 rounded-xl px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">{activiteInfo.emoji}</span>
                <div>
                  <p className="text-sm font-bold text-nauma-600 leading-none">
                    Produits pour {activiteInfo.label}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">Sélection adaptée à votre activité</p>
                </div>
              </div>
              <a
                href="/catalogue"
                className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 transition-colors whitespace-nowrap"
              >
                <X className="w-3.5 h-3.5" />
                Tout afficher
              </a>
            </div>
          )}

          {/* Barre du haut : count + filtre mobile + tri */}
          <div className="flex items-center justify-between mb-5 gap-3">
            <p className="text-sm text-gray-400">
              {loading
                ? "Chargement…"
                : `Affichage de 1–${produitsFiltres.length} sur ${produitsFiltres.length} résultat${produitsFiltres.length > 1 ? "s" : ""}`}
            </p>

            <div className="flex items-center gap-2">
              {/* Bouton sidebar mobile */}
              <button
                className="md:hidden flex items-center gap-1.5 border border-gray-200 px-3 py-1.5 text-xs text-gray-600"
                onClick={() => setSidebarOpen(true)}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                Filtrer
              </button>

              {/* Tri */}
              <select
                value={tri}
                onChange={(e) => setTri(e.target.value)}
                className="border border-gray-200 text-sm px-3 py-1.5 text-gray-600 focus:outline-none focus:border-nauma-600"
              >
                {TRI_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Grille produits */}
          {produitsFiltres.length === 0 ? (
            <div className="py-24 text-center text-gray-400 text-sm">
              Aucun produit dans cette catégorie.
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {produitsFiltres.map((p) => (
                <ProductCard key={p.id} produit={p} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ─── Sidebar mobile (drawer) ─────────────────────── */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setSidebarOpen(false)} />
          <div className="relative bg-white w-72 h-full overflow-y-auto p-5 shadow-2xl">
            <div className="flex items-center justify-between mb-5">
              <p className="font-bold text-gray-800">Filtrer</p>
              <button onClick={() => setSidebarOpen(false)} className="text-gray-400 text-xl leading-none">✕</button>
            </div>
            <Sidebar />
          </div>
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
