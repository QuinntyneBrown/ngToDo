var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var app;
(function (app) {
    var toDo;
    (function (toDo) {
        "use strict";
        var ToDoAboutController = (function (_super) {
            __extends(ToDoAboutController, _super);
            function ToDoAboutController($location, token) {
                _super.call(this, $location, token);
                this.$location = $location;
                this.token = token;
            }
            return ToDoAboutController;
        })(app.security.AuthorizedController);
        angular.module("app.toDo").controller("toDoAboutController", ["$location", "token", ToDoAboutController]);
    })(toDo = app.toDo || (app.toDo = {}));
})(app || (app = {}));

//# sourceMappingURL=../../toDo/controllers/toDoAboutController.js.map