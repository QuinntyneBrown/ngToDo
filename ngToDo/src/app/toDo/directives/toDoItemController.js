var app;
(function (app) {
    var toDo;
    (function (_toDo) {
        var ToDoItemController = (function () {
            function ToDoItemController(toDo) {
                this.toDo = toDo;
            }
            return ToDoItemController;
        })();
        angular.module("app.toDo").controller("toDoItemController", [ToDoItemController]);
    })(toDo = app.toDo || (app.toDo = {}));
})(app || (app = {}));
//# sourceMappingURL=toDoItemController.js.map