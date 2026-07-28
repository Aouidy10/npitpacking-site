export interface CartItem {
  id: string;          // produitId + "_" + varianteNom (unique par combinaison)
  produitId: string;
  produitNom: string;
  produitSlug: string;
  produitImage: string;
  variante?: string;
  varianteImage?: string;
  quantite: number;
  prixUnit: number;    // prix unitaire au moment de l'ajout
}

export function buildCartId(produitId: string, variante?: string) {
  return variante ? `${produitId}_${variante}` : produitId;
}
