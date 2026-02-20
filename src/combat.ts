import {loadData } from "./transition";
import {initiativeTour} from "./initiative"
import bagkgroundHeadUrl from "./assets/background-head.png";
import { generateTable } from "./initiative";
import { Attack, CurrentTurn, ShowTurn } from "./AttackTurn";
import { UpDateTroglo } from "./UpdateTroglo";
import chaudron from "./assets/chaudron.png"
(document.querySelector(".layout div.header") as HTMLDivElement).style.backgroundImage = `url(${bagkgroundHeadUrl})`;

const popover = document.getElementById("mypopover");
const attackbtn = document.getElementById("attackbtn");


// Loading the page 
loadDataWithInitiavive();
UpDateTroglo();

let tableGenerated = false;
popover.addEventListener("toggle", () => {
  if (tableGenerated)return ;
  generateTable(initiativeTour);
  tableGenerated = true;
});

//Attack tour 
const turnbtn = document.getElementById("turnbtn");
let turnNumber = 0;
attackbtn.classList.add('d-none');
ShowTurn(initiativeTour, turnNumber);

 
turnbtn.addEventListener("click", () => {
  const newTurn = CurrentTurn(initiativeTour, turnNumber);

  if (newTurn === -1) {
    console.log("Combat ends: everyone is unconscious");
    const result = document.getElementById("combatbox") as HTMLElement;

     result.className = "d-flex justify-content-center align-items-center vh-100 text-center";
      result.innerHTML = `
        <div>
          <h2 class="fw-bold" style="color:#03735f">Défaite</h2>
          <p class="mt-3">
            Tous les efforts n'ont servi à rien. 
            Le dernier souffle s’échappe... 
            Le combat est perdu...

            Vous et les bébés campestris finiront 
            en ragoût...
          </p>
          <img src="${chaudron}" alt="defaite image" class="img-fluid mt-3">
        </div>
      `;
    return;
  }

  turnNumber = newTurn;
  ShowTurn(initiativeTour, turnNumber);
});

attackbtn.addEventListener("click", () => {
  attackbtn.classList.add('d-none');
  Attack(initiativeTour, turnNumber)});

//Comment jouer 
const howtoplayopen = document.getElementById("resultCombat");
const popup = document.querySelector(".pop-up") as HTMLDivElement;

howtoplayopen.addEventListener("click", () => {
    const rect = howtoplayopen.getBoundingClientRect();
    popup.style.top = rect.bottom + "px";        
    popup.style.left = rect.left + "px";         
    popup.style.position = "absolute";
});

// Recommencer 
const newGame = document.getElementById("newGame");
newGame.addEventListener("click", function() {
  location.reload();
  localStorage.clear();

  window.location.href = `${import.meta.env.BASE_URL}index.html`;
});

function loadDataWithInitiavive ()  {
  loadData();
  const initiativeTourData = localStorage.getItem("initiativeTour");
    if (initiativeTourData) Object.assign(initiativeTour, JSON.parse(initiativeTourData));
   console.log("InitiativeTour: ", initiativeTourData);
}