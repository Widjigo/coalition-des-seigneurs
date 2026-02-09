import { CARDS} from "./cards";
import { aventuriers } from "./aventuriers";
import { infos } from "./informations";
import { party } from "./party";
import { infoReceive } from "./informations";

//Fonction pour la gestion avec ou sans ybap
export function ForestSearch() {
    const yibap = aventuriers[2];
    const grotte = infos[1];
    const lieu = infos[3];

    if (Object.values(party).includes(yibap) &&
        Object.values(infoReceive).includes(lieu)
        ) {
            return CARDS[20]
        }
    if  (
        !Object.values(party).includes(yibap) && 
        Object.values(infoReceive).includes(lieu)
        ) {
            return CARDS[21]
        }
    if  (
        Object.values(party).includes(yibap) && 
        Object.values(infoReceive).includes(grotte)
        ) {
            return CARDS[22]
        } 
    if  (
        !Object.values(party).includes(yibap) && 
        Object.values(infoReceive).includes(grotte)
        ) {
            return CARDS[23]
        }     
    else {
        return CARDS[24]}
}


export function bear() {
    const yibap = aventuriers[2];
    return Object.values(party).includes(yibap) ? CARDS[25] : CARDS[26];
}