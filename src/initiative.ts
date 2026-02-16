import { party } from "./party"
import { aventuriers, type aventurier } from "./aventuriers"
import { jaugeTemps } from "./informations"
import { rollDice, rollAdvantage } from "./dice_rolls"
import { party_objects } from "./party_objects"

const initiativeButton = document.querySelector(".info-btn");
initiativeButton?.addEventListener("click", () => {    
    console.log("Button clicked!");
    initiative(party, jaugeTemps);
    generateTable(initiativeTour);
    //chercher si le bouclier est present
    const searchbouclierID = 4;
    for (const key in party_objects) {
        if (party_objects[key].id === searchbouclierID){
            bonusBouclier(party);
            break;
        }
    }
})

const modalEl = document.getElementById("exampleModal");
modalEl?.addEventListener("hidden.bs.modal", () => {
  console.log("Combat started");
  window.location.href = "src/combat.html"
});

export type InitiativeData = {
  id: number;
  name: string;
  result: number;
  order: number | null;
};

//roll initiative 
export const partyInitiative: Record<number, InitiativeData> ={};
export const initiativeTour: InitiativeData[] = [];

function initiative(party:Record<number, aventurier>, jaugeTemps: number) {
    const members = Object.values(party);
    const baddy = aventuriers[6];

    for ( const member of members) {
        const result = rollDice(20);
        
        const data: InitiativeData = {
        id: member.id,
        name: member.name,
        result,
        order: null, };

        initiativeTour.push(data);
        partyInitiative[member.id] = data;
        
        };
        
    //Baddy in the initiative 
    let resultBaddy = 0 ; 
    if (jaugeTemps === 1 || jaugeTemps === 1) {resultBaddy= rollAdvantage(20);}
    else if (jaugeTemps >= 5 ) {resultBaddy = 100;}
    else {resultBaddy = rollDice(20);}
    
    const databaddy: InitiativeData = {
    id: baddy.id,
    name: baddy.name,
    result : resultBaddy,
    order: null, };

    initiativeTour.push(databaddy);
    partyInitiative[baddy.id] = databaddy;

    // sort by roll (highest first)
    initiativeTour.sort((a, b) => b.result - a.result);

    // assign order (1..n)
    initiativeTour.forEach((item, index) => {
        item.order = index + 1;
    });
    console.log(initiativeTour);
    localStorage.setItem("initiativeTour", JSON.stringify(initiativeTour));
    return initiativeTour;
    };


// Create the table in html 
export function generateTable(initiativeTour) {
    if (!initiativeTour || initiativeTour.length === 0) return null;
    const tableBody = document.querySelector("#usersTable tbody") as HTMLTableCaptionElement;

    //generate table
    initiativeTour.forEach((person) => {
        const row = document.createElement("tr");
        
        const numberCell = document.createElement("td");
        numberCell.textContent = String(person.order);

        const nameCell = document.createElement("td");
        nameCell.textContent = person.name;

        const iniCell = document.createElement("td");
        iniCell.textContent = String(person.result);

        //add cells to the rows
        row.appendChild(numberCell);
        row.appendChild(nameCell);
        row.appendChild(iniCell);

        //add row to the table body
        tableBody.appendChild(row);
    })
}

    //ajout du bouclier
function bonusBouclier (party: Record<number, aventurier>) {
    const container = document.getElementById("bouclierCheckboxes");
    const title = document.createElement("div");
    title.textContent = "Le bouclier de Belch vous permet de protéger un aventurier avec un bonus de 2 à la CA. À qui voulez-vous remettre le bouclier? "
    container?.appendChild(title);

    Object.values(party).forEach((person) => {
        const wrapper = document.createElement("div");
        wrapper.className = "forn-check form-check-inline"; 
   
    //checkbox input
    const input = document.createElement("input");
    input.className  = "form-check-input";
    input.type = "radio";
    input.id = `person-${person.id}`;
    input.value = person.id.toString();
    input.name = "radioOneOption"

    //label
      const label = document.createElement("label");
      label.className = "form-check-label";
      label.htmlFor = input.id;
      label.textContent = person.name;

     // Assemble
     wrapper.appendChild(input);
     wrapper.appendChild(label);

    container?.appendChild(wrapper);
    });

    //Confirmation Button
    const confirmBtn = document.createElement("button");
    confirmBtn.type = "button";
    confirmBtn.className = "btn btn-success mt-3";
    confirmBtn.textContent = "Ok";

    confirmBtn.addEventListener("click", () => {
    const selected = container.querySelector(
      'input[name="radioOneOption"]:checked'
    ) as HTMLInputElement | null;

    if (!selected) {
      alert("Veuillez choisir un aventurier.");
      return;
    }

    const selectedId = Number(selected.value);
    console.log("Bouclier donné à l’aventurier ID:", selectedId);

    // apply bonus here
    const member = Object.values(party).find(
    (p) => p.id === selectedId); 
    member.dc += 2;
    localStorage.setItem("party", JSON.stringify(party));
    confirmBtn.disabled = true;
    });
  container.appendChild(confirmBtn);
}


