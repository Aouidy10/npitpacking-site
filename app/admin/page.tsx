"use client";

import { useState, useEffect, useCallback } from "react";
import { collection, getDocs, orderBy, query, doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { RefreshCw, Clock, CheckCircle, TruckIcon, Users, MessageCircle } from "lucide-react";
import AdminGuard from "@/components/AdminGuard";
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
  { value: "confirmee", label: "Confirmée", color: "bg-blue-100 text-blue-700" },
  { value: "livree", label: "Livrée", color: "bg-emerald-100 text-emerald-700" },
];

function CommandesDashboard() {
  const [devis, setDevis] = useState<Devis[]>([]);
  const [loading, setLoading] = useState(false);
  const [filtre, setFiltre] = useState<Statut | "tous">("tous");

  const loadDevis = useCallback(async () => {
    setLoading(true);
    try {
      const q = query(collection(db, "devis"), orderBy("createdAt", "desc"));
      const snap = await getDocs(q);
      setDevis(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Devis)));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadDevis(); }, [loadDevis]);

  const handleStatut = async (id: string, statut: Statut) => {
    await updateDoc(doc(db, "devis", id), { statut });
    setDevis((prev) => prev.map((d) => (d.id === id ? { ...d, statut } : d)));
  };

  const total = devis.length;
  const enAttente = devis.filter((d) => d.statut === "en-attente").length;
  const confirmees = devis.filter((d) => d.statut === "confirmee").length;
  const livrees = devis.filter((d) => d.statut === "livree").length;
  const cettesSemaine = devis.filter((d) => {
    const date = d.createdAt?.toDate?.();
    if (!date) return false;
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return date >= weekAgo;
  }).length;

  const devisFiltres = filtre === "tous" ? devis : devis.filter((d) => d.statut === filtre);

  const whatsappUrl = (d: Devis) =>
    `https://wa.me/${d.telephone.replace(/\D/g, "")}?text=${encodeURIComponent(
      `Bonjour ${d.nom}, concernant votre demande de devis pour ${d.produit} (${d.quantite} unités).`
    )}`;

  return (
    <div className="container-main py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-gray-800">Commandes & Devis</h1>
        <button onClick={loadDevis} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-emerald-600 transition-colors">
          <RefreshCw className={clsx("w-4 h-4", loading && "animate-spin")} />
          Actualiser
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { icon: Users, label: "Total devis", value: total, color: "text-emerald-600", bg: "bg-emerald-50" },
          { icon: Clock, label: "En attente", value: enAttente, color: "text-orange-500", bg: "bg-orange-50" },
          { icon: CheckCircle, label: "Confirmées", value: confirmees, color: "text-blue-500", bg: "bg-blue-50" },
          { icon: TruckIcon, label: "Cette semaine", value: cettesSemaine, color: "text-purple-500", bg: "bg-purple-50" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className={clsx("w-9 h-9 rounded-xl flex items-center justify-center mb-3", s.bg)}>
              <s.icon className={clsx("w-4 h-4", s.color)} />
            </div>
            <p className="text-xs text-gray-500 mb-1">{s.label}</p>
            <p className={clsx("text-3xl font-bold", s.color)}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Filtres */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {[{ value: "tous", label: `Tous (${total})` }, ...STATUTS.map((s) => ({ value: s.value, label: s.label }))].map((f) => (
          <button
            key={f.value}
            onClick={() => setFiltre(f.value as Statut | "tous")}
            className={clsx(
              "px-3 py-1.5 rounded-full text-xs font-medium border transition-all",
              filtre === f.value ? "bg-emerald-600 text-white border-emerald-600" : "bg-white text-gray-600 border-gray-200 hover:border-emerald-400"
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="text-center py-16 text-gray-400">Chargement…</div>
        ) : devisFiltres.length === 0 ? (
          <div className="text-center py-16 text-gray-400">Aucun devis.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  {["Nom", "Téléphone", "Ville", "Produit", "Qté", "Message", "Date", "Statut", "Action"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 font-medium text-gray-500 whitespace-nowrap">{h}</th>
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
                      <td className="px-4 py-3 text-gray-600">{d.ville}</td>
                      <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{d.produit}</td>
                      <td className="px-4 py-3 text-gray-600 text-center">{d.quantite}</td>
                      <td className="px-4 py-3 text-gray-400 max-w-xs truncate">{d.message || "—"}</td>
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
                          href={whatsappUrl(d)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white text-xs px-2.5 py-1.5 rounded-lg transition-colors whitespace-nowrap"
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
      <p className="text-xs text-gray-400 text-center mt-4">{livrees} commande{livrees > 1 ? "s" : ""} livrée{livrees > 1 ? "s" : ""} au total</p>
    </div>
  );
}

export default function AdminPage() {
  return (
    <AdminGuard>
      <CommandesDashboard />
    </AdminGuard>
  );
}
