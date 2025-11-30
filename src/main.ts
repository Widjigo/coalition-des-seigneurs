
import { setupSwipe} from "./swipehandler";

//importation of images for the index.html
import leftArrowUrl from "./assets/left.png";
import rightArrowUrl from "./assets/right.png";
import bagkgroundHeadUrl from "./assets/background-head.png";
(document.querySelector(".left-choice .imgArrow") as HTMLImageElement).src = leftArrowUrl;
(document.querySelector(".right-choice .imgArrow") as HTMLImageElement).src = rightArrowUrl;
(document.querySelector(".layout div.header") as HTMLDivElement).style.backgroundImage = `url(${bagkgroundHeadUrl})`;

//swipe card
const card = document.getElementById("card");
setupSwipe(card); 



//objects for the party
// let party_object: objet[] = [];

//informations obtenues
// let party_informationst = [];

//Jauge de vitesse
//let speed_meter = 0;

