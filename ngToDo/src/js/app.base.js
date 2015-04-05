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
    var SessionStorageProperty = (function () {
        function SessionStorageProperty($rootScope, storage, name) {
            var _this = this;
            this.$rootScope = $rootScope;
            this.storage = storage;
            this.name = name;
            this.onRouteChangeStart = function (event, newUrl) {
                if (newUrl.originalPath == "/login") {
                    _this.data = null;
                    _this.set({ data: null });
                }
            };
            this.get = function () {
                if (_this.data) {
                    return _this.data;
                }
                try {
                    _this.data = _this.storage.getByName({ name: _this.key }).value;
                }
                catch (error) {
                }
                return _this.data;
            };
            this.set = function (params) {
            };
            $rootScope.$on("$routeChangeStart", this.onRouteChangeStart);
        }
        return SessionStorageProperty;
    })();
    app.SessionStorageProperty = SessionStorageProperty;
    var Storage = (function () {
        function Storage(storageId) {
            var _this = this;
            this.storageId = storageId;
            this.get = function () {
                return JSON.parse(localStorage.getItem(_this.storageId) || '[]');
            };
            this.getByName = function (params) {
                var items = JSON.parse(localStorage.getItem(_this.storageId) || '[]');
                for (var i = 0; i < items.length; i++) {
                    if (params.name === items[i].name) {
                        return items[i];
                    }
                    ;
                }
                ;
                return null;
            };
            this.put = function (params) {
                var items = JSON.parse(localStorage.getItem(_this.storageId) || '[]');
                for (var i = 0; i < items.length; i++) {
                    if (params.name === items[i].name) {
                        items[i].value = params.value;
                        localStorage.setItem(_this.storageId, JSON.stringify(items));
                        return;
                    }
                    ;
                }
                ;
                items.push(params);
                localStorage.setItem(_this.storageId, JSON.stringify(items));
            };
        }
        return Storage;
    })();
    app.Storage = Storage;
})(app || (app = {}));

//# sourceMappingURL=app.base.js.map