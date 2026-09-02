import { MetadataRoute } from "next";

const BASE = "https://npitpacking.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE,                                    lastModified: new Date(), changeFrequency: "daily",   priority: 1.0 },
    { url: `${BASE}/catalogue`,                     lastModified: new Date(), changeFrequency: "daily",   priority: 0.9 },
    { url: `${BASE}/catalogue?cat=emballage-alimentaire`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/catalogue?cat=hygiene`,         lastModified: new Date(), changeFrequency: "weekly",  priority: 0.8 },
    { url: `${BASE}/catalogue?cat=papier`,          lastModified: new Date(), changeFrequency: "weekly",  priority: 0.8 },
    { url: `${BASE}/catalogue?cat=plastique`,       lastModified: new Date(), changeFrequency: "weekly",  priority: 0.8 },
    { url: `${BASE}/catalogue?cat=emballage-biodegradable`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/catalogue?cat=verre-cristal`,   lastModified: new Date(), changeFrequency: "weekly",  priority: 0.7 },
    { url: `${BASE}/devis`,                         lastModified: new Date(), changeFrequency: "weekly",  priority: 0.8 },
    { url: `${BASE}/contact`,                       lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/a-propos`,                      lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/politique-de-livraison`,        lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/mentions-legales`,              lastModified: new Date(), changeFrequency: "yearly",  priority: 0.3 },
  ];
}
