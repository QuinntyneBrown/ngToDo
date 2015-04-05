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
        var ToDoRecentController = (function (_super) {
            __extends(ToDoRecentController, _super);
            function ToDoRecentController($q, toDoService, token) {
                var _this = this;
                _super.call(this, token);
                this.$q = $q;
                this.toDoService = toDoService;
                this.token = token;
                this.activate = function () {
                    var deferred = _this.$q.defer();
                    _this.toDoService.getRecent().then(function (results) {
                        _this.toDos = results;
                        deferred.resolve(true);
                    }).catch(function (Error) {
                        deferred.resolve(false);
                    });
                    return deferred.promise;
                };
            }
            return ToDoRecentController;
        })(app.AuthenticatedController);
        angular.module("app.toDo").controller("ToDoRecentController", ["$q", "toDoService", "token", ToDoRecentController]);
    })(toDo = app.toDo || (app.toDo = {}));
})(app || (app = {}));

//# sourceMappingURL=../../toDo/controllers/toDoRecentController.js.map