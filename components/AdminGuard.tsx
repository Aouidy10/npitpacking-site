"use client";

import { useState, useEffect, ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Package, LogOut, LayoutDashboard, ShoppingBag, Lock,
} from "lucide-react";
import clsx from "clsx";

const NAV = [
  { href: "/admin",          label: "Dashboard",  icon: LayoutDashboard },
  { href: "/admin/produits", label: "Produits",   icon: ShoppingBag },
];

export default function AdminGuard({ children }: { children: ReactNode }) {
  const [authed, setAuthed]     = useState(false);
  const [checked, setChecked]   = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError]       = useState(false);
  const pathname                = usePathname();

  useEffect(() => {
    setAuthed(sessionStorage.getItem("npit_admin") === "1");
    setChecked(true);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const pwd = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "npit2026";
    if (password === pwd) {
      sessionStorage.setItem("npit_admin", "1");
      setAuthed(true);
    } else {
      setError(true);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("npit_admin");
    setAuthed(false);
  };

  if (!checked) return null;

  /* ── Page de connexion ── */
  if (!authed) {
    return (
      <div className="fixed inset-0 z-[300] bg-gray-50 flex items-center justify-center">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 w-80 space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-9 h-9 rounded-xl bg-nauma-600 flex items-center justify-center">
              <Lock className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="font-bold text-gray-800 leading-tight">NPIT Admin</p>
              <p className="text-xs text-gray-400">Espace privé</p>
            </div>
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError(false); }}
            placeholder="Mot de passe"
            autoFocus
            className={clsx(
              "w-full border rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors",
              error ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-nauma-teal"
            )}
          />
          {error && <p className="text-red-500 text-xs">Mot de passe incorrect</p>}
          <button type="submit" className="w-full bg-nauma-600 hover:bg-nauma-700 text-white font-bold py-3 rounded-xl transition-colors text-sm">
            Accéder au tableau de bord
          </button>
        </form>
      </div>
    );
  }

  /* ── Layout admin (full-screen, couvre la navbar du site) ── */
  return (
    <div className="fixed inset-0 z-[200] bg-gray-50 flex overflow-hidden">

      {/* ── Sidebar ── */}
      <aside className="w-56 bg-nauma-600 flex flex-col flex-shrink-0 h-full">
        {/* Logo */}
        <div className="px-5 py-5 border-b border-white/10">
          <p className="text-white font-extrabold text-base tracking-tight">NPIT Admin</p>
          <p className="text-blue-200 text-xs mt-0.5">Tableau de bord</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {NAV.map((n) => {
            const active = pathname === n.href;
            return (
              <Link
                key={n.href}
                href={n.href}
                className={clsx(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                  active
                    ? "bg-white/15 text-white"
                    : "text-blue-100 hover:bg-white/10 hover:text-white"
                )}
              >
                <n.icon className="w-4 h-4 flex-shrink-0" />
                {n.label}
              </Link>
            );
          })}
        </nav>

        {/* Déconnexion */}
        <div className="px-3 py-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-blue-200 hover:text-white hover:bg-white/10 transition-all w-full"
          >
            <LogOut className="w-4 h-4" />
            Déconnexion
          </button>
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs text-blue-300 hover:text-white transition-all mt-1"
          >
            <Package className="w-3.5 h-3.5" />
            Voir le site
          </Link>
        </div>
      </aside>

      {/* ── Contenu principal ── */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
