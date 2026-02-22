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
    if (aventuriersData) {
        const parsed = JSON.parse(aventuriersData);
        for (const key in parsed) {
            // merge each aventurier object to preserve flags and methods
            const idx = Number(key);
            if ((aventuriers as any)[idx]) {
                Object.assign((aventuriers as any)[idx], parsed[key]);
            } else {
                (aventuriers as any)[idx] = parsed[key];
            }
        }
    }

    // coerce temps to a number
    let temps = jaugeTempsData ? Number(JSON.parse(jaugeTempsData)) : 0;
    // marker to remember which transition effects were applied (prevents reapplying)
    const appliedTransition = localStorage.getItem("transition_applied");

    // If a different transition was applied previously, revert original HPs
    if (appliedTransition && appliedTransition !== String(temps)) {
        const origHpStr = localStorage.getItem("transition_original_hp");
        if (origHpStr) {
            try {
                const origHp = JSON.parse(origHpStr);
                for (const k in origHp) {
                    const idx = Number(k);
                    if ((aventuriers as any)[idx]) {
                        (aventuriers as any)[idx].hp = origHp[k];
                        // also clear any transition flag that was previously set
                        (aventuriers as any)[idx].transitionBonus = false;
                    }
                }
                // persist the reverted aventuriers
                localStorage.setItem("aventuriers", JSON.stringify(aventuriers));
            } catch (e) {
                console.warn("Failed to parse transition_original_hp", e);
            }
            localStorage.removeItem("transition_original_hp");
        }
        // clear the marker so we can apply new transition below
        localStorage.removeItem("transition_applied");
    }
    
    if (partyObjectsData) Object.assign(party_objects, JSON.parse(partyObjectsData));

    if (temps === 0) {
        // avoid stacking +5 multiple times: only apply if not already applied for this temps
        if (appliedTransition !== String(temps)) {
            // store original HP before applying effect
            const originalHp: Record<number, number> = {};
            if (aventuriers[6]) originalHp[6] = aventuriers[6].hp;
            localStorage.setItem("transition_original_hp", JSON.stringify(originalHp));

            if (aventuriers[6] && aventuriers[6].transitionBonus !== true) {
                aventuriers[6].hp += 5;
                aventuriers[6].transitionBonus = true; // small flag
                localStorage.setItem("aventuriers", JSON.stringify(aventuriers));
            }
            localStorage.setItem("transition_applied", String(temps));
        } else {
        }
    }

    if (temps === 1) {
        // avoid stacking -2 multiple times: only apply if not already applied for this temps
        if (appliedTransition !== String(temps)) {
            // store original HP before applying effect
            const originalHp: Record<number, number> = {};
            if (aventuriers[1]) originalHp[1] = aventuriers[1].hp;
            localStorage.setItem("transition_original_hp", JSON.stringify(originalHp));

            if (aventuriers[1] && aventuriers[1].transitionBonus !== true) {
                aventuriers[1].hp -= 2;
                aventuriers[1].transitionBonus = true; // small flag
                localStorage.setItem("aventuriers", JSON.stringify(aventuriers));
            }
            localStorage.setItem("transition_applied", String(temps));
        } else {
        }
    }
    
    const jg = document.getElementById("jg") as HTMLElement | null;
    if (jg) {
        if (temps === 0) {
            jg.innerHTML = `Comme vous avez pris tout votre temps pour vous préparer à cet affrontement. Avec une jauge de vitesse de ${temps}, les conséquences s’en trouvent désastreuses…<br><br>

            Vous arrivez sur place: seuls deux campestris sont visibles, enfermés dans une petite cage près d'un chaudron bouillant. Une gamelle vide, récemment utilisée, repose aux pieds 
            du troglodyte. <br> <br>
            
            Repus, le troglodyte sera plus fort pour vous affronter (Ajout de 5 points de vie)<br>`;
        }

        else if (temps === 1) {
            let result= saveCampestri();
            if (result.success == true) {
                jg.innerHTML = `Comme vous avez pris trop de temps à vous préparer à cet affrontement. Avec une jauge de vitesse de ${temps}, les conséquences
            sont désastreuses...<br><br>
            

            Vous arrivez sur place et découvrez avec horreur qu'un bébé campestrie hurle dans un chaudron d'eau bouillante. Les autres sont enfermés dans une petite cage près du chaudron. 
            Avant même que le combat ne commence, Pimple tente de se précipiter pour sauver le bébé. <br><br>
            

            Avec un jet de ${result.save} , il parvient à attraper le bébé campestri et à le sortir du chaudron avant qu'il ne soit trop tard. 
            Cet acte de bravoure le distrait toutefois et le troglodyte réussit à le griffer, lui infligeant 2 poins de dégâts. <br>
            Il aura également l'avantage pour son jet d'initiative. <br><br>
            `;
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
    
    return (temps);
}

function saveCampestri() {
    let save = rollDice(20);
    let needed = 10;
    let success = false;
    

    if (save >= needed) {
        success = true;
        return { save, needed, success };
    }
    else {
        return { save, needed, success };
    };
}
