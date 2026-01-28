import type { aventurier } from "./aventuriers";
export const party: Record<number, aventurier> = {};

// Chercher les éléments html
const popup = document.querySelector(".party_pop-up") as HTMLDivElement;
const modalContainer = document.querySelector(".party_pop-up-container") as HTMLDivElement;
const aventuriersContainer = document.querySelector(".aventuriers") as HTMLDivElement;
const memberImages = Array.from(
  document.querySelectorAll<HTMLImageElement>(".box-left img")
);
const hp = document.getElementById("hp") as HTMLElement;
const attack = document.getElementById("attack") as HTMLElement;
const dmg = document.getElementById("dmg") as HTMLElement;
const special = document.getElementById("special") as HTMLElement;
const name_member = document.getElementById("name_member") as HTMLElement;
const dmgRow = document.getElementById("dmgRow")!;


// Image est est-elle vide?
function isEmptyImage(imgElement: HTMLImageElement | null): boolean {
    return !imgElement || !imgElement.getAttribute("src");
}

 //adding a party member
export function addToParty(member: aventurier) {
    for (let i = 0; i < memberImages.length; i++) {
            
        //check if the member is already in the party
        if ((party[i+1])&& party[i + 1].id === member.id){
            console.log("Member is already in the party.")
            return;
            }
        
        //add the member to the first empty slot
        if (isEmptyImage(memberImages[i])) {
            const imgElement = memberImages[i];
            party[i+1] = member;
            imgElement.src = member.img; 
            console.log("member of party${i+1}:", party)
            return;}

        //no empty slot found
        else
            console.log("No empty slot available in the party."); 
    }
 }

let currentAnchorImage: HTMLImageElement | null = null;

// Function to update popup position based on anchor image
function updatePopupPosition() {
  if (!currentAnchorImage || isEmptyImage(currentAnchorImage)) return;

  const rect = currentAnchorImage.getBoundingClientRect();
  popup.style.top = rect.top + "px";
  popup.style.left = (rect.right + 20) + "px";
}

OpenPopup();
ClosePopup();

// hover to open pop-up
function OpenPopup() {
  memberImages.forEach((img, index) => {
    img.addEventListener("mouseover", () => {
      if (isEmptyImage(img)) return;

      //wich slot is this image?
      const slot = index + 1;
      const member = party[slot];
      if (!member) return;

      currentAnchorImage = img;
      popup.style.position = "absolute";
      updatePopupPosition();
      modalContainer.classList.add("show");

      //show the member info in the pop-up
      name_member.textContent = member.name;
      hp.textContent = String(member.hp);
      attack.textContent =
        member.attack_bonus != null
          ? member.attack_type + " +" + member.attack_bonus + " pour toucher "
          : member.attack_type;
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
function ClosePopup() {
   aventuriersContainer.addEventListener("mouseleave", () => {
    currentAnchorImage = null;
    modalContainer.classList.remove("show");
  })
};

// Update popup position on scroll and resize to keep it stuck to anchor
window.addEventListener("scroll", updatePopupPosition);
window.addEventListener("resize", updatePopupPosition);
