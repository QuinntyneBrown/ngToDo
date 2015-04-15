module app.toDo {

    "use strict";

    class ToDoRecentController extends security.AuthorizedController  {

        constructor(
            public $location: ng.ILocationService,
            private $q: ng.IQService,
            private toDo: IToDo,
            public token: common.ISessionStorageProperty) {
            super($location, token);

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
        .controller("toDoRecentController", ["$location", "$q", "toDo", "token",ToDoRecentController]);
} 