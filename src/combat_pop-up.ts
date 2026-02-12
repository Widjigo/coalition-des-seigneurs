import { party } from "./party"
import {type aventurier} from "./aventuriers"
import {loadData } from "./transition";
import {party_objects} from "./party_objects"

// Personnage informations
const popupcharacter = document.querySelector(".party_pop-up") as HTMLDivElement;
const modalContainerCharacter = document.querySelector(".party_pop-up-container") as HTMLDivElement;
const aventuriersContainer = document.querySelector(".aventuriers") as HTMLDivElement;
const memberImages = Array.from(
  document.querySelectorAll<HTMLImageElement>(".box-left img")
);
const hp = document.getElementById("hp") as HTMLElement;
const attack = document.getElementById("attack") as HTMLElement;
const dc = document.getElementById("dc") as HTMLElement;
const dmg = document.getElementById("dmg") as HTMLElement;
const special = document.getElementById("special") as HTMLElement;
const name_member = document.getElementById("name_member") as HTMLElement;
const dmgRow = document.getElementById("dmgRow")!;
const statut = document.getElementById("statut") as HTMLElement;

//Objects informations
const popup = document.querySelector(".objects_pop-up") as HTMLDivElement;
const modalContainer = document.querySelector(".objects_pop-up-container") as HTMLDivElement;
const objectsContainer = document.querySelector(".objets") as HTMLDivElement;
const objectImages = Array.from(
  document.querySelectorAll<HTMLImageElement>(".box-right img")
);
const name = document.getElementById("name") as HTMLElement;
const effect = document.getElementById("effect") as HTMLElement;

loadData();
showParty(party, memberImages);
showObjects(party_objects, objectImages);

function isEmptyImage(imgElement: HTMLImageElement | null): boolean {
    return !imgElement || !imgElement.getAttribute("src");
}

function showParty(party:Record<number, aventurier>, memberImages: HTMLImageElement[]) {
  const MAX = 4
  for (let i = 0; i < MAX; i++) {
    const imgElement = memberImages[i];
    const member = party[i]; 

    if (!member) {
      // no member for this slot -> clear
      imgElement.removeAttribute("src");
      continue;
    }
    imgElement.src = member.img;
  }
}

// Function to update popup position based on anchor image
function updatePopupPositionCharacter() {
  if (!currentAnchorImage || isEmptyImage(currentAnchorImage)) return;
  const rect = currentAnchorImage.getBoundingClientRect();
  popupcharacter.style.top = rect.top + "px";
  popupcharacter.style.left = (rect.right + 20) + "px";
}

OpenPopupCharacter();
ClosePopupCharacter();

let currentAnchorImage: HTMLImageElement | null = null;


function showObjects(party_objects: Record<number, any>, objectImages: HTMLImageElement[]) {
  for (let i = 0; i < objectImages.length; i++) {
    const imgElement = objectImages[i];
    const objet = party_objects[i + 1]; // or i (see point #2)

    if (!objet) {
      imgElement.removeAttribute("src");
      continue;
    }

    imgElement.src = objet.img; 
  }
}

// hover to open pop-up
function OpenPopupCharacter() {
  memberImages.forEach((img, index) => {
    img.addEventListener("mouseover", () => {
      if (isEmptyImage(img)) return;

      //wich slot is this image?
      const slot = index;
      const member = party[slot];
      if (!member) return;

      currentAnchorImage = img;
      popupcharacter.style.position = "absolute";
      updatePopupPositionCharacter();
      modalContainerCharacter.classList.add("show");

      //show the member info in the pop-up
      name_member.textContent = member.name;
      hp.textContent = String(member.hp);
      attack.textContent =
        member.attack_bonus != null
          ? member.attack_type + " +" + member.attack_bonus + " pour toucher "
          : member.attack_type;
      dc.textContent = String(member.dc);
      statut.textContent = String(member.statut);
      if (member.attack_dmg_bonus != null){
        dmg.textContent =
        "1d" + member.attack_dmg_roll + " +" + member.attack_dmg_bonus;
        dmgRow.classList.remove("d-none");
      }
      else {
        dmgRow.classList.add("d-none");
      }
      special.textContent = member.ability;
    });
  });
}

// hide pop-up when mouse leaves image or pop-up
function ClosePopupCharacter() {
   if (aventuriersContainer) {
     aventuriersContainer.addEventListener("mouseleave", () => {
      currentAnchorImage = null;
      modalContainerCharacter?.classList.remove("show");
    })
   }
};

// Update popup position on scroll and resize to keep it stuck to anchor
window.addEventListener("scroll", updatePopupPositionCharacter);
window.addEventListener("resize", updatePopupPositionCharacter);


// Object pop-up
OpenPopupObject();
ClosePopupObject();

// Object pop-up
function OpenPopupObject() {
  objectImages.forEach((img, index) => {
    img.addEventListener("mouseover", () => {
      if (isEmptyImage(img)) return;

      //wich slot is this image?
      const slot = index + 1;
      const objet = party_objects[slot];
      if (!objet) return;

      currentAnchorImage = img;
      popup.style.position = "absolute";
      updatePopupPositionObject();
      modalContainer.classList.add("show");

      //show the member info in the pop-up
      name.textContent = objet.name;
      effect.textContent = objet.effect;
    });
  });
}

// hide pop-up when mouse leaves image or pop-up
function ClosePopupObject() {
   if (objectsContainer) {
     objectsContainer.addEventListener("mouseleave", () => {
      currentAnchorImage = null;
      modalContainer.classList.remove("show");
    })
   }
};

// Update popup position on scroll and resize to keep it stuck to anchor
window.addEventListener("scroll", updatePopupPositionObject);
window.addEventListener("resize", updatePopupPositionObject);

function updatePopupPositionObject() {
  if (!currentAnchorImage || isEmptyImage(currentAnchorImage)) return;

  const rect = currentAnchorImage.getBoundingClientRect();
  const popupWidth = popup.offsetWidth || 400;
  popup.style.top = rect.top + "px";
  popup.style.left = (rect.left - popupWidth - 20) + "px";
}
