module app.toDo {

    "use strict";

    export interface IToDoStatuses {
        new:number;
        toDo: number;
        toDoNever: number;
        started: number;
        completed: number;
    }

    enum ToDoStatuses {
        new,
        toDo,
        toDoNever,
        started,
        completed
    }

    angular.module("app.toDo").value("toDoStatuses", ToDoStatuses);
} 