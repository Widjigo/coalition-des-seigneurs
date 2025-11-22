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

};
