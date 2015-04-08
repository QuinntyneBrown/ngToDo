
module app.toDo {

    "use strict";

    class ToDoMasterDetailController extends security.AuthenticatedController {

        constructor(
            public $location: ng.ILocationService,
            private $q: ng.IQService,
            private toDoService: IToDoService,
            public token: common.ISessionStorageProperty) {
            super($location, token);

        }

    }

    angular.module("app.toDo").controller("ToDoMasterDetailController", ["$location", "$q", "toDoService", "token",ToDoMasterDetailController]);
} 