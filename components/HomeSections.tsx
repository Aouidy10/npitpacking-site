"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Produit } from "@/types";
import ProductCard from "@/components/ProductCard";
import { Package } from "lucide-react";
import { getCloudinaryUrl } from "@/lib/cloudinary";

export default function HomeSections() {
  const [nouveaux,    setNouveaux]    = useState<Produit[]>([]);
  const [bestsellers, setBestsellers] = useState<Produit[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const snap = await getDocs(collection(db, "produits"));
        const all  = snap.docs.map((d) => ({ id: d.id, ...d.data() } as Produit));
        setNouveaux(   all.filter((p) => p.badge === "nouveau"    && p.disponible).slice(0, 4));
        setBestsellers(all.filter((p) => p.badge === "bestseller" && p.disponible).slice(0, 4));
      } catch {
        /* Firestore indisponible — sections vides */
      } finally {
        setLoaded(true);
      }
    })();
  }, []);

  if (!loaded) return null;

  return (
    <>
      {/* ─── Nouveautés ─────────────────────────────────── */}
      {nouveaux.length > 0 && (
        <section className="container-main pb-14">
          <div className="text-center mb-10">
            <h2 className="section-title">
              Découvrez <span className="text-nauma-teal italic">nos nouveautés</span>
            </h2>
            <p className="text-gray-500 text-sm mt-2">Nos dernières références — qualité professionnelle</p>
          </div>

          {/* 2 grandes cartes */}
          <div className="grid md:grid-cols-2 gap-5 mb-5">
            {nouveaux.slice(0, 2).map((p) => {
              const img = p.images[0] ? getCloudinaryUrl(p.images[0], 600) : null;
              return (
                <Link
                  key={p.id}
                  href={`/produits/${p.slug}`}
                  className="group relative rounded-2xl overflow-hidden bg-nauma-50 border border-gray-100 hover:shadow-xl transition-all duration-300 min-h-[220px] flex flex-col justify-between p-6"
                >
                  {img && (
                    <div
                      className="absolute inset-0 opacity-10 group-hover:opacity-15 transition-opacity bg-center bg-cover"
                      style={{ backgroundImage: `url(${img})` }}
                    />
                  )}
                  <span className="relative inline-flex items-center gap-1 bg-nauma-teal text-white text-xs font-black px-3 py-1 rounded-full w-fit mb-3 tracking-widest uppercase">
                    ✦ NEW
                  </span>
                  <div className="relative">
                    <h3 className="text-xl font-bold text-nauma-600 leading-tight group-hover:text-nauma-teal transition-colors">
                      {p.nom}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">{p.description}</p>
                  </div>
                  <div className="relative flex items-center justify-end mt-4">
                    <span className="text-xs font-semibold text-nauma-teal bg-white border border-nauma-teal px-3 py-1.5 rounded-full group-hover:bg-nauma-teal group-hover:text-white transition-colors">
                      Voir le produit →
                    </span>
                  </div>
                  <div className="absolute -right-8 -bottom-8 w-40 h-40 rounded-full bg-nauma-teal/10 group-hover:bg-nauma-teal/20 transition-colors pointer-events-none" />
                </Link>
              );
            })}
          </div>

          {/* Petites cartes supplémentaires */}
          {nouveaux.length > 2 && (
            <div className="grid md:grid-cols-2 gap-5">
              {nouveaux.slice(2, 4).map((p) => (
                <Link
                  key={p.id}
                  href={`/produits/${p.slug}`}
                  className="group relative rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 hover:shadow-lg transition-all duration-300 flex items-center gap-4 p-4"
                >
                  <span className="bg-nauma-teal text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest absolute top-3 left-3">NEW</span>
                  <div className="w-16 h-16 rounded-xl bg-nauma-50 flex items-center justify-center flex-shrink-0 mt-3 ml-2 overflow-hidden">
                    {p.images[0]
                      ? <img src={getCloudinaryUrl(p.images[0], 80)} alt={p.nom} className="w-full h-full object-cover" />
                      : <Package className="w-7 h-7 text-nauma-300" />
                    }
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-sm text-gray-800 group-hover:text-nauma-teal transition-colors truncate">{p.nom}</h3>
                    <p className="text-xs text-gray-400 mt-0.5 truncate capitalize">{p.sousCategorie?.replace(/-/g, " ")}</p>
                    <p className="text-xs text-nauma-teal font-medium mt-1">Voir le produit →</p>
                  </div>
                  <span className="text-nauma-teal text-xs font-bold flex-shrink-0">→</span>
                </Link>
              ))}
            </div>
          )}

          <div className="text-center mt-6">
            <Link
              href="/catalogue"
              className="inline-flex items-center gap-2 border-2 border-nauma-teal text-nauma-teal hover:bg-nauma-teal hover:text-white font-semibold px-6 py-2.5 rounded-xl transition-all text-sm"
            >
              Voir toutes les nouveautés →
            </Link>
          </div>
        </section>
      )}

      {/* ─── Best-Sellers ────────────────────────────────── */}
      {bestsellers.length > 0 && (
        <section className="container-main pb-14">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="section-title">⭐ Nos Best-Sellers</h2>
              <p className="text-gray-400 text-sm mt-1">Les produits les plus commandés par nos clients</p>
            </div>
            <Link href="/catalogue" className="text-nauma-600 hover:text-nauma-700 text-sm font-medium hidden md:block">
              Voir tout →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {bestsellers.map((p) => (
              <ProductCard key={p.id} produit={p} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
