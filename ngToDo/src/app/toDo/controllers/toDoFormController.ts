module app.toDo {

    "use strict";

    class ToDoFormController implements IToDoFormController {

        constructor(public toDo: IToDo) {

        }

        public static canActivate = {
            toDo: [
                "toDoService", "$routeParams", (toDoService: IToDoService, $routeParams: IToDoDetailRouteParams) => {
                    return toDoService.getById($routeParams.toDoId).then((toDo) => { return toDo; });
                }
            ]
        }
    }

    angular.module("app.toDo")
        .controller("ToDoFormController", ["toDo", ToDoFormController]);
} 