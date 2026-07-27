"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X, Phone, MessageCircle, ChevronDown, ShoppingCart } from "lucide-react";
import clsx from "clsx";
import SearchModal from "@/components/SearchModal";
import { CATEGORIES_CONFIG } from "@/lib/categories";
import { useCart } from "@/context/CartContext";

const NAV_LINKS = [
  { href: "/",         label: "Accueil" },
  { href: "/catalogue",label: "Catalogue" },
  { href: "/devis",    label: "Commande Gros" },
  { href: "/a-propos", label: "À propos" },
  { href: "/contact",  label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen]       = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const { totalItems }        = useCart();

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm">

      {/* ─── Barre secondaire (teinte nauma) ────────────── */}
      <div className="hidden md:flex bg-nauma-600 text-white/80 text-[11px]">
        <div className="max-w-6xl mx-auto px-4 w-full flex items-center justify-between h-8">
          <span className="font-medium tracking-wide">NPITPACKING — Division NPIT · Emballages professionnels au Maroc</span>
          <div className="flex items-center gap-5">
            <a
              href={`tel:+212600000000`}
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              <Phone className="w-3 h-3" />
              <span>+212 6 00 00 00 00</span>
            </a>
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "212600000000"}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              <MessageCircle className="w-3 h-3" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* ─── Barre principale : logo + recherche + CTA ── */}
      <div className="border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center gap-4">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
            <Image
              src="/logo-npit.png"
              alt="NPITPACKING"
              width={42}
              height={42}
              className="object-contain"
              priority
            />
            <div className="flex flex-col leading-none">
              <span className="font-black text-sm tracking-widest text-nauma-600 uppercase">NPITPACKING</span>
              <span className="text-[9px] font-medium text-nauma-teal tracking-wider uppercase">Division NPIT</span>
            </div>
          </Link>

          {/* Barre de recherche centrée */}
          <div className="flex-1 hidden md:block">
            <SearchModal variant="bar" />
          </div>

          {/* Desktop CTA + Panier */}
          <div className="hidden md:flex items-center gap-3 flex-shrink-0">
            {/* Icône panier */}
            <Link href="/panier" className="relative p-2 text-gray-600 hover:text-nauma-600 transition-colors">
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-nauma-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              )}
            </Link>
            <Link
              href="/devis"
              className="bg-nauma-600 hover:bg-nauma-700 text-white text-xs font-bold px-5 py-2.5 uppercase tracking-wider transition-colors"
            >
              Devis gratuit
            </Link>
          </div>

          {/* Mobile : recherche + panier + burger */}
          <div className="flex items-center gap-1 md:hidden ml-auto">
            <SearchModal />
            <Link href="/panier" className="relative p-2 text-gray-600">
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute top-0.5 right-0.5 bg-nauma-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              )}
            </Link>
            <button className="p-2" onClick={() => setOpen(!open)} aria-label="Menu">
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* ─── Barre de navigation (catégories) ───────────── */}
      <nav className="hidden md:flex bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 flex items-center h-10 gap-1">

          {/* Méga-menu catégories */}
          <div className="relative group h-full flex items-center">
            <button
              className="flex items-center gap-1.5 h-full px-4 text-xs font-bold uppercase tracking-wider bg-nauma-600 text-white hover:bg-nauma-700 transition-colors"
              onMouseEnter={() => setCatOpen(true)}
              onMouseLeave={() => setCatOpen(false)}
            >
              <Menu className="w-3.5 h-3.5" />
              Toutes les catégories
              <ChevronDown className="w-3 h-3" />
            </button>

            {/* Dropdown catégories */}
            {catOpen && (
              <div
                className="absolute top-full left-0 z-50 bg-white shadow-2xl border border-gray-100 flex min-w-[600px]"
                onMouseEnter={() => setCatOpen(true)}
                onMouseLeave={() => setCatOpen(false)}
              >
                {CATEGORIES_CONFIG.map((cat) => (
                  <div key={cat.slug} className="flex-1 border-r border-gray-50 last:border-0">
                    <Link
                      href={`/catalogue?cat=${cat.slug}`}
                      className="block px-4 py-2.5 text-xs font-bold text-nauma-600 border-b border-gray-50 hover:bg-gray-50 uppercase tracking-wide"
                    >
                      {cat.label}
                    </Link>
                    {cat.sousCats.slice(0, 5).map((sub) => (
                      <Link
                        key={sub.slug}
                        href={`/catalogue?cat=${cat.slug}&sub=${sub.slug}`}
                        className="block px-4 py-1.5 text-[11px] text-gray-500 hover:text-nauma-600 hover:bg-gray-50 transition-colors"
                      >
                        {sub.label}
                      </Link>
                    ))}
                    {cat.sousCats.length > 5 && (
                      <Link
                        href={`/catalogue?cat=${cat.slug}`}
                        className="block px-4 py-1.5 text-[11px] text-nauma-teal font-medium hover:underline"
                      >
                        Voir tout ({cat.sousCats.length})
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Liens principaux */}
          {NAV_LINKS.slice(1).map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="flex items-center h-full px-4 text-xs text-gray-600 hover:text-nauma-600 font-medium transition-colors border-b-2 border-transparent hover:border-nauma-600"
            >
              {l.label}
            </Link>
          ))}
        </div>
      </nav>

      {/* ─── Mobile menu ─────────────────────────────────── */}
      <div className={clsx("md:hidden bg-white border-t border-gray-100 divide-y divide-gray-50", open ? "block" : "hidden")}>
        {NAV_LINKS.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="flex items-center px-4 py-3.5 text-sm text-gray-700 hover:text-nauma-600 font-medium"
            onClick={() => setOpen(false)}
          >
            {l.label}
          </Link>
        ))}
        <div className="px-4 py-3">
          <Link
            href="/devis"
            className="block text-center bg-nauma-600 text-white text-sm font-bold py-3 uppercase tracking-wider"
            onClick={() => setOpen(false)}
          >
            Demander un devis gratuit
          </Link>
        </div>
      </div>

    </header>
  );
}
