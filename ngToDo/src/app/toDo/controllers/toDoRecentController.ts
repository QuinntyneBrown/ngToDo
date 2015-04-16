module app.toDo {

    "use strict";

    class ToDoRecentController extends security.AuthenticatedController  {

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

            this.toDo.getRecent().then((results) => {

                this.toDos = results;

                deferred.resolve(true);

            }).catch((Error) => {

                deferred.resolve(false);

            });
            
            return deferred.promise;
            
        }

        public toDos:IToDo[];
    }

    angular.module("app.toDo")
        .controller("toDoRecentController", ["$location", "$timeout", "$q", "toDo", "token",ToDoRecentController]);
} 