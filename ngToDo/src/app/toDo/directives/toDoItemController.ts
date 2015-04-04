module app.toDo {
    
    class ToDoItemController {

        constructor(public toDo: IToDo) {
            
        }

    }

    angular.module("app.toDo").controller("toDoItemController", [ToDoItemController]);
} 