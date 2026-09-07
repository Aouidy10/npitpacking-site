"use client";

import { useState } from "react";
import { CheckCircle, Loader2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const PRODUITS_OPTIONS = [
  "Cellophane transparent",
  "Cellophane coloré",
  "Serviettes blanches",
  "Serviettes colorées",
  "Papier cuisson",
  "Sacs kraft",
  "Sacs plastique",
  "Rouleaux",
  "Autre",
];

const VILLES = [
  "Casablanca", "Rabat", "Marrakech", "Fès", "Tanger", "Agadir",
  "Meknès", "Oujda", "Kenitra", "Tétouan", "Safi", "El Jadida", "Autre",
];

type FormState = "idle" | "loading" | "success" | "error";

export default function DevisPage() {
  const { t } = useLanguage();
  const [form, setForm] = useState({
    nom: "",
    telephone: "",
    ville: "",
    produit: "",
    quantite: "",
    message: "",
  });
  const [state, setState] = useState<FormState>("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("loading");
    try {
      const res = await fetch("/api/devis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setState("success");
      setForm({ nom: "", telephone: "", ville: "", produit: "", quantite: "", message: "" });
    } catch {
      setState("error");
    }
  };

  if (state === "success") {
    return (
      <div className="container-main py-20 flex flex-col items-center text-center gap-4">
        <CheckCircle className="w-16 h-16 text-emerald-500" />
        <h2 className="text-2xl font-bold text-gray-800">{t("devis.success.title")}</h2>
        <p className="text-gray-500 max-w-sm">{t("devis.success.desc")}</p>
        <button
          onClick={() => setState("idle")}
          className="mt-4 btn-primary"
        >
          {t("devis.newRequest")}
        </button>
      </div>
    );
  }

  return (
    <div className="container-main py-10 max-w-2xl">
      <h1 className="section-title mb-2">{t("devis.title")}</h1>
      <p className="text-gray-500 mb-8">{t("devis.sub")}</p>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 space-y-5">
        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t("devis.nom")}</label>
            <input
              type="text"
              name="nom"
              required
              value={form.nom}
              onChange={handleChange}
              placeholder="Mohammed Alami"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-400 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t("devis.tel")}</label>
            <input
              type="tel"
              name="telephone"
              required
              value={form.telephone}
              onChange={handleChange}
              placeholder="+212 6XX XXX XXX"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-400 transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t("devis.ville")}</label>
          <select
            name="ville"
            required
            value={form.ville}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-400 transition-colors bg-white"
          >
            <option value="">{t("devis.selectVille")}</option>
            {VILLES.map((v) => <option key={v} value={v}>{v}</option>)}
          </select>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t("devis.produit")}</label>
            <select
              name="produit"
              required
              value={form.produit}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-400 transition-colors bg-white"
            >
              <option value="">{t("devis.selectProduit")}</option>
              {PRODUITS_OPTIONS.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t("devis.quantite")}</label>
            <input
              type="number"
              name="quantite"
              required
              min="1"
              value={form.quantite}
              onChange={handleChange}
              placeholder="Ex: 500"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-400 transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t("devis.message")}</label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            rows={3}
            placeholder={t("devis.msgPlaceholder")}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-400 transition-colors resize-none"
          />
        </div>

        {state === "error" && (
          <p className="text-red-500 text-sm bg-red-50 border border-red-200 px-4 py-3 rounded-xl">
            {t("devis.error")}
          </p>
        )}

        <button
          type="submit"
          disabled={state === "loading"}
          className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-60"
        >
          {state === "loading" ? (
            <><Loader2 className="w-4 h-4 animate-spin" /> {t("devis.sending")}</>
          ) : (
            t("devis.submit")
          )}
        </button>

        <p className="text-xs text-gray-400 text-center">{t("devis.consent")}</p>
      </form>
    </div>
  );
}
