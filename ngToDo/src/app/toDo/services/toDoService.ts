module app.toDo {

    "use strict";

    class toDoService extends common.DataService implements IToDoService
    {
        constructor(
            public $http: ng.IHttpService,
            public $cacheFactory: ng.ICacheFactoryService,
            public $q: ng.IQService,
            public apiEndpoint: common.IApiEndpointConfig) {

            super($http, $cacheFactory, $q, apiEndpoint.baseUrl + "todo/");

        }

        public getRecent = () => {
            var deferred = this.$q.defer();
            this.$http({ method: "GET", url: this.baseUri + "getRecent" }).then((results) => {
                deferred.resolve(results);
            }).catch((error) => {
                deferred.reject(error);
            });
            return deferred.promise;
        }
    }

    angular.module("app.toDo").service("toDoService", ["$http", "$cacheFactory", "$q", "apiEndpoint",toDoService]);

} 