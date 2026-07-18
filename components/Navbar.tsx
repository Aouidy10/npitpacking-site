"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import clsx from "clsx";
import SearchModal from "@/components/SearchModal";

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
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/logo-npit.png"
            alt="NPITPACKING"
            width={44}
            height={44}
            className="object-contain"
            priority
          />
          <div className="flex flex-col leading-none">
            <span className="font-black text-base tracking-widest text-nauma-600 uppercase">NPITPACKING</span>
            <span className="text-[9px] font-medium text-nauma-teal tracking-wider uppercase">Division NPTI</span>
          </div>
        </Link>

        {/* Recherche */}
        <div className="hidden md:block">
          <SearchModal />
        </div>

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
