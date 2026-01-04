// Informations 
const htmlInfo = document.getElementById("informations") as HTMLElement;

export type info = {
  numero: number,
  nom: string,
  description: string,
};

export const infos: Record<number, info> = {
  1: {
    numero: 1,
    nom: "Grotte au puits",
    description: "Vous savez que les enfants ont été emmenés à la grotte au puits",
  },

  2: {
    numero: 2,
    nom: "trogodyte",
    description: "Vous savez que les enfants ont été kidnappés par un troglodyte",
  },

  3: {
  numero: 3,
  nom: "chemin",
  description: "Vous savez comment vous rendre à l’endroit où ont été emmené les enfants.",
  },
  };

export  let  infoReceive:  info[] = [];


export function InfoKnown(info: info) {
  const alreadyHaveIt = infoReceive.some(i => i.numero === info.numero);
  if (!alreadyHaveIt) {
    infoReceive.push(info);
    htmlInfo.innerHTML = infoReceive.map(i => `<p>${i.description}</p>`).join('');
  }
  console.log("Infos connues:", infoReceive);

}

//Jauge de temps
export let jaugeTemps = 0;

export function ajouterJauge (valeur: number)
{jaugeTemps += valeur; 
    console.log('Jauge de temps actuelle : ' + jaugeTemps);
}
