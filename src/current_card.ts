import { CARDS} from "./cards";
import { aventuriers } from "./aventuriers";
import { infos } from "./informations";
import { party } from "./party";
import { infoReceive } from "./informations";

// Aller chercher l<information des cartes 
const cardTitle = document.getElementById("card-title") as HTMLElement;
const cardImg = document.getElementById("card-img") as HTMLImageElement;
const cardText = document.getElementById("card-text") as HTMLElement;
const choixl = document.getElementById("choixl") as HTMLElement | null;
const choixr = document.getElementById("choixr") as HTMLElement;
const card = document.getElementById("card");
const imgarrowl = document.getElementById("imgArrowl") as HTMLElement | null;

//update card function
function updateCard(currentcard) {
    cardTitle.textContent = currentcard.nom;
    cardImg.src = currentcard.imageUrl;
    cardText.textContent = currentcard.description;
    choixl.textContent = currentcard.textGauche;
    choixr.textContent = currentcard.textDroit; 
    }

//Afficher la premiere carte 
let currentcard = CARDS[1];  
updateCard(currentcard);
choixl.style.display = "none";
imgarrowl.style.display = "none";

card?.addEventListener("transitionend", (e) => {
    if (e.target !== card) return;

    // safety if DOM not found
    if (!cardTitle || !cardImg || !cardText || !choixl || !choixr) return;
   
    
    //Handle current card 
    if (card.classList.contains("swipeRight")) {
        currentcard = currentcard.swipeDroite();
    }
    if (card.classList.contains("swipeLeft") && currentcard.swipeGauche != null) {
        currentcard = currentcard.swipeGauche();
    } 

    updateCard(currentcard);

    choixl.style.display = "";
    imgarrowl.style.display = "";

    const canSwipeLeft = currentcard.swipeGauche != null;
    
    if (!canSwipeLeft) {
       choixl.style.display = "none";
       imgarrowl.style.display = "none";
    }

    card.classList.remove('swipeRight', 'swipeLeft');
});



//Fonction pour la gestion avec ou sans ybap
export function ForestSearch() {
    const yibap = aventuriers[2];
    const grotte = infos[1];
    const lieu = infos[3];

    if (Object.values(party).includes(yibap) &&
        Object.values(infoReceive).includes(lieu)
        ) {
            return CARDS[20]
        }
    if  (
        !Object.values(party).includes(yibap) && 
        Object.values(infoReceive).includes(lieu)
        ) {
            return CARDS[21]
        }
    if  (
        Object.values(party).includes(yibap) && 
        Object.values(infoReceive).includes(grotte)
        ) {
            return CARDS[22]
        } 
    if  (
        !Object.values(party).includes(yibap) && 
        Object.values(infoReceive).includes(grotte)
        ) {
            return CARDS[23]
        }     
    else {
        return CARDS[24]}
}
