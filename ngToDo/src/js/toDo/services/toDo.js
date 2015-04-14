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
        var ToDo = (function (_super) {
            __extends(ToDo, _super);
            function ToDo($location, $q, toDoService) {
                var _this = this;
                _super.call(this, $location, $q, toDoService, '/toDo');
                this.$location = $location;
                this.$q = $q;
                this.toDoService = toDoService;
                this.instance = function (data) {
                    if (data === void 0) { data = null; }
                    var deferred = _this.$q.defer();
                    var toDo;
                    if (data === null) {
                        toDo = new ToDo(_this.$location, _this.$q, _this.toDoService);
                    }
                    else {
                        toDo = new ToDo(_this.$location, _this.$q, _this.toDoService);
                        toDo.id = data.id || 0;
                        toDo.name = data.name;
                        toDo.description = data.description;
                        toDo.status = data.status || 1;
                    }
                    deferred.resolve(toDo);
                    return deferred.promise;
                };
                this.getValidationErrors = function () {
                    var validationErrors = [];
                    if (!_this.name || _this.name.length < 0)
                        validationErrors.push("Name can not be empty");
                    //if (!this.description || this.description.length < 0)
                    //    validationErrors.push("Description can not be empty");
                    return validationErrors;
                };
                this.complete = function () {
                    if (_this.isValid()) {
                        return _this.setStatus(5);
                    }
                };
                this.toDo = function () {
                    return _this.setStatus(2);
                };
                this.toDoNever = function () {
                    return _this.setStatus(3);
                };
                this.start = function () {
                    return _this.setStatus(4);
                };
                this.setStatus = function (status) {
                    var deferred = _this.$q.defer();
                    _this.status = status;
                    _this.save().then(function (results) {
                        deferred.resolve();
                    });
                    return deferred.promise;
                };
                this.getRecent = function () {
                    var deferred = _this.$q.defer();
                    _this.toDoService.getRecent().then(function (results) {
                        var entities = [];
                        var promises = [];
                        for (var i = 0; i < results.data.length; i++) {
                            promises.push(_this.instance(results.data[i]));
                        }
                        _this.$q.all(promises).then(function (allResults) {
                            for (var x = 0; x < allResults.length; x++) {
                                entities.push(allResults[x]);
                            }
                            deferred.resolve(entities);
                        });
                    });
                    return deferred.promise;
                };
                this.status = 1;
            }
            return ToDo;
        })(app.common.Entity);
        angular.module("app.toDo").service("toDo", ["$location", "$q", "toDoService", ToDo]);
    })(toDo = app.toDo || (app.toDo = {}));
})(app || (app = {}));

//# sourceMappingURL=../../toDo/services/toDo.js.map