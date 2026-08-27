import { Metadata } from "next";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { PRODUITS_DEMO } from "@/lib/produits";
import ProduitDetail from "./ProduitDetail";

async function getProduitBySlug(slug: string) {
  // 1. Essayer Firestore
  try {
    const snap = await getDocs(
      query(collection(db, "produits"), where("slug", "==", slug))
    );
    if (!snap.empty) {
      return snap.docs[0].data() as { nom: string; description: string; images?: string[] };
    }
  } catch { /* ignoré */ }

  // 2. Fallback PRODUITS_DEMO
  return PRODUITS_DEMO.find((p) => p.slug === slug) ?? null;
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const produit = await getProduitBySlug(params.slug);

  if (!produit) {
    return {
      title: "Produit introuvable",
      description: "Ce produit n'existe pas dans notre catalogue.",
    };
  }

  const titre = `${produit.nom} — Emballage Maroc`;
  const desc  = produit.description
    ? `${produit.description.slice(0, 155)}…`
    : `${produit.nom} — Emballage professionnel disponible chez NPIT Packing Maroc. Vente détail et gros.`;

  const image = produit.images?.[0]
    ? `https://res.cloudinary.com/dndglxfeu/image/upload/c_fill,w_1200,h_630/${produit.images[0]}`
    : undefined;

  return {
    title: titre,
    description: desc,
    alternates: { canonical: `https://npitpacking.com/produits/${params.slug}` },
    openGraph: {
      title: titre,
      description: desc,
      url: `https://npitpacking.com/produits/${params.slug}`,
      type: "website",
      ...(image ? { images: [{ url: image, width: 1200, height: 630, alt: produit.nom }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: titre,
      description: desc,
      ...(image ? { images: [image] } : {}),
    },
  };
}

export default function ProduitPage({ params }: { params: { slug: string } }) {
  return <ProduitDetail slug={params.slug} />;
}
