import { addTask } from "./components/addTask.js";
import { displayTask } from "./components/readTask.js";

const btn = document.querySelector('[data-form-btn]');

//Aqui escuchamos el evento clic sobre el boton agregar, llamando a la funcion que agrega una tarea
btn.addEventListener('click', addTask);
//Esta funcion lee las tareas del local storage y las muestra en pantalla al cargar la pagina
displayTask();