import { party } from "./party"

export function CurrentTurn (initiativeTour, turnNumber, aventuriers) {
  let nextTurn = turnNumber;
  let checked = 0;

  do {
    nextTurn = (nextTurn+ 1) % initiativeTour.length;
    const playerCurrent = initiativeTour[nextTurn];
    const player = aventuriers[playerCurrent.id];
    if (player.statut !== "Inconscient") {
      console.log("New turn:", nextTurn);
      return nextTurn;
    }

    checked++;  
  } while (checked < Object.keys(party).length);

  console.log("veryDeadGroup");
  return -1;
}

export function ShowTurn (initiativeTour, turnNumber, aventuriers) {
    const name = document.getElementById("CurrentPlayer") as HTMLElement;
    const hp = document.getElementById("hpCP") as HTMLElement;
    const statut = document.getElementById("statutCP") as HTMLElement;
    const attack = document.getElementById("attackCP") as HTMLElement;
    const dmgRow = document.getElementById("dmgRowCP") as HTMLElement;
    const dmg = document.getElementById("dmgCP") as HTMLElement;
    const playerCurrent = initiativeTour[turnNumber];
    console.log("turnNumber:", turnNumber, "playerCurrent:", playerCurrent);
   
const playerID = playerCurrent.id;
    const player = aventuriers[playerID]
      console.log("player from object:", aventuriers[playerID]);

   name.textContent = player.name;
   hp.textContent = String(player.hp);
   statut.textContent = String(player.statut);
   attack.textContent = player.attack_bonus != null
        ? player.attack_type + " +" + player.attack_bonus + " pour toucher "
        : player.attack_type;

      if (player.attack_dmg_bonus != null){
        dmg.textContent =
        "1d" + player.attack_dmg_roll + " +" + player.attack_dmg_bonus;
        dmgRow.classList.remove("d-none");
      }
}

