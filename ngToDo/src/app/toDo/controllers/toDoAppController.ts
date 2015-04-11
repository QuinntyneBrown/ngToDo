module app.toDo {

    "use strict";

    class ToDoAppController {

        constructor(
            private $interval:ng.IIntervalService,
            private $location: ng.ILocationService,
            private $rootScope: ng.IRootScopeService,
            public $router: any,
            public currentUser:common.ISessionStorageProperty,
            private routes: common.IRouteConfig[],
            private securityService: security.ISecurityService,
            public token: common.ISessionStorageProperty) {

            $router.config(routes);

            $interval(() => {
                if (securityService.tokenExpired()) {

                    //if(this.currentRouteRequiresAuthentication()) {
                    //  this.loginRedirect.lastPath = this.$location.path();
                    //  this.$location.path('/login');
                    //}


                    $location.path("/login");
                }
            }, 6000);
        }

        public isLoggedIn = () => {
            return this.token.get();
        }

        public getUsername = () => {
            var currentUser = this.currentUser.get();

            if(currentUser)
                return currentUser.firstname + ' ' + currentUser.lastname;

            return null;
        }

    }

    angular.module("app.toDo").controller("toDoAppController", ["$interval","$location", "$rootScope", "$router", "currentUser","routes", "securityService", "token", ToDoAppController]);
} 