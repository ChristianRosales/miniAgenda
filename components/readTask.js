import { createTask } from "./addTask.js";
import { uniqueDates, orderDates } from "../services/date.js";
import dateElement from "./dateElement.js";
//Esta funcion lee el listado de tareas al cargar la pagina y las muestra en pantalla
export const displayTask = () => {
    const list = document.querySelector('[data-list]');
//Obtener listado de objetos en el local storage || si esta nulo lo convierte en arreglo vacio
    const tasksList = JSON.parse(localStorage.getItem('tasks')) || [];
//Esta funcion pone las fechas de las tareas en un arreglo
    const dates = uniqueDates(tasksList);
//Ordena las fechas directamente el arreglo dates    
    orderDates(dates);
//Recorremos las fechas las mostramos en pantalla
    dates.forEach(date => {
        
        const dateMoment = moment(date, 'DD/MM/YYYY');
        list.appendChild(dateElement(date));
//Luego recorremos el listado de tareas y agrupamos las tareas que coincidan con la misma fecha
        tasksList.forEach(task => {
            const taskDate = moment(task.dateFormat, 'DD/MM/YYYY');
            const diff = dateMoment.diff(taskDate);

            if(diff === 0)
            list.appendChild(createTask(task));
        });
    
    });
    
}