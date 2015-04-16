module app.toDo {
    
    class ToDoItem {

        constructor() {
            
        }

        public static instance = () => {
            return new ToDoItem();
        }

        public controller: string = "toDoItemController";

        public controllerAs: string = "toDo";

        public restrict: string = "E";

        public replace: boolean = true;

        public templateUrl: string = "/src/app/toDo/directives/toDoItem.html";

        public scope:any = {
            toDoItem:"="
        }


    }

    angular.module("app.toDo").directive("toDoItem", [ToDoItem.instance]);
} 