module app.toDo {

    "use strict";

    class ToDoAboutController extends security.AuthenticatedController {

        constructor(
            public $location: ng.ILocationService,
            public token: common.ISessionStorageProperty) {
            super($location, token);
        }

    }

    angular.module("app.toDo")
        .controller("toDoAboutController", ["$location", "token", ToDoAboutController]);
} 