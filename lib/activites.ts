export const ACTIVITES = [
  {
    id: "restaurant",
    label: "Restaurant",
    emoji: "🍽️",
    couleur: "bg-orange-50 border-orange-200 hover:border-orange-400",
    emojisBg: "bg-orange-100",
    categories: ["emballage-alimentaire", "papier", "plastique"],
  },
  {
    id: "cafe",
    label: "Café",
    emoji: "☕",
    couleur: "bg-amber-50 border-amber-200 hover:border-amber-400",
    emojisBg: "bg-amber-100",
    categories: ["hygiene", "emballage-alimentaire", "papier"],
  },
  {
    id: "snack",
    label: "Snack",
    emoji: "🌮",
    couleur: "bg-yellow-50 border-yellow-200 hover:border-yellow-400",
    emojisBg: "bg-yellow-100",
    categories: ["emballage-alimentaire", "plastique", "papier"],
  },
  {
    id: "patisserie",
    label: "Pâtisserie",
    emoji: "🥐",
    couleur: "bg-pink-50 border-pink-200 hover:border-pink-400",
    emojisBg: "bg-pink-100",
    categories: ["emballage-alimentaire", "papier"],
  },
  {
    id: "boucherie",
    label: "Boucherie",
    emoji: "🥩",
    couleur: "bg-red-50 border-red-200 hover:border-red-400",
    emojisBg: "bg-red-100",
    categories: ["plastique", "papier"],
  },
  {
    id: "traiteur",
    label: "Traiteur",
    emoji: "👨‍🍳",
    couleur: "bg-green-50 border-green-200 hover:border-green-400",
    emojisBg: "bg-green-100",
    categories: ["emballage-alimentaire", "plastique", "papier"],
  },
  {
    id: "hotel",
    label: "Hôtel",
    emoji: "🏨",
    couleur: "bg-blue-50 border-blue-200 hover:border-blue-400",
    emojisBg: "bg-blue-100",
    categories: ["hygiene", "papier", "verre-cristal"],
  },
] as const;

export type ActiviteId = (typeof ACTIVITES)[number]["id"];

export const ACTIVITE_CATS: Record<string, string[]> = Object.fromEntries(
  ACTIVITES.map((a) => [a.id, [...a.categories]])
);

export function getActivite(id: string) {
  return ACTIVITES.find((a) => a.id === id) ?? null;
}
