module app.toDo {

    "use strict";

    class ToDoFormController extends security.AuthenticatedController {

        constructor(
            public $location:ng.ILocationService,
            private $q: ng.IQService,            
            private $routeParams: ng.route.IRouteParamsService,
            public $timeout: ng.ITimeoutService,
            private appBarService: ui.IAppBarService,
            private toDo: IToDo,
            public token: common.ISessionStorageProperty) {
            super($location, $timeout, token);


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
                    onClick: () => {
                        this.toDo.save().then((results) => {
                            this.$location.path("/toDo/list");
                        });
                    },
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

        public deactivate = () => {            
            this.toDo = null;
            this.token = null;
            this.appBarService = null;
            this.promise = null;
        }
    }

    angular.module("app.toDo")
        .controller("toDoFormController", ["$location", "$q", "$routeParams","$timeout","appBarService","toDo","token", ToDoFormController]);
} 