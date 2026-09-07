"use client";

import Link from "next/link";
import { Package, Phone, Mail, MapPin } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-nauma-900 text-gray-300 mt-20">
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">

        <div>
          <div className="flex items-center gap-2 text-white font-bold text-lg mb-3">
            <Package className="w-5 h-5 text-nauma-teal" />
            NPIT Packing
          </div>
          <p className="text-sm text-gray-400 leading-relaxed">{t("footer.tagline")}</p>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-3">{t("footer.categories")}</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/catalogue?cat=emballage-alimentaire"   className="hover:text-nauma-teal transition-colors">Emballage alimentaire</Link></li>
            <li><Link href="/catalogue?cat=emballage-biodegradable" className="hover:text-nauma-teal transition-colors">Emballage biodégradable</Link></li>
            <li><Link href="/catalogue?cat=hygiene"                 className="hover:text-nauma-teal transition-colors">Hygiène & Papier</Link></li>
            <li><Link href="/catalogue?cat=plastique"               className="hover:text-nauma-teal transition-colors">Plastique</Link></li>
            <li><Link href="/catalogue?cat=verre-cristal"           className="hover:text-nauma-teal transition-colors">Verre & Cristal</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-3">{t("footer.info")}</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/a-propos"               className="hover:text-nauma-teal transition-colors">{t("footer.about")}</Link></li>
            <li><Link href="/politique-de-livraison" className="hover:text-nauma-teal transition-colors">{t("footer.delivery")}</Link></li>
            <li><Link href="/mentions-legales"       className="hover:text-nauma-teal transition-colors">{t("footer.legal")}</Link></li>
            <li><Link href="/devis"                  className="hover:text-nauma-teal transition-colors">{t("footer.quote")}</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-3">{t("footer.contact")}</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-nauma-teal flex-shrink-0" /> +212700700585</li>
            <li className="flex items-center gap-2"><Mail  className="w-4 h-4 text-nauma-teal flex-shrink-0" /> contact@npitpacking.com</li>
            <li className="flex items-center gap-2"><MapPin className="w-4 h-4 text-nauma-teal flex-shrink-0" /> {t("footer.location")}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-nauma-800 text-center text-xs text-gray-600 py-4">
        © {new Date().getFullYear()} NPIT – New Pact Industry and Trade — {t("footer.rights")}
      </div>
    </footer>
  );
}
