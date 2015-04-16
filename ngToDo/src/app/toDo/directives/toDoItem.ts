module app.toDo {
    
    "use strict";

    class ToDoItem {

        constructor() {
            
        }

        public static instance = () => {
            return new ToDoItem();
        }

        public restrict: string = "E";

        public replace: boolean = true;

        public templateUrl: string = "/src/app/toDo/directives/toDoItem.html";

        public scope:any = {
            toDoItem:"="
        }


    }

    angular.module("app.toDo").directive("toDoItem", [ToDoItem.instance]);
} 