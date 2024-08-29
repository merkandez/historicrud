const url = 'http://localhost:3000/historical_events';

//Función que muestra los eventos históricos del JSON en db.json (método GET).
async function getEvents() {
  const response = await fetch(url);
  const events = await response.json();

  //Mostramos los datos en el div con id result.
  const showEvent = document.getElementById('result');

  // Limpiamos el contenido anterior.
  showEvent.innerHTML = '';

  //Mapeamos los eventos históricos que aparecen en el JSON.
  events.map((histEvent) => {
    printEventCard(histEvent, showEvent);
  });
}
getEvents();

//Creamos una función que pinte la tarjeta que va a contener despues cada uno de los componentes de JSON (title, Fecha, Lugar, etc...).
function printEventCard(histEvent, showEvent) {
  const card = document.createElement('div');
  card.className = 'card';

  //Metemos en una constante cada div que creamos para que contenga cada elemento del objeto JSON y le aplicamos una clase para poder darle estilo en la hoja de estilos styles.css.

  const cardFull = document.createElement('div');
  cardFull.className = 'card-full';

  const cardFront = document.createElement('div');
  cardFront.className = 'card-front';

  const cardBack = document.createElement('div');
  cardBack.className = 'card-back';

  const title = document.createElement('div');
  title.className = 'card-title';
  title.textContent = histEvent.title;

  const date = document.createElement('div');
  date.className = 'card-date';
  date.textContent = `Fecha: ${histEvent.date}`;

  const location = document.createElement('div');
  location.className = 'card-location';
  location.textContent = `Lugar: ${histEvent.location}`;

  const description = document.createElement('div');
  description.className = 'card-description';
  description.textContent = `Descripción: ${histEvent.description}`;

  const keyFigures = document.createElement('div');
  keyFigures.className = 'card-figures';
  keyFigures.textContent = `Figuras clave: ${histEvent.key_figures.join(', ')}`;

  //Creamos también los botones que va a contener cada tarjeta y un div que contenga los los botones para despues poder darles estilo. Para ello también les damos clases.

  const buttons = document.createElement('div');
  buttons.className = 'card-buttons';

  const btnMore = document.createElement('button');
  btnMore.className = 'more';
  btnMore.innerHTML = '&#x21BB';

  const btnEdit = document.createElement('button');
  btnEdit.className = 'edit';
  btnEdit.innerHTML = '&#x270E';

  const btnDelete = document.createElement('button');
  btnDelete.className = 'delete';
  btnDelete.innerHTML = '&#x1F5D1';

  //Aquí es donde utilizamos los div de card y buttons para crear cada uno de los componentes que van contenidos dentro y que anteriormente habíamos metido en constantes.

  cardFront.appendChild(title);
  cardFront.appendChild(date);
  cardFront.appendChild(location);
  cardFront.appendChild(keyFigures);
  buttons.appendChild(btnMore);
  buttons.appendChild(btnEdit);
  buttons.appendChild(btnDelete);
  cardFront.appendChild(buttons);

  cardBack.appendChild(description);

  cardFull.appendChild(cardFront);
  cardFull.appendChild(cardBack);
  card.appendChild(cardFull);

  //Metemos los datos de cada objeto del JSON (card) dentro del div result.
  showEvent.appendChild(card);

  // Le damos funcionalidad al botón borrar.
  btnDelete.onclick = () => {
    //Mostramos el mensaje de confirmación
    const confirmation = window.confirm(
      `¿Estás seguro de que deseas eliminar el evento titulado "${histEvent.title}"?`
    );
    if (confirmation) deleteEvent(histEvent.id, histEvent.title, card);
  };

  // Le damos funcionalidad al botón Ver Más.
  btnMore.onclick = () => {
    card.classList.toggle('flipped');
  };

  // Le damos funcionalidad al botón editar para que pinte el formulario para editar el evento histórico.
  btnEdit.onclick = () => {
    printForm(histEvent);
  };
}

//Creamos una función que nos pinte un mensaje de éxito o de error en pantalla cuando borremos, añadamos o editemos algún evento histórico.

function showMessage(message, type) {
  const messageBox = document.getElementById('messageBox');

  messageBox.textContent = message;
  messageBox.className = '';

  if (type === 'success') {
    messageBox.classList.add('success-message');
  } else if (type === 'error') {
    messageBox.classList.add('error-message');
  }
  // Añadimos la función setTimeout para que mantenga el mensaje en pantalla durante 5 segundos.
  setTimeout(() => {
    messageBox.textContent = '';
    messageBox.className = '';
  }, 3000);
}

// Creamos la función para eliminar un evento histórico del JSON con el método DELETE.
async function deleteEvent(id, title, histEvent) {
  const deleteUrl = `${url}/${id}`;

  const response = await fetch(deleteUrl, {
    method: 'DELETE',
  });

  if (response.ok) {
    histEvent.remove();
    showMessage(`Se ha eliminado el evento titulado ${title}.`, 'success');
  } else {
    showMessage(
      `Ha habido un error al eliminar el evento titulado ${title}.`,
      'error'
    );
  }
}

// Función para mostrar el formulario, ya sea para agregar o editar un evento.
function printForm(histEvent = null) {
  const divForm = document.getElementById('divForm');

  // Limpiamos el formulario anterior si lo hay
  divForm.innerHTML = '';

  const form = document.createElement('form');
  form.id = 'eventForm';

  const gaps = [
    {
      label: 'Título del evento:',
      id: 'title',
      type: 'text',
      value: histEvent ? histEvent.title : '',
    },
    {
      label: 'Fecha:',
      id: 'date',
      type: 'text',
      value: histEvent ? histEvent.date : '',
    },
    {
      label: 'Lugar:',
      id: 'location',
      type: 'text',
      value: histEvent ? histEvent.location : '',
    },
    {
      label: 'Descripción:',
      id: 'description',
      type: 'textarea',
      value: histEvent ? histEvent.description : '',
    },
    {
      label: 'Figuras clave (separadas por comas):',
      id: 'key_figures',
      type: 'text',
      value: histEvent ? histEvent.key_figures.join(', ') : '',
    },
  ];
  const closeButton = document.createElement('button');
  closeButton.textContent = 'X';
  closeButton.className = 'close-button';
  form.appendChild(closeButton);

  // Añadir evento para cerrar el formulario
  closeButton.onclick = () => {
    divForm; // Ocultar formulario limpiando el contenido
  };
  gaps.map((gap) => {
    const label = document.createElement('label');
    label.textContent = gap.label;
    label.setAttribute('for', gap.id);
    form.appendChild(label);

    let input;
    if (gap.type === 'textarea') {
      input = document.createElement('textarea');
    } else {
      input = document.createElement('input');
      input.type = gap.type;
    }

    input.id = gap.id;
    input.value = gap.value;
    form.appendChild(input);

    form.appendChild(document.createElement('br'));
  });

  // Creamos el botón de envío del formulario
  const submitButton = document.createElement('button');
  submitButton.textContent = histEvent ? 'Actualizar Evento' : 'Añadir Evento';
  submitButton.type = 'button';
  form.appendChild(submitButton);

  divForm.appendChild(form);

  // Le damos funcionalidad al botón de enviar dependiendo de si sirve para actualizar un evento o para crearlo desde cero.
  submitButton.onclick = () => {
    if (histEvent) {
      updateEvent(histEvent.id);
    } else {
      createNewEvent();
    }
  };
}

// Función para crear un nuevo evento histórico con el método POST.
async function createNewEvent() {
  const title = document.getElementById('title').value;
  const date = document.getElementById('date').value;
  const location = document.getElementById('location').value;
  const description = document.getElementById('description').value;
  const keyFigures = document
    .getElementById('key_figures')
    .value.split(',')
    .map((item) => item.trim());

  // Validamos si algún campo está vacío
  if (!title || !date || !location || !description || keyFigures.length === 0) {
    showMessage('Todos los campos son obligatorios.', 'error');
    return; // Con return detenemos la ejecución si hay campos vacíos
  }

  const newEvent = {
    title: title,
    date: date,
    location: location,
    description: description,
    key_figures: keyFigures,
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newEvent),
  });

  if (response.ok) {
    showMessage(`Se ha añadido el evento titulado ${title}.`, 'success');
    document.getElementById('eventForm').reset();
    getEvents(); // Actualizamos la lista de eventos
  } else {
    showMessage(
      `Ha habido un error al añadir el evento titulado ${title}.`,
      'error'
    );
  }
}
// Le damos funcionalidad Al botón de crear un nuevo evento que tenemos en el HTML para que nos muestre el formulario vacío llamando a la función printForm.
document.getElementById('CreateNewEventBtn').onclick = () => {
  printForm();
};

// Función para actualizar un evento existente con el método UPDATE.
async function updateEvent(id) {
  const updateUrl = `${url}/${id}`;
  const title = document.getElementById('title').value;
  const date = document.getElementById('date').value;
  const location = document.getElementById('location').value;
  const description = document.getElementById('description').value;
  const keyFigures = document
    .getElementById('key_figures')
    .value.split(',')
    .map((item) => item.trim());

  // Validamos si algún campo está vacío
  if (!title || !date || !location || !description || keyFigures.length === 0) {
    showMessage('Todos los campos son obligatorios.', 'error');
    return; // Con return detenemos la ejecución si hay campos vacíos
  }

  const updatedEvent = {
    title: title,
    date: date,
    location: location,
    description: description,
    key_figures: keyFigures,
  };

  const response = await fetch(updateUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedEvent),
  });

  if (response.ok) {
    showMessage(`Se ha actualizado el evento titulado ${title}.`, 'success');
    getEvents();
    document.getElementById('eventForm').reset();
    // Actualizamos la lista de eventos // Limpiamos el formulario después de actualizar
  } else {
    showMessage(
      `Ha habido un error al actualizar el evento titulado ${title}.`,
      'error'
    );
  }
}
