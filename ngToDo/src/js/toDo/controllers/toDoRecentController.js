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
        var ToDoRecentController = (function (_super) {
            __extends(ToDoRecentController, _super);
            function ToDoRecentController($location, $q, toDo, token) {
                var _this = this;
                _super.call(this, $location, token);
                this.$location = $location;
                this.$q = $q;
                this.toDo = toDo;
                this.token = token;
                this.activate = function () {
                    var deferred = _this.$q.defer();
                    _this.toDo.getRecent().then(function (results) {
                        _this.toDos = results;
                        deferred.resolve(true);
                    }).catch(function (Error) {
                        deferred.resolve(false);
                    });
                    return deferred.promise;
                };
            }
            return ToDoRecentController;
        })(app.security.AuthenticatedController);
        angular.module("app.toDo").controller("toDoRecentController", ["$location", "$q", "toDo", "token", ToDoRecentController]);
    })(toDo = app.toDo || (app.toDo = {}));
})(app || (app = {}));

//# sourceMappingURL=../../toDo/controllers/toDoRecentController.js.map