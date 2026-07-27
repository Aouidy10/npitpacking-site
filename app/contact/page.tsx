"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, MessageCircle, Clock, Send, CheckCircle } from "lucide-react";

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "212600000000";

const SUJETS = [
  "Information sur un produit",
  "Commande détail",
  "Commande gros / devis",
  "Livraison & délais",
  "Autre",
];

export default function ContactPage() {
  const [form, setForm] = useState({
    nom: "",
    tel: "",
    sujet: SUJETS[0],
    message: "",
  });
  const [sent, setSent] = useState(false);

  const quickWhatsApp = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    "Bonjour NPIT Packing, je souhaite avoir des informations sur vos produits."
  )}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg =
      `Bonjour, je suis ${form.nom}.\n\n` +
      `📋 Sujet : ${form.sujet}\n` +
      `📞 Téléphone : ${form.tel}\n\n` +
      `💬 Message :\n${form.message}`;
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`,
      "_blank"
    );
    setSent(true);
  };

  return (
    <div className="container-main py-14">
      {/* En-tête */}
      <div className="mb-10">
        <h1 className="section-title mb-2">Contactez-nous</h1>
        <p className="text-gray-500 text-sm max-w-lg">
          Répondons-nous à toutes vos questions — commandes, livraison, prix gros. Envoyez-nous un message via WhatsApp ou remplissez le formulaire.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* ─── Coordonnées ─── */}
        <div className="space-y-4">
          <a
            href={quickWhatsApp}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-4 bg-green-50 border border-green-200 rounded-2xl p-5 hover:bg-green-100 transition-colors group"
          >
            <div className="bg-green-500 text-white p-3 rounded-xl flex-shrink-0">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-green-800 group-hover:underline">WhatsApp (recommandé)</p>
              <p className="text-green-700 text-sm mt-0.5">+212 600-000000</p>
              <p className="text-green-600 text-xs mt-1">Réponse rapide — cliquez pour ouvrir WhatsApp</p>
            </div>
          </a>

          <div className="flex items-start gap-4 bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
            <div className="bg-nauma-teal-50 text-nauma-600 p-3 rounded-xl flex-shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-gray-800">Téléphone</p>
              <p className="text-gray-600 text-sm mt-0.5">+212 600-000000</p>
            </div>
          </div>

          <div className="flex items-start gap-4 bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
            <div className="bg-nauma-teal-50 text-nauma-600 p-3 rounded-xl flex-shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-gray-800">Email</p>
              <p className="text-gray-600 text-sm mt-0.5">contact@npitpacking.com</p>
            </div>
          </div>

          <div className="flex items-start gap-4 bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
            <div className="bg-nauma-teal-50 text-nauma-600 p-3 rounded-xl flex-shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-gray-800">Zone de livraison</p>
              <p className="text-gray-600 text-sm mt-0.5">Tout le Maroc 🇲🇦</p>
              <p className="text-gray-400 text-xs mt-0.5">Casablanca · Rabat · Marrakech · Fès · Tanger…</p>
            </div>
          </div>

          <div className="flex items-start gap-4 bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
            <div className="bg-nauma-teal-50 text-nauma-600 p-3 rounded-xl flex-shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-gray-800">Horaires</p>
              <p className="text-gray-600 text-sm mt-0.5">Lun – Sam : 8h00 – 20h00</p>
              <p className="text-gray-400 text-xs mt-0.5">Dimanche : fermé</p>
            </div>
          </div>
        </div>

        {/* ─── Formulaire ─── */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-7">
          {sent ? (
            <div className="flex flex-col items-center justify-center h-full py-12 text-center gap-4">
              <CheckCircle className="w-14 h-14 text-green-500" />
              <h3 className="text-lg font-bold text-gray-800">Message envoyé !</h3>
              <p className="text-gray-500 text-sm">
                WhatsApp s&apos;est ouvert avec votre message. Nous vous répondrons dans les plus brefs délais.
              </p>
              <button
                onClick={() => setSent(false)}
                className="mt-2 text-sm text-nauma-600 hover:underline"
              >
                Envoyer un autre message
              </button>
            </div>
          ) : (
            <>
              <h2 className="text-lg font-bold text-gray-800 mb-5">Envoyez-nous un message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">Nom *</label>
                    <input
                      type="text"
                      required
                      value={form.nom}
                      onChange={(e) => setForm({ ...form, nom: e.target.value })}
                      placeholder="Votre nom"
                      className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-nauma-teal transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">Téléphone *</label>
                    <input
                      type="tel"
                      required
                      value={form.tel}
                      onChange={(e) => setForm({ ...form, tel: e.target.value })}
                      placeholder="+212 6XX XXX XXX"
                      className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-nauma-teal transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Sujet</label>
                  <select
                    value={form.sujet}
                    onChange={(e) => setForm({ ...form, sujet: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-nauma-teal transition-colors bg-white"
                  >
                    {SUJETS.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Message *</label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Décrivez votre besoin, les produits souhaités, les quantités..."
                    className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-nauma-teal transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
                >
                  <Send className="w-4 h-4" />
                  Envoyer via WhatsApp
                </button>
                <p className="text-xs text-center text-gray-400">
                  Le formulaire ouvrira WhatsApp avec votre message pré-rempli.
                </p>
              </form>
            </>
          )}
        </div>
      </div>

      {/* ─── CTA Devis gros ─── */}
      <div className="mt-10 bg-gradient-to-r from-nauma-600 to-nauma-800 rounded-3xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h2 className="text-xl font-bold mb-1">Commande en gros ?</h2>
          <p className="text-blue-100 text-sm max-w-md">
            Devis gratuit — prix préférentiels selon le volume. Réponse sous 24h.
          </p>
        </div>
        <a
          href="/devis"
          className="flex-shrink-0 bg-white text-nauma-600 hover:bg-nauma-50 font-semibold px-7 py-3 rounded-xl transition-colors text-sm whitespace-nowrap"
        >
          Formulaire de devis →
        </a>
      </div>
    </div>
  );
}
