
import { setupSwipe} from "./swipehandler";

//visual page principal
import leftArrowUrl from "./assets/left.png";
import rightArrowUrl from "./assets/right.png";
import bagkgroundHeadUrl from "./assets/background-head.png";
(document.querySelector(".left-choice .imgArrow") as HTMLImageElement).src = leftArrowUrl;
(document.querySelector(".right-choice .imgArrow") as HTMLImageElement).src = rightArrowUrl;
(document.querySelector(".layout div.header") as HTMLDivElement).style.backgroundImage = `url(${bagkgroundHeadUrl})`;

//swipe card
const card = document.getElementById("card");
setupSwipe(card); 

//Comment jouer 
const howtoplayopen = document.getElementById("howtoplayopen");
const howtoplayclose = document.getElementById("howtoplayclose");
const modalContainer = document.querySelector(".pop-up-container") as HTMLDivElement;
const popup = document.querySelector(".pop-up") as HTMLDivElement;

howtoplayopen.addEventListener("click", () => {
    const rect = howtoplayopen.getBoundingClientRect();
    popup.style.top = rect.bottom + "px";        // below the button
    popup.style.left = rect.left + "px";         // aligned with left edge
    popup.style.position = "absolute";
    modalContainer.classList.add("show");
});

howtoplayclose.addEventListener("click", () => {
    modalContainer.classList.remove("show");    
});

// informations affichage 
const infoopen = document.getElementById("infoopen") as HTMLDivElement;
const infoClose = document.getElementById("infoClose")as HTMLDivElement;
const infoModal = document.querySelector(".infoModal") as HTMLDivElement; 
//const infoPopup = document.querySelector(".infoPopup") as HTMLDivElement; 

infoopen.addEventListener("click", () => {
    infoModal.classList.add("show");
});

infoClose.addEventListener("click", () => {
    infoModal.classList.remove("show");    
});

// Recommencer 
const newGame = document.getElementById("newGame");
newGame.addEventListener("click", function() {
  location.reload();
});