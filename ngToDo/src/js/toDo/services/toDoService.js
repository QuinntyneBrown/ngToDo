var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var app;
(function (app) {
    var toDo;
    (function (toDo) {
        "use strict";
        var toDoService = (function (_super) {
            __extends(toDoService, _super);
            function toDoService($http, $cacheFactory, $q, apiEndpoint) {
                var _this = this;
                _super.call(this, $http, $cacheFactory, $q, apiEndpoint.baseUrl + "todo/");
                this.$http = $http;
                this.$cacheFactory = $cacheFactory;
                this.$q = $q;
                this.apiEndpoint = apiEndpoint;
                this.getRecent = function () {
                    var deferred = _this.$q.defer();
                    _this.$http({ method: "GET", url: _this.baseUri + "getRecent" }).then(function (results) {
                        deferred.resolve(results);
                    }).catch(function (error) {
                        deferred.reject(error);
                    });
                    return deferred.promise;
                };
            }
            return toDoService;
        })(app.common.DataService);
        angular.module("app.toDo").service("toDoService", ["$http", "$cacheFactory", "$q", "apiEndpoint", toDoService]);
    })(toDo = app.toDo || (app.toDo = {}));
})(app || (app = {}));

//# sourceMappingURL=../../toDo/services/toDoService.js.map