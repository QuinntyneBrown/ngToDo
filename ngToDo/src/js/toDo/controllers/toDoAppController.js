var app;
(function (app) {
    var toDo;
    (function (toDo) {
        "use strict";
        var ToDoAppController = (function () {
            function ToDoAppController($interval, $location, $rootScope, $router, currentUser, routes, securityService, token) {
                var _this = this;
                this.$interval = $interval;
                this.$location = $location;
                this.$rootScope = $rootScope;
                this.$router = $router;
                this.currentUser = currentUser;
                this.routes = routes;
                this.securityService = securityService;
                this.token = token;
                this.isLoggedIn = function () {
                    return _this.token.get();
                };
                this.getUsername = function () {
                    var currentUser = _this.currentUser.get();
                    if (currentUser)
                        return currentUser.firstname + ' ' + currentUser.lastname;
                    return null;
                };
                $router.config(routes);
                $interval(function () {
                    if (securityService.tokenExpired()) {
                        //if(this.currentRouteRequiresAuthentication()) {
                        //  this.loginRedirect.lastPath = this.$location.path();
                        //  this.$location.path('/login');
                        //}
                        $location.path("/login");
                    }
                }, 6000);
            }
            return ToDoAppController;
        })();
        angular.module("app.toDo").controller("toDoAppController", ["$interval", "$location", "$rootScope", "$router", "currentUser", "routes", "securityService", "token", ToDoAppController]);
    })(toDo = app.toDo || (app.toDo = {}));
})(app || (app = {}));

//# sourceMappingURL=../../toDo/controllers/toDoAppController.js.map