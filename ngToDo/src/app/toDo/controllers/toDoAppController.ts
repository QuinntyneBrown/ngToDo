module app.toDo {

    export class ToDoAppController {

        constructor(private $location: ng.ILocationService, $rootScope: ng.IRootScopeService, public $router: any, routes: common.IRouteConfig[], public token: common.ISessionStorageProperty) {

            $router.config(routes);

        }

        public isLoggedIn = () => {
            return this.token.get();
        }

    }

    angular.module("app.toDo").controller("toDoAppController", ["$location", "$rootScope", "$router", "routes", "token", ToDoAppController]);
} 