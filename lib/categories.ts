import { Categorie } from "@/types";

export interface SousCategorie {
  slug: string;
  label: string;
}

export interface CategorieConfig {
  slug: Categorie;
  label: string;
  labelAr: string;
  sousCats: SousCategorie[];
}

export const CATEGORIES_CONFIG: CategorieConfig[] = [
  {
    slug: "emballage-alimentaire",
    label: "Emballage Alimentaire",
    labelAr: "تعبئة غذائية",
    sousCats: [
      { slug: "barquettes-aluminium",  label: "Barquettes Aluminium" },
      { slug: "barquettes-alimentaires", label: "Barquettes Alimentaires" },
      { slug: "gobelets-pots",         label: "Gobelets & Pots" },
      { slug: "film-alimentaire",      label: "Film Alimentaire" },
      { slug: "rouleau-aluminium",     label: "Rouleau Aluminium" },
      { slug: "assiettes",             label: "Assiettes" },
      { slug: "couverts",              label: "Couverts" },
      { slug: "pailles",               label: "Pailles" },
      { slug: "plateaux-repas",        label: "Plateaux Repas" },
      { slug: "bouteilles-jus",        label: "Bouteilles à Jus" },
      { slug: "saladiers",             label: "Saladiers" },
      { slug: "pots-sauce",            label: "Pots à Sauce" },
    ],
  },
  {
    slug: "emballage-biodegradable",
    label: "Emballage Biodégradable",
    labelAr: "تعبئة صديقة للبيئة",
    sousCats: [
      { slug: "boite-pizza",                  label: "Boîtes à Pizza" },
      { slug: "gobelets-biodegradables",      label: "Gobelets Biodégradables" },
      { slug: "article-carton",               label: "Articles en Carton" },
      { slug: "article-papier",               label: "Articles en Papier" },
      { slug: "articles-bois",                label: "Articles en Bois" },
      { slug: "bols-soupe-carton",            label: "Bols à Soupe en Carton" },
      { slug: "pots-carton",                  label: "Pots en Carton" },
      { slug: "couverts-biodegradables",      label: "Couverts Biodégradables" },
      { slug: "saladiers-biodegradables",     label: "Saladiers Biodégradables" },
    ],
  },
  {
    slug: "hygiene",
    label: "Hygiène",
    labelAr: "نظافة",
    sousCats: [
      { slug: "papier-hygiene",        label: "Papier Hygiène" },
      { slug: "serviettes",            label: "Serviettes" },
      { slug: "mouchoirs",             label: "Mouchoirs & Zigzag" },
      { slug: "articles-nettoyage",    label: "Articles de Nettoyage" },
      { slug: "poubelles",             label: "Poubelles" },
    ],
  },
  {
    slug: "papier",
    label: "Papier",
    labelAr: "ورق",
    sousCats: [
      { slug: "rouleaux-caisse",       label: "Rouleaux de Caisse" },
      { slug: "emballages-sandwich",   label: "Emballages Sandwich" },
    ],
  },
  {
    slug: "plastique",
    label: "Plastique",
    labelAr: "بلاستيك",
    sousCats: [
      { slug: "film-etirable",         label: "Film Étirable" },
      { slug: "sacs",                  label: "Sacs" },
      { slug: "gobelets-plastique",    label: "Gobelets Plastique" },
    ],
  },
  {
    slug: "verre-cristal",
    label: "Verre & Cristal",
    labelAr: "زجاج وكريستال",
    sousCats: [
      { slug: "verres",                label: "Verres" },
    ],
  },
];

export function getCategorieLabel(slug: Categorie): string {
  return CATEGORIES_CONFIG.find((c) => c.slug === slug)?.label ?? slug;
}

export function getSousCategorieLabel(catSlug: Categorie, subSlug: string): string {
  const cat = CATEGORIES_CONFIG.find((c) => c.slug === catSlug);
  return cat?.sousCats.find((s) => s.slug === subSlug)?.label ?? subSlug;
}

export function getSousCats(catSlug: Categorie): SousCategorie[] {
  return CATEGORIES_CONFIG.find((c) => c.slug === catSlug)?.sousCats ?? [];
}
