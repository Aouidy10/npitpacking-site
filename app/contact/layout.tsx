import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contactez-nous",
  description:
    "Contactez NPIT Packing pour toute question sur nos emballages professionnels au Maroc. WhatsApp, email, téléphone — réponse rapide garantie. Tél : +212700700585.",
  alternates: { canonical: "https://npitpacking.com/contact" },
  openGraph: {
    title: "Contact NPIT Packing — Emballages professionnels Maroc",
    description: "Contactez-nous via WhatsApp, email ou téléphone. Réponse rapide pour vos commandes d'emballages au Maroc.",
    url: "https://npitpacking.com/contact",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
