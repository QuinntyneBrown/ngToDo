var app;
(function (app) {
    var common;
    (function (common) {
        var DataService = (function () {
            function DataService($http, $q, _baseUri, entityName, storage) {
                var _this = this;
                this.$http = $http;
                this.$q = $q;
                this._baseUri = _baseUri;
                this.entityName = entityName;
                this.storage = storage;
                this.getById = function (id) {
                    return _this.fromCacheOrService({ method: "GET", uri: _this.baseUri + "/getbyid", params: { id: id } });
                };
                this.getAll = function () {
                    return _this.fromCacheOrService({ method: "GET", uri: _this.baseUri + "/getAll" });
                };
                this.fromCacheOrService = function (action) {
                    var deferred = _this.$q.defer();
                    var cachedData = _this.storage.getByName({ name: action.uri + JSON.stringify(action.params) });
                    if (!cachedData || !cachedData.value) {
                        _this.$http({ method: action.method, url: action.uri, data: action.data, params: action.params }).then(function (results) {
                            _this.storage.put({ category: _this.entityName, name: action.uri + JSON.stringify(action.params), value: results });
                            deferred.resolve(results);
                        }).catch(function (error) {
                            deferred.reject(error);
                        });
                    }
                    else {
                        deferred.resolve(cachedData.value);
                    }
                    return deferred.promise;
                };
                this.add = function (entity) {
                    var deferred = _this.$q.defer();
                    _this.$http({ method: "POST", url: _this.baseUri + "/add", data: entity }).then(function (results) {
                        _this.invalidateCache();
                        deferred.resolve(results);
                    }).catch(function (error) {
                        deferred.reject(error);
                    });
                    return deferred.promise;
                };
                this.update = function (entity) {
                    var deferred = _this.$q.defer();
                    _this.$http({ method: "PUT", url: _this.baseUri + "/update", data: JSON.stringify(entity) }).then(function (results) {
                        _this.invalidateCache();
                        deferred.resolve(results);
                    }).catch(function (error) {
                        deferred.reject(error);
                    });
                    return deferred.promise;
                };
                this.remove = function (id) {
                    var deferred = _this.$q.defer();
                    _this.$http({ method: "DELETE", url: _this.baseUri + "/remove?id=" + id }).then(function (results) {
                        _this.invalidateCache();
                        deferred.resolve(results);
                    }).catch(function (error) {
                        deferred.reject(error);
                    });
                    return deferred.promise;
                };
                this.invalidateCache = function () {
                    _this.storage.get().forEach(function (item) {
                        if (item.category === _this.entityName) {
                            _this.storage.put({ name: item.name, value: null });
                        }
                    });
                };
            }
            Object.defineProperty(DataService.prototype, "baseUri", {
                get: function () {
                    return this._baseUri + "/" + this.entityName;
                },
                enumerable: true,
                configurable: true
            });
            return DataService;
        })();
        common.DataService = DataService;
    })(common = app.common || (app.common = {}));
})(app || (app = {}));

//# sourceMappingURL=dataService.js.map