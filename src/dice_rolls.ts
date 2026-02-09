import { party } from "./party";
import { addToParty } from "./party";
import { aventuriers} from "./aventuriers";
import { CARDS } from "./cards";


export function rollDice(sides: number): number { 
    return Math.floor(Math.random() * sides) + 1;
 }

 export function rollAdvantage(sides:number): number {
    let roll1 = Math.floor(Math.random() * sides) + 1;
    let roll2 = Math.floor(Math.random() * sides) + 1;
    if (roll1 <= roll2) {
        return roll2;
    } else {
        return roll1;
    }
 }

export function bearInParty() {
    const yibap = aventuriers[2];
    const bear = aventuriers[4];
    let rollbear = rollDice(20);
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

export function belchInParty() {
    let rollbelch = rollDice(20);
    const bealch = aventuriers[5];
    const neededbelch = 10;
    
    console.log("Bealch", rollbelch, "| needed:", neededbelch);
    if (rollbelch >= neededbelch) {
        addToParty(bealch);
        console.log("Bealch added to party!");
        return {
        ...CARDS[37],
        description: `Vous avez roulé ${rollbelch} sur un dé 20 et vous deviez obtenir au moins ${neededbelch} pour que Belch accepte de vous rejoindre.
                    Belch gromelle sa désapprobation en goblinoïde. il soupire, se lève, puis vous lance qu’il vaut mieux se débarrasser de la vermine avant le dîner pour éviter de se battre le ventre plein. `,
        };
    } else {
        console.log("Belch NOT added.");
        return {
        ...CARDS[38],
        description: ` Vous avez roulé ${rollbelch}  sur un dé 20 et vous deviez obtenir au moins ${neededbelch} pour que Belch accepte de vous rejoindre. 
                        Découragé, Belch répond qu’il doit cuisiner le souper plutôt que mourir inutilement. Toutefois, il se lève et se dirige vers sa paillasse, où il fouille quelques instants.  De sous plusieurs couches de pailles. il sort un petit bouclier en bois clouté et vous le tend. Il vous dit que c’est afin d’éviter « que vous ne mourriez trop vite ».`,
        };
    }
}

