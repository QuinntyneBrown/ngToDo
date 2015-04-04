var app;
(function (app) {
    var DataService = (function () {
        function DataService($http, $cacheFactory, $q, baseUri) {
            var _this = this;
            this.$http = $http;
            this.$cacheFactory = $cacheFactory;
            this.$q = $q;
            this.baseUri = baseUri;
            this.add = function (options) {
                var deferred = _this.$q.defer();
                _this.$http({ method: "POST", url: _this.baseUri + "add", data: options.entity }).then(function (results) {
                    deferred.resolve(results);
                }).catch(function (error) {
                    deferred.reject(error);
                });
                return deferred.promise;
            };
            this.update = function (options) {
                var deferred = _this.$q.defer();
                _this.$http({ method: "POST", url: _this.baseUri + "add", data: options.entity }).then(function (results) {
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
    app.DataService = DataService;
})(app || (app = {}));
//# sourceMappingURL=app.base.js.map