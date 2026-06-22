import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export const metadata: Metadata = {
  title: "NPTI Packing Maroc — Cellophane, Serviettes, Papier Cuisson, Sacs",
  description:
    "Vente de papier et emballage au Maroc : cellophane, serviettes, papier cuisson, sacs kraft. Prix détail et gros. Livraison dans tout le Maroc.",
  keywords: ["emballage maroc", "cellophane", "serviettes", "papier cuisson", "sacs kraft", "grossiste emballage", "NPTI Packing"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
