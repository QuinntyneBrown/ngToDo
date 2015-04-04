module app.toDo {

    "use strict";

    class ToDoListController implements IToDoListController {

        constructor(public toDos: IToDo[]) {

        }

        public static canActivate = {
            toDos: [
                "toDoService", (toDoService: IToDoService) => {
                    return toDoService.getAll().then((toDos) => { return toDos; });
                }
            ]
        }
    }

    angular.module("app.toDo")
        .controller("ToDoListController", ["toDos", ToDoListController]);
} 