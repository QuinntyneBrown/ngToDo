var app;
(function (app) {
    var common;
    (function (common) {
        var Entity = (function () {
            function Entity($location, $q, dataService, baseUri) {
                var _this = this;
                this.$location = $location;
                this.$q = $q;
                this.dataService = dataService;
                this.baseUri = baseUri;
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
                this.save = function () {
                    var deferred = _this.$q.defer();
                    var _entity = _this;
                    var promises = [];
                    if (_this.isValid()) {
                        if (_this.id) {
                            promises.push(_this.dataService.update(_this));
                        }
                        else {
                            promises.push(_this.dataService.add(_this));
                        }
                    }
                    else {
                        deferred.reject();
                    }
                    _this.$q.all(promises).then(function (results) {
                        _this.instance(results[0].data).then(function (results) {
                            _entity = results;
                            _entity.notifySaved();
                            deferred.resolve(_entity);
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
                            _this.isDeleted = true;
                            _this.notifyDeleted();
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
                this.notifySaved = function () {
                    _this.notifyChanged("saved");
                };
                this.notifyDeleted = function () {
                    _this.notifyChanged("deleted");
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
            Entity.prototype.notifyChanged = function (changeType) {
                this.notify("entityChanged", { target: this, changeType: changeType });
            };
            Entity.prototype.notify = function (customeEventName, detailArg) {
                var event = document.createEvent('CustomEvent');
                event.initCustomEvent(customeEventName, false, false, detailArg);
                document.dispatchEvent(event);
            };
            return Entity;
        })();
        common.Entity = Entity;
    })(common = app.common || (app.common = {}));
})(app || (app = {}));

//# sourceMappingURL=entity.js.map