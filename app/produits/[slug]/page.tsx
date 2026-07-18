import { Metadata } from "next";
import { PRODUITS_DEMO } from "@/lib/produits";
import ProduitDetail from "./ProduitDetail";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const produit = PRODUITS_DEMO.find((p) => p.slug === params.slug);
  const title = produit ? `${produit.nom} — NPITPACKING Maroc` : "Produit — NPITPACKING";
  const desc  = produit?.description ?? "Produit d'emballage professionnel — NPITPACKING Maroc";
  return { title, description: desc };
}

export default function ProduitPage({ params }: { params: { slug: string } }) {
  return <ProduitDetail slug={params.slug} />;
}
