export class Events {
  constructor(id, title, date, location, description, key_figures) {
    this.id = id;
    this.title = title;
    this.date = date;
    this.location = location;
    this.description = description;
    this.key_figures = key_figures;
  }
}

//Supongamos que quieres crear un nuevo evento con esta clase. Podrías hacerlo de la siguiente manera:

import { Events } from './path/to/Events';

const myEvent = new Events(
  1,
  'Conferencia de Tecnología',
  '2024-09-15',
  'Auditorio UAH',
  'Una conferencia sobre las últimas tendencias tecnológicas.',
  ['Jhonny Be Good', 'César Mercado']
);

console.log(myEvent);

{
  'Batalla de las Termópilas',
    '480 a.C.',
    'Paso de las Termópilas, Grecia',
    'La Batalla de las Termópilas fue un enfrentamiento clave durante la Segunda Guerra Médica, donde un pequeño ejército griego liderado por el rey Leónidas de Esparta se enfrentó al vasto ejército persa de Jerjes I, en un heroico acto de resistencia.',
    ['Leónidas I', 'Jerjes I'];
}
