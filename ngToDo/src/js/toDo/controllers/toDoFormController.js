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
        var ToDoFormController = (function (_super) {
            __extends(ToDoFormController, _super);
            function ToDoFormController($q, toDoService, $routeParams, token) {
                var _this = this;
                _super.call(this, token);
                this.$q = $q;
                this.toDoService = toDoService;
                this.$routeParams = $routeParams;
                this.token = token;
                this.activate = function () {
                    var deferred = _this.$q.defer();
                    if (_this.$routeParams.toDoId) {
                        _this.toDoService.getById(_this.$routeParams.toDoId).then(function (results) {
                            _this.toDo = results;
                            deferred.resolve(true);
                        }).catch(function (Error) {
                            deferred.resolve(false);
                        });
                    }
                    else {
                        deferred.resolve(true);
                    }
                    return deferred.promise;
                };
            }
            return ToDoFormController;
        })(app.AuthenticatedController);
        angular.module("app.toDo").controller("ToDoFormController", ["$q", "toDoService", "$routeParams", "token", ToDoFormController]);
    })(toDo = app.toDo || (app.toDo = {}));
})(app || (app = {}));

//# sourceMappingURL=../../toDo/controllers/toDoFormController.js.map