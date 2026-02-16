import pimple_profil from "./assets/pimple_profil.png";
import yibap_profil from "./assets/yibap_party.png";
import marsyas_profil from "./assets/marsyas_profil.png";
import ours_profil from "./assets/ours_profil.png";
import belch_profil from "./assets/belch_profil.png";
import deadBelch from "./assets/deadBelch.png";
import deadMarsyas from "./assets/deadMarsyas.png";
import deadPimple from "./assets/deadPimple.png"
import deadYibap from "./assets/deadYibap.png";
import deadOurs from "./assets/deadOurs.png";

// Type
export type aventurier = {
  id: number;
  name: string;
  hp: number;
  max_HP: number;
  img: string | null;
  imgDead: string | null;
  attack_type: string;
  dc: number | null;
  attack_bonus: number | null;
  attack_dmg_roll: number| null;
  attack_dmg_bonus: number| null;
  ability: string;
  statut: string | null;
};

// aventuriers
export const aventuriers: Record<number, aventurier> = {
  1: {
    id: 1,
    name: "Pimple",
    hp: 17,
    max_HP: 17,
    attack_type: "Fouet d'eau.",
    img: pimple_profil,
    imgDead: deadPimple,
    dc: 12, 
    attack_bonus: 4,
    attack_dmg_roll: 6,
    attack_dmg_bonus: 2,
    ability: "Lancer le sortilège «Lire les pensées»",
    statut : "Vivant",
  },

  2: {
    id: 2,
    name: "Yibap",
    hp: 4,
    max_HP: 4,
    img: yibap_profil,
    imgDead: deadYibap ,
    attack_type: "Nuage de spores.\n Sur un 10 et -, la créature est étouffée. Elle aura un malus de 4 à l'attaque lors de son prochain tour.",
    dc: 10,
    attack_bonus: null ,
    attack_dmg_roll: null,
    attack_dmg_bonus: null,
    ability: "Sensibilité aiguë à la nature et à son environnement.",
    statut : "Vivant"
  },

  3: {
    id: 3,
    name: "Marsyas",
    hp: 14,
    max_HP: 14,
    img: marsyas_profil,
    imgDead: deadMarsyas ,
    attack_type: "Charge de cornes.",
    dc: 11 ,
    attack_bonus: 5,
    attack_dmg_roll: 6,
    attack_dmg_bonus: 3,
    ability: "Marsyas possède une flûte de pan qui peut charmer un opposant par sa musique apaisante.",
    statut : "Vivant"
  },

  4: {
    id: 4,
    name: "Ours",
    hp: 25,
    max_HP: 25,
    img: ours_profil,
    imgDead: deadOurs ,
    attack_type: "Morsure.",
    dc: 13 ,
    attack_bonus: 5,
    attack_dmg_roll: 8,
    attack_dmg_bonus: 4,
    ability: "Saute sur sa cible afin de lui lécher le visage et ainsi l’affaiblir.",
    statut : "Vivant"
  },

    5: {
    id: 5,
    name: "Belch",
    hp: 7,
    max_HP: 7,
    img: belch_profil,
    imgDead: deadBelch ,
    attack_type: "Scimitar.",
    dc: 12 ,
    attack_bonus: 4,
    attack_dmg_roll: 6,
    attack_dmg_bonus: 2,
    ability: "Belch est furieux contre le troglodyte, au premier tour, il attaque avec avantage.",
    statut : "Vivant"
  },
  
    6: {
    id: 6,
    name: "Troglodyte",
    hp: 40,
    max_HP: 50,
    img: null,
    imgDead: null ,
    attack_type: "Coup de griffe.",
    dc: 14 ,
    attack_bonus: 6,
    attack_dmg_roll: 6,
    attack_dmg_bonus: 3,
    ability: "Souffle au visage empoisonné : Désavantage durant un tour",
    statut : "Vivant"
  },
};