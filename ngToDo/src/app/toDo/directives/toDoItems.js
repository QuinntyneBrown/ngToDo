var app;
(function (app) {
    var toDo;
    (function (toDo) {
        var ToDoItems = (function () {
            function ToDoItems() {
                this.controller = "toDoItemsController";
                this.controllerAs = "toDoItems";
                this.replace = true;
                this.restrict = "E";
                this.templateUrl = "/src/app/toDo/directives/toDoItems.html";
                this.scope = {
                    toDoItems: "="
                };
                this.link = function (scope, element, attributes) {
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
//# sourceMappingURL=toDoItems.js.map