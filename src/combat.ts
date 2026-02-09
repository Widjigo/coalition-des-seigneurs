import {loadData } from "./transition";
import {aventuriers} from "./aventuriers"

import bagkgroundHeadUrl from "./assets/background-head.png";
(document.querySelector(".layout div.header") as HTMLDivElement).style.backgroundImage = `url(${bagkgroundHeadUrl})`;


//Troglodytes_info
const hpTroglo = document.getElementById("hpTroglo") as HTMLElement;
const dcTroglo = document.getElementById("dcTroglo") as HTMLElement;
const attackTroglo = document.getElementById("attacktroglo") as HTMLElement;
const dmgRowTroglo= document.getElementById("dmgRowTroglo") as HTMLElement;
const dmgTroglo = document.getElementById("dmgTroglo") as HTMLElement;
const specialTroglo = document.getElementById("specialTroglo") as HTMLElement;
const statutTroglo = document.getElementById("statutTroglo") as HTMLElement;

loadData();
UpDateTroglo();

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

const infoopen = document.getElementById("infoopen") as HTMLDivElement;
const infoClose = document.getElementById("infoClose")as HTMLDivElement;
const infoModal = document.querySelector(".infoModal") as HTMLDivElement; 

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
  localStorage.clear();
  window.location.href = "/src/index.html"
});


//show the member info in the pop-up
function UpDateTroglo (){
    const troglo = aventuriers[6];
      hpTroglo.textContent = String(troglo.hp);
      dcTroglo.textContent = String(troglo.dc);
      attackTroglo.textContent =
        troglo.attack_bonus != null
          ? troglo.attack_type + " +" + troglo.attack_bonus + " pour toucher "
          : troglo.attack_type;
      statutTroglo.textContent = String(troglo.statut);
      specialTroglo.textContent = troglo.ability;
      if (troglo.attack_dmg_bonus != null){
        dmgTroglo.textContent =
        "1d" + troglo.attack_dmg_roll + " +" + troglo.attack_dmg_bonus;
        dmgRowTroglo.classList.remove("d-none");
      }
    }