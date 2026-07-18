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

export const PRODUITS_DEMO: Produit[] = [

  // ═══════════════════════════════════════════════════════
  // HYGIÈNE
  // ═══════════════════════════════════════════════════════

  // ── Papier Hygiène ──────────────────────────────────
  {
    id: "1", nom: "Jumbo Toilet Pro 350G X18", nomAr: "منديل حمام جامبو برو 350غ ×18",
    slug: "jumbo-toilet-pro-350g", categorie: "hygiene", sousCategorie: "papier-hygiene",
    description: "Papier toilette jumbo lisse 350g, colis de 18 rouleaux. Qualité Pro — idéal pour hôtels, restaurants et administrations.",
    images: [], prixDetail: 145, prixGros: 105, seuilGros: 5, unite: "colis", disponible: true, vedette: true,
  },
  {
    id: "2", nom: "Jumbo Toilet Pro 300G X18", nomAr: "منديل حمام جامبو برو 300غ ×18",
    slug: "jumbo-toilet-pro-300g", categorie: "hygiene", sousCategorie: "papier-hygiene",
    description: "Papier toilette jumbo lisse 300g, colis de 18 rouleaux. Rapport qualité/prix optimal.",
    images: [], prixDetail: 125, prixGros: 90, seuilGros: 5, unite: "colis", disponible: true, vedette: false,
  },
  {
    id: "3", nom: "Jumbo Toilet Pro 280G X18", nomAr: "منديل حمام جامبو برو 280غ ×18",
    slug: "jumbo-toilet-pro-280g", categorie: "hygiene", sousCategorie: "papier-hygiene",
    description: "Papier toilette jumbo lisse 280g, colis de 18 rouleaux. Version économique sans compromis.",
    images: [], prixDetail: 115, prixGros: 82, seuilGros: 5, unite: "colis", disponible: true, vedette: false,
  },
  {
    id: "4", nom: "Essuie-Tout Pro 1.2KG X6", nomAr: "مناشف ورقية برو 1.2كغ ×6",
    slug: "essuie-tout-pro-12kg", categorie: "hygiene", sousCategorie: "papier-hygiene",
    description: "Essuie-tout professionnel lisse 1.2kg, colis de 6 rouleaux. Haute absorption pour cuisines professionnelles.",
    images: [], prixDetail: 95, prixGros: 70, seuilGros: 5, unite: "colis", disponible: true, vedette: false,
  },
  {
    id: "5", nom: "Essuie-Tout Pro 1KG X6", nomAr: "مناشف ورقية برو 1كغ ×6",
    slug: "essuie-tout-pro-1kg", categorie: "hygiene", sousCategorie: "papier-hygiene",
    description: "Essuie-tout professionnel lisse 1kg, colis de 6 rouleaux. Résistant et absorbant.",
    images: [], prixDetail: 80, prixGros: 58, seuilGros: 5, unite: "colis", disponible: true, vedette: false,
  },
  {
    id: "6", nom: "Essuie-Tout Pro 0.9KG X6", nomAr: "مناشف ورقية برو 0.9كغ ×6",
    slug: "essuie-tout-pro-09kg", categorie: "hygiene", sousCategorie: "papier-hygiene",
    description: "Essuie-tout professionnel lisse 0.9kg, colis de 6 rouleaux. Version légère pour usage quotidien.",
    images: [], prixDetail: 72, prixGros: 52, seuilGros: 5, unite: "colis", disponible: true, vedette: false,
  },

  // ── Mouchoirs & Zigzag ──────────────────────────────
  {
    id: "7", nom: "Mouchoir 550-1", nomAr: "منديل 550 - 1 عيون",
    slug: "mouchoir-550-1", categorie: "hygiene", sousCategorie: "mouchoirs",
    description: "Mouchoirs 550 feuillets simple épaisseur, colis de 24 paquets.",
    images: [], prixDetail: 48, prixGros: 35, seuilGros: 10, unite: "colis", disponible: true, vedette: false,
  },
  {
    id: "8", nom: "Mouchoir 550-2", nomAr: "منديل 550 - 2 عيون",
    slug: "mouchoir-550-2", categorie: "hygiene", sousCategorie: "mouchoirs",
    description: "Mouchoirs 550 feuillets double épaisseur, colis de 24 paquets. Extra doux.",
    images: [], prixDetail: 55, prixGros: 40, seuilGros: 10, unite: "colis", disponible: true, vedette: false,
  },
  {
    id: "9", nom: "Mouchoir Gaufré G", nomAr: "منديل مزخرف G",
    slug: "mouchoir-gaufreg", categorie: "hygiene", sousCategorie: "mouchoirs",
    description: "Mouchoirs gaufrés texture G, colis de 24 paquets. Texture premium.",
    images: [], prixDetail: 50, prixGros: 36, seuilGros: 10, unite: "colis", disponible: true, vedette: false,
  },
  {
    id: "10", nom: "Papier Zigzag", nomAr: "ورق متعرج",
    slug: "papier-zigzag", categorie: "hygiene", sousCategorie: "mouchoirs",
    description: "Papier zigzag 260g, colis de 20 paquets. Pour coiffure et esthétique professionnelle.",
    images: [], prixDetail: 35, prixGros: 25, seuilGros: 5, unite: "colis", disponible: true, vedette: false,
  },

  // ── Serviettes ──────────────────────────────────────
  {
    id: "11", nom: "Papier Serviette 80F SP", nomAr: "مناديل مائدة 80 وجه SP",
    slug: "serviette-80f-sp", categorie: "hygiene", sousCategorie: "serviettes",
    description: "Serviettes de table 80 feuilles SP, colis de 24 paquets. Qualité supérieure pour restaurants.",
    images: ["100-serviettes-1_vabcja"], prixDetail: 65, prixGros: 48, seuilGros: 10, unite: "colis", disponible: true, vedette: true,
  },
  {
    id: "12", nom: "Papier Serviette 70F", nomAr: "مناديل مائدة 70 وجه",
    slug: "serviette-70f", categorie: "hygiene", sousCategorie: "serviettes",
    description: "Serviettes de table 70 feuilles, colis de 24 paquets. Format standard cafés et snacks.",
    images: ["100-serviettes-1_vabcja"], prixDetail: 58, prixGros: 42, seuilGros: 10, unite: "colis", disponible: true, vedette: false,
  },
  {
    id: "13", nom: "Papier Serviette 60F", nomAr: "مناديل مائدة 60 وجه",
    slug: "serviette-60f", categorie: "hygiene", sousCategorie: "serviettes",
    description: "Serviettes de table 60 feuilles, colis de 24 paquets. Version économique.",
    images: ["100-serviettes-1_vabcja"], prixDetail: 50, prixGros: 36, seuilGros: 10, unite: "colis", disponible: true, vedette: false,
  },

  // ═══════════════════════════════════════════════════════
  // EMBALLAGE ALIMENTAIRE
  // ═══════════════════════════════════════════════════════

  // ── Film Alimentaire ────────────────────────────────
  {
    id: "14", nom: "Film Alimentaire 900G X30", nomAr: "غلاف بلاستيكي لاصق 900غ × 30",
    slug: "film-alimentaire-900g-x30", categorie: "emballage-alimentaire", sousCategorie: "film-alimentaire",
    description: "Film alimentaire transparent 900g largeur 30cm, colis de 12 rouleaux. Idéal boucheries et restauration.",
    images: [], prixDetail: 22, prixGros: 16, seuilGros: 10, unite: "rouleau", disponible: true, vedette: false,
  },
  {
    id: "15", nom: "Film Alimentaire JUS", nomAr: "غلاف بلاستيكي لاصق JUS",
    slug: "film-alimentaire-jus", categorie: "emballage-alimentaire", sousCategorie: "film-alimentaire",
    description: "Film alimentaire spécial jus 900g, colis de 12 rouleaux. Résistant à l'humidité.",
    images: [], prixDetail: 22, prixGros: 16, seuilGros: 10, unite: "rouleau", disponible: true, vedette: false,
  },
  {
    id: "16", nom: "Film Alimentaire 1500G X45", nomAr: "غلاف بلاستيكي لاصق 1500غ × 45",
    slug: "film-alimentaire-1500g-x45", categorie: "emballage-alimentaire", sousCategorie: "film-alimentaire",
    description: "Film alimentaire grand format 1500g largeur 45cm, colis de 12 rouleaux. Pour grandes surfaces.",
    images: [], prixDetail: 30, prixGros: 22, seuilGros: 10, unite: "rouleau", disponible: true, vedette: true,
  },

  // ── Rouleau Aluminium ───────────────────────────────
  {
    id: "21", nom: "Rouleau Alu Géant", nomAr: "رقائق ألومنيوم عملاق",
    slug: "rouleau-alu-geant", categorie: "emballage-alimentaire", sousCategorie: "rouleau-aluminium",
    description: "Rouleau aluminium géant, colis de 6 rouleaux. Pour boulangeries et cuisines professionnelles.",
    images: [], prixDetail: 58, prixGros: 42, seuilGros: 5, unite: "rouleau", disponible: true, vedette: true,
  },
  {
    id: "22", nom: "Rouleau Alu ECO 1.3", nomAr: "رقائق ألومنيوم صديق البيئة 1.3",
    slug: "rouleau-alu-eco-13", categorie: "emballage-alimentaire", sousCategorie: "rouleau-aluminium",
    description: "Rouleau aluminium ECO 1.3kg, colis de 6 rouleaux. Éco-responsable pour cuisson légère.",
    images: [], prixDetail: 32, prixGros: 23, seuilGros: 5, unite: "rouleau", disponible: true, vedette: false,
  },
  {
    id: "23", nom: "Rouleau Alu Grande 2", nomAr: "رقائق ألومنيوم كبير 2",
    slug: "rouleau-alu-grande-2", categorie: "emballage-alimentaire", sousCategorie: "rouleau-aluminium",
    description: "Rouleau aluminium grand format 2kg, colis de 6 rouleaux. Largeur professionnelle.",
    images: [], prixDetail: 48, prixGros: 34, seuilGros: 5, unite: "rouleau", disponible: true, vedette: false,
  },

  // ── Barquettes Aluminium ────────────────────────────
  {
    id: "24", nom: "Barquette Alu 420", nomAr: "حاوية ألومنيوم 420",
    slug: "barquette-alu-420", categorie: "emballage-alimentaire", sousCategorie: "barquettes-aluminium",
    description: "Barquette aluminium individuelle 420ml, boîte de 1000 unités. Pour plats chauds et livraison.",
    images: [], prixDetail: 165, prixGros: 120, seuilGros: 3, unite: "boîte", disponible: true, vedette: false,
  },
  {
    id: "25", nom: "Barquette Alu 670", nomAr: "حاوية ألومنيوم 670",
    slug: "barquette-alu-670", categorie: "emballage-alimentaire", sousCategorie: "barquettes-aluminium",
    description: "Barquette aluminium 670ml, boîte de 1000 unités. Format intermédiaire pour portions généreuses.",
    images: [], prixDetail: 185, prixGros: 135, seuilGros: 3, unite: "boîte", disponible: true, vedette: false,
  },
  {
    id: "26", nom: "Barquette Alu 2C", nomAr: "حاوية ألومنيوم لشخصين C",
    slug: "barquette-alu-2c", categorie: "emballage-alimentaire", sousCategorie: "barquettes-aluminium",
    description: "Barquette aluminium 2 compartiments, boîte de 500 unités. Idéale pour menus avec séparation.",
    images: [], prixDetail: 145, prixGros: 105, seuilGros: 3, unite: "boîte", disponible: true, vedette: false,
  },
  {
    id: "27", nom: "Barquette Alu 3180 Laza", nomAr: "حاوية ألومنيوم 3180 لازا",
    slug: "barquette-alu-3180", categorie: "emballage-alimentaire", sousCategorie: "barquettes-aluminium",
    description: "Barquette aluminium grande taille 3180ml (Laza), boîte de 1000 unités. Pour tajines et couscous.",
    images: [], prixDetail: 195, prixGros: 145, seuilGros: 3, unite: "boîte", disponible: true, vedette: true,
  },
  {
    id: "28", nom: "Barquette Alu Poulet", nomAr: "حاوية ألومنيوم دجاج",
    slug: "barquette-alu-poulet", categorie: "emballage-alimentaire", sousCategorie: "barquettes-aluminium",
    description: "Barquette aluminium spéciale poulet, boîte de 1000 unités. Format adapté pour volailles entières.",
    images: [], prixDetail: 195, prixGros: 145, seuilGros: 3, unite: "boîte", disponible: true, vedette: false,
  },

  // ── Gobelets & Pots ────────────────────────────────
  {
    id: "29", nom: "Goblet CAR 4 OZ", nomAr: "كوب شحن 4 أونصة",
    slug: "goblet-car-4oz", categorie: "emballage-alimentaire", sousCategorie: "gobelets-pots",
    description: "Gobelet carton 4 oz (café), boîte de 1000 unités. Pour cafés et distributeurs.",
    images: [], prixDetail: 95, prixGros: 68, seuilGros: 3, unite: "boîte", disponible: true, vedette: false,
  },
  {
    id: "30", nom: "Goblet CAR 4 OZ + Couvercle", nomAr: "كوب شحن 4 أونصة مع غطاء",
    slug: "goblet-car-4oz-ac", categorie: "emballage-alimentaire", sousCategorie: "gobelets-pots",
    description: "Gobelet carton 4 oz avec couvercle, boîte de 1000 unités. Idéal pour vente à emporter.",
    images: [], prixDetail: 110, prixGros: 78, seuilGros: 3, unite: "boîte", disponible: true, vedette: false,
  },
  {
    id: "31", nom: "Goblet CAR 8 OZ", nomAr: "كوب 8 أونصة",
    slug: "goblet-car-8oz", categorie: "emballage-alimentaire", sousCategorie: "gobelets-pots",
    description: "Gobelet carton 8 oz (café latte, thé), boîte de 1000 unités.",
    images: [], prixDetail: 115, prixGros: 82, seuilGros: 3, unite: "boîte", disponible: true, vedette: false,
  },
  {
    id: "32", nom: "Goblet CAR 8 OZ + Couvercle", nomAr: "كوب 8 أونصة مع غطاء",
    slug: "goblet-car-8oz-ac", categorie: "emballage-alimentaire", sousCategorie: "gobelets-pots",
    description: "Gobelet carton 8 oz avec couvercle, boîte de 1000 unités. Pour cafés mobiles.",
    images: [], prixDetail: 128, prixGros: 92, seuilGros: 3, unite: "boîte", disponible: true, vedette: false,
  },
  {
    id: "33", nom: "Goblet CAR 9 OZ", nomAr: "كوب 9 أونصة",
    slug: "goblet-car-9oz", categorie: "emballage-alimentaire", sousCategorie: "gobelets-pots",
    description: "Gobelet carton 9 oz, boîte de 1000 unités. Grand format pour cappuccinos et jus.",
    images: [], prixDetail: 125, prixGros: 88, seuilGros: 3, unite: "boîte", disponible: true, vedette: false,
  },
  {
    id: "34", nom: "Goblet CAR 9 OZ + Couvercle", nomAr: "كوب 9 أونصة مع غطاء",
    slug: "goblet-car-9oz-ac", categorie: "emballage-alimentaire", sousCategorie: "gobelets-pots",
    description: "Gobelet carton 9 oz avec couvercle, boîte de 1000 unités. Le plus vendu.",
    images: [], prixDetail: 138, prixGros: 98, seuilGros: 3, unite: "boîte", disponible: true, vedette: true,
  },

  // ═══════════════════════════════════════════════════════
  // EMBALLAGE BIODÉGRADABLE
  // ═══════════════════════════════════════════════════════

  {
    id: "35", nom: "Boîtes Pizza 24cm", nomAr: "علب بيتزا 24 سم",
    slug: "boites-pizza-24", categorie: "emballage-biodegradable", sousCategorie: "boite-pizza",
    description: "Boîtes à pizza 24cm en carton ondulé, lot de 50 unités. Résistantes à la chaleur.",
    images: [], prixDetail: 245, prixGros: 178, seuilGros: 3, unite: "lot", disponible: true, vedette: false,
  },
  {
    id: "36", nom: "Boîtes Pizza 26cm", nomAr: "علب بيتزا 26 سم",
    slug: "boites-pizza-26", categorie: "emballage-biodegradable", sousCategorie: "boite-pizza",
    description: "Boîtes à pizza 26cm en carton ondulé, lot de 50 unités. Le format le plus demandé.",
    images: [], prixDetail: 275, prixGros: 198, seuilGros: 3, unite: "lot", disponible: true, vedette: true,
  },
  {
    id: "37", nom: "Boîtes Pizza 29cm", nomAr: "علب بيتزا 29 سم",
    slug: "boites-pizza-29", categorie: "emballage-biodegradable", sousCategorie: "boite-pizza",
    description: "Boîtes à pizza 29cm en carton ondulé, lot de 50 unités. Grand format familial.",
    images: [], prixDetail: 310, prixGros: 225, seuilGros: 3, unite: "lot", disponible: true, vedette: false,
  },

  // ═══════════════════════════════════════════════════════
  // PAPIER
  // ═══════════════════════════════════════════════════════

  {
    id: "38", nom: "Rouleau de Caisse", nomAr: "ورق الكاسا",
    slug: "rouleau-de-caisse", categorie: "papier", sousCategorie: "rouleaux-caisse",
    description: "Rouleaux de caisse thermique, lot de 50 rouleaux. Compatible toutes caisses enregistreuses.",
    images: [], prixDetail: 380, prixGros: 280, seuilGros: 2, unite: "lot", disponible: true, vedette: false,
  },

  // ═══════════════════════════════════════════════════════
  // PLASTIQUE
  // ═══════════════════════════════════════════════════════

  // ── Film Étirable ───────────────────────────────────
  {
    id: "17", nom: "Film Étirable 1.3", nomAr: "غلاف مطاطي 1.3",
    slug: "film-etirable-13", categorie: "plastique", sousCategorie: "film-etirable",
    description: "Film étirable 1.3kg, colis de 6 rouleaux. Haute extensibilité pour emballage de palettes.",
    images: [], prixDetail: 42, prixGros: 30, seuilGros: 5, unite: "rouleau", disponible: true, vedette: false,
  },
  {
    id: "18", nom: "Film Étirable 1.5", nomAr: "غلاف مطاطي 1.5",
    slug: "film-etirable-15", categorie: "plastique", sousCategorie: "film-etirable",
    description: "Film étirable 1.5kg, colis de 6 rouleaux. Pour sécuriser vos expéditions.",
    images: [], prixDetail: 48, prixGros: 34, seuilGros: 5, unite: "rouleau", disponible: true, vedette: false,
  },
  {
    id: "19", nom: "Film Étirable 1.8", nomAr: "غلاف مطاطي 1.8",
    slug: "film-etirable-18", categorie: "plastique", sousCategorie: "film-etirable",
    description: "Film étirable 1.8kg, colis de 6 rouleaux. Version renforcée pour charges lourdes.",
    images: [], prixDetail: 58, prixGros: 42, seuilGros: 5, unite: "rouleau", disponible: true, vedette: false,
  },
  {
    id: "20", nom: "Film Étirable 2", nomAr: "غلاف مطاطي 2",
    slug: "film-etirable-2", categorie: "plastique", sousCategorie: "film-etirable",
    description: "Film étirable 2kg, colis de 6 rouleaux. Le plus résistant pour usage industriel.",
    images: [], prixDetail: 65, prixGros: 48, seuilGros: 5, unite: "rouleau", disponible: true, vedette: false,
  },

  // ── Sacs ────────────────────────────────────────────
  {
    id: "39", nom: "Sacs Poubelle 130L", nomAr: "أكياس قمامة 130 لتر",
    slug: "sacs-poubelle-130l", categorie: "plastique", sousCategorie: "sacs",
    description: "Sacs poubelle noirs 130 litres, rouleau de 5 sacs. Résistants pour collectivités et marchés.",
    images: [], prixDetail: 42, prixGros: 30, seuilGros: 10, unite: "rouleau", disponible: true, vedette: false,
  },
  {
    id: "40", nom: "Sacs Poubelle 70L", nomAr: "أكياس قمامة 70 لتر",
    slug: "sacs-poubelle-70l", categorie: "plastique", sousCategorie: "sacs",
    description: "Sacs poubelle noirs 70 litres, rouleau de 5 sacs. Format standard pour bureaux et commerces.",
    images: [], prixDetail: 35, prixGros: 25, seuilGros: 10, unite: "rouleau", disponible: true, vedette: false,
  },
];
