
module app.toDo {

    "use strict";

    class ToDoFormController extends security.AuthenticatedController {

        constructor(
            public $location:ng.ILocationService,
            private $q: ng.IQService,            
            private $routeParams: ng.route.IRouteParamsService,
            private appBarService: ui.IAppBarService,
            private toDo: IToDo,
            public token: common.ISessionStorageProperty) {
            super($location,token);

        }

        public setAppBarButtons = () => {
            this.appBarService.setButtons([
                {
                    type: "Done",
                    text: "Done",
                    onClick: this.toDo.complete,
                    isValid: this.toDo.isValid
                },
                {
                    type: "Save",
                    text: "Save",
                    onClick: this.toDo.save,
                    isValid: this.toDo.isValid

                }
            ]);
        }
        public activate = () => {

            var deferred = this.$q.defer();

            if (this.$routeParams["toDoId"]) {

                this.toDo.getById(this.$routeParams["toDoId"]).then((results) => {

                    this.toDo = results;

                    this.setAppBarButtons();

                    deferred.resolve(true);

                }).catch((Error) => {

                    

                    deferred.resolve(false);

                });
            } else {
                this.toDo.instance(null).then((results) => {
                    this.toDo = results;
                    this.setAppBarButtons();
                    deferred.resolve(true);
                });

            }

            return deferred.promise;
        }

    }

    angular.module("app.toDo")
        .controller("toDoFormController", ["$location","$q","$routeParams", "appBarService","toDo","token", ToDoFormController]);
} 