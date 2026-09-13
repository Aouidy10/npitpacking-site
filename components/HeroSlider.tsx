"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SLIDES = [
  {
    title: "FILM ALIMENTAIRE",
    subtitle: "Protégez, conservez, préparez.",
    bullets: [
      "Des films alimentaires adaptés aux besoins des professionnels de la restauration, de la préparation à la conservation.",
      "Différents formats et usages pour répondre aux exigences de votre activité.",
    ],
    cta: "Découvrir la gamme",
    href: "/catalogue?cat=emballage-alimentaire",
    accent: "#3DAAB5",
    bg: "linear-gradient(120deg,#0a2a2a 0%,#1a5c63 100%)",
  },
  {
    title: "ALUMINIUM",
    subtitle: "Pratique, polyvalent et indispensable au quotidien.",
    bullets: [
      "Rouleaux aluminium et solutions adaptées aux besoins des professionnels de la restauration et de la préparation alimentaire.",
    ],
    cta: "Découvrir la gamme",
    href: "/catalogue?cat=emballage-alimentaire",
    accent: "#8a9bb0",
    bg: "linear-gradient(120deg,#1a2a3a 0%,#1B3266 100%)",
  },
  {
    title: "BARQUETTES",
    subtitle: "De la cuisine à la livraison.",
    bullets: [
      "Des barquettes adaptées à la préparation, au conditionnement, au transport et à la présentation de vos produits.",
      "Différentes formes, capacités et usages pour répondre aux besoins de chaque métier.",
    ],
    cta: "Découvrir la gamme",
    href: "/catalogue?cat=emballage-alimentaire",
    accent: "#3DAAB5",
    bg: "linear-gradient(120deg,#0a1f2e 0%,#1a4a5a 100%)",
  },
  {
    title: "GOBELETS",
    subtitle: "Servir simplement, avec la bonne référence.",
    bullets: [
      "Gobelets papier et plastique adaptés aux cafés, snacks, restaurants, pâtisseries et activités de livraison.",
      "Formats et usages différents : nous vous aidons à identifier la solution adaptée à votre consommation.",
    ],
    cta: "Découvrir la gamme",
    href: "/catalogue?cat=plastique",
    accent: "#3DAAB5",
    bg: "linear-gradient(120deg,#0d1f35 0%,#1B3266 100%)",
  },
  {
    title: "SACHETS & SACS",
    subtitle: "Transporter votre produit, c'est aussi protéger votre image.",
    bullets: [
      "Sachets, sacs et solutions de transport adaptés aux besoins des professionnels.",
      "Du service au comptoir à la livraison, choisissez le format adapté à votre activité.",
    ],
    cta: "Découvrir la gamme",
    href: "/catalogue?cat=plastique",
    accent: "#C8A46E",
    bg: "linear-gradient(120deg,#1a1205 0%,#2a1e0a 50%,#1B3266 100%)",
  },
  {
    title: "PAILLES",
    subtitle: "Le petit détail qui compte.",
    bullets: [
      "Pailles standards, articulées, emballées ou grand diamètre : des références adaptées aux différents usages professionnels.",
    ],
    cta: "Découvrir la gamme",
    href: "/catalogue?cat=plastique",
    accent: "#3DAAB5",
    bg: "linear-gradient(120deg,#0a2030 0%,#1B3266 100%)",
  },
  {
    title: "COUVERTS",
    subtitle: "Pratiques pour servir, adaptés à votre activité.",
    bullets: [
      "Couteaux, fourchettes, cuillères et kits de couverts pour accompagner vos services sur place ou à emporter.",
    ],
    cta: "Découvrir la gamme",
    href: "/catalogue?cat=plastique",
    accent: "#C8A46E",
    bg: "linear-gradient(120deg,#1a0f05 0%,#2a1a08 50%,#1B3266 100%)",
  },
  {
    title: "HYGIÈNE",
    subtitle: "Parce que l'hygiène ne laisse aucune place à l'improvisation.",
    bullets: [
      "Gants et consommables d'hygiène destinés aux professionnels qui recherchent des produits adaptés à leur activité quotidienne.",
    ],
    cta: "Découvrir la gamme",
    href: "/catalogue?cat=hygiene",
    accent: "#2e8b6e",
    bg: "linear-gradient(120deg,#0a2018 0%,#1a4a35 50%,#1B3266 100%)",
  },
  {
    title: "EMBALLAGES POUR LA LIVRAISON",
    subtitle: "Préparer. Présenter. Transporter.",
    bullets: [
      "Des solutions adaptées aux professionnels de la restauration et de la livraison : boîtes, bols, sachets, barquettes, pots à sauce et autres emballages.",
    ],
    cta: "Découvrir la gamme",
    href: "/catalogue?cat=emballage-alimentaire",
    accent: "#3DAAB5",
    bg: "linear-gradient(120deg,#0a1e2a 0%,#0d3545 50%,#1B3266 100%)",
  },
  {
    title: "Des emballages pour tous vos besoins",
    sub: "Papier hygiène · Film alimentaire · Barquettes · Gobelets",
    cta: "Voir le catalogue",
    href: "/catalogue",
    accent: "#1B3266",
    bg: "linear-gradient(120deg,#1B3266 0%,#152854 100%)",
  },
  {
    title: "Prix spéciaux pour commandes en gros",
    sub: "Devis gratuit — tarifs préférentiels selon le volume commandé",
    cta: "Demander un devis",
    href: "/devis",
    accent: "#C8A46E",
    bg: "linear-gradient(120deg,#3a2410 0%,#1B3266 100%)",
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
        <div className="absolute right-0 top-0 bottom-0 w-1/2 flex items-center justify-center pointer-events-none select-none">
          <Image
            src="/logo-npit.png"
            alt=""
            width={420}
            height={420}
            className="object-contain opacity-30"
            style={{ mixBlendMode: "screen", filter: "invert(1) brightness(2)" }}
          />
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
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-1" style={{ textWrap: "balance" }}>
              {s.title}
            </h1>
            {"subtitle" in s && s.subtitle && (
              <p className="text-white/90 text-lg md:text-xl font-semibold mb-4" style={{ textWrap: "balance" }}>
                {s.subtitle}
              </p>
            )}
            {"bullets" in s && s.bullets ? (
              <ul className="mb-8 space-y-3">
                {s.bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-white/80 text-sm md:text-base leading-relaxed">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: s.accent }} />
                    {b}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-white/70 text-sm md:text-base mb-8 leading-relaxed">{"sub" in s ? s.sub : ""}</p>
            )}
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
