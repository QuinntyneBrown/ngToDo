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
        var ToDosController = (function (_super) {
            __extends(ToDosController, _super);
            function ToDosController($document, $location, $q, $timeout, bind, toDo, token) {
                var _this = this;
                _super.call(this, $location, $timeout, token);
                this.$document = $document;
                this.$location = $location;
                this.$q = $q;
                this.$timeout = $timeout;
                this.bind = bind;
                this.toDo = toDo;
                this.token = token;
                this.activate = function () {
                    angular.element(_this.$document).bind("toDoRemoved", _this.onToDoRemoved);
                    var deferred = _this.$q.defer();
                    _this.toDo.getAll().then(function (results) {
                        _this.toDos = results;
                        deferred.resolve(true);
                    }).catch(function (Error) {
                        deferred.resolve(false);
                    });
                    return deferred.promise;
                };
                this.deactivate = function () {
                    angular.element(_this.$document).unbind("toDoRemoved");
                    _this.toDos = null;
                    _this.token = null;
                    _this.toDo = null;
                    _this.promise = null;
                };
                this.onToDoRemoved = function (event) {
                    if (event.action === "remove") {
                        for (var i = 0; i < _this.toDos.length; i++) {
                            if (_this.toDos[i].id === event.entity.id) {
                                _this.toDos.splice(i, 1);
                            }
                        }
                    }
                };
            }
            return ToDosController;
        })(app.security.AuthenticatedController);
        angular.module("app.toDo").controller("toDosController", ["$document", "$location", "$q", "$timeout", "bind", "toDo", "token", ToDosController]);
    })(toDo = app.toDo || (app.toDo = {}));
})(app || (app = {}));

//# sourceMappingURL=../../toDo/controllers/toDosController.js.map