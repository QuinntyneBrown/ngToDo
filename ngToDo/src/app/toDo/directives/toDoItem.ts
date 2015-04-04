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

        scope:any = {
            toDoItem:"="
        }

        public link = (scope: ng.IScope, element: ng.IAugmentedJQuery, attributes: ng.IAttributes) => {
            
        }

    }

    angular.module("app.toDo").directive("toDoItem", [ToDoItem.instance]);
} 