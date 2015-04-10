var app;
(function (app) {
    var toDo;
    (function (toDo) {
        var ToDoAppController = (function () {
            function ToDoAppController($location, $rootScope, $router, routes, token) {
                var _this = this;
                this.$location = $location;
                this.$router = $router;
                this.token = token;
                this.isLoggedIn = function () {
                    return _this.token.get();
                };
                $router.config(routes);
            }
            return ToDoAppController;
        })();
        toDo.ToDoAppController = ToDoAppController;
        angular.module("app.toDo").controller("toDoAppController", ["$location", "$rootScope", "$router", "routes", "token", ToDoAppController]);
    })(toDo = app.toDo || (app.toDo = {}));
})(app || (app = {}));

//# sourceMappingURL=../../toDo/controllers/toDoAppController.js.map