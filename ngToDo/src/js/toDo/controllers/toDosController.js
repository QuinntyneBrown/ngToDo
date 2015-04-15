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
            function ToDosController($location, $q, toDo, token) {
                var _this = this;
                _super.call(this, $location, token);
                this.$location = $location;
                this.$q = $q;
                this.toDo = toDo;
                this.token = token;
                this.activate = function () {
                    var deferred = _this.$q.defer();
                    _this.toDo.getAll().then(function (results) {
                        _this.toDos = results;
                        deferred.resolve(true);
                    }).catch(function (Error) {
                        deferred.resolve(false);
                    });
                    return deferred.promise;
                };
            }
            return ToDosController;
        })(app.security.AuthorizedController);
        angular.module("app.toDo").controller("toDosController", ["$location", "$q", "toDo", "token", ToDosController]);
    })(toDo = app.toDo || (app.toDo = {}));
})(app || (app = {}));

//# sourceMappingURL=../../toDo/controllers/toDosController.js.map