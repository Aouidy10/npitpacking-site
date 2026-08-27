import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/", "/commande/", "/panier/"],
      },
    ],
    sitemap: "https://npitpacking.com/sitemap.xml",
    host: "https://npitpacking.com",
  };
}
