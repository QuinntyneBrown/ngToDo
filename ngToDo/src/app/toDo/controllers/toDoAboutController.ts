module app.toDo {

    "use strict";

    class ToDoAboutController extends security.AuthorizedController {

        constructor(
            public $location: ng.ILocationService,
            public token: common.ISessionStorageProperty) {
            super($location, token);
        }

    }

    angular.module("app.toDo")
        .controller("toDoAboutController", ["$location", "token", ToDoAboutController]);
} 