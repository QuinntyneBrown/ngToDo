var app;
(function (app) {
    var toDo;
    (function (toDo) {
        "use strict";
        var ToDoRecentController = (function () {
            function ToDoRecentController($q, toDoService) {
                var _this = this;
                this.$q = $q;
                this.toDoService = toDoService;
                this.canActivate = function () {
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
        })();
        angular.module("app.toDo").controller("ToDoRecentController", ["$q", "toDoService", ToDoRecentController]);
    })(toDo = app.toDo || (app.toDo = {}));
})(app || (app = {}));
//# sourceMappingURL=toDoRecentController.js.map