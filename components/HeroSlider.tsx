"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SLIDES = [
  {
    title: "Des emballages pour tous vos besoins",
    sub: "Papier hygiène · Film alimentaire · Barquettes · Gobelets",
    cta: "Voir le catalogue",
    href: "/catalogue",
    accent: "#1B3266",
    bg: "linear-gradient(120deg,#1B3266 0%,#152854 100%)",
    align: "left",
  },
  {
    title: "Livraison gratuite dans tout le Maroc",
    sub: "Casablanca · Rabat · Marrakech · Fès · Tanger et toutes les villes du Maroc",
    cta: "Commander maintenant",
    href: "/devis",
    accent: "#3DAAB5",
    bg: "linear-gradient(120deg,#1a5c63 0%,#1B3266 100%)",
    align: "left",
  },
  {
    title: "Prix spéciaux pour commandes en gros",
    sub: "Devis gratuit — tarifs préférentiels selon le volume commandé",
    cta: "Demander un devis",
    href: "/devis",
    accent: "#C8A46E",
    bg: "linear-gradient(120deg,#3a2410 0%,#1B3266 100%)",
    align: "left",
  },
];

export default function HeroSlider() {
  const [idx, setIdx] = useState(0);
  const [animating, setAnimating] = useState(false);

  const go = useCallback((next: number) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => { setIdx(next); setAnimating(false); }, 400);
  }, [animating]);

  useEffect(() => {
    const t = setInterval(() => go((idx + 1) % SLIDES.length), 5000);
    return () => clearInterval(t);
  }, [idx, go]);

  const s = SLIDES[idx];

  return (
    <div className="relative overflow-hidden w-full" style={{ height: "clamp(320px,50vw,520px)" }}>
      {/* Slide */}
      <div
        className="absolute inset-0 flex items-center transition-opacity duration-500"
        style={{ background: s.bg, opacity: animating ? 0 : 1 }}
      >
        {/* Logo déco flottant */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 flex items-center justify-center opacity-10 pointer-events-none select-none">
          <Image src="/logo-npit.png" alt="" width={420} height={420} className="object-contain" />
        </div>

        <div className="container-main relative z-10 text-white">
          <div className="max-w-xl">
            {/* Pill */}
            <span
              className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-5"
              style={{ background: s.accent + "33", border: `1px solid ${s.accent}66`, color: "white" }}
            >
              NPITPACKING — Division NPIT
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-4" style={{ textWrap: "balance" }}>
              {s.title}
            </h1>
            <p className="text-white/70 text-sm md:text-base mb-8 leading-relaxed">{s.sub}</p>
            <Link
              href={s.href}
              className="inline-block font-bold text-sm px-7 py-3 transition-all hover:opacity-90"
              style={{ background: s.accent, color: "#fff" }}
            >
              {s.cta}
            </Link>
          </div>
        </div>

        {/* Ligne déco bas */}
        <div className="absolute bottom-0 left-0 right-0 h-1" style={{ background: s.accent }} />
      </div>

      {/* Prev / Next */}
      {[
        { dir: -1, pos: "left-3" },
        { dir:  1, pos: "right-3" },
      ].map(({ dir, pos }) => (
        <button
          key={dir}
          onClick={() => go((idx + dir + SLIDES.length) % SLIDES.length)}
          className={`absolute top-1/2 -translate-y-1/2 ${pos} z-20 w-9 h-9 flex items-center justify-center bg-white/15 hover:bg-white/30 text-white transition-colors`}
        >
          {dir < 0 ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>
      ))}

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            className="transition-all"
            style={{
              width: i === idx ? 28 : 8,
              height: 3,
              background: i === idx ? "white" : "rgba(255,255,255,0.35)",
            }}
          />
        ))}
      </div>
    </div>
  );
}
