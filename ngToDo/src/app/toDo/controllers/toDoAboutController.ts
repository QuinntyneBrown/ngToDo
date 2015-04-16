module app.toDo {

    "use strict";

    class ToDoAboutController extends security.AuthenticatedController {

        constructor(
            public $location: ng.ILocationService,
            public token: common.ISessionStorageProperty,
            public $timeout: ng.ITimeoutService) {
            super($location, $timeout, token);
        }

    }

    angular.module("app.toDo")
        .controller("toDoAboutController", ["$location", "$timeout", "token", ToDoAboutController]);
} 