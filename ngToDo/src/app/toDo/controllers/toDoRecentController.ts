module app.toDo {

    "use strict";

    class ToDoRecentController extends security.AuthenticatedController  {

        constructor(
            public $location: ng.ILocationService,
            private $q: ng.IQService,
            private toDoService: IToDoService,
            public token: common.ISessionStorageProperty) {
            super($location, token);

        }


        public activate = () => {

            var deferred = this.$q.defer();

            this.toDoService.getRecent().then((results) => {

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
        .controller("ToDoRecentController", ["$location", "$q", "toDoService", "token",ToDoRecentController]);
} 