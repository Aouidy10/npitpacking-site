"use client";

import { useState, useEffect, ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Package, LogOut } from "lucide-react";
import clsx from "clsx";

const NAV = [
  { href: "/admin", label: "Commandes" },
  { href: "/admin/produits", label: "Produits" },
];

export default function AdminGuard({ children }: { children: ReactNode }) {
  const [authed, setAuthed] = useState(false);
  const [checked, setChecked] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const pathname = usePathname();

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

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 w-80 space-y-4">
          <div className="flex items-center gap-2 text-nauma-600 font-bold text-lg mb-2">
            <Package className="w-5 h-5" />
            NPIT Admin
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError(false); }}
            placeholder="Mot de passe"
            className={clsx(
              "w-full border rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors",
              error ? "border-red-400" : "border-gray-200 focus:border-emerald-400"
            )}
          />
          {error && <p className="text-red-500 text-xs">Mot de passe incorrect</p>}
          <button type="submit" className="w-full btn-primary">Accéder</button>
        </form>
      </div>
    );
  }

  return (
    <div>
      {/* Admin top bar */}
      <div className="bg-white border-b border-gray-100 shadow-sm sticky top-16 z-30">
        <div className="container-main flex items-center justify-between h-12">
          <div className="flex items-center gap-1">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className={clsx(
                  "px-4 py-1.5 rounded-lg text-sm font-medium transition-colors",
                  pathname === n.href
                    ? "bg-nauma-600 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                )}
              >
                {n.label}
              </Link>
            ))}
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-red-500 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            Déconnexion
          </button>
        </div>
      </div>
      {children}
    </div>
  );
}
