import { CARDS, type StoryCard } from "./story";

// Aller chercher l<information des cartes 
const cardTitle = document.getElementById("card-title") as HTMLElement;
const cardImg = document.getElementById("card-img") as HTMLImageElement;
const cardText = document.getElementById("card-text") as HTMLElement;
const choixl = document.getElementById("choixl") as HTMLElement;
const choixr = document.getElementById("choixr") as HTMLElement;
const card = document.getElementById("card");


//Afficher la premiere carte 
CARDS[1].numero;
cardTitle.textContent = CARDS[1].nom;
cardImg.src = CARDS[1].imageUrl;
cardText.textContent = CARDS[1].description;
choixl.textContent = CARDS[1].choixGauche;
choixr.textContent = CARDS[1].choixDroite; 

// Nouvelle carte reguliere avec +1
    let cardNumber = 1;

card?.addEventListener("transitionend", (e) => {
    if (e.target !== card) return;

    // safety if DOM not found
    if (!cardTitle || !cardImg || !cardText || !choixl || !choixr) return;

    if (card.classList.contains("swipeRight")) {
        cardNumber = cardNumber + 1;} 
    
    if (card.classList.contains("swipeLeft")) {
        if (cardNumber === 1) { cardNumber = 1;}
        else {cardNumber = cardNumber - 1;}}    

    card.classList.remove('swipeRight', 'swipeLeft');

    //Creation visuelle de la nouvelle carte  
    cardTitle.textContent = CARDS[cardNumber].nom;
    cardImg.src = CARDS[cardNumber].imageUrl;
    cardText.textContent = CARDS[cardNumber].description;
    choixl.textContent = CARDS[cardNumber].choixGauche;
    choixr.textContent = CARDS[cardNumber].choixDroite; 
    });