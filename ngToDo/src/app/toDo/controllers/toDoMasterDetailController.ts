module app.toDo {

    "use strict";

    class ToDoMasterDetailController extends AuthenticatedController {

        constructor(public token: ISessionStorageProperty) {
            super(token);        
        }

    }

    angular.module("app.toDo").controller("ToDoMasterDetailController", ["token",ToDoMasterDetailController]);
} 