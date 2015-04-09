module app.toDo {
    
    "use strict";

    class ToDoDetailController implements IToDoDetailController {
        
        constructor(private $q: ng.IQService, private toDoService: IToDoService, private $routeParams) {

            
        }

        public activate = () => {

            var deferred = this.$q.defer();

            this.toDoService.getById(this.$routeParams.toDoId).then((results) => {

                this.toDo = results;

                deferred.resolve(true);

            }).catch((Error) => {

                deferred.resolve(false);

            });

            return deferred.promise;
        }

        public toDo: IToDo;
    }

    angular.module("app.toDo")
        .controller("toDoDetailController", ["$q", "toDoService", "$routeParams", ToDoDetailController]);

} 