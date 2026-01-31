import { party } from "./party";
import { addToParty } from "./party";
import { aventuriers} from "./aventuriers";
import { CARDS } from "./cards";

export function bearInParty() {
    const yibap = aventuriers[2];
    const bear = aventuriers[4];
    let rollbear = Math.floor(Math.random() * 20) + 1;
    const yibapInParty = Object.values(party).includes(yibap);
    const neededbear = yibapInParty ? 8 : 11;
    
    console.log("Bear roll:", rollbear, "| needed:", neededbear, "| yibapInParty:", yibapInParty);
    if (rollbear >= neededbear) {
        addToParty(bear);
        console.log("Bear added to party!");
        return {
        ...CARDS[27],
        description: `Vous avez roulé un ${rollbear} sur un dé 20 et vous deviez rouler au moins ${neededbear} afin d'amadouer l'ours ! Ainsi, l'ours approche en douceur et mange les baies. Il vous suivra... tant qu'il y aura des baies dans les poches de Pimple.`,
        };
    } else {
        console.log("Bear NOT added.");
        return {
        ...CARDS[28],
        description: `Vous avez roulé ${rollbear} sur un dé 20 et vous deviez rouler au moins ${neededbear} afin d'amadouer l'ours ! Ainsi, l'ours refuse d'approcher malgré la faim, il est trop méfiant. Aucun moyen de le convaincre de vous suivre.`,
        };
    }

}