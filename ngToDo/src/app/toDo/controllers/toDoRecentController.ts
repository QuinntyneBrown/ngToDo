module app.toDo {

    "use strict";

    class ToDoRecentController  {

        constructor(private $q: ng.IQService, private toDoService: IToDoService) {

        }

        public canActivate = () => {

            var deferred = this.$q.defer();

            this.toDoService.getRecent().then((results) => {

                this.toDos = results;

                deferred.resolve(true);

            }).catch((Error) => {

                deferred.resolve(false);

            });
            
            return deferred.promise;
            
        }

        public toDos:any;
    }

    angular.module("app.toDo")
        .controller("ToDoRecentController", ["$q","toDoService",ToDoRecentController]);
} 