var app;
(function (app) {
    var common;
    (function (common) {
        var DataService = (function () {
            function DataService($http, $q, baseUri, entityName, storage) {
                var _this = this;
                this.$http = $http;
                this.$q = $q;
                this.baseUri = baseUri;
                this.entityName = entityName;
                this.storage = storage;
                this.add = function (entity) {
                    var deferred = _this.$q.defer();
                    _this.$http({ method: "POST", url: _this.baseUri + "/add", data: entity }).then(function (results) {
                        _this.notifySaved();
                        deferred.resolve(results);
                    }).catch(function (error) {
                        deferred.reject(error);
                    });
                    return deferred.promise;
                };
                this.update = function (entity) {
                    var deferred = _this.$q.defer();
                    _this.$http({ method: "PUT", url: _this.baseUri + "/update", data: JSON.stringify(entity) }).then(function (results) {
                        _this.notifySaved();
                        deferred.resolve(results);
                    }).catch(function (error) {
                        deferred.reject(error);
                    });
                    return deferred.promise;
                };
                this.getById = function (id) {
                    return _this.fromCacheOrService({ method: "GET", uri: _this.baseUri + "/getbyid", params: { id: id } });
                };
                this.getAll = function () {
                    return _this.fromCacheOrService({ method: "GET", uri: _this.baseUri + "/getAll" });
                };
                this.remove = function (id) {
                    var deferred = _this.$q.defer();
                    _this.$http({ method: "DELETE", url: _this.baseUri + "/remove?id=" + id }).then(function (results) {
                        _this.notifyDeleted();
                        deferred.resolve(results);
                    }).catch(function (error) {
                        deferred.reject(error);
                    });
                    return deferred.promise;
                };
                this.notifySaved = function () {
                    _this.notifyChanged("saved");
                };
                this.notifyDeleted = function () {
                    _this.notifyChanged("deleted");
                };
                this.notifyChanged = function (changeType) {
                    _this.notify(_this.entityName + "InvalidateCache", { changeType: changeType });
                };
                this.notify = function (name, detailArg) {
                    var event = document.createEvent('CustomEvent');
                    event.initCustomEvent(name, false, false, detailArg);
                    document.dispatchEvent(event);
                };
                this.baseUri = this.baseUri + "/" + entityName;
                document.addEventListener(this.entityName + "InvalidateCache", function (event) {
                    _this.storage.get().forEach(function (item) {
                        if (item.category === entityName) {
                            _this.storage.put({ name: item.name, value: null });
                        }
                    });
                });
            }
            DataService.prototype.fromCacheOrService = function (action) {
                var _this = this;
                var deferred = this.$q.defer();
                var dataCache = this.storage.getByName({ name: action.uri + JSON.stringify(action.params) });
                if (!dataCache || !dataCache.value) {
                    this.$http({ method: action.method, url: action.uri, data: action.data, params: action.params }).then(function (results) {
                        _this.storage.put({ category: _this.entityName, name: action.uri + JSON.stringify(action.params), value: results });
                        deferred.resolve(results);
                    }).catch(function (error) {
                        deferred.reject(error);
                    });
                }
                else {
                    deferred.resolve(dataCache.value);
                }
                return deferred.promise;
            };
            return DataService;
        })();
        common.DataService = DataService;
    })(common = app.common || (app.common = {}));
})(app || (app = {}));

//# sourceMappingURL=dataService.js.map