// Type
export type StoryCard = {
  numero: number;
  sous_numero: number | null;
  nom: string;
  description: string;
  imageUrl: string;
  choixGauche: string;
  choixDroite: string;
};

// Cards
export const CARDS: Record<number, StoryCard> = {
  1: {
    numero: 1,
    sous_numero: null,  
    nom: "Début",
    description: "Au milieu d’une forêt connue par la population du continent pour son aura mystérieux et magique. C’est dans une grotte habitée de nombreux escargots géants qu’une communauté de Campestris, une espèce de myconides humanoïdes arborant des traits d’une grande diversité de champignons,  y vivent depuis des centaines d’années sous le nom de Grovine.",
    imageUrl: "/public/grovine.png",
    choixGauche: "Rester sur cette page",
    choixDroite: "Continuer"
  },

  2: {
    numero: 2,
    sous_numero: null,
    nom: "Trauma",
    description: "Durant la dernière année, la communauté y a vécu un drame  qui a bouleversé leur cohabitation harmonieuse : un des escargots s’est métamorphosé en créature sanguinaire et a ravagé de nombreuse habitations, en plus de tuer trop d’habitants. Après qu’un groupe d’aventuriers ait pu mettre fin au massacre. ",
    imageUrl: "/public/Escargot.png",
    choixGauche: "Retourner à la carte précédente",
    choixDroite: "Continuer"
  },

  3: {
    numero: 3,
    sous_numero: null,
    nom: "Reconstruction",
    description: "Un des leurs, Pimple, décida de rester auprès d’eux afin de reconstruire village.  Ce pixie à la peau bleuté et perlée d’eau mis la main à la pâte afin de travailler la terre pour permettre à de nouvelles habitations de pousser en prenant la mauvaise habitude de prendre des croquées de maisons aux endroits moins visibles. Malgré son attitude de monsieur je-sais-tout, sa petite propension aux mensonges augmentant ses exploits, Pimple est depuis toléré, accepté et apprécié de chacun par son implication. ",
    imageUrl: "/public/pimple.png",
    choixGauche: "Retourner à la carte précédente",
    choixDroite: "Continuer"
  },

  4: {
    numero: 4,
    sous_numero: null,
    nom: "Déclencheur",
    description: "C’est en fin de journée, alors que la noirceur obscurci la forêt, Pimple était alors installé à l’extérieur de la grotte, préparant sa fameuse recette de gruau, quelques baies trouvées alentour et des fleurs de pissenlits pour sa couleur unique. Au travers de sa chanson grivoise, ingrédient secret de son gruau, Pimple entendit une commotion près de l’entrée de la grotte.  Volant à une vitesse maximale d’ailes et activant son invisibilité, il se rendit à l’entrée pour apercevoir une silhouette humanoïde. ",
    imageUrl: "/public/pimple.png",
    choixGauche: "Retourner à la carte précédente",
    choixDroite: "Continuer"
  },

  5: {
    numero: 5,
    sous_numero: null,
    nom: "Kidnapping",
    description: "La silhouette était effilée avec une démarche lourde et une cape recouvrant sa tête est son corps.  Sur son épaule était déposé un panier fait de racine mal tressée avec à l’intérieur quatre campestries. En plissant ses yeux, il reconnu immédiatement Lonfa, Rad, Mirren et Turrun, les enfants de Bestir et échangea un regard avec les enfants apeurés et hurlant, mais incapable de sortir du panier.",
    imageUrl: "/public/pimple.png",
    choixGauche: "Utiliser une détection de la pensée afin de connaître le lieu ou est emmené les enfants.",
    choixDroite: "S’approcher avec son invisibilité afin d’aller voler les enfants un à un."
  },

  6: {
    numero: 6,
    sous_numero: 1,
    nom: "Info_troglodyte",
    description: "Invisible, Pimple s’approche discrètement afin d’aller chercher les enfants. Près de la créature une odeur atroce lui attaque les narines. De nature princesse, Pimple est immédiatement affaibli par un tournis important et laisse échapper une plainte provoquée par son haut le coeur. C’est alors qu’il aperçoit les traits de la créature au visage gris-brun et aux crocs accéré avec des traits reptiliens. Pris par surprise par l’odeur et la vue peut ragoûtante Pimple est dérouté et regarde autours de lui pour de l’aide. Au retour de son regard sur la créature, celle-ci semble s’être volatilisée. ",
    imageUrl: "/public/pimple.png",
    choixGauche: "Retourner à la carte précédente",
    choixDroite: "Continuer"
  },

  7: {
    numero: 6,
    sous_numero: 2,
    nom: "Info_Grotte_puit",
    description: "«Manger….  Feu à la grotte au puit avec autres troglo… Déliceux avec viande de gobelins.»",
    imageUrl: "/public/pimple.png",
    choixGauche: "Retourner à la carte précédente",
    choixDroite: "Continuer"
  },
};

