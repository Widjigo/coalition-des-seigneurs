import pimple_profil from "./assets/pimple_profil.png";
import yibap_profil from "./assets/yibap_party.png";
import marsyas_profil from "./assets/marsyas_profil.png";

// Type
export type aventurier = {
  id: number;
  name: string;
  hp: number;
  img: string;
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
    id: 1,
    name: "Pimple",
    hp: 17,
    attack_type: "Fouet d'eau",
    img: pimple_profil,
    dc: null, 
    attack_bonus: 4,
    attack_dmg_roll: 6,
    attack_dmg_bonus: 2,
    ability: "Lancer le sortilège «Lire les pensées»",
  },

  2: {
    id: 2,
    name: "Yibap",
    hp: 4,
    img: yibap_profil,
    attack_type: "Nuage de spores\n Sur un 10 et -, la créature est étouffée et incapable d'attaquer durant un tour",
    dc: 10,
    attack_bonus: null ,
    attack_dmg_roll: null,
    attack_dmg_bonus: null,
    ability: "Sensibilité aiguë à la nature et à son environnement.",
  },

  3: {
    id: 3,
    name: "Marsyas",
    hp: 14,
    img: marsyas_profil,
    attack_type: "Charge de cornes",
    dc: null ,
    attack_bonus: 5,
    attack_dmg_roll: 6,
    attack_dmg_bonus: 3,
    ability: "Marsyas possède une flûte de pan qui peut charmer un opposant par sa musique apaisante.",
  },
};
