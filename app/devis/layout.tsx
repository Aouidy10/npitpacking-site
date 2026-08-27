import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Demander un devis gratuit",
  description:
    "Obtenez un devis gratuit et rapide pour vos emballages professionnels au Maroc. Cellophane, serviettes, sacs kraft, boîtes alimentaires — réponse sous 24h.",
  alternates: { canonical: "https://npitpacking.com/devis" },
  openGraph: {
    title: "Devis gratuit emballage Maroc — NPIT Packing",
    description: "Demandez votre devis en ligne pour vos emballages professionnels. Réponse rapide, prix détail et gros.",
    url: "https://npitpacking.com/devis",
  },
};

export default function DevisLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
