import Link from "next/link";
import { Package, Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-nauma-900 text-gray-300 mt-20">
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2 text-white font-bold text-lg mb-3">
            <Package className="w-5 h-5 text-nauma-teal" />
            NPIT Packing
          </div>
          <p className="text-sm text-gray-400 leading-relaxed">
            Pôle emballage de NPIT — New Pact Industry and Trade. Cellophane, serviettes, papier cuisson et sacs — vente détail et gros.
          </p>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-3">Produits</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/catalogue?cat=cellophane" className="hover:text-nauma-teal transition-colors">Cellophane (سولوفان)</Link></li>
            <li><Link href="/catalogue?cat=serviettes" className="hover:text-nauma-teal transition-colors">Serviettes (سيرفيت)</Link></li>
            <li><Link href="/catalogue?cat=papier-cuisson" className="hover:text-nauma-teal transition-colors">Papier cuisson (بابي كوسون)</Link></li>
            <li><Link href="/catalogue?cat=sacs" className="hover:text-nauma-teal transition-colors">Sacs & Rouleaux (مشوار)</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-3">Contact</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-nauma-teal" /> +212 600-000000</li>
            <li className="flex items-center gap-2"><Mail className="w-4 h-4 text-nauma-teal" /> contact@npti-packing.ma</li>
            <li className="flex items-center gap-2"><MapPin className="w-4 h-4 text-nauma-teal" /> Maroc</li>
          </ul>
          <p className="mt-4 text-xs text-gray-500">Livraison dans tout le Maroc 🇲🇦</p>
        </div>
      </div>

      <div className="border-t border-nauma-800 text-center text-xs text-gray-600 py-4">
        © {new Date().getFullYear()} NPIT – New Pact Industry and Trade — Tous droits réservés
      </div>
    </footer>
  );
}
