var app;
(function (app) {
    var toDo;
    (function (toDo) {
        "use strict";
        var ToDoPriorities;
        (function (ToDoPriorities) {
            ToDoPriorities[ToDoPriorities["low"] = 0] = "low";
            ToDoPriorities[ToDoPriorities["medium"] = 1] = "medium";
            ToDoPriorities[ToDoPriorities["high"] = 2] = "high";
        })(ToDoPriorities || (ToDoPriorities = {}));
        angular.module("app.toDo").value("toDoPriorities", ToDoPriorities);
    })(toDo = app.toDo || (app.toDo = {}));
})(app || (app = {}));

//# sourceMappingURL=../../toDo/services/toDoPriorities.js.map