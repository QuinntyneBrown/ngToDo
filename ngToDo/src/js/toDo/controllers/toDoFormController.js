var app;
(function (app) {
    var toDo;
    (function (_toDo) {
        "use strict";
        var ToDoFormController = (function () {
            function ToDoFormController(toDo) {
                this.toDo = toDo;
            }
            ToDoFormController.canActivate = {
                toDo: [
                    "toDoService",
                    "$routeParams",
                    function (toDoService, $routeParams) {
                        return toDoService.getById($routeParams.toDoId).then(function (toDo) {
                            return toDo;
                        });
                    }
                ]
            };
            return ToDoFormController;
        })();
        angular.module("app.toDo").controller("ToDoFormController", ["toDo", ToDoFormController]);
    })(toDo = app.toDo || (app.toDo = {}));
})(app || (app = {}));

//# sourceMappingURL=../../toDo/controllers/toDoFormController.js.map