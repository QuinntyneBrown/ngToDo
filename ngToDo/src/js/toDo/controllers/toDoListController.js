var app;
(function (app) {
    var toDo;
    (function (toDo) {
        "use strict";
        var ToDoListController = (function () {
            function ToDoListController(toDos) {
                this.toDos = toDos;
            }
            ToDoListController.canActivate = {
                toDos: [
                    "toDoService",
                    function (toDoService) {
                        return toDoService.getAll().then(function (toDos) {
                            return toDos;
                        });
                    }
                ]
            };
            return ToDoListController;
        })();
        angular.module("app.toDo").controller("ToDoListController", ["toDos", ToDoListController]);
    })(toDo = app.toDo || (app.toDo = {}));
})(app || (app = {}));

//# sourceMappingURL=../../toDo/controllers/toDoListController.js.map