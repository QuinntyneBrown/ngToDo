module app.toDo {

    "use strict";

    class ToDoService extends common.DataService implements IToDoService
    {
        constructor(
            public $http: ng.IHttpService,
            public $q: ng.IQService,
            public apiEndpoint: common.IApiEndpointConfig,
            public storage: common.IStorage) {
            super($http,$q, apiEndpoint.baseUrl, "toDo", storage);

        }

        public getRecent = () => {

            return this.fromCacheOrService({ method: "GET", uri: this.baseUri + "getRecent" });

        }
    }

    angular.module("app.toDo").service("toDoService", ["$http", "$q", "apiEndpoint","storage", ToDoService]);


} 