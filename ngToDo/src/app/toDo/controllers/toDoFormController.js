var app;
(function (app) {
    var toDo;
    (function (toDo) {
        "use strict";
        var ToDoFormController = (function () {
            function ToDoFormController($q, toDoService, $routeParams) {
                var _this = this;
                this.$q = $q;
                this.toDoService = toDoService;
                this.$routeParams = $routeParams;
                this.canActivate = function () {
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
        })();
        angular.module("app.toDo").controller("ToDoFormController", ["$q", "toDoService", "$routeParams", ToDoFormController]);
    })(toDo = app.toDo || (app.toDo = {}));
})(app || (app = {}));
//# sourceMappingURL=toDoFormController.js.map