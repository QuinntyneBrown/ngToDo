module app.toDo {

    "use strict";

    class ToDoFormController extends AuthenticatedController {

        constructor(private $q: ng.IQService, private toDoService: IToDoService, private $routeParams, public token: ISessionStorageProperty ) {
            super(token);

        }

        public activate = () => {

            var deferred = this.$q.defer();

            if (this.$routeParams.toDoId) {

                this.toDoService.getById(this.$routeParams.toDoId).then((results) => {

                    this.toDo = results;

                    deferred.resolve(true);

                }).catch((Error) => {

                    deferred.resolve(false);

                });
            } else {
                deferred.resolve(true);
            }

            return deferred.promise;
        }

        public toDo: IToDo;
    }

    angular.module("app.toDo")
        .controller("ToDoFormController", ["$q", "toDoService","$routeParams", "token", ToDoFormController]);
} 