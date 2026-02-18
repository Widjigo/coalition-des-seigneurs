import { rollDice, rollDesadvantage } from "./dice_rolls";
import { party } from "./party"
import { aventuriers } from "./aventuriers";
import { showParty, showObjects } from "./combat_pop-up";
import { getTroglo, UpDateTroglo } from "./UpdateTroglo";
import { party_objects } from "./party_objects";


const affichageResultat = document.getElementById("resultCombat") as HTMLElement | null;
const attackbtn = document.getElementById("attackbtn") as HTMLElement | null;

function setAttackButtonVisible(visible: boolean) {
  if (!attackbtn) return;
  attackbtn.classList.toggle("d-none", !visible);
}


export function CurrentTurn(initiativeTour, turnNumber) {
  const anyHeroAlive = Object.values(party).some((slot: any) => {
    if (!slot) return false;                 // empty slot
    if (slot.id === 6) return false;         // ignore troglo if it's in party by mistake
    const hero = aventuriers[slot.id];       // only heroes in the party
    return hero && hero.statut !== "Inconscient";
  });

  if (!anyHeroAlive) return -1;
  let nextTurn = turnNumber;
  let checked = 0;

  do {
    nextTurn = (nextTurn + 1) % initiativeTour.length;
    const playerCurrent = initiativeTour[nextTurn];
    const player = aventuriers[playerCurrent.id];

    if (player.id === 6) {
      attackbtn.classList.add('d-none');
      trogloAttack();
      return nextTurn;
    }
    if (player.statut !== "Inconscient") {
      console.log("New turn:", nextTurn);
      attackbtn.classList.remove('d-none');
      return nextTurn;
    }
    checked++;

  } while (checked < initiativeTour.length);
  return -1;
}

export function ShowTurn(initiativeTour, turnNumber) {
  const name = document.getElementById("CurrentPlayer") as HTMLElement;
  const hp = document.getElementById("hpCP") as HTMLElement;
  const statut = document.getElementById("statutCP") as HTMLElement;
  const attack = document.getElementById("attackCP") as HTMLElement;
  const dmgRow = document.getElementById("dmgRowCP") as HTMLElement;
  const dmg = document.getElementById("dmgCP") as HTMLElement;
  const playerCurrent = initiativeTour[turnNumber];
  console.log("turnNumber:", turnNumber, "playerCurrent:", playerCurrent);
  if (!playerCurrent) return;

  const playerID = playerCurrent.id;
  const player = aventuriers[playerID]
  console.log("player from object:", aventuriers[playerID]);

  // hide attack if troglo, show if hero
  setAttackButtonVisible(player.id !== 6);
  // information si statut est autre que vivant 
  statut.classList.remove("text-danger", "text-warning");
  if (player.statut !== "Vivant") {
    statut.classList.add("text-danger");
  } else {
    statut.classList.remove("text-danger");
  }

  //clear dmg row 
  dmg.textContent = "";
  dmgRow.classList.add("d-none");


  name.textContent = player.name;
  hp.textContent = String(player.hp);
  statut.textContent = String(player.statut);
  attack.textContent = player.attack_bonus != null
    ? player.attack_type + " +" + player.attack_bonus + " pour toucher "
    : player.attack_type;

  if (player.attack_dmg_bonus != null) {
    dmg.textContent =
      "1d" + player.attack_dmg_roll + " +" + player.attack_dmg_bonus;
    dmgRow.classList.remove("d-none");
  }

  if (player.id === 6) {
    // troglo turn: hide/clear objects
    const objetline = document.getElementById("objetsdispos") as HTMLElement | null;
    if (objetline) objetline.innerHTML = "";
    return;
  }

  // hero turn: show objects
  UseObjects(player, initiativeTour, turnNumber);
}

export function Attack(initiativeTour, turnNumber) {
  const playerCurrent = initiativeTour[turnNumber];
  const player = aventuriers[playerCurrent.id];
  const troglo = getTroglo();

  if (player.id <= 5) {
    let result = checkIfPoisoned(player);

    if (player.id === 2) {
      result = 20 - result;
      if (result <= 10) {
        troglo.statut = "Étouffement";
        UpDateTroglo();
        affichageResultat.textContent = `Yibap réussi à utiliser son nuage de spores. Le troglodyte ne réussit pas à éviter le nuage avec un jet de sauvegarde de ${result}. Le troglodyte est étouffé et
        aura un malus de 4 à l'attaque lors de son prochain tour.`
        return;
      }
      else {
        affichageResultat.textContent = `Le troglodyte réussit à éviter le nuage avec un jet de sauvegarde de ${result}.`
        return;
      }
    }

    else result = result + player.attack_bonus;

    if (result >= troglo.dc) {
      let damage = rollDice(player.attack_dmg_roll) + player.attack_dmg_bonus
      troglo.hp = troglo.hp - damage;
      if (troglo.statut === "Immobilisation") {
        troglo.hp = troglo.hp - 2;
        troglo.statut = "Vivant"
      };

      console.log("troglo hp now:", troglo.hp);
      UpDateTroglo();

      if (troglo.hp <= 0) {
        troglo.statut = "Inconscient";
        const reussite = document.getElementById("combatbox") as HTMLElement;
        reussite.className = "d-flex justify-content-center align-items-center vh-100 text-center";
        reussite.innerHTML = `
          <div>
            <h2 class="fw-bold" style="color:#03735f">Réussite!</h2>
            <p class="mt-3">
            ${player.name} réussit, avec un jet de ${result}, à toucher le troglodyte. 
            Celui-ci souffrira de ${damage} points de dégât. Il tombe inconscient. 
            Vous revenez avec les bébés campestries survivants et les remettez à Bestir toujours en larmes, mais de joie cette fois-ci. 
            Pimple devient officiellement le héros de Grovine, une statut de sel est érigée à l'entrée de la grotte à son honneur. 
            </p>
            <img src="final-r.jpg" alt="reussite image">
          </div>
        `;
      } else {
        affichageResultat.textContent = `${player.name} réussit, avec un jet de ${result}, à toucher le troglodyte. 
        Celui-ci souffrira de ${damage} points de dégât.`
      }
    }
    else {
      affichageResultat.textContent = `${player.name} essaie d'attaquer le troglodyte, avec un jet de ${result}, il manque sa cible.`
    }

  } else { trogloAttack(); }
};

function trogloAttack() {
  const chooseAttack = rollDice(3);
  const alive = Object.values(party).filter((slot: any) =>
    slot && slot.id !== 6 && aventuriers[slot.id]?.statut !== "Inconscient"
  );

  if (alive.length === 0) return; // nobody to hit

  const partyRandom: any = alive[Math.floor(Math.random() * alive.length)];
  const partyMember = aventuriers[partyRandom.id];
  let result = rollDice(20)
  const troglo = getTroglo();

  if (troglo.statut === "Étouffement") {
    result = result - 4;
    troglo.statut = "Vivant";
    UpDateTroglo();
  }

  // if roll 1 its the poison attack
  if (chooseAttack === 1) {
    if (result >= 10) {
      partyMember.statut = "Empoisonnement"
      affichageResultat.textContent = `Le troglodyte réussit, avec un jet de dextérité de ${result} à s'approcher du visage de ${partyMember.name}. 
          Ce dernier aura désavantage à son jet d'attaque le prochain tour. `
    } else {
      affichageResultat.textContent = `Le troglodyte essaie de s'approcher du visage du visage  ${partyMember.name}. Avec un jet de dextérité de ${result}, il est maladroit
          et ${partyMember.name} réussit à éviter de se faire empoisonner.`
    }
    // other roll is the normal attack
  } else {
    result = result + troglo.attack_bonus;

    if (result >= partyMember.dc) {
      let damage = rollDice(troglo.attack_dmg_roll) + troglo.attack_dmg_bonus
      partyMember.hp = partyMember.hp - damage;
      if (partyMember.hp <= 0) {
        partyMember.statut = "Inconscient";
        showParty();
        affichageResultat.textContent = `Le troglodyte réussit, avec un jet de ${result}, à donner un coup de griffe à ${partyMember.name}. 
        Celui-ci souffrira de ${damage} points de dégât. N'ayant plus assez de vie, il tombe inconscient.`
      } else {
        affichageResultat.textContent = `Le troglodyte réussit, avec un jet de ${result}, à donner un coup de griffe à ${partyMember.name}. 
        Celui-ci souffrira de ${damage} points de dégât.`
      }
    } else {
      affichageResultat.textContent = `Le troglodyte essaie de griffer ${partyMember.name}, avec un jet de ${result} il est maladroit
          et ${partyMember.name} réussit à l'éviter.`
    }
  }

}

function checkIfPoisoned(player) {
  let result;
  if (player.statut === "Empoisonnement") {
    result = rollDesadvantage(20);
    player.statut = "Vivant";
  }
  else { result = rollDice(20) };
  return result;
}

export function UseObjects(player: any, initiativeTour: any[], turnNumber: number) {
  const objetline = document.getElementById("objetsdispos");
  if (!objetline) return;

  const troglo = getTroglo();

  // reset UI
  objetline.innerHTML = "";

  // render all available objects
  Object.entries(party_objects).forEach(([key, obj]: any) => {
    if (!obj || obj.statut !== "Disponible") return;

    // Pas de bouclier
    if (obj.id === 4) return;

    // special rule for antidote: only show if poisoned
    if (obj.id === 3 && player.statut !== "Empoisonnement") return;

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "btn btn-light me-2";
    btn.textContent = obj.name;

    btn.addEventListener("click", () => {
      // apply effect depending on key (adapt if your keys are p1/p2/p3)
      if (obj.id === 1) {
        const hpNow = Number(player.hp);
        const maxHp = Number(player.max_HP);
        const safeHp = Number.isFinite(hpNow) ? hpNow : maxHp;
        player.hp = Math.min(safeHp + 5, maxHp);

      } else if (obj.id === 2) {
        troglo.statut = "Immobilisation";
      } else if (obj.id === 3) {
        player.statut = "Vivant";
      }
      // IMPORTANT: assignment, not ===
      party_objects[key].statut = "Indisponible";

      // refresh buttons (used one disappears)
      showObjects();
      ShowTurn(initiativeTour, turnNumber);
    });

    objetline.appendChild(btn);
  });
}