module app.toDo {

    "use strict";

    class ToDosController extends security.AuthenticatedController {

        constructor(
            public $location: ng.ILocationService,
            private $q: ng.IQService,
            public $timeout: ng.ITimeoutService,
            private toDo: IToDo,
            public token: common.ISessionStorageProperty) {
            super($location, $timeout, token);

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
        .controller("toDosController", ["$location", "$q", "$timeout", "toDo", "token", ToDosController]);
} 