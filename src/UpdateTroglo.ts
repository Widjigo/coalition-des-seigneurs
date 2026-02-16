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
    const troglodyte = getTroglo();

    if (!hpTroglo || !dcTroglo || !attackTroglo || !dmgRowTroglo || !dmgTroglo || !specialTroglo || !statutTroglo) {
    return;}

      hpTroglo.textContent = String(troglodyte.hp);
      dcTroglo.textContent = String(troglodyte.dc);
      attackTroglo.textContent =
        troglodyte.attack_bonus != null
          ? troglodyte.attack_type + " +" + troglodyte.attack_bonus + " pour toucher "
          : troglodyte.attack_type;
      statutTroglo.textContent = String(troglodyte.statut);
      specialTroglo.textContent = troglodyte.ability;
      if (troglodyte.attack_dmg_bonus != null){
        dmgTroglo.textContent =
        "1d" + troglodyte.attack_dmg_roll + " +" + troglodyte.attack_dmg_bonus;
        dmgRowTroglo.classList.remove("d-none");
      }
    }