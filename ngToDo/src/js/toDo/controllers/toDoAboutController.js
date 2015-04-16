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
            function ToDoAboutController($location, token, $timeout) {
                _super.call(this, $location, $timeout, token);
                this.$location = $location;
                this.token = token;
                this.$timeout = $timeout;
            }
            return ToDoAboutController;
        })(app.security.AuthenticatedController);
        angular.module("app.toDo").controller("toDoAboutController", ["$location", "$timeout", "token", ToDoAboutController]);
    })(toDo = app.toDo || (app.toDo = {}));
})(app || (app = {}));

//# sourceMappingURL=../../toDo/controllers/toDoAboutController.js.map