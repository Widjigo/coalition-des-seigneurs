// Type
export type aventurier = {
  name: string;
  hp: number;
  attack_type: string;
  dc: number | null;
  attack_bonus: number | null;
  attack_dmg_roll: number| null;
  attack_dmg_bonus: number| null;
  ability: string;
};

// aventuriers
export const aventuriers: Record<number, aventurier> = {
  1: {
    name: "Pimple",
    hp: 17,
    attack_type: "Fouet d'eau",
    dc: null, 
    attack_bonus: 4,
    attack_dmg_roll: 6,
    attack_dmg_bonus: 2,
    ability: "Lancer le sortilège «Lire les pensées»",
  },

    2: {
    name: "Yibap",
    hp: 4,
    attack_type: "Nuage de spores (Affecte une créature)",
    dc: 10,
    attack_bonus: null ,
    attack_dmg_roll: null,
    attack_dmg_bonus: null,
    ability: "Sensibilité aiguë à la nature et à son environnement.",
  },
};
