import { party } from "./party"
import { aventuriers} from "./aventuriers"
import { jaugeTemps } from "./informations"
import { party_objects } from "./party_objects"
import { rollDice } from "./dice_rolls"

 export function transition() {
    localStorage.setItem("party", JSON.stringify(party));
    localStorage.setItem("aventuriers", JSON.stringify(aventuriers));
    localStorage.setItem("jaugeTemps", JSON.stringify(jaugeTemps));
    localStorage.setItem("party_objects", JSON.stringify(party_objects));

    window.location.href = `${import.meta.env.BASE_URL}src/transition.html`;
}

window.addEventListener("DOMContentLoaded", () => {
    loadData();
});

export function loadData() {
    const partyData = localStorage.getItem("party");
    const aventuriersData = localStorage.getItem("aventuriers");
    const jaugeTempsData = localStorage.getItem("jaugeTemps");
    const partyObjectsData = localStorage.getItem("party_objects");


    if (partyData) Object.assign(party, JSON.parse(partyData));
    if (aventuriersData) Object.assign(aventuriers, JSON.parse(aventuriersData));
    let temps = jaugeTempsData ? JSON.parse(jaugeTempsData) : 0;
    if (partyObjectsData) Object.assign(party_objects, JSON.parse(partyObjectsData));
 
    const jg = document.getElementById("jg") as HTMLElement | null;
    if (jg) {
        if (temps === 0) {
            jg.innerHTML = `Comme vous avez pris tout votre temps pour vous préparer à cet affrontement. Avec une jauge de vitesse de ${temps}, les conséquences s’en trouvent désastreuses…<br><br>

            Vous arrivez sur place: seuls deux campestris sont visibles, enfermés dans une petite cage près d'un chaudron bouillant. Une gamelle vide, récemment utilisée, repose aux pieds 
            du troglodyte. <br> <br>
            
            Repus, le troglodyte sera plus fort pour vous affronter (Ajout de 5 points de vie)<br>`;
            aventuriers[6].hp += 5; }

        else if (temps === 1) {
            let result = saveCampestri();

            if (result.success == true) {
                jg.innerHTML = `Comme vous avez pris trop de temps à vous préparer à cet affrontement. Avec une jauge de vitesse de ${temps}, les conséquences
            sont désastreuses...<br><br>
            

            Vous arrivez sur place et découvrez avec horreur qu'un bébé campestrie hurle dans un chaudron d'eau bouillante. Les autres sont enfermés dans une petite cage près du chaudron. 
            Avant même que le combat ne commence, Pimple tente de se précipiter pour sauver le bébé. <br><br>
            

            Avec un jet de ${result.save} , il parvient à attraper le bébé campestri et à le sortir du chaudron avant qu'il ne soit trop tard. 
            Cet acte de bravoure le distrait toutefois et le troglodyte réussit à le griffer, lui infligeant 2 poins de dégâts. <br>
            Il aura également l'avantage pour son jet d'initiative. <br><br>
            `;
            // apply bonus here
            const member = Object.values(party).find(
            (p) => p.id === 1); 
            member.hp -= 2;
            }
            if (result.success == false) {
                jg.innerHTML = `Comme vous avez pris trop de temps à vous préparer à cet affrontement. Avec une jauge de vitesse de ${temps}, les conséquences
            sont désastreuses...<br> <br>

            Vous arrivez sur place et découvrez avec horreur qu'un bébé campestrie hurle dans un chaudron d'eau bouillante. Les autres sont enfermés dans une petite cage près du chaudron. 
            Avant même que le combat ne commence, Pimple tente de se précipiter pour sauver le bébé. <br> <br>

            Avec un jet de ${result.save} , il ne parvient pas à attraper le bébé campestri et à le sortir du chaudron avant qu'il ne soit trop tard. 
            Cette tragédie le distrait, et le troglodyte réussit à le griffer, lui infligeant 2 points de dégâts. <br>
            Il aura également l'avantage à l'initiative.<br> <br>
            `;
                aventuriers[1].hp -= 2;
            }
        }

        else if (temps === 2) {
            jg.innerHTML = `Comme vous avez parfois privilégié la rapidité d'action, parfois la préparation. Avec une jauge de vitesse de ${temps}, vous avez évitez des conséquences
            qui auraient pu être désastreuses...<br> <br>
            
            Vous arrivez sur place et découvrez le troglodyte reposé, en train de préparer une soupe. Par chance, tous les bébés campestris sont enfermés dans une petite cage près du chaudron. 
            Reposé, le troglodyte aura l'avantage pour l'initiative.<br> <br>`;
        }
        else if (temps === 3 || temps === 4) {
            jg.innerHTML = `Comme Pimple s'est dépêché de retrouver les petits tout en se préparant minimalement au combat. Avec une jauge de vitesse de ${temps}, vous avez évitez des conséquences
            désastreuses... <br> <br>
            
            À votre arrivée, le troglodyte est en train de mettre tous les bébés campestris dans une petite cage, près d’un chaudron posé sur un feu éteint.<br> <br>
            `;
        }
        else {
            jg.innerHTML = `Comme Pimple n'est pas du genre à se préparer: le temps pressait! Avec une jauge de vitesse de ${temps}, vous évitez toutes les conséquences
            désastreuses.<br> <br>

            Vous arrivez sur place et découvrez que le troglodyte n'a même pas eu le temps de déposer son panier. Pris par surprise, cela vous permettra
            de tous attaquer avant lui!<br> <br>`;
        }
    }
    console.log("Loaded:", {
        party,
        aventuriers,
        temps,
        party_objects
    });
    return (temps);
}

function saveCampestri() {
    let save = rollDice(20);
    let needed = 10;
    let success = false;
    console.log("saveroll:", save, "| needed:", needed,);

    if (save >= needed) {
        console.log("Campestri saved!");
        success = true;
        return { save, needed, success };
    }
    else {
        console.log("Campestri NOT saved.");
        return { save, needed, success };
    };
}
