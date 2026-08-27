import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Catalogue produits — Emballages Maroc",
  description:
    "Parcourez notre catalogue d'emballages professionnels au Maroc : cellophane, serviettes, sacs kraft, boîtes pizza, gobelets, film alimentaire, papier cuisson et plus. Vente détail et gros.",
  alternates: { canonical: "https://npitpacking.com/catalogue" },
  keywords: [
    "catalogue emballage maroc", "acheter emballage maroc", "boite pizza maroc",
    "gobelet carton maroc", "sac kraft maroc", "cellophane maroc",
    "serviette jetable maroc", "papier aluminium maroc", "film alimentaire maroc",
  ],
  openGraph: {
    title: "Catalogue emballages NPIT Packing — Maroc",
    description: "Tout l'emballage professionnel en un seul endroit : cellophane, boîtes alimentaires, sacs, serviettes. Livraison partout au Maroc.",
    url: "https://npitpacking.com/catalogue",
  },
};

export default function CatalogueLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
