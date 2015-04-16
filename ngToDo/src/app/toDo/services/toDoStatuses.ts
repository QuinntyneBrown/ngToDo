module app.toDo {

    "use strict";

    enum ToDoStatuses {
        new,
        toDo,
        toDoNever,
        started,
        completed
    }

    angular.module("app.toDo").value("toDoStatuses", ToDoStatuses);
} 