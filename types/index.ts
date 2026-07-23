export type Categorie =
  | "emballage-alimentaire"
  | "emballage-biodegradable"
  | "hygiene"
  | "papier"
  | "plastique"
  | "verre-cristal";

export interface Variante {
  nom: string;
  prixDetail: number;
  prixGros: number;
  seuilGros: number;
}

export interface Produit {
  id: string;
  nom: string;
  nomAr: string;
  slug: string;
  categorie: Categorie;
  sousCategorie: string;
  description: string;
  images: string[];
  poids?: string;
  colis?: number;
  badge?: "nouveau" | "promo" | "bestseller";
  prixDetail: number;
  prixGros: number;
  seuilGros: number;
  unite: string;
  disponible: boolean;
  vedette: boolean;
  variantes?: Variante[];
}

export interface DevisFormData {
  nom: string;
  telephone: string;
  ville: string;
  produit: string;
  quantite: number;
  message?: string;
}

export interface Commande {
  id?: string;
  type: "detail" | "gros";
  produitId: string;
  produitNom: string;
  quantite: number;
  prixTotal: number;
  nom: string;
  telephone: string;
  ville: string;
  message?: string;
  statut: "en-attente" | "confirmee" | "livree";
  createdAt: Date;
}
