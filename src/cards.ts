
//Creer la structure pour l'histoire

type storyCard = {
    numero: number;
    nom: string;
    description: string;
    imageUrl: string;
    choixGauche: string;
    choixDroite: string;
}

export let carte1: storyCard = {
    numero: 1,
    nom: "Le début",
    description: "Vous vous réveillez dans une forêt sombre et mystérieuse. Devant vous, deux chemins s'offrent à vous. Lequel choisissez-vous ?",
    imageUrl: "/public/pimple.png",
    choixGauche: "Prendre le chemin de gauche",
    choixDroite: "Prendre le chemin de droite"
};

export let carte2: storyCard = {
    numero: 2,
    nom: "deuxième carte",
    description: "ca va mal",
    imageUrl: "/public/test.png",
    choixGauche: "Prendre le chemin de gauche",
    choixDroite: "Prendre le chemin de droite"
};

const CARDS = [carte1, carte2];


// Afficher la premiere carte 
// Lorsqu<un switch droit est effectue , changer la carte et le texte 
// afficher la nouvelle carte 

// Aller chercher les elements html 
const cardTitle = document.getElementById("card-title") as HTMLElement;
const cardImg = document.getElementById("card-img") as HTMLImageElement;
const cardText = document.getElementById("card-text") as HTMLElement;
const choixl = document.getElementById("choixl") as HTMLElement;
const choixr = document.getElementById("choixr") as HTMLElement;
const card = document.getElementById("card");

//First card
CARDS[0].numero;
cardTitle.textContent = CARDS[0].nom;
cardImg.src = CARDS[0].imageUrl;
cardText.textContent = CARDS[0].description;
choixl.textContent = CARDS[0].choixGauche;
choixr.textContent = CARDS[0].choixDroite; 


// new regular card
card?.addEventListener("transitionend", (e) => {
    let cardNumber = 0;

    if (e.target !== card) return;

    // safety if DOM not found
    if (!cardTitle || !cardImg || !cardText || !choixl || !choixr) return;

    if (card.classList.contains("swipeRight")) {
        cardNumber = cardNumber + 1;} 
    
    if (card.classList.contains("swipeLeft")) {
        if (cardNumber === 0) { cardNumber = 0;}
        else {cardNumber = cardNumber - 1;}}    

    card.classList.remove('swipeRight', 'swipeLeft');

    cardTitle.textContent = CARDS[cardNumber].nom;
    cardImg.src = CARDS[cardNumber].imageUrl;
    cardText.textContent = CARDS[cardNumber].description;
    choixl.textContent = CARDS[cardNumber].choixGauche;
    choixr.textContent = CARDS[cardNumber].choixDroite; 
    });