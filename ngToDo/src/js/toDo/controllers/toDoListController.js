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
        var ToDoListController = (function (_super) {
            __extends(ToDoListController, _super);
            function ToDoListController($location, $q, toDoService, token) {
                var _this = this;
                _super.call(this, $location, token);
                this.$location = $location;
                this.$q = $q;
                this.toDoService = toDoService;
                this.token = token;
                this.activate = function () {
                    var deferred = _this.$q.defer();
                    _this.toDoService.getAll().then(function (results) {
                        _this.toDos = results;
                        deferred.resolve(true);
                    }).catch(function (Error) {
                        deferred.resolve(false);
                    });
                    return deferred.promise;
                };
            }
            return ToDoListController;
        })(app.security.AuthenticatedController);
        angular.module("app.toDo").controller("toDoListController", ["$location", "$q", "toDoService", "token", ToDoListController]);
    })(toDo = app.toDo || (app.toDo = {}));
})(app || (app = {}));

//# sourceMappingURL=../../toDo/controllers/toDoListController.js.map