import type { aventurier } from "./aventuriers";
import type { objet} from "./objets";
import { setupSwipe} from "./swipehandler";


//swipe card
const card = document.getElementById("card");
setupSwipe(card);

//adventurers in the adventure
let party : aventurier[] = [];

//objects for the party
let party_object: objet[] = [];

//informations obtenues
let party_informationst = [];

//Jauge de vitesse
let speed_meter = 0;

