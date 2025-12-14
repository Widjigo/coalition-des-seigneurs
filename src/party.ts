import type { aventurier } from "./aventuriers";
export const party: Record<number, aventurier> = {};

// Chercher les éléments html
const popup = document.querySelector(".party_pop-up") as HTMLDivElement;
const modalContainer = document.querySelector(".party_pop-up-container") as HTMLDivElement;
const aventuriersContainer = document.querySelector(".aventuriers") as HTMLDivElement;
const memberImages = Array.from(
  document.querySelectorAll<HTMLImageElement>(".box-left img")
);

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

OpenPopup();
ClosePopup();

// hover to open pop-up
function OpenPopup() {
memberImages.forEach(img => {
  img.addEventListener("mouseover", () => {
    if (isEmptyImage(img)) return;
    const rect = img.getBoundingClientRect();
    popup.style.top = rect.top + window.scrollY + "px";        // below the button
    popup.style.left = (rect.right + window.scrollX + 20) + "px";         // aligned with left edge
    popup.style.position = "absolute";
    modalContainer.classList.add("show");
  });
});
}

// hide pop-up when mouse leaves image or pop-up
function ClosePopup() {
   aventuriersContainer.addEventListener("mouseleave", () => {
    modalContainer.classList.remove("show");
  })
};
