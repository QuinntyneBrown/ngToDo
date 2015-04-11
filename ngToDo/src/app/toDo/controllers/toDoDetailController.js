var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var app;
(function (app) {
    var toDo;
    (function (_toDo) {
        "use strict";
        var ToDoDetailController = (function (_super) {
            __extends(ToDoDetailController, _super);
            function ToDoDetailController($location, $q, $routeParams, toDo, token) {
                var _this = this;
                _super.call(this, $location, token);
                this.$location = $location;
                this.$q = $q;
                this.$routeParams = $routeParams;
                this.toDo = toDo;
                this.token = token;
                this.activate = function () {
                    var deferred = _this.$q.defer();
                    if (_this.$routeParams["toDoId"]) {
                        _this.toDo.getById(_this.$routeParams["toDoId"]).then(function (results) {
                            _this.toDo = results;
                            deferred.resolve(true);
                        }).catch(function (Error) {
                            deferred.resolve(false);
                        });
                    }
                    else {
                        _this.toDo.instance(null).then(function (results) {
                            _this.toDo = results;
                            deferred.resolve(true);
                        });
                    }
                    return deferred.promise;
                };
            }
            return ToDoDetailController;
        })(app.security.AuthenticatedController);
        angular.module("app.toDo").controller("toDoDetailController", ["$location", "$q", "$routeParams", "toDo", "token", ToDoDetailController]);
    })(toDo = app.toDo || (app.toDo = {}));
})(app || (app = {}));
//# sourceMappingURL=toDoDetailController.js.map