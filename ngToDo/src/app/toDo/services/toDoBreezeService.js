var app;
(function (app) {
    var toDo;
    (function (toDo) {
        "use strict";
        var ToDoBreezeService = (function () {
            function ToDoBreezeService($q) {
                var _this = this;
                this.$q = $q;
                this.getAll = function () {
                    var deferred = _this.$q.defer();
                    var query = new breeze.EntityQuery().from("todos");
                    query.using(_this.entityManager).execute().then(function (results) {
                        results.data = results.results;
                        deferred.resolve(results);
                    }).catch(function (error) {
                    });
                    return deferred.promise;
                };
                this.getById = function (id) {
                    var deferred = _this.$q.defer();
                    id = Math.floor(id);
                    var query = new breeze.EntityQuery().from('todos').where('id', '==', id);
                    query.using(_this.entityManager).execute().then(function (results) {
                        results.data = results.results[0];
                        deferred.resolve(results);
                    }).catch(function (error) {
                    });
                    return deferred.promise;
                };
                this.getRecent = function () {
                    var deferred = _this.$q.defer();
                    var query = new breeze.EntityQuery().from("todos");
                    query.using(_this.entityManager).execute().then(function (results) {
                        results.data = results.results;
                        deferred.resolve(results);
                    }).catch(function (error) {
                    });
                    return deferred.promise;
                };
                this.remove = function (id) {
                    var deferred = _this.$q.defer();
                    return deferred.promise;
                };
                this.add = function (entity) {
                    var deferred = _this.$q.defer();
                    return deferred.promise;
                };
                this.update = function (entity) {
                    var deferred = _this.$q.defer();
                    _this.entityManager.saveChanges();
                    return deferred.promise;
                };
                breeze.config.initializeAdapterInstance('modelLibrary', 'backingStore', true);
                breeze.NamingConvention.camelCase.setAsDefault();
                this.entityManager = new breeze.EntityManager("breeze/breezedataservice");
            }
            return ToDoBreezeService;
        })();
        toDo.ToDoBreezeService = ToDoBreezeService;
    })(toDo = app.toDo || (app.toDo = {}));
})(app || (app = {}));
//# sourceMappingURL=toDoBreezeService.js.map