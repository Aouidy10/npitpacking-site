export interface CartItem {
  id: string;          // produitId + "_" + varianteNom (unique par combinaison)
  produitId: string;
  produitNom: string;
  produitSlug: string;
  produitImage: string;
  variante?: string;
  varianteImage?: string;
  quantite: number;
  prixUnit: number;    // prix par colis (si colis > 0) ou par unité
  colis?: number;      // nb d'unités par colis ; undefined = vendu à l'unité
}

export function buildCartId(produitId: string, variante?: string) {
  return variante ? `${produitId}_${variante}` : produitId;
}
