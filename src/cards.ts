import { aventuriers} from "./aventuriers";
import { addToParty } from "./party";
import { InfoKnown, ajouterJauge, infos } from "./informations";
import { infoReceive } from "./informations";
import { objets } from "./objets";
import { addToBag } from "./party_objects";

//images importa
import grovine from "./assets/grovine.png";
import Escargot from "./assets/Escargot.png";
import pimple from "./assets/pimple.png";
import caverne from "./assets/caverne.png";
import panier from "./assets/panier.png"; 
import troglodyte from "./assets/troglodyte.png";
import caverneThink from "./assets/caverne_think.png";
import bestir from "./assets/bestir.png";
import pimple_think from "./assets/pimple_think.png"; 
import yibap from "./assets/yibap.png";
import ubal from "./assets/ubal.png";
import aminata from "./assets/aminata.png";
import bag from "./assets/bag.png";
import marsyas from "./assets/marsyas.png";
import marsyas_sleep from "./assets/marsyas_sleep.png";
import antitoxin from "./assets/antitoxin.png";
import hallucinogene from "./assets/hallucinogene.png";

// Type
export type StoryCard = {
  numero: number;
  nom: string;
  description: string;
  imageUrl: string;
  textGauche: string | null;
  textDroit: string;
  swipeDroite: Function;
  swipeGauche: Function| null;
};

// Cards
export const CARDS: Record<number, StoryCard> = {
  1: {
    numero: 1,
    nom: "Début",
    description: "Dans une grotte, au coeur d’une forêt reconnue pour sa magie unique, une communauté de Campestris cohabite en symbiose avec des escargots géants. Dans ce village connu sous le nom de Grovine, ces myconides aux traits humanoïdes vivaient dans un calme relatif depuis une centaine d’années.",
    imageUrl: grovine,
    textGauche: null,
    textDroit: "Continuer",
    swipeGauche: null,
    swipeDroite: () => CARDS[2],
  },

  2: {
    numero: 2,
    nom: "Trauma",
    description: "Il y a de cela deux mois, l’un des escargots s’est métamorphosé en créature sanguinaire. Il a massacré de nombreux Campestris, en plus de ravager leurs habitations. Ce n’est que grâce à l’aide inattendu d’un groupe  d’aventuriers que le massacre a pris fin et que Grovine n’a pas été rayée de la forêt.",
    imageUrl: Escargot,
    textGauche: null,
    textDroit: "Continuer",
    swipeGauche: null,
    swipeDroite: () => CARDS[3],
  },

  3: {
    numero: 3,
    nom: "Reconstruction",
    description: "L’un de ces aventuriers, Pimple,  continue depuis d’aider les habitants à reconstruire le village.  Ce pixie, à la peau bleutée et perlée d’eau et à la fâcheuse habitude de prendre des croquées de maisons aux endroits les moins visibles, est non seulement toléré, mais aussi apprécié de tous pour son implication et sa volonté de contribuer à la renaissance du village.",
    imageUrl: pimple,
    textGauche: null,
    textDroit: "Continuer",
    swipeGauche: null,
    swipeDroite: () => CARDS[4],
  },

  4: {
    numero: 4,
    nom: "Déclencheur",
    description: "C’est alors que la forêt s’obscurcit que Pimple s’installe afin de préparer sa célèbre recette de gruau : quelques baies trouvées aux alentours, des fleurs de pissenlit pour la couleur, le tout accompagné d’une chanson grivoise, ingrédient secret de sa préparation. En plein milieu du refrain, Pimple entend une commotion; il active son invisibilité et se rend à toute puissance d’ailes vers l’entrée de la grotte. C’est alors qu’il aperçoit une silhouette capée dans l’obscurité. ",
    imageUrl: caverne,
    textGauche: null,
    textDroit: "Continuer",
    swipeGauche: null,
    swipeDroite: () => CARDS[5],
  },

  5: {
    numero: 5,
    nom: "Kidnapping",
    description: "La silhouette est effilée, avec une démarche lourde et une cape recouvrant sa tête et son corps. Elle tient un panier grossièrement tressé, à l’intérieur duquel quatre campestries s’agitent. En plissant les yeux, Pimple reconnaît les enfants de Bestir, avec qui il échange un regard dans lequel il lit la peur et la panique. Que doit faire Pimple? ",
    imageUrl: panier,
    textGauche: "Utiliser une détection de la pensée afin d’obtenir plus d'informations. ",
    textDroit: "En restant invisible, tenter de reprendre les enfants un à un.",
    swipeGauche: () => CARDS[7],
    swipeDroite: () => CARDS[6],
  },

  6: {
    numero: 6.1,
    nom: "Info_troglodyte",
    description: "Pimple s’approche afin de récupérer les enfants. À moins d’un mètre de la créature, une odeur atroce lui attaque les narines. De nature princesse, Pimple est pris de tournis; il laisse échapper une plainte provoquée par son haut-le-coeur. Le son fait tourner la tête de la créature. Pimple aperçoit alors ses traits reptiliens, son visage gris-brun et ses crocs acérés.  Débordé de dégoût, Pimple voit noir. À son réveil, la créature qu’il reconnaît comme étant un troglodyte, s’est volatilisé.",
    imageUrl: troglodyte,
    textGauche: null,
    textDroit: "Continuer",
    swipeGauche: null,
    swipeDroite: () => {InfoKnown(infos[2]);
      return CARDS[8]
    },
  },

  7: {
    numero: 6.2,
    nom: "Info_Grotte_puit",
    description: "«Manger…  Feu, grotte au puit … Déliceux… avec viande de gobelin.»",
    imageUrl: caverneThink,
    textGauche: null,
    textDroit: "Continuer",
    swipeGauche: null,
    swipeDroite: () => {InfoKnown(infos[1]);
      return CARDS[8]},
  },

  8: {
    numero: 7,
    nom: "Bestir raconte",
    description: "Pimple entre en hâte dans la grotte et rencontre Bestir, courant désespérément vers la sortie pour porter secours à ses enfants. C’est entre deux sanglots qu’elle raconte à Pimple ce qu’il avait déjà deviné. Incapable de résister au désespoir de Bestir, surtout avec son statut officiel d’aventurier, Pimple lui promet qu’il sauvera ses enfants. ",
    imageUrl: bestir,
    textGauche: null,
    textDroit: "Continuer",
    swipeGauche: null,
    swipeDroite: () => {
      addToParty(aventuriers[1]);
      return CARDS[9]},
  },

    9: {
    numero: 8,
    nom: "Yibap ou rechercher",
    description: "En entrant dans la grotte, Pimple se demande s’il doit aller rejoindre Yibap, le plus aventurier des campestries, celui-là même qui prônait que les habitants de Grovine reconstruise leur village ailleurs après la catastrophe… D’un autre côté, il se demande s’il doit aller plutôt explorer la grotte afin de s’équiper avant de partir. Le temps presse...Que faire?",
    imageUrl: pimple_think,
    textGauche: "Aller voir Yibap",
    textDroit: "Fouiller la grotte",
    swipeGauche: () => CARDS[10],
    swipeDroite: () => CARDS[11],
  },

    10: {
    numero: 9.1,
    nom: "Aventurier Yibap",
    description: "Yibap est au coeur du village, Pimple entends déjà sa voix qui s’insurge « Je vous l’avais dit, le village est maudit ! »  S’approchant doucement, Pimple se place près de Yibap et tapote son chapeau de champignon. Lorsque son attention se tourne vers Pimple, ce dernier lui dit d’une voix solennelle, mais tremblante :  «Le déménagement de Grovine est important, mais l’urgence est de retrouver les enfants, et j’ai besoin d’aventuriers».",
    imageUrl: yibap,
    textGauche: "Yibap gonfle son bedon de champignon avec fierté et accepte.",
    textDroit: "Yibap lui répond : «N’importe quoi, je dois sauver le village! » et il refuse.",
    swipeGauche:  () => {
      addToParty(aventuriers[2]);
      return CARDS[12]},
    swipeDroite: () => CARDS[12],
  },

    11: {
    numero: 9.2,
    nom: "Fouiller grovine",
    description: "Pimple fouille la grotte et ses recoins moins connus dans l’espoir d’y trouver un objet utile pour sa quête. Outre Grovine et les escargots, la caverne n’est pas habitée; il ne trouve rien et commence à se décourager. Lorsqu’il s’assoit dans le jardin de myculture, il aperçoit un champignon rouge d’Amanita arrivé à maturité. Le connaissant pour ses vertus de guérison, il l’arrache sans plus réfléchir et le dépose dans son sac. ",
    imageUrl: aminata,
    textGauche: null,
    textDroit: "Continuer",
    swipeGauche: null,
    swipeDroite: () => {
      addToBag(objets[1]);
      return CARDS[12]},
  },

    12: {
    numero: 10,
    nom: "recherche des rumeurs",
    description: "Prêt à quitter Grovine, Pimple se demande s’il ne devrait pas prendre un peu plus de temps  afin de recueillir les témoignages des autres villageois.",
    imageUrl: pimple_think,
    textGauche: "La situation presse; pas de temps à perdre à écouter les ragôts.",
    textDroit: "Retarder le départ afin de récupérer des témoignages.",
    swipeGauche: () => {
      ajouterJauge(1);
      return CARDS[15]},
    swipeDroite: () => {
      if (infoReceive.some(i => i.numero === 1)) {
        return CARDS[14];
      } else if (infoReceive.some(i => i.numero === 2)) {
        return CARDS[13];
      }
    },
  },

    13: {
    numero: 11.1,
    nom: "Ubal et les troglodtytes",
    description: "Pimple connait bien Ubal, une campestrie appréciant toutes informations se rapprochant de près ou de loin d’une rumeur. Pimple l’aperçoit alors qu’elle accomplit déjà sa mission de commère professionnelle. Il lui demande si elle a une anecdote sur les troglodytes en quelque part dans sa mémoire. Elle raconte alors qu’il y a 10 ans, l’oncle de sa demi-soeur connaissait un membre de sa famille éloigné ayant été kidnappé par un troglodyte. Celui-ci aurait disparu dans une grotte appelée «La grotte au puit».  L’anecdote dure une éternité aux yeux de Pimple, mais au moins il repart avec un possible indice… ",
    imageUrl: ubal,
    textGauche: null,
    textDroit: "Continuer",
    swipeGauche: null,
    swipeDroite: () => {InfoKnown(infos[1]);
      return CARDS[15]},
  },
    14: {
    numero: 11.2,
    nom: "Ubal et la grotte au puits",
    description: "Pimple connait bien Ubal, une campestrie appréciant toutes informations se rapprochant de près ou de loin d’une rumeur. Pimple l’aperçoit alors qu’elle accomplit déjà sa mission de commère professionnelle. Pimple lui parle de la grotte au puit. Elle raconte alors qu’il y a 10 ans, l’oncle de sa demi-soeur a un membre de sa famille éloigné qui aurait découvert une grotte habitée avec un grand puit en son centre. Elle se souvient vaguement des indications de l’emplacement, elle les transmet à Pimple, qui sait maintenant qu’il doit se diriger vers l’est. L’anecdote dure une éternité aux yeux de Pimple, mais au moins il repart avec un possible indice…",
    imageUrl: ubal,
    textGauche: null,
    textDroit: "Continuer",
    swipeGauche: null,
    swipeDroite:  () => {InfoKnown(infos[3]);
      ajouterJauge(1);
      return CARDS[15]},
  },

    15: {
    numero: 12,
    nom: "Départ",
    description: "Pimple se sent maintenant prêt : il a son sac d’aventurier rempli de noix, de fruits et d’autres grignotines pour la route. Il part sans plus tarder à la recherche des enfants. ",
    imageUrl: bag,
    textGauche: null,
    textDroit: "Continuer",
    swipeGauche: null,
    swipeDroite: () => CARDS[16],
  },

    16: {
    numero: 13,
    nom: "Voir ou non Marsyas",
    description: "En quittant la grotte, Pimple constate qu’il n’est probablement pas prêt à affronter le danger qui se profile. Non loin de Grovine, il connait Marsyas, un satyre au caractère festif et au talent singulier : transformer des baies en un liquide enivrant. Pimple se demande s’il devrait le recruter ou s’il serait mieux de poursuivre sa route avec l’espoir de rencontrer d’autres aventuriers en chemin.",
    imageUrl: marsyas,
    textGauche: "La situation presse; pas de temps à perdre à réveiller un débauché!",
    textDroit: "Aller voir Marsyas.",
    swipeGauche:  () => {
      ajouterJauge(1);
      return CARDS[17]},
    swipeDroite: () => CARDS[17],
  },

    17: {
    numero: 14.1,
    nom: "Vignoble de Marsyas",
    description: "Après une heure de marche vers la demeure de Marsyas, une odeur acidulée, bien connue de Pimple, pique le nez. Une clairière apparaît au bout du sentier; en son centre, de nombreux barils de bois sont empilés pêle-mêle. Un ronflement vibrant se fait alors entendre près d’un grand bassin rempli à moitié de baies écrasées. À l’origine de ce ronflement, Marsyas dort, dos contre le bassin, le menton reposant sur le goulot d’une bouteille de vin. ",
    imageUrl: marsyas_sleep,
    textGauche: "Réveiller Marsyas",
    textDroit: "Laisser Marsyas dormir, vous doutez qu’il soit utile... ",
    swipeGauche: () => CARDS[19],
    swipeDroite: () => CARDS[18],
  },

    18: {
    numero: 14.2,
    nom: "Vignoble de Marsyas",
    description: "En sortant du vignoble, Pimple se souvient que Maryas possède un cabinet de médecine lui permettant de se remettre plus rapidement de ses maux de tête réguliers. Il ne remarquera probablement pas qu’il lui manque une fiole... ",
    imageUrl: antitoxin,
    textGauche: "Réveiller Marsyas",
    textDroit: "Laisser Marsyas dormir, vous doutez qu’il soit utile... ",
    swipeGauche: null,
    swipeDroite: () => {
      addToBag(objets[3]);
      return CARDS[18]},
  },

    19: {
    numero: 15,
    nom: "Marsyas comme aventurier",
    description:  `Pas de le temps d’y aller avec des pincettes : Pimple se met à secouer son vieil ami comme un pantin désarticulé. Marsyas se réveille, confus. 
                  - Qu’est ce que tu veux, Pimple ? J’ai des bouteilles près du coffre, prends-t-en en une et vient fêter! 
                  - J’ai plutôt une proposition à te faire afin de préparer une grande fête! Mais avant...des enfants de Grovine ont été kidnappés et nous avons besoin d’aide pour les récupérer. 
                  - … j’attends la partie festive? 
                  -  Si nous rapportons les enfants, je suis certains qu’ils nous donnerons en récompense leur fameux champignon aux particularités uniques...et surtout hallocinogènes.Tu sais, celui qu’ils n’ont jamais voulu te donner? 
                  `,
    imageUrl: hallucinogene,
    textGauche: "Péniblement, Marsyas se lève et accepte de vous suivre.",
    textDroit: "Avec un haussement d’épaules, Matyas gromelle que l’effort ne vaut pas l’hallucination...puis se rendort.",
    swipeGauche: () => {
      addToParty(aventuriers[3]);
      return CARDS[19]},
    swipeDroite: () => CARDS[19],
  },

};
