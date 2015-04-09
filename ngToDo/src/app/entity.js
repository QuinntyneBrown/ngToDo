var app;
(function (app) {
    var common;
    (function (common) {
        var Entity = (function () {
            function Entity($q, dataService) {
                var _this = this;
                this.$q = $q;
                this.dataService = dataService;
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
                        for (var i = 0; i < results.data.length; i++) {
                            entities.push(_this.instance(results.data[i]));
                        }
                        deferred.resolve(entities);
                    });
                    return deferred.promise;
                };
                this.save = function () {
                    var deferred = _this.$q.defer();
                    if (_this.id) {
                        _this.dataService.update(_this).then(function () {
                            deferred.resolve();
                        });
                    }
                    else {
                        _this.dataService.add(_this).then(function () {
                            deferred.resolve();
                        });
                    }
                    return deferred.promise;
                };
                this.remove = function () {
                    var deferred = _this.$q.defer();
                    if (_this.id) {
                        _this.dataService.remove(_this.id).then(function () {
                            _this.isDeleted = true;
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