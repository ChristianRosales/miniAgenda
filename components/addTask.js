import checkComplete from './checkComplete.js';
import deleteIcon from './deleteIcon.js';
import { displayTask } from './readTask.js';

export const addTask = (evento) => {
//Evitamos recargar la pagina con prevent default
    evento.preventDefault();
//Seleccionamos los elementos que vamos a utilizar
    const list = document.querySelector('[data-list]');
    const input = document.querySelector('[data-form-input]');
    const calendar = document.querySelector('[data-form-date]');
//Aqui capturamos los valores de los input
    const value = input.value; 
    const date = calendar.value;
    const dateFormat = moment(date).format('DD/MM/YYYY');
//Aqui limpiamos los campos
    input.value = '';
    calendar.value = "";

    const complete = false;
//Validamos que los campos no esten vacios
if(value === '' || date === ""){
    return;
}
//Guardamos la informacion en un objeto
    const taskObj = {
        value,
        dateFormat,
        complete,
        id: uuid.v4()
    };
//por cada vex que se presione el boton inicializar la estructura del html vacia
    list.innerHTML = "";
//En este array se guradan los objetos tareas que obtenemos del local storage con clave task 
    const taskList = JSON.parse(localStorage.getItem('tasks')) || [];
//Agregamos el objeto al taskList
    taskList.push(taskObj);
//LOCAL STORAGE - Guarda la informacion en el navegador de forma persistente
    //La lista de tareas la estamos guardando en el local storage
    localStorage.setItem("tasks", JSON.stringify(taskList));    
//lEsta funcion lee el listado de tareas en el local storage y luego las agrupa por fecha
    displayTask();

};
//Destructuramos el objeto tarea
export const createTask = ({value, dateFormat, complete, id}) => {
    //creamos el li que contendra la tarea
      const task = document.createElement('li');
            task.classList.add('card');
    //AGREGANDO DIV TAREA - Aqui creamos un "div" que contendrá el icono check y el span con el titulo de la tarea
      const taskContent = document.createElement('div');
    //verifica si se activo la casilla check
      const check = checkComplete(id)
    //si la tarea tiene indentificador complete agregue el estilo de casilla marcada  
      if(complete){
        check.classList.toggle('fas');
        check.classList.toggle('completeIcon');
        check.classList.toggle('far');
      }
    //creamos el span y le agregamos el texto del input
      const titleTask = document.createElement('span');
            titleTask.classList.add('task');
            titleTask.innerText = value;
    //Le agregamos al div el icono y el span
            taskContent.appendChild(check);
            taskContent.appendChild(titleTask);
      const dateElement = document.createElement('span');
            dateElement.innerHTML = dateFormat;
    //Aqui agregamos al task(li) los elementos del div (icono check, span titulo), el span con la fecha y el icono eliminar
            task.appendChild(taskContent);
            task.appendChild(dateElement);
            task.appendChild(deleteIcon(id));
//Devolvemos el elemento item "li" ya creado con la tarea
    return task;
};
