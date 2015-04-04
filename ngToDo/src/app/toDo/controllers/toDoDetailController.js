var app;
(function (app) {
    var toDo;
    (function (_toDo) {
        "use strict";
        var ToDoDetailController = (function () {
            function ToDoDetailController(toDoService, $routeParams) {
                var _this = this;
                this.toDoService = toDoService;
                this.$routeParams = $routeParams;
                this.canActivate = function () {
                    return _this.toDoService.getById(_this.$routeParams.toDoId).then(function (toDo) {
                        _this.toDo = toDo;
                    });
                };
                toDoService.getById($routeParams.toDoId).then(function (toDo) {
                    return toDo;
                });
            }
            return ToDoDetailController;
        })();
        angular.module("app.toDo").controller("ToDoDetailController", ["toDo", ToDoDetailController]);
    })(toDo = app.toDo || (app.toDo = {}));
})(app || (app = {}));
//# sourceMappingURL=toDoDetailController.js.map