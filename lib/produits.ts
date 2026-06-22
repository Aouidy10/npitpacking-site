import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebase";
import { Produit, Categorie } from "@/types";

export async function getProduits(categorie?: Categorie): Promise<Produit[]> {
  const ref = collection(db, "produits");
  const q = categorie ? query(ref, where("categorie", "==", categorie)) : ref;
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Produit));
}

export async function getProduitBySlug(slug: string): Promise<Produit | null> {
  const ref = collection(db, "produits");
  const q = query(ref, where("slug", "==", slug));
  const snap = await getDocs(q);
  if (snap.empty) return null;
  const d = snap.docs[0];
  return { id: d.id, ...d.data() } as Produit;
}

export async function getProduitsVedettes(): Promise<Produit[]> {
  const ref = collection(db, "produits");
  const q = query(ref, where("vedette", "==", true));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Produit));
}

// Données démo — à remplacer par Firebase une fois configuré
export const PRODUITS_DEMO: Produit[] = [
  // ─── Cellophane ───────────────────────────────────────────────
  {
    id: "1",
    nom: "Cellophane Transparent",
    nomAr: "سولوفان شفاف",
    slug: "cellophane-transparent",
    categorie: "cellophane",
    description: "Cellophane transparent haute qualité pour emballage alimentaire et cadeau. Brillance exceptionnelle, résistant à l'humidité.",
    images: ["npit/cellophane-transparent"],
    prixDetail: 5,
    prixGros: 3.5,
    seuilGros: 50,
    unite: "rouleau",
    disponible: true,
    vedette: true,
  },
  {
    id: "2",
    nom: "Cellophane Coloré",
    nomAr: "سولوفان ملون",
    slug: "cellophane-colore",
    categorie: "cellophane",
    description: "Cellophane coloré disponible en plusieurs teintes : rose, bleu, or, argent. Idéal pour emballages cadeaux et vitrines.",
    images: ["npit/cellophane-colore"],
    prixDetail: 6.5,
    prixGros: 4.5,
    seuilGros: 30,
    unite: "rouleau",
    disponible: true,
    vedette: false,
  },
  {
    id: "3",
    nom: "Cellophane Alimentaire Pro",
    nomAr: "سولوفان غدائي بروفيسيونال",
    slug: "cellophane-alimentaire-pro",
    categorie: "cellophane",
    description: "Cellophane certifié alimentaire, extra résistant. Conforme aux normes européennes pour contact direct avec les aliments.",
    images: ["npit/cellophane-alimentaire"],
    prixDetail: 8,
    prixGros: 5.5,
    seuilGros: 20,
    unite: "rouleau",
    disponible: true,
    vedette: false,
  },

  // ─── Serviettes ───────────────────────────────────────────────
  {
    id: "4",
    nom: "Serviettes Blanches",
    nomAr: "سيرفيت بيضاء",
    slug: "serviettes-blanches",
    categorie: "serviettes",
    description: "Serviettes en papier blanches, douces et résistantes. Idéales pour restaurants, cafés et particuliers.",
    images: ["100-serviettes-1_vabcja"],
    prixDetail: 12,
    prixGros: 8,
    seuilGros: 100,
    unite: "paquet",
    disponible: true,
    vedette: true,
  },
  {
    id: "5",
    nom: "Serviettes Colorées",
    nomAr: "سيرفيت ملونة",
    slug: "serviettes-colorees",
    categorie: "serviettes",
    description: "Serviettes en papier colorées pour événements, fêtes et traiteurs. Disponibles en rouge, vert, bleu et or.",
    images: ["100-serviettes-1_vabcja"],
    prixDetail: 15,
    prixGros: 10,
    seuilGros: 50,
    unite: "paquet",
    disponible: true,
    vedette: false,
  },
  {
    id: "6",
    nom: "Serviettes Cocktail",
    nomAr: "سيرفيت كوكتيل",
    slug: "serviettes-cocktail",
    categorie: "serviettes",
    description: "Petites serviettes format cocktail, légères et élégantes. Parfaites pour buffets, pâtisseries et receptions.",
    images: ["100-serviettes-1_vabcja"],
    prixDetail: 10,
    prixGros: 7,
    seuilGros: 200,
    unite: "paquet",
    disponible: true,
    vedette: false,
  },

  // ─── Papier Cuisson ───────────────────────────────────────────
  {
    id: "7",
    nom: "Papier Cuisson",
    nomAr: "بابي كوسون",
    slug: "papier-cuisson",
    categorie: "papier-cuisson",
    description: "Papier cuisson anti-adhésif, résistant à la chaleur jusqu'à 220°C. Idéal pour fours et pâtisseries.",
    images: ["npit/papier-cuisson"],
    prixDetail: 18,
    prixGros: 13,
    seuilGros: 30,
    unite: "rouleau",
    disponible: true,
    vedette: true,
  },
  {
    id: "8",
    nom: "Papier Aluminium",
    nomAr: "ورق الألومنيوم",
    slug: "papier-aluminium",
    categorie: "papier-cuisson",
    description: "Papier aluminium alimentaire robuste pour cuisson au four, conservation et emballage chaud/froid.",
    images: ["npit/papier-aluminium"],
    prixDetail: 14,
    prixGros: 9.5,
    seuilGros: 20,
    unite: "rouleau",
    disponible: true,
    vedette: false,
  },
  {
    id: "9",
    nom: "Papier Sulfurisé",
    nomAr: "ورق السلفيز",
    slug: "papier-sulfurise",
    categorie: "papier-cuisson",
    description: "Papier sulfurisé double face, résistant à la graisse et à l'humidité. Pour boulangeries, pâtisseries et restaurants.",
    images: ["npit/papier-sulfurise"],
    prixDetail: 20,
    prixGros: 14,
    seuilGros: 15,
    unite: "rouleau",
    disponible: true,
    vedette: false,
  },

  // ─── Sacs & Rouleaux ──────────────────────────────────────────
  {
    id: "10",
    nom: "Sacs Kraft",
    nomAr: "مشوار كرافت",
    slug: "sacs-kraft",
    categorie: "sacs",
    description: "Sacs en papier kraft résistants avec poignées. Parfaits pour commerces, livraisons et emballages premium.",
    images: ["npit/sacs-kraft"],
    prixDetail: 3,
    prixGros: 1.8,
    seuilGros: 200,
    unite: "unité",
    disponible: true,
    vedette: true,
  },
  {
    id: "11",
    nom: "Sacs Plastique Transparents",
    nomAr: "مشوار بلاستيك شفاف",
    slug: "sacs-plastique-transparents",
    categorie: "sacs",
    description: "Sacs plastique transparents alimentaires, résistants et imperméables. Idéaux pour boulangeries, épiceries et marchés.",
    images: ["npit/sacs-plastique"],
    prixDetail: 1.5,
    prixGros: 0.8,
    seuilGros: 500,
    unite: "unité",
    disponible: true,
    vedette: false,
  },
  {
    id: "12",
    nom: "Rouleaux Kraft",
    nomAr: "روليو كرافت",
    slug: "rouleaux-kraft",
    categorie: "sacs",
    description: "Rouleaux de papier kraft pour emballage, protection et expédition. Solide, recyclable, largeur 70 cm.",
    images: ["npit/rouleaux-kraft"],
    prixDetail: 25,
    prixGros: 18,
    seuilGros: 10,
    unite: "rouleau",
    disponible: true,
    vedette: false,
  },
];
