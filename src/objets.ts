// Type
export type objet = {
  name: string;
  effect: string;
  bonus: number | null;
};

// objets
export const objets: Record<number, objet> = {
  1: {
    name: "Champignon rouge d'Aminata",
    effect: "Restaure 5 points de vie",
    bonus: 5,
  },

  2: {
    name: "Piège à ours",
    effect: "Immobilise la victime qui marche sur le piège. Les attaques pour le prochain tour font +2 de dégâts",
    bonus: +2,
  },

  3: {
    name: "Antitoxine",
    effect: "Permet de retirer une condition d’empoisonnement.",
    bonus: null,
  },

};
