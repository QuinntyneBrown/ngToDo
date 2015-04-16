var app;
(function (app) {
    var toDo;
    (function (toDo) {
        "use strict";
        var ToDoItems = (function () {
            function ToDoItems() {
                this.replace = true;
                this.restrict = "E";
                this.templateUrl = "/src/app/toDo/directives/toDoItems.html";
                this.scope = {
                    toDoItems: "="
                };
            }
            ToDoItems.instance = function () {
                return new ToDoItems();
            };
            return ToDoItems;
        })();
        angular.module("app.toDo").directive("toDoItems", [ToDoItems.instance]);
    })(toDo = app.toDo || (app.toDo = {}));
})(app || (app = {}));

//# sourceMappingURL=../../toDo/directives/toDoItems.js.map