module app.toDo {

    "use strict";

    class ToDoListController implements IToDoListController {

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

        public toDos: IToDo[];
    }

    angular.module("app.toDo")
        .controller("ToDoListController", ["$q", "toDoService", ToDoListController]);
} 