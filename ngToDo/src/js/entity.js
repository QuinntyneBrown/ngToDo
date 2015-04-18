var app;
(function (app) {
    var common;
    (function (common) {
        var Entity = (function () {
            function Entity($location, $q, fire, dataService, entityName) {
                var _this = this;
                this.$location = $location;
                this.$q = $q;
                this.fire = fire;
                this.dataService = dataService;
                this.entityName = entityName;
                this.getById = function (id) {
                    var deferred = _this.$q.defer();
                    _this.dataService.getById(id).then(function (results) {
                        var entity = null;
                        _this.instance(results.data).then(function (results) {
                            entity = results;
                            deferred.resolve(entity);
                        });
                    });
                    return deferred.promise;
                };
                this.getAll = function () {
                    var deferred = _this.$q.defer();
                    _this.dataService.getAll().then(function (results) {
                        var entities = [];
                        var promises = [];
                        results.data.forEach(function (result) {
                            promises.push(_this.instance(result));
                        });
                        _this.$q.all(promises).then(function (allResults) {
                            allResults.forEach(function (result) {
                                entities.push(result);
                            });
                            deferred.resolve(entities);
                        });
                    });
                    return deferred.promise;
                };
                this.save = function () {
                    var deferred = _this.$q.defer();
                    var promises = [];
                    var action;
                    if (_this.isValid()) {
                        if (_this.id) {
                            action = "update";
                            promises.push(_this.dataService.update(_this));
                        }
                        else {
                            action = "add";
                            promises.push(_this.dataService.add(_this));
                        }
                    }
                    else {
                        deferred.reject();
                    }
                    _this.$q.all(promises).then(function (results) {
                        _this.instance(results[0].data).then(function (results) {
                            _this.fire(document.getElementsByTagName("body")[0], _this.entityName + "Saved", { entity: _this, action: action });
                            deferred.resolve();
                        });
                    }).catch(function () {
                        deferred.reject();
                    });
                    return deferred.promise;
                };
                this.remove = function () {
                    var deferred = _this.$q.defer();
                    if (_this.id) {
                        _this.dataService.remove(_this.id).then(function () {
                            _this.fire(document.getElementsByTagName("body")[0], _this.entityName + "Removed", { entity: _this, action: "remove" });
                            deferred.resolve();
                        });
                    }
                    else {
                        deferred.reject();
                    }
                    return deferred.promise;
                };
                this.isValid = function () {
                    if (_this.getValidationErrors().length < 1) {
                        return true;
                    }
                    return false;
                };
                this.instance = function (data) {
                    throw new Error("Not Implemented");
                };
                this.getValidationErrors = function () {
                    throw new Error("Not Implemented");
                };
                this.id = 0;
                this.isDeleted = false;
            }
            return Entity;
        })();
        common.Entity = Entity;
    })(common = app.common || (app.common = {}));
})(app || (app = {}));

//# sourceMappingURL=entity.js.map