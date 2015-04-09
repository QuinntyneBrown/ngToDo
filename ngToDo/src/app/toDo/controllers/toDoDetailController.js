var app;
(function (app) {
    var toDo;
    (function (toDo) {
        "use strict";
        var ToDoDetailController = (function () {
            function ToDoDetailController($q, toDoService, $routeParams) {
                var _this = this;
                this.$q = $q;
                this.toDoService = toDoService;
                this.$routeParams = $routeParams;
                this.activate = function () {
                    var deferred = _this.$q.defer();
                    _this.toDoService.getById(_this.$routeParams.toDoId).then(function (results) {
                        _this.toDo = results;
                        deferred.resolve(true);
                    }).catch(function (Error) {
                        deferred.resolve(false);
                    });
                    return deferred.promise;
                };
            }
            return ToDoDetailController;
        })();
        angular.module("app.toDo").controller("toDoDetailController", ["$q", "toDoService", "$routeParams", ToDoDetailController]);
    })(toDo = app.toDo || (app.toDo = {}));
})(app || (app = {}));
//# sourceMappingURL=toDoDetailController.js.map