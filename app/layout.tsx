import type { Metadata } from "next";
import "./globals.css";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import dynamic from "next/dynamic";
import { CartProvider } from "@/context/CartContext";

const ActivityPopup = dynamic(() => import("@/components/ActivityPopup"), { ssr: false });

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "NPIT Packing",
  alternateName: "NPITPACKING",
  description:
    "Vente d'emballages professionnels au Maroc : cellophane, serviettes, sacs kraft, boîtes alimentaires, papier cuisson. Détail et gros. Livraison dans tout le Maroc.",
  url: "https://npitpacking.com",
  telephone: "+212700700585",
  email: "contact@npitpacking.com",
  address: {
    "@type": "PostalAddress",
    addressCountry: "MA",
  },
  areaServed: { "@type": "Country", name: "Morocco" },
  priceRange: "$$",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
      opens: "08:00",
      closes: "19:00",
    },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Catalogue emballages NPIT Packing",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Product", name: "Emballage alimentaire" } },
      { "@type": "Offer", itemOffered: { "@type": "Product", name: "Cellophane et film alimentaire" } },
      { "@type": "Offer", itemOffered: { "@type": "Product", name: "Serviettes et hygiène" } },
      { "@type": "Offer", itemOffered: { "@type": "Product", name: "Sacs kraft et papier" } },
      { "@type": "Offer", itemOffered: { "@type": "Product", name: "Emballage biodégradable" } },
      { "@type": "Offer", itemOffered: { "@type": "Product", name: "Verre et cristal" } },
    ],
  },
};

export const metadata: Metadata = {
  metadataBase: new URL("https://npitpacking.com"),
  title: {
    default: "NPIT Packing Maroc — Emballages Professionnels",
    template: "%s | NPIT Packing Maroc",
  },
  description:
    "Vente de papier et emballage au Maroc : cellophane, serviettes, sacs kraft, boîtes alimentaires, papier cuisson. Prix détail et gros. Livraison rapide dans tout le Maroc.",
  keywords: [
    "emballage maroc", "papier emballage maroc", "cellophane maroc",
    "serviettes jetables maroc", "sacs kraft maroc", "emballage alimentaire maroc",
    "boite pizza maroc", "gobelets carton maroc", "film alimentaire maroc",
    "grossiste emballage maroc", "fournisseur emballage casablanca",
    "NPIT Packing", "npitpacking", "emballage restaurant maroc",
    "emballage cafe maroc", "emballage biodegradable maroc",
  ],
  authors: [{ name: "NPIT Packing", url: "https://npitpacking.com" }],
  creator: "NPIT Packing",
  publisher: "NPIT Packing",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    siteName: "NPIT Packing Maroc",
    url: "https://npitpacking.com",
    locale: "fr_MA",
    type: "website",
    title: "NPIT Packing Maroc — Emballages Professionnels",
    description:
      "Cellophane, serviettes, sacs kraft, boîtes alimentaires — vente détail et gros. Livraison dans tout le Maroc.",
  },
  twitter: {
    card: "summary_large_image",
    title: "NPIT Packing Maroc — Emballages Professionnels",
    description: "Cellophane, serviettes, sacs kraft, boîtes alimentaires — vente détail et gros au Maroc.",
  },
  alternates: {
    canonical: "https://npitpacking.com",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
      </head>
      <body>
        <CartProvider>
          <AnnouncementBar />
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <FloatingWhatsApp />
          <ActivityPopup />
        </CartProvider>
      </body>
    </html>
  );
}
