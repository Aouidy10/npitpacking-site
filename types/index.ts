export type Categorie = "cellophane" | "serviettes" | "papier-cuisson" | "sacs";

export interface Produit {
  id: string;
  nom: string;
  nomAr: string;
  slug: string;
  categorie: Categorie;
  description: string;
  images: string[]; // Cloudinary public IDs
  prixDetail: number;    // prix unitaire détail
  prixGros: number;      // prix unitaire gros
  seuilGros: number;     // quantité min pour prix gros (ex: 50)
  unite: string;         // "unité" | "rouleau" | "paquet"
  disponible: boolean;
  vedette: boolean;
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
