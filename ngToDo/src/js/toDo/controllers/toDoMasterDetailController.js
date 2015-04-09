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
        var ToDoMasterDetailController = (function (_super) {
            __extends(ToDoMasterDetailController, _super);
            function ToDoMasterDetailController($location, $q, toDoService, token) {
                _super.call(this, $location, token);
                this.$location = $location;
                this.$q = $q;
                this.toDoService = toDoService;
                this.token = token;
            }
            return ToDoMasterDetailController;
        })(app.security.AuthenticatedController);
        angular.module("app.toDo").controller("toDoMasterDetailController", ["$location", "$q", "toDoService", "token", ToDoMasterDetailController]);
    })(toDo = app.toDo || (app.toDo = {}));
})(app || (app = {}));

//# sourceMappingURL=../../toDo/controllers/toDoMasterDetailController.js.map