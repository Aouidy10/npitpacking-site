"use client";

import { useState, useEffect, useCallback } from "react";
import {
  collection, getDocs, orderBy, query, doc, updateDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
  RefreshCw, Clock, CheckCircle, Truck, MessageCircle,
  Download, ShoppingBag, FileText, TrendingUp, AlertCircle,
} from "lucide-react";
import AdminGuard from "@/components/AdminGuard";
import Link from "next/link";
import clsx from "clsx";

type Statut = "en-attente" | "confirmee" | "livree";

interface Devis {
  id: string;
  nom: string;
  telephone: string;
  ville: string;
  produit: string;
  quantite: number;
  message?: string;
  statut: Statut;
  createdAt: { toDate: () => Date } | null;
}

const STATUTS: { value: Statut; label: string; color: string }[] = [
  { value: "en-attente", label: "En attente", color: "bg-orange-100 text-orange-700" },
  { value: "confirmee",  label: "Confirmée",  color: "bg-blue-100 text-blue-700" },
  { value: "livree",     label: "Livrée",     color: "bg-emerald-100 text-emerald-700" },
];

function Dashboard() {
  const [devis, setDevis]           = useState<Devis[]>([]);
  const [nbProduits, setNbProduits] = useState<number | null>(null);
  const [loading, setLoading]       = useState(false);
  const [filtre, setFiltre]         = useState<Statut | "tous">("tous");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [devisSnap, produitsSnap] = await Promise.all([
        getDocs(query(collection(db, "devis"), orderBy("createdAt", "desc"))),
        getDocs(collection(db, "produits")),
      ]);
      setDevis(devisSnap.docs.map((d) => ({ id: d.id, ...d.data() } as Devis)));
      setNbProduits(produitsSnap.size);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleStatut = async (id: string, statut: Statut) => {
    await updateDoc(doc(db, "devis", id), { statut });
    setDevis((prev) => prev.map((d) => (d.id === id ? { ...d, statut } : d)));
  };

  const total       = devis.length;
  const enAttente   = devis.filter((d) => d.statut === "en-attente").length;
  const confirmees  = devis.filter((d) => d.statut === "confirmee").length;
  const livrees     = devis.filter((d) => d.statut === "livree").length;

  const aujourd = new Date(); aujourd.setHours(0, 0, 0, 0);
  const hier    = new Date(aujourd); hier.setDate(hier.getDate() - 1);
  const semaine = new Date(aujourd); semaine.setDate(semaine.getDate() - 7);
  const mois    = new Date(aujourd); mois.setDate(1);

  const devisAujourdhui  = devis.filter((d) => { const dt = d.createdAt?.toDate?.(); return dt && dt >= aujourd; }).length;
  const devisHier        = devis.filter((d) => { const dt = d.createdAt?.toDate?.(); return dt && dt >= hier && dt < aujourd; }).length;
  const devisSemaine     = devis.filter((d) => { const dt = d.createdAt?.toDate?.(); return dt && dt >= semaine; }).length;
  const devisMois        = devis.filter((d) => { const dt = d.createdAt?.toDate?.(); return dt && dt >= mois; }).length;

  const devisFiltres = filtre === "tous" ? devis : devis.filter((d) => d.statut === filtre);

  const exportCSV = (data: Devis[]) => {
    const esc  = (v: string | number | undefined) => `"${String(v ?? "").replace(/"/g, '""')}"`;
    const rows = data.map((d) => [
      esc(d.nom), esc(d.telephone), esc(d.ville), esc(d.produit),
      esc(d.quantite), esc(d.message),
      esc(d.createdAt?.toDate?.()?.toLocaleDateString("fr-MA") ?? ""),
      esc(STATUTS.find((s) => s.value === d.statut)?.label ?? d.statut),
    ].join(";"));
    const csv  = "﻿" + [["Nom","Téléphone","Ville","Produit","Qté","Message","Date","Statut"].join(";"), ...rows].join("\r\n");
    const a    = Object.assign(document.createElement("a"), {
      href: URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8;" })),
      download: `commandes-npit-${new Date().toISOString().slice(0, 10)}.csv`,
    });
    a.click();
  };

  const waUrl = (d: Devis) =>
    `https://wa.me/${d.telephone.replace(/\D/g, "")}?text=${encodeURIComponent(
      `Bonjour ${d.nom}, concernant votre demande pour ${d.produit} (${d.quantite} unités).`
    )}`;

  return (
    <div className="p-8 max-w-7xl">

      {/* ── En-tête ── */}
      <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Tableau de bord</h1>
          <p className="text-sm text-gray-400 mt-0.5">Vue d&apos;ensemble de votre activité</p>
        </div>
        <button
          onClick={load}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-nauma-600 transition-colors border border-gray-200 px-3 py-2 rounded-lg bg-white"
        >
          <RefreshCw className={clsx("w-4 h-4", loading && "animate-spin")} />
          Actualiser
        </button>
      </div>

      {/* ── KPIs ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          {
            icon: FileText, label: "Total devis", value: total,
            sub: `${devisAujourdhui} aujourd'hui · ${devisHier} hier`,
            color: "text-nauma-600", bg: "bg-nauma-50",
          },
          {
            icon: AlertCircle, label: "En attente", value: enAttente,
            sub: enAttente > 0 ? "À traiter" : "Tout est traité ✓",
            color: "text-orange-500", bg: "bg-orange-50",
          },
          {
            icon: CheckCircle, label: "Confirmées", value: confirmees,
            sub: `${livrees} livrée${livrees > 1 ? "s" : ""}`,
            color: "text-blue-500", bg: "bg-blue-50",
          },
          {
            icon: TrendingUp, label: "Cette semaine", value: devisSemaine,
            sub: `${devisMois} ce mois`,
            color: "text-emerald-500", bg: "bg-emerald-50",
          },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className={clsx("w-10 h-10 rounded-xl flex items-center justify-center mb-4", s.bg)}>
              <s.icon className={clsx("w-5 h-5", s.color)} />
            </div>
            <p className="text-xs text-gray-400 mb-1">{s.label}</p>
            <p className={clsx("text-3xl font-bold mb-1", s.color)}>{s.value}</p>
            <p className="text-xs text-gray-400">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* ── Produits + Déconnexion rapide ── */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center flex-shrink-0">
            <ShoppingBag className="w-5 h-5 text-purple-500" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-gray-400">Produits en catalogue</p>
            <p className="text-3xl font-bold text-purple-500">
              {nbProduits === null ? "…" : nbProduits}
            </p>
          </div>
          <Link href="/admin/produits" className="text-xs font-semibold text-nauma-600 hover:underline flex-shrink-0">
            Gérer →
          </Link>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center flex-shrink-0">
            <Truck className="w-5 h-5 text-green-500" />
          </div>
          <div>
            <p className="text-xs text-gray-400">Livraisons effectuées</p>
            <p className="text-3xl font-bold text-green-500">{livrees}</p>
          </div>
        </div>
      </div>

      {/* ── Tableau des devis ── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 flex-wrap gap-3">
          <h2 className="font-bold text-gray-800">Commandes & Devis</h2>
          <div className="flex items-center gap-2 flex-wrap">
            {/* Filtres */}
            <div className="flex gap-1">
              {[{ value: "tous", label: `Tous (${total})` }, ...STATUTS.map((s) => ({ value: s.value, label: s.label }))].map((f) => (
                <button
                  key={f.value}
                  onClick={() => setFiltre(f.value as Statut | "tous")}
                  className={clsx(
                    "px-3 py-1 rounded-full text-xs font-medium border transition-all",
                    filtre === f.value ? "bg-nauma-600 text-white border-nauma-600" : "bg-white text-gray-600 border-gray-200 hover:border-nauma-600"
                  )}
                >
                  {f.label}
                </button>
              ))}
            </div>
            {/* Export */}
            <button
              onClick={() => exportCSV(devisFiltres)}
              disabled={devisFiltres.length === 0}
              className="flex items-center gap-1.5 text-xs font-medium bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white px-3 py-1.5 rounded-lg transition-colors"
            >
              <Download className="w-3 h-3" />
              Exporter
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-16 text-gray-400">Chargement…</div>
        ) : devisFiltres.length === 0 ? (
          <div className="text-center py-16 text-gray-400">Aucun devis.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  {["Nom", "Téléphone", "Ville", "Produit", "Qté", "Date", "Statut", "Action"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 font-medium text-gray-500 whitespace-nowrap text-xs">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {devisFiltres.map((d) => {
                  const statutInfo = STATUTS.find((s) => s.value === d.statut) ?? STATUTS[0];
                  return (
                    <tr key={d.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 font-medium whitespace-nowrap">{d.nom}</td>
                      <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{d.telephone}</td>
                      <td className="px-4 py-3 text-gray-500">{d.ville}</td>
                      <td className="px-4 py-3 text-gray-600 max-w-[160px] truncate">{d.produit}</td>
                      <td className="px-4 py-3 text-gray-600 text-center">{d.quantite}</td>
                      <td className="px-4 py-3 text-gray-400 text-xs whitespace-nowrap">
                        {d.createdAt?.toDate?.()?.toLocaleDateString("fr-MA") ?? "—"}
                      </td>
                      <td className="px-4 py-3">
                        <select
                          value={d.statut}
                          onChange={(e) => handleStatut(d.id, e.target.value as Statut)}
                          className={clsx("text-xs px-2 py-1 rounded-full font-medium border-0 cursor-pointer outline-none", statutInfo.color)}
                        >
                          {STATUTS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                        </select>
                      </td>
                      <td className="px-4 py-3">
                        <a
                          href={waUrl(d)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white text-xs px-2.5 py-1.5 rounded-lg transition-colors whitespace-nowrap w-fit"
                        >
                          <MessageCircle className="w-3 h-3" />
                          WA
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}

export default function AdminPage() {
  return (
    <AdminGuard>
      <Dashboard />
    </AdminGuard>
  );
}
