var app;
(function (app) {
    var common;
    (function (common) {
        var DataService = (function () {
            function DataService($http, $cacheFactory, $q, baseUri) {
                var _this = this;
                this.$http = $http;
                this.$cacheFactory = $cacheFactory;
                this.$q = $q;
                this.baseUri = baseUri;
                this.add = function (entity) {
                    var deferred = _this.$q.defer();
                    _this.$http({ method: "POST", url: _this.baseUri + "add", data: entity }).then(function (results) {
                        deferred.resolve(results);
                    }).catch(function (error) {
                        deferred.reject(error);
                    });
                    return deferred.promise;
                };
                this.update = function (entity) {
                    var deferred = _this.$q.defer();
                    _this.$http({ method: "PUT", url: _this.baseUri + "update", data: JSON.stringify(entity) }).then(function (results) {
                        deferred.resolve(results);
                    }).catch(function (error) {
                        deferred.reject(error);
                    });
                    return deferred.promise;
                };
                this.getById = function (id) {
                    var deferred = _this.$q.defer();
                    _this.$http({ method: "GET", url: _this.baseUri + "getbyid?id=" + id }).then(function (results) {
                        deferred.resolve(results);
                    }).catch(function (error) {
                        deferred.reject(error);
                    });
                    return deferred.promise;
                };
                this.getAll = function () {
                    var deferred = _this.$q.defer();
                    _this.$http({ method: "GET", url: _this.baseUri + "getAll" }).then(function (results) {
                        deferred.resolve(results.data);
                    }).catch(function (error) {
                        deferred.reject(error);
                    });
                    return deferred.promise;
                };
                this.remove = function (id) {
                    var deferred = _this.$q.defer();
                    _this.$http({ method: "DELETE", url: _this.baseUri + "remove?id=" + id }).then(function (results) {
                        deferred.resolve(results);
                    }).catch(function (error) {
                        deferred.reject(error);
                    });
                    return deferred.promise;
                };
                this.deleteFromCache = function (key) {
                };
            }
            DataService.prototype.fromCacheOrService = function (action, key) {
                var deferred = this.$q.defer();
                var dataCache = this.$cacheFactory.get(key);
                if (!dataCache) {
                    this.$http({ method: "GET", url: this.baseUri + "getAll" }).then(function (results) {
                        deferred.resolve(results.data);
                    }).catch(function (error) {
                        deferred.reject(error);
                    });
                }
                else {
                    deferred.resolve(dataCache);
                }
                return deferred.promise;
            };
            return DataService;
        })();
        common.DataService = DataService;
    })(common = app.common || (app.common = {}));
})(app || (app = {}));

//# sourceMappingURL=dataService.js.map