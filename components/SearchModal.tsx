"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { PRODUITS_DEMO } from "@/lib/produits";
import { getCloudinaryUrl } from "@/lib/cloudinary";

export default function SearchModal({ variant }: { variant?: "bar" | "icon" }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const results = query.trim().length >= 2
    ? PRODUITS_DEMO.filter((p) =>
        p.nom.toLowerCase().includes(query.toLowerCase()) ||
        p.nomAr.includes(query) ||
        p.description.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 6)
    : [];

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if ((e.ctrlKey || e.metaKey) && e.key === "k") { e.preventDefault(); setOpen(true); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const handleClose = () => { setOpen(false); setQuery(""); };

  return (
    <>
      {/* Bouton recherche dans navbar */}
      {variant === "bar" ? (
        <button
          onClick={() => setOpen(true)}
          className="w-full flex items-center gap-3 text-gray-400 bg-gray-100 hover:bg-gray-200 px-4 py-2 border border-gray-200 text-sm transition-colors text-left"
          aria-label="Rechercher"
        >
          <Search className="w-4 h-4 flex-shrink-0" />
          <span className="flex-1">Rechercher un produit…</span>
          <kbd className="text-gray-300 text-xs bg-white border border-gray-200 px-1.5 py-0.5">Ctrl K</kbd>
        </button>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 text-gray-500 hover:text-nauma-600 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 text-sm transition-colors"
          aria-label="Rechercher"
        >
          <Search className="w-4 h-4" />
        </button>
      )}

      {/* Modal overlay */}
      {open && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 px-4" onClick={handleClose}>
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden border border-gray-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Input */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100">
              <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Chercher un produit…"
                className="flex-1 text-sm text-gray-700 placeholder-gray-400 outline-none"
              />
              <button onClick={handleClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Résultats */}
            {results.length > 0 ? (
              <ul className="max-h-80 overflow-y-auto divide-y divide-gray-50">
                {results.map((p) => {
                  const img = p.images[0] ? getCloudinaryUrl(p.images[0], 80) : "/placeholder-product.svg";
                  return (
                    <li key={p.id}>
                      <Link
                        href={`/produits/${p.slug}`}
                        onClick={handleClose}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-nauma-50 transition-colors"
                      >
                        <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                          <Image src={img} alt={p.nom} fill className="object-cover" sizes="40px" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-800 truncate">{p.nom}</p>
                          <p className="text-xs text-gray-400">{p.categorie.replace("-", " ")} · {p.prixDetail} MAD</p>
                        </div>
                        <span className="text-xs text-nauma-teal font-medium flex-shrink-0">→</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            ) : query.trim().length >= 2 ? (
              <div className="px-4 py-8 text-center text-gray-400 text-sm">Aucun produit trouvé pour «&nbsp;{query}&nbsp;»</div>
            ) : (
              <div className="px-4 py-6 text-center text-gray-400 text-xs">Tapez au moins 2 caractères pour chercher</div>
            )}

            {results.length > 0 && (
              <div className="px-4 py-2 border-t border-gray-50 bg-gray-50">
                <Link
                  href={`/catalogue?q=${encodeURIComponent(query)}`}
                  onClick={handleClose}
                  className="text-xs text-nauma-600 hover:underline"
                >
                  Voir tous les résultats dans le catalogue →
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Backdrop flou */}
      {open && <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[99]" onClick={handleClose} />}
    </>
  );
}
