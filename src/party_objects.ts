import type { objet } from "./objets";
export const party_objects: Record<number, objet> = {};

// Chercher les éléments html
const popup = document.querySelector(".objects_pop-up") as HTMLDivElement;
const modalContainer = document.querySelector(".objects_pop-up-container") as HTMLDivElement;
const objectsContainer = document.querySelector(".objets") as HTMLDivElement;
const objectImages = Array.from(
  document.querySelectorAll<HTMLImageElement>(".box-right img")
);
const name = document.getElementById("name") as HTMLElement;
const effect = document.getElementById("effect") as HTMLElement;


// Image est est-elle vide?
function isEmptyImage(imgElement: HTMLImageElement | null): boolean {
    return !imgElement || !imgElement.getAttribute("src");
}

 //adding a object
export function addToBag(nouvelobjet: objet) {
    for (let i = 0; i < objectImages.length; i++) {
            
        //check if the object is already in the bag
        if ((party_objects[i+1])&& party_objects[i + 1].id ===nouvelobjet.id){
            console.log("Object already in the bag.")
            return;
            }
        
        //add the member to the first empty slot
        if (isEmptyImage(objectImages[i])) {
            const imgElement = objectImages[i];
            party_objects[i+1] = nouvelobjet;
            imgElement.src = nouvelobjet.img; 
            console.log("object in bag${i+1}:", nouvelobjet)
            return;}

        //no empty slot found
        else
            console.log("No empty slot available in the bag."); 
    }
 }

OpenPopupObject();
ClosePopupObject();

// hover to open pop-up
function OpenPopupObject() {
  objectImages.forEach((img, index) => {
    img.addEventListener("mouseover", () => {
      if (isEmptyImage(img)) return;

      //wich slot is this image?
      const slot = index + 1;
      const objet = party_objects[slot];
      if (!objet) return;

      const rect = img.getBoundingClientRect();
      const popupWidth = popup.offsetWidth || 400;
      popup.style.top = rect.top + window.scrollY + "px";        // below the button
      popup.style.left = (rect.left + window.scrollX - popupWidth - 20) + "px";         // aligned with left edge
      popup.style.position = "absolute";
      modalContainer.classList.add("show");

      //show the member info in the pop-up
      name.textContent = objet.name;
      effect.textContent = objet.effect;
    });
  });
}

// hide pop-up when mouse leaves image or pop-up
function ClosePopupObject() {
   objectsContainer.addEventListener("mouseleave", () => {
    modalContainer.classList.remove("show");
  })
};
