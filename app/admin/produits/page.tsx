"use client";

import { useState, useEffect, useCallback } from "react";
import {
  collection, getDocs, addDoc, updateDoc, deleteDoc,
  doc, serverTimestamp, orderBy, query,
} from "firebase/firestore";
import { CldUploadWidget, CldImage } from "next-cloudinary";
import { db } from "@/lib/firebase";
import AdminGuard from "@/components/AdminGuard";
import { Plus, Pencil, Trash2, ImagePlus, X, Save, Package } from "lucide-react";
import { Produit, Categorie, Variante } from "@/types";
import { CATEGORIES_CONFIG } from "@/lib/categories";
import clsx from "clsx";

type FormData = Omit<Produit, "id"> & { id?: string };

const EMPTY_FORM: FormData = {
  nom: "",
  nomAr: "",
  slug: "",
  categorie: "hygiene",
  sousCategorie: "",
  description: "",
  images: [],
  poids: "",
  colis: undefined,
  badge: undefined,
  prixDetail: 0,
  prixGros: 0,
  seuilGros: 10,
  unite: "rouleau",
  disponible: true,
  vedette: false,
  variantes: [],
  variantesLabel: "",
};

const EMPTY_VARIANTE: Variante = { nom: "", prixDetail: 0, prixGros: 0, seuilGros: 10, image: "" };

const UNITES = ["rouleau", "paquet", "unité", "colis", "boîte", "lot", "kg"];

function toSlug(nom: string) {
  return nom
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function ProduitsAdmin() {
  const [produits, setProduits] = useState<Produit[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<FormData>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const snap = await getDocs(query(collection(db, "produits"), orderBy("createdAt", "desc")));
    setProduits(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Produit)));
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const openAdd = () => { setForm(EMPTY_FORM); setShowForm(true); };
  const openEdit = (p: Produit) => { setForm({ ...p }); setShowForm(true); };

  const handleField = (field: keyof FormData, value: unknown) => {
    setForm((f) => {
      const updated = { ...f, [field]: value };
      if (field === "nom") updated.slug = toSlug(value as string);
      if (field === "categorie") updated.sousCategorie = "";
      return updated;
    });
  };

  const currentSousCats =
    CATEGORIES_CONFIG.find((c) => c.slug === form.categorie)?.sousCats ?? [];

  const hasVars = (form.variantes ?? []).length > 0;
  const canSave =
    !!form.nom &&
    (hasVars
      ? form.variantes!.every((v) => v.nom.trim())
      : form.prixDetail > 0 && form.prixGros > 0);

  const handleSave = async () => {
    if (!canSave) return;
    setSaving(true);
    try {
      const hasVariantes = (form.variantes ?? []).length > 0;
      const firstVar = form.variantes?.[0];
      const data = {
        nom: form.nom,
        nomAr: form.nomAr,
        slug: form.slug || toSlug(form.nom),
        categorie: form.categorie,
        sousCategorie: form.sousCategorie,
        description: form.description,
        images: form.images,
        poids: form.poids || "",
        colis: form.colis ? Number(form.colis) : 0,
        badge: form.badge ?? null,
        prixDetail: hasVariantes && firstVar ? Number(firstVar.prixDetail) : Number(form.prixDetail),
        prixGros:   hasVariantes && firstVar ? Number(firstVar.prixGros)   : Number(form.prixGros),
        seuilGros:  hasVariantes && firstVar ? Number(firstVar.seuilGros)  : Number(form.seuilGros),
        unite: form.unite,
        disponible: form.disponible,
        vedette: form.vedette,
        variantes: (form.variantes ?? []).map((v) => ({
          nom: v.nom,
          prixDetail: Number(v.prixDetail),
          prixGros: Number(v.prixGros),
          seuilGros: Number(v.seuilGros),
          image: v.image || "",
        })),
        variantesLabel: form.variantesLabel || "",
      };
      if (form.id) {
        await updateDoc(doc(db, "produits", form.id), data);
      } else {
        await addDoc(collection(db, "produits"), { ...data, createdAt: serverTimestamp() });
      }
      await load();
      setShowForm(false);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, "produits", id));
    setProduits((p) => p.filter((x) => x.id !== id));
    setDeleteId(null);
  };

  return (
    <div className="p-8 max-w-7xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-gray-800">Gestion des produits</h1>
        <button onClick={openAdd} className="btn-primary flex items-center gap-2 text-sm py-2.5">
          <Plus className="w-4 h-4" />
          Ajouter un produit
        </button>
      </div>

      {/* Liste produits */}
      {loading ? (
        <div className="text-center py-16 text-gray-400">Chargement…</div>
      ) : produits.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-200">
          <Package className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-400 text-sm mb-4">Aucun produit — ajoutez votre premier produit</p>
          <button onClick={openAdd} className="btn-primary text-sm py-2">Ajouter</button>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {["Photo", "Produit", "Catégorie", "Prix détail", "Prix gros", "Statut", "Actions"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 font-medium text-gray-500">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {produits.map((p) => (
                <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    {p.images[0] ? (
                      <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-gray-100">
                        <CldImage
                          src={p.images[0]}
                          alt={p.nom}
                          fill
                          className="object-cover"
                          sizes="56px"
                        />
                      </div>
                    ) : (
                      <div className="w-14 h-14 rounded-xl bg-gray-100 flex items-center justify-center">
                        <ImagePlus className="w-4 h-4 text-gray-300" />
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-gray-800">{p.nom}</p>
                    <p className="text-xs text-gray-400">{p.nomAr}</p>
                    <div className="flex items-center gap-2 mt-1">
                      {p.poids && (
                        <span className="text-xs bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded-md font-medium">{p.poids}</span>
                      )}
                      {(p.colis ?? 0) > 0 && (
                        <span className="text-xs bg-amber-50 text-amber-700 px-1.5 py-0.5 rounded-md font-medium">{p.colis} u/colis</span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="bg-emerald-100 text-emerald-700 text-xs px-2 py-0.5 rounded-full capitalize">
                      {p.categorie.replace("-", " ")}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-semibold text-emerald-700">
                    {(p.colis ?? 0) > 0
                      ? <>{(p.prixDetail * (p.colis ?? 1)).toFixed(2)} MAD<span className="text-[10px] text-gray-400 font-normal ml-1">/colis</span></>
                      : <>{p.prixDetail} MAD</>
                    }
                  </td>
                  <td className="px-4 py-3 text-gray-600">{p.prixGros} MAD</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className={clsx("w-2 h-2 rounded-full", p.disponible ? "bg-emerald-400" : "bg-gray-300")} />
                      <span className="text-xs text-gray-500">{p.disponible ? "Disponible" : "Indispo"}</span>
                      {p.vedette && <span className="text-xs bg-yellow-100 text-yellow-700 px-1.5 py-0.5 rounded-full">⭐ Vedette</span>}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openEdit(p)}
                        className="p-1.5 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteId(p.id)}
                        className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Formulaire ajout/édition */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-xl">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="font-bold text-gray-800">{form.id ? "Modifier le produit" : "Nouveau produit"}</h2>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              {/* Photo */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Photo produit</label>
                <div className="flex items-center gap-3 flex-wrap">
                  {form.images[0] && (
                    <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
                      <CldImage src={form.images[0]} alt="" fill className="object-cover" sizes="96px" />
                      <button
                        onClick={() => handleField("images", [])}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                  <CldUploadWidget
                    uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "npit_products"}
                    options={{ folder: "npit", maxFiles: 1, resourceType: "image" }}
                    onSuccess={(result) => {
                      if (result.info && typeof result.info === "object" && "public_id" in result.info) {
                        handleField("images", [result.info.public_id as string]);
                      }
                    }}
                  >
                    {({ open }) => (
                      <button
                        type="button"
                        onClick={() => open()}
                        className="flex flex-col items-center gap-2 w-24 h-24 border-2 border-dashed border-gray-200 rounded-xl hover:border-emerald-400 transition-colors text-gray-400 hover:text-emerald-500"
                      >
                        <ImagePlus className="w-6 h-6 mt-5" />
                        <span className="text-xs">Upload</span>
                      </button>
                    )}
                  </CldUploadWidget>
                </div>
              </div>

              {/* Noms */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nom (FR) *</label>
                  <input
                    value={form.nom}
                    onChange={(e) => handleField("nom", e.target.value)}
                    placeholder="Cellophane Transparent"
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-emerald-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nom (AR)</label>
                  <input
                    value={form.nomAr}
                    onChange={(e) => handleField("nomAr", e.target.value)}
                    placeholder="سولوفان شفاف"
                    dir="rtl"
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-emerald-400"
                  />
                </div>
              </div>

              {/* Catégorie + Sous-catégorie + Unité */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Catégorie *</label>
                  <select
                    value={form.categorie}
                    onChange={(e) => handleField("categorie", e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-nauma-teal bg-white"
                  >
                    {CATEGORIES_CONFIG.map((c) => (
                      <option key={c.slug} value={c.slug}>{c.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sous-catégorie *</label>
                  <select
                    value={form.sousCategorie}
                    onChange={(e) => handleField("sousCategorie", e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-nauma-teal bg-white"
                  >
                    <option value="">— Choisir —</option>
                    {currentSousCats.map((s) => (
                      <option key={s.slug} value={s.slug}>{s.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Unité *</label>
                <select
                  value={form.unite}
                  onChange={(e) => handleField("unite", e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-nauma-teal bg-white"
                >
                  {UNITES.map((u) => <option key={u} value={u}>{u}</option>)}
                </select>
              </div>

              {/* Poids + Colis */}
              <div className="bg-gray-50 rounded-2xl p-4 space-y-3">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Poids & Conditionnement</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Poids / Contenance</label>
                    <input
                      value={form.poids}
                      onChange={(e) => handleField("poids", e.target.value)}
                      placeholder="ex: 350g, 1.2 kg, 30cm×45cm"
                      className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-nauma-teal bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Unités par colis</label>
                    <input
                      type="number"
                      value={form.colis || ""}
                      onChange={(e) => handleField("colis", e.target.value)}
                      placeholder="ex: 6, 12, 24"
                      min="0"
                      className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-nauma-teal bg-white"
                    />
                    <p className="text-xs text-gray-400 mt-1">Combien d&apos;unités dans 1 colis/carton</p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => handleField("description", e.target.value)}
                  rows={3}
                  placeholder="Description détaillée du produit, dimensions, matière, utilisation…"
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-emerald-400 resize-none"
                />
              </div>

              {/* Prix */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Prix / unité (détail) *
                  </label>
                  <input
                    type="number"
                    value={form.prixDetail || ""}
                    onChange={(e) => handleField("prixDetail", e.target.value)}
                    placeholder="0"
                    min="0"
                    step="0.5"
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-emerald-400"
                  />
                  {(form.colis ?? 0) > 0 && (form.prixDetail ?? 0) > 0 && (
                    <p className="text-xs mt-1 text-emerald-700 font-semibold">
                      = {form.prixDetail} × {form.colis} = {((form.prixDetail ?? 0) * (form.colis ?? 0)).toFixed(2)} MAD / colis
                    </p>
                  )}
                  {(form.colis ?? 0) > 0 && !(form.prixDetail ?? 0) && (
                    <p className="text-xs mt-1 text-gray-400">
                      Entrez le prix par unité — le colis sera calculé automatiquement
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Prix gros (MAD) *</label>
                  <input
                    type="number"
                    value={form.prixGros || ""}
                    onChange={(e) => handleField("prixGros", e.target.value)}
                    placeholder="0"
                    min="0"
                    step="0.5"
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-emerald-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Min. quantité gros</label>
                  <input
                    type="number"
                    value={form.seuilGros || ""}
                    onChange={(e) => handleField("seuilGros", e.target.value)}
                    placeholder="50"
                    min="1"
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-emerald-400"
                  />
                </div>
              </div>

              {/* Badge */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Badge produit</label>
                <div className="flex gap-2 flex-wrap">
                  {[
                    { val: undefined, label: "Aucun",      cls: "bg-gray-100 text-gray-500" },
                    { val: "nouveau",    label: "🆕 Nouveau",   cls: "bg-nauma-teal text-white" },
                    { val: "promo",      label: "🔥 Promo",     cls: "bg-red-500 text-white" },
                    { val: "bestseller", label: "⭐ Bestseller", cls: "bg-amber-500 text-white" },
                  ].map((b) => (
                    <button
                      key={String(b.val)}
                      type="button"
                      onClick={() => handleField("badge", b.val)}
                      className={clsx(
                        "px-3 py-1.5 rounded-full text-xs font-bold border-2 transition-all",
                        form.badge === b.val ? "border-nauma-600 scale-105 " + b.cls : "border-transparent " + b.cls + " opacity-60"
                      )}
                    >
                      {b.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* ── Variantes / Types ──────────────────────────── */}
              <div className="border-2 border-blue-100 rounded-2xl overflow-hidden">
                {/* Header toggle */}
                <button
                  type="button"
                  onClick={() => handleField("variantes", hasVars ? [] : [{ ...EMPTY_VARIANTE }])}
                  className="w-full flex items-center justify-between px-4 py-3 bg-blue-50 hover:bg-blue-100 transition-colors"
                >
                  <div className="text-left">
                    <p className="text-sm font-bold text-blue-700">
                      Types / Tailles / Variantes
                      {hasVars && (
                        <span className="ml-2 bg-blue-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                          {form.variantes!.length} type{form.variantes!.length > 1 ? "s" : ""}
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-blue-400 mt-0.5">
                      Ex : 12oz · 14oz · 16oz — Petit · Moyen · Grand — 8m · 30m
                    </p>
                  </div>
                  <div className={clsx(
                    "w-10 h-5 rounded-full transition-colors relative flex-shrink-0",
                    hasVars ? "bg-blue-500" : "bg-gray-200"
                  )}>
                    <div className={clsx(
                      "absolute w-4 h-4 bg-white rounded-full top-0.5 transition-all shadow",
                      hasVars ? "left-5" : "left-0.5"
                    )} />
                  </div>
                </button>

                {hasVars && (
                  <div className="p-4 space-y-4 bg-white">

                    {/* Label affiché au client */}
                    <div>
                      <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-2">
                        Libellé affiché (ex : TAILLE, LONGUEUR, CAPACITÉ)
                      </label>
                      <div className="flex gap-2 flex-wrap mb-2">
                        {["Taille", "Longueur", "Capacité", "Format", "Poids", "Volume", "Épaisseur"].map((preset) => (
                          <button
                            key={preset}
                            type="button"
                            onClick={() => handleField("variantesLabel", preset)}
                            className={clsx(
                              "px-3 py-1 rounded-full text-xs font-semibold border transition-all",
                              form.variantesLabel === preset
                                ? "bg-nauma-600 text-white border-nauma-600"
                                : "bg-white text-gray-500 border-gray-200 hover:border-nauma-600 hover:text-nauma-600"
                            )}
                          >
                            {preset}
                          </button>
                        ))}
                      </div>
                      <input
                        value={form.variantesLabel ?? ""}
                        onChange={(e) => handleField("variantesLabel", e.target.value)}
                        placeholder="Ou tape un libellé personnalisé…"
                        className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-nauma-600"
                      />
                    </div>

                    {/* Liste des types */}
                    <div>
                      <div className="space-y-3">
                        {form.variantes!.map((v, i) => (
                          <div key={i} className="border border-gray-100 rounded-xl p-3 space-y-2 bg-gray-50">
                            {/* Ligne 1 : image + nom */}
                            <div className="flex items-center gap-3">
                              {/* Miniature image */}
                              <div className="relative flex-shrink-0">
                                {v.image ? (
                                  <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-white border border-gray-200">
                                    <CldImage src={v.image} alt={v.nom} fill className="object-contain p-1" sizes="56px" />
                                    <button
                                      type="button"
                                      onClick={() => {
                                        const vars = [...form.variantes!];
                                        vars[i] = { ...vars[i], image: "" };
                                        handleField("variantes", vars);
                                      }}
                                      className="absolute top-0.5 right-0.5 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center"
                                    >
                                      <X className="w-2.5 h-2.5" />
                                    </button>
                                  </div>
                                ) : (
                                  <CldUploadWidget
                                    uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "npit_products"}
                                    options={{ folder: "npit", maxFiles: 1, resourceType: "image" }}
                                    onSuccess={(result) => {
                                      if (result.info && typeof result.info === "object" && "public_id" in result.info) {
                                        const vars = [...form.variantes!];
                                        vars[i] = { ...vars[i], image: result.info.public_id as string };
                                        handleField("variantes", vars);
                                      }
                                    }}
                                  >
                                    {({ open }) => (
                                      <button
                                        type="button"
                                        onClick={() => open()}
                                        className="w-14 h-14 border-2 border-dashed border-gray-200 rounded-lg hover:border-nauma-600 transition-colors flex flex-col items-center justify-center gap-0.5 text-gray-300 hover:text-nauma-600"
                                      >
                                        <ImagePlus className="w-4 h-4" />
                                        <span className="text-[9px]">Photo</span>
                                      </button>
                                    )}
                                  </CldUploadWidget>
                                )}
                              </div>

                              {/* Nom de la variante */}
                              <input
                                value={v.nom}
                                onChange={(e) => {
                                  const vars = [...form.variantes!];
                                  vars[i] = { ...vars[i], nom: e.target.value };
                                  handleField("variantes", vars);
                                }}
                                placeholder="ex: 14oz, Petit, 8m…"
                                className={clsx(
                                  "flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none font-medium",
                                  v.nom.trim() ? "border-gray-200 focus:border-nauma-600" : "border-red-300 focus:border-red-400"
                                )}
                              />

                              {/* Supprimer */}
                              <button
                                type="button"
                                onClick={() => {
                                  const vars = form.variantes!.filter((_, idx) => idx !== i);
                                  handleField("variantes", vars.length ? vars : []);
                                }}
                                className="flex-shrink-0 text-red-300 hover:text-red-500 transition-colors p-1"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>

                            {/* Ligne 2 : prix (optionnel) */}
                            <div className="grid grid-cols-3 gap-2">
                              <div>
                                <label className="block text-[10px] text-gray-400 mb-1">Prix détail</label>
                                <input
                                  type="number"
                                  value={v.prixDetail || ""}
                                  onChange={(e) => {
                                    const vars = [...form.variantes!];
                                    vars[i] = { ...vars[i], prixDetail: Number(e.target.value) };
                                    handleField("variantes", vars);
                                  }}
                                  placeholder="0.00"
                                  min="0" step="0.5"
                                  className="w-full border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-nauma-600"
                                />
                              </div>
                              <div>
                                <label className="block text-[10px] text-gray-400 mb-1">Prix gros</label>
                                <input
                                  type="number"
                                  value={v.prixGros || ""}
                                  onChange={(e) => {
                                    const vars = [...form.variantes!];
                                    vars[i] = { ...vars[i], prixGros: Number(e.target.value) };
                                    handleField("variantes", vars);
                                  }}
                                  placeholder="0.00"
                                  min="0" step="0.5"
                                  className="w-full border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-nauma-600"
                                />
                              </div>
                              <div>
                                <label className="block text-[10px] text-gray-400 mb-1">Min. gros</label>
                                <input
                                  type="number"
                                  value={v.seuilGros || ""}
                                  onChange={(e) => {
                                    const vars = [...form.variantes!];
                                    vars[i] = { ...vars[i], seuilGros: Number(e.target.value) };
                                    handleField("variantes", vars);
                                  }}
                                  placeholder="10"
                                  min="1"
                                  className="w-full border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-nauma-600"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Bouton ajouter */}
                      <button
                        type="button"
                        onClick={() => handleField("variantes", [...form.variantes!, { ...EMPTY_VARIANTE }])}
                        className="mt-3 w-full border-2 border-dashed border-gray-200 hover:border-nauma-600 hover:bg-blue-50 text-gray-400 hover:text-nauma-600 text-xs font-semibold py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        Ajouter un type
                      </button>
                    </div>

                    {/* Note prix globaux */}
                    <p className="text-xs text-gray-400 bg-gray-50 px-3 py-2 rounded-lg">
                      💡 Les champs <strong>Prix détail / gros</strong> sont facultatifs par type — ils servent pour le devis WhatsApp. Sinon les prix globaux s&apos;appliquent.
                    </p>
                  </div>
                )}
              </div>

              {/* Toggles */}
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <div
                    onClick={() => handleField("disponible", !form.disponible)}
                    className={clsx("w-10 h-5 rounded-full transition-colors relative", form.disponible ? "bg-emerald-500" : "bg-gray-200")}
                  >
                    <div className={clsx("absolute w-4 h-4 bg-white rounded-full top-0.5 transition-all shadow", form.disponible ? "left-5" : "left-0.5")} />
                  </div>
                  <span className="text-sm text-gray-700">Disponible</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <div
                    onClick={() => handleField("vedette", !form.vedette)}
                    className={clsx("w-10 h-5 rounded-full transition-colors relative", form.vedette ? "bg-yellow-400" : "bg-gray-200")}
                  >
                    <div className={clsx("absolute w-4 h-4 bg-white rounded-full top-0.5 transition-all shadow", form.vedette ? "left-5" : "left-0.5")} />
                  </div>
                  <span className="text-sm text-gray-700">⭐ Vedette (page d&apos;accueil)</span>
                </label>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 px-6 pb-6">
              <button onClick={() => setShowForm(false)} className="px-4 py-2.5 text-sm text-gray-600 hover:text-gray-800 transition-colors">
                Annuler
              </button>
              <button
                onClick={handleSave}
                disabled={saving || !canSave}
                className="btn-primary flex items-center gap-2 text-sm py-2.5 disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                {saving ? "Enregistrement…" : "Enregistrer"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation suppression */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-80 shadow-xl">
            <h3 className="font-bold text-gray-800 mb-2">Supprimer ce produit ?</h3>
            <p className="text-sm text-gray-500 mb-5">Cette action est irréversible.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 border border-gray-200 rounded-xl py-2.5 text-sm text-gray-600 hover:bg-gray-50">
                Annuler
              </button>
              <button onClick={() => handleDelete(deleteId)} className="flex-1 bg-red-500 hover:bg-red-600 text-white rounded-xl py-2.5 text-sm font-medium transition-colors">
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminProduitsPage() {
  return (
    <AdminGuard>
      <ProduitsAdmin />
    </AdminGuard>
  );
}
