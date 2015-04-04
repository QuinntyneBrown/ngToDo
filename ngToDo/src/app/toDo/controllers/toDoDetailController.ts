module app.toDo {
    
    "use strict";

    class ToDoDetailController implements IToDoDetailController {
        
        constructor(public toDoService: IToDoService, public $routeParams) {
            toDoService.getById($routeParams.toDoId).then((toDo) => { return toDo; });
        }

        public canActivate = () => {
            return this.toDoService.getById(this.$routeParams.toDoId).then((toDo) => { this.toDo = toDo; });
        }

        public toDo: IToDo;
    }

    angular.module("app.toDo")
        .controller("ToDoDetailController", ["toDo", ToDoDetailController]);

} 