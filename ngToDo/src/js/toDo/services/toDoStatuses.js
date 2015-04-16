var app;
(function (app) {
    var toDo;
    (function (toDo) {
        "use strict";
        var ToDoStatuses;
        (function (ToDoStatuses) {
            ToDoStatuses[ToDoStatuses["new"] = 0] = "new";
            ToDoStatuses[ToDoStatuses["toDo"] = 1] = "toDo";
            ToDoStatuses[ToDoStatuses["toDoNever"] = 2] = "toDoNever";
            ToDoStatuses[ToDoStatuses["started"] = 3] = "started";
            ToDoStatuses[ToDoStatuses["completed"] = 4] = "completed";
        })(ToDoStatuses || (ToDoStatuses = {}));
        angular.module("app.toDo").value("toDoStatuses", ToDoStatuses);
    })(toDo = app.toDo || (app.toDo = {}));
})(app || (app = {}));

//# sourceMappingURL=../../toDo/services/toDoStatuses.js.map