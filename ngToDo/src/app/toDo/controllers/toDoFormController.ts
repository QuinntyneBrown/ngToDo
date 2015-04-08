
module app.toDo {

    "use strict";

    class ToDoFormController extends security.AuthenticatedController {

        constructor(
            public $location:ng.ILocationService,
            private $q: ng.IQService,            
            private $routeParams,
            private toDoService: IToDoService,
            public token: common.ISessionStorageProperty) {
            super($location,token);

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
        .controller("ToDoFormController", ["$location","$q","$routeParams", "toDoService","token", ToDoFormController]);
} 