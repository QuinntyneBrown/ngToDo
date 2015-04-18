module app.toDo {

    "use strict";

    class ToDosController extends security.AuthenticatedController {

        constructor(
            public $document: ng.IDocumentService,
            public $location: ng.ILocationService,
            private $q: ng.IQService,
            public $timeout: ng.ITimeoutService,
            private bind: common.IBind,
            private toDo: IToDo,
            public token: common.ISessionStorageProperty
            ) {
            super($location, $timeout, token);

        }

        public activate = () => {

            angular.element(this.$document).bind("toDoRemoved",this.onToDoRemoved);

            var deferred = this.$q.defer();

            this.toDo.getAll().then((results) => {
                this.toDos = results;

                deferred.resolve(true);
            }).catch((Error) => {
                deferred.resolve(false);
            });

            return deferred.promise;
        }

        public deactivate = () => {

            angular.element(this.$document).unbind("toDoRemoved");

            this.toDos = null;
            this.token = null;
            this.toDo = null;
            this.promise = null;
        }

        private onToDoRemoved = (event: any) => {
            if (event.action === "remove") {
                for (var i = 0; i < this.toDos.length; i++) {
                    if (this.toDos[i].id === event.entity.id) {
                        this.toDos.splice(i, 1);
                    }
                }
            }
        }

        private toDos: IToDo[];
        

    }

    angular.module("app.toDo")
        .controller("toDosController", ["$document", "$location", "$q", "$timeout", "bind", "toDo", "token", ToDosController]);
} 