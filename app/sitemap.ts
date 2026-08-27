import { MetadataRoute } from "next";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

const BASE = "https://npitpacking.com";

const STATIC_ROUTES: MetadataRoute.Sitemap = [
  { url: BASE,                                    lastModified: new Date(), changeFrequency: "daily",   priority: 1.0 },
  { url: `${BASE}/catalogue`,                     lastModified: new Date(), changeFrequency: "daily",   priority: 0.9 },
  { url: `${BASE}/devis`,                         lastModified: new Date(), changeFrequency: "weekly",  priority: 0.8 },
  { url: `${BASE}/contact`,                       lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE}/a-propos`,                      lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
  { url: `${BASE}/politique-de-livraison`,        lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
  { url: `${BASE}/mentions-legales`,              lastModified: new Date(), changeFrequency: "yearly",  priority: 0.3 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const snap = await getDocs(collection(db, "produits"));
    const productRoutes: MetadataRoute.Sitemap = snap.docs
      .map((doc) => {
        const data = doc.data();
        if (!data.slug) return null;
        return {
          url: `${BASE}/produits/${data.slug}`,
          lastModified: new Date(),
          changeFrequency: "weekly" as const,
          priority: 0.8,
        };
      })
      .filter(Boolean) as MetadataRoute.Sitemap;

    return [...STATIC_ROUTES, ...productRoutes];
  } catch {
    return STATIC_ROUTES;
  }
}
