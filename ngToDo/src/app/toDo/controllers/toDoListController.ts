module app.toDo {

    "use strict";

    class ToDoListController extends security.AuthenticatedController {

        constructor(
            public $location: ng.ILocationService,
            private $q: ng.IQService,
            private toDo: IToDo,
            public token: common.ISessionStorageProperty) {
            super($location, token);

        }


        public activate = () => {

            var deferred = this.$q.defer();

            this.toDo.getAll().then((results) => {

                this.toDos = results;

                deferred.resolve(true);

            }).catch((Error) => {

                deferred.resolve(false);

            });

            return deferred.promise;

        }

        public toDos: IToDo[];
    }

    angular.module("app.toDo")
        .controller("toDoListController", ["$location", "$q", "toDo", "token", ToDoListController]);
} 