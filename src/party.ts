import type { aventurier } from "./aventuriers";
export const party: Record<number, aventurier> = {};

// Aller chercher l'information des images du party'
const memberImages: (HTMLImageElement | null)[] = [
document.getElementById("member1") as HTMLImageElement,
document.getElementById("member2") as HTMLImageElement,
document.getElementById("member3") as HTMLImageElement,
document.getElementById("member4") as HTMLImageElement,
];

function isEmptyImage(imgElement: HTMLImageElement | null): boolean {
    return !imgElement || !imgElement.getAttribute("src");
}

 //adding a party members 
export function addToParty(member: aventurier) {
    for (let i = 0; i < memberImages.length; i++) {
        if (isEmptyImage(memberImages[i])) {
            const imgElement = memberImages[i];
            party[i+1] = member;
            imgElement.src = member.img;
            console.log("member of party${i+1}:", party)
            return;}
        else
            console.log("No empty slot available in the party."); 
    }
 }