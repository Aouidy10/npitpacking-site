import { notFound } from "next/navigation";
import { Metadata } from "next";
import { PRODUITS_DEMO } from "@/lib/produits";
import ProduitDetail from "./ProduitDetail";

export function generateStaticParams() {
  return PRODUITS_DEMO.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const produit = PRODUITS_DEMO.find((p) => p.slug === params.slug);
  if (!produit) return { title: "Produit introuvable" };
  return {
    title: `${produit.nom} — NPIT packaging Maroc`,
    description: produit.description,
    openGraph: {
      title: `${produit.nom} — NPIT packaging Maroc`,
      description: produit.description,
    },
  };
}

export default function ProduitPage({ params }: { params: { slug: string } }) {
  const produit = PRODUITS_DEMO.find((p) => p.slug === params.slug);
  if (!produit) notFound();
  return <ProduitDetail produit={produit} />;
}
