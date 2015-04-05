module app.toDo {

    "use strict";

    class ToDoRecentController extends AuthenticatedController  {

        constructor(private $q: ng.IQService, private toDoService: IToDoService, public token: ISessionStorageProperty) {
            super(token);
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
        .controller("ToDoRecentController", ["$q","toDoService","token", ToDoRecentController]);
} 