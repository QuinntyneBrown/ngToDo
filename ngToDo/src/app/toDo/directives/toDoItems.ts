module app.toDo {

    "use strict";

    class ToDoItems {

        constructor() {
            
        }

        public static instance = () => {
            return new ToDoItems();
        }

        public replace: boolean = true;
        
        public restrict: string = "E";

        public templateUrl: string = "/src/app/toDo/directives/toDoItems.html";

        public scope = {
            toDoItems: "="
        }
         
    }

    angular.module("app.toDo").directive("toDoItems", [ToDoItems.instance]);
} 