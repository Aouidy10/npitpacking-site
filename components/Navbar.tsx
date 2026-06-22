"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Package } from "lucide-react";
import clsx from "clsx";

const LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/catalogue", label: "Catalogue" },
  { href: "/devis", label: "Commande Gros" },
  { href: "/a-propos", label: "À propos" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-40 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-nauma-600">
          <Package className="w-6 h-6" />
          <span>NPTI Packing</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-gray-600 hover:text-nauma-600 font-medium transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/devis"
            className="bg-nauma-600 hover:bg-nauma-700 text-white text-sm px-4 py-2 rounded-lg font-medium transition-colors"
          >
            Demander un devis
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button className="md:hidden p-2" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <div className={clsx("md:hidden bg-white border-t border-gray-100 px-4 pb-4", open ? "block" : "hidden")}>
        {LINKS.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="block py-3 text-sm text-gray-700 hover:text-nauma-600 font-medium border-b border-gray-50"
            onClick={() => setOpen(false)}
          >
            {l.label}
          </Link>
        ))}
      </div>
    </header>
  );
}
