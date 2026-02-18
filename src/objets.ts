import aminata from "./assets/aminata.png";
import piege from "./assets/piege.png";
import antitoxin from "./assets/antitoxin.png";
import bouclier from "./assets/bouclier.png";
import usedAminata from "./assets/UsedAminata.png";
import usedAntitoxine from "./assets/UsedAntitoxine.png";
import usedBouclier from "./assets/UsedBouclier.png";
import usedPiege from "./assets/UsedPiege.png"

// Type
export type objet = {
  id: number;
  name: string;
  img: string | null;
  imgUsed: string;
  effect: string;
  bonus: number | null;
  statut : string;
};

// objets
export const objets: Record<number, objet> = {
  1: {
    id: 1,
    name: "Champignon rouge d'Aminata",
    img: aminata,
    imgUsed: usedAminata,
    effect: "Restaure 5 points de vie",
    bonus: 5,
    statut : "Disponible",
  },

  2: {
    id : 2,
    name: "Piège à ours",
    img: piege,
    imgUsed: usedPiege,
    effect: "Immobilise la victime qui marche sur le piège. Les attaques pour le prochain tour font +2 de dégâts",
    bonus: +2,
    statut : "Disponible",
  },

  3: {
    id: 3,
    name: "Antitoxine",
    img: antitoxin,
    imgUsed: usedAntitoxine,
    effect: "Permet de retirer une condition d’empoisonnement.",
    bonus: null,
    statut : "Disponible",
  },

    4: {
    id: 4,
    name: "Bouclier",
    img: bouclier,
    imgUsed: usedBouclier,
    effect: "Ajoute +2 à la défense d'un aventurier",
    bonus: +2,
    statut : "Indisponible",
  },
};

