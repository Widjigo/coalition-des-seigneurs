import {aventuriers} from "./aventuriers"


export function getTroglo() {
  return aventuriers[6];
}

export function UpDateTroglo (){
    const hpTroglo = document.getElementById("hpTroglo") as HTMLElement;
    const dcTroglo = document.getElementById("dcTroglo") as HTMLElement;
    const attackTroglo = document.getElementById("attacktroglo") as HTMLElement;
    const dmgRowTroglo= document.getElementById("dmgRowTroglo") as HTMLElement;
    const dmgTroglo = document.getElementById("dmgTroglo") as HTMLElement;
    const specialTroglo = document.getElementById("specialTroglo") as HTMLElement;
    const statutTroglo = document.getElementById("statutTroglo") as HTMLElement;
    const bonusTroglo = document.getElementById("bonusTroglo") as HTMLElement;
    const troglodyte = getTroglo();


  // Update only the elements that exist to avoid early exit.
  if (hpTroglo) hpTroglo.textContent = String(troglodyte.hp);
  else console.warn("UpDateTroglo: missing #hpTroglo element");

  if (dcTroglo) dcTroglo.textContent = String(troglodyte.dc);
  else console.warn("UpDateTroglo: missing #dcTroglo element");

  if (attackTroglo) {
    attackTroglo.textContent =
      troglodyte.attack_bonus != null
        ? troglodyte.attack_type + " +" + troglodyte.attack_bonus + " pour toucher "
        : troglodyte.attack_type;
  } else console.warn("UpDateTroglo: missing #attacktroglo element");

  // debug: log current statut and element before changing
  if (statutTroglo) {
    statutTroglo.textContent = String(troglodyte.statut);
  } else console.warn("UpDateTroglo: missing #statutTroglo element");

  if (bonusTroglo) {
    bonusTroglo.textContent = troglodyte.transitionBonus === true ? "Repus, +5 pv" : "";
  }

  if (specialTroglo) specialTroglo.textContent = troglodyte.ability;
  else console.warn("UpDateTroglo: missing #specialTroglo element");

  if (dmgTroglo && dmgRowTroglo) {
    if (troglodyte.attack_dmg_bonus != null) {
      dmgTroglo.textContent = "1d" + troglodyte.attack_dmg_roll + " +" + troglodyte.attack_dmg_bonus;
      dmgRowTroglo.classList.remove("d-none");
    } else {
      dmgRowTroglo.classList.add("d-none");
    }
  } else {
    if (!dmgTroglo) console.warn("UpDateTroglo: missing #dmgTroglo element");
    if (!dmgRowTroglo) console.warn("UpDateTroglo: missing #dmgRowTroglo element");
  }
    }