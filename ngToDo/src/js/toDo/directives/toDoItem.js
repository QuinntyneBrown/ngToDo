var app;
(function (app) {
    var toDo;
    (function (toDo) {
        var ToDoItem = (function () {
            function ToDoItem() {
                this.controller = "toDoItemController";
                this.controllerAs = "toDo";
                this.restrict = "E";
                this.replace = true;
                this.templateUrl = "/src/app/toDo/directives/toDoItem.html";
                this.scope = {
                    toDoItem: "="
                };
            }
            ToDoItem.instance = function () {
                return new ToDoItem();
            };
            return ToDoItem;
        })();
        angular.module("app.toDo").directive("toDoItem", [ToDoItem.instance]);
    })(toDo = app.toDo || (app.toDo = {}));
})(app || (app = {}));

//# sourceMappingURL=../../toDo/directives/toDoItem.js.map