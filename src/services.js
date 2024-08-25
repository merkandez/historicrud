/* import { Events } from './clases.js'; */
/* endpoint:http://localhost:3000/historical_events */
/************************/

//READ - method : get URL:http://localhost:3000/historical_events

const url = 'http://localhost:3000/historical_events';

async function getEvents() {
  const response = await fetch(url);
  const events = await response.json();

  //Mostramos los datos en el div con id result
  const showEvent = document.getElementById('result');

  events.map((histEvents) => {
    const card = document.createElement('div');
    card.className = 'card';

    const title = document.createElement('div');
    title.className = 'card-title';
    title.textContent = histEvents.title;

    const date = document.createElement('div');
    date.className = 'card-date';
    date.textContent = `Fecha: ${histEvents.date}`;

    const location = document.createElement('div');
    location.className = 'card-location';
    location.textContent = `Lugar: ${histEvents.location}`;

    const description = document.createElement('div');
    description.className = 'card-description';
    description.textContent = `Descripción: ${histEvents.description}`;

    const keyFigures = document.createElement('div');
    keyFigures.className = 'card-figures';
    keyFigures.textContent = `Figuras clave: ${histEvents.key_figures.join(
      ', '
    )}`;

    const buttons = document.createElement('div');
    buttons.className = 'card-buttons';

    const btnMore = document.createElement('button');
    btnMore.className = 'more';
    btnMore.textContent = 'Ver Más';

    const btnDelete = document.createElement('button');
    btnDelete.className = 'delete';
    btnDelete.textContent = 'Borrar';

    card.appendChild(title);
    card.appendChild(date);
    card.appendChild(location);
    card.appendChild(description);
    card.appendChild(keyFigures);
    buttons.appendChild(btnMore);
    buttons.appendChild(btnDelete);
    card.appendChild(buttons);
    showEvent.appendChild(card);

    // Botón borrar
    btnDelete.onclick = () =>
      deleteEvent(histEvents.id, histEvents.title, card);

    // Botón ver más
    btnMore.onclick = () => {
      alert(
        `Descripción: ${
          histEvents.description
        }\nFiguras clave: ${histEvents.key_figures.join(', ')}`
      );
    };
  });
}

getEvents();

function showMessage(message, type) {
  const messageBox = document.getElementById('messageBox');

  // Configurar el texto del mensaje
  messageBox.textContent = message;

  // Limpiar clases anteriores
  messageBox.className = '';

  // Añadir la clase correspondiente según el tipo de mensaje
  if (type === 'success') {
    messageBox.classList.add('success-message');
  } else if (type === 'error') {
    messageBox.classList.add('error-message');
  }

  // Mostrar el mensaje por un tiempo determinado (5 segundos en este caso)
  setTimeout(() => {
    messageBox.textContent = '';
    messageBox.className = ''; // Limpiar clases y contenido
  }, 50000);
}

//Función para borrar un evento histórico

async function deleteEvent(id, title, histEvents) {
  const deleteUrl = `${url}/${id}`;

  const response = await fetch(deleteUrl, {
    method: 'DELETE',
  });

  /* const errorMessage = document.getElementById('errorMessage'); */

  if (response.ok) {
    // Eliminar el elemento de la lista en el DOM
    histEvents.remove();

    /*    errorMessage.textContent = `El evento titulado ${title} eliminado exitosamente.`;
    errorMessage.style.color = 'green'; */
    showMessage(
      `El evento titulado ${title} eliminado exitosamente.`,
      'success'
    );
  } else {
    /*     errorMessage.textContent = `Ha habido un error al eliminar el evento titulado ${title}.`;
    errorMessage.style.color = 'red'; */
    showMessage(
      `Ha habido un error al eliminar el evento titulado ${title}.`,
      'error'
    );
  }
}
/*   }
  setTimeout(() => {
    errorMessage.textContent = '';
  }, 5000);
} */

//Función para crear el formulario

function printForm() {
  const divForm = document.getElementById('divForm');

  const form = document.createElement(form);
}

//función para crear un nuevo evento histórico

async function createNewEvent() {
  const title = document.getElementById('title').value;
  const date = document.getElementById('date').value;
  const location = document.getElementById('location').value;
  const description = document.getElementById('description').value;
  const keyFigures = document
    .getElementById('key_figures')
    .value.split(',')
    .map((histEvents) => histEvents.trim());

  const newEvent = {
    id: 'id',
    title: title,
    date: date,
    location: location,
    description: description,
    key_figures: keyFigures,
  };

  // Aquí podrías enviar el evento al servidor usando fetch
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newEvent),
  });

  // Si la respuesta del servidor es correcta, añadimos el nuevo evento al DOM
  if (response.ok) {
    showEventInList(newEvent);

    document.getElementById('eventForm').reset();
  }
}
