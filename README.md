# HistiriCrud: Proyecto de Gestión de Eventos Históricos

Este proyecto permite gestionar eventos históricos mediante una interfaz web utilizando JavaScript Vanilla y un servidor JSON. Puedes crear, leer, actualizar y eliminar eventos históricos. La interfaz los datos de cada evento en una tarjeta que puede generar un efecto "flip" y que permite ver la descripción de cada elemento organizado en un documento JSON.

## Características

- **Visualización de eventos**: Muestra una lista de eventos históricos con un efecto flip en las tarjetas para ver la descripción completa del evento.
- **CRUD completo**: Permite crear, leer, actualizar y borrar eventos.
- **Interacción mediante formularios**: Utiliza formularios para añadir y editar eventos.
- **Mensajes de error y éxito**: Muestra mensajes de estado para acciones de añadir, editar y eliminar eventos.

## Tecnologías Utilizadas

- **Node.js**: Para generar un entorno dinámico.
- **JavaScript Vanilla**: Para la lógica y manipulación del DOM.
- **JSON Server**: Para proporcionar una API RESTful para gestionar los eventos.

## Instalación y Ejecución

### Requisitos Previos

- Node.js, JSON Server (y npm) instalado en tu máquina.

### Clonación del Repositorio

1. Clona el repositorio usando Git:

   ```bash
   git clone https://github.com/tu-usuario/tu-repositorio.git
   ```

2. Navega al directorio del proyecto:

   ```bash
   cd tu-repositorio
   ```

### Configuración del Servidor JSON

1. Instala las dependencias del proyecto:

   ```bash
   npm install
   ```

2. Ejecuta el servidor JSON:

   ```bash
   npx json-server --watch db.json --port 3000
   ```

   Esto iniciará el servidor en `http://localhost:3000`.

### Estructura de Archivos

El proyecto está estructurado de la siguiente manera:
historiCrud |-- /server | |-- db.json | |-- dbexample.json |-- /src | |-- service.js|-- index.html | |-- styles.css | |-- package.json |-- README.md

- **`/server/db.json`**: Archivo JSON que contiene los datos de eventos. Este archivo se utiliza como la base de datos para el servidor JSON.
- **`/server/dbexample.json`**: Archivo JSON de ejemplo que puedes copiar para inicializar tu archivo `db.json` con datos de ejemplo. Úsalo como referencia para saber cómo deben estructurarse los eventos.

### Uso de la Aplicación

1. Abre `index.html` en tu navegador para visualizar la aplicación.

2. Utiliza el botón "Crear Nuevo Evento" para añadir eventos nuevosa través del formulario que también se usa para editar eventos existentes.

3. Las tarjetas de eventos permiten ver la descripción completa al hacer clic en el botón "+". Puedes eliminar eventos con el botón "Borrar" y editar eventos con el botón "Editar".

### Mensajes de Estado

- Los mensajes de éxito y error se muestran en pantalla para confirmar las acciones realizadas, como añadir, editar o eliminar eventos.

## Contribuciones

Si deseas contribuir al proyecto, por favor, haz un fork del repositorio y envía un pull request con tus cambios.

---

¡Gracias por utilizar este proyecto! Si tienes alguna pregunta, no dudes en abrir un issue en el repositorio.
