module app.toDo {
    
    "use strict";

    class ToDoDetailController extends security.AuthenticatedController {
        
        constructor(
            public $location: ng.ILocationService,
            private $q: ng.IQService,
            private $routeParams: ng.route.IRouteParamsService,
            private toDo: IToDo,
            public token: common.ISessionStorageProperty) {
            super($location, token);

        }

        public activate = () => {

            var deferred = this.$q.defer();

            if (this.$routeParams["toDoId"]) {

                this.toDo.getById(this.$routeParams["toDoId"]).then((results) => {

                    this.toDo = results;

                    deferred.resolve(true);

                }).catch((Error) => {



                    deferred.resolve(false);

                });
            } else {
                this.toDo.instance(null).then((results) => {
                    this.toDo = results;
                    deferred.resolve(true);
                });

            }

            return deferred.promise;
        }

    }

    angular.module("app.toDo")
        .controller("toDoDetailController", ["$location", "$q", "$routeParams", "toDo", "token", ToDoDetailController]);

} 