import type { Metadata } from "next";
import "./globals.css";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { CartProvider } from "@/context/CartContext";

export const metadata: Metadata = {
  metadataBase: new URL("https://npitpacking.com"),
  title: "NPTI Packing Maroc — Cellophane, Serviettes, Papier Cuisson, Sacs",
  description:
    "Vente de papier et emballage au Maroc : cellophane, serviettes, papier cuisson, sacs kraft. Prix détail et gros. Livraison dans tout le Maroc.",
  keywords: ["emballage maroc", "cellophane", "serviettes", "papier cuisson", "sacs kraft", "grossiste emballage", "NPTI Packing"],
  openGraph: {
    siteName: "NPITPACKING",
    url: "https://npitpacking.com",
    locale: "fr_MA",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <CartProvider>
          <AnnouncementBar />
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <FloatingWhatsApp />
        </CartProvider>
      </body>
    </html>
  );
}
