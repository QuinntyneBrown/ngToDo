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
            function ToDoMasterDetailController(token) {
                _super.call(this, token);
                this.token = token;
            }
            return ToDoMasterDetailController;
        })(app.AuthenticatedController);
        angular.module("app.toDo").controller("ToDoMasterDetailController", ["token", ToDoMasterDetailController]);
    })(toDo = app.toDo || (app.toDo = {}));
})(app || (app = {}));

//# sourceMappingURL=../../toDo/controllers/toDoMasterDetailController.js.map