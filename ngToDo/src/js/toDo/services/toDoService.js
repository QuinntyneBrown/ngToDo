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
        var ToDoService = (function (_super) {
            __extends(ToDoService, _super);
            function ToDoService($http, $q, apiEndpoint, storage) {
                var _this = this;
                _super.call(this, $http, $q, apiEndpoint.getBaseUrl(), "toDo", storage);
                this.$http = $http;
                this.$q = $q;
                this.apiEndpoint = apiEndpoint;
                this.storage = storage;
                this.getRecent = function () {
                    return _this.fromCacheOrService({ method: "GET", uri: _this.baseUri + "/getRecent" });
                };
            }
            return ToDoService;
        })(app.common.DataService);
        angular.module("app.toDo").service("toDoService", ["$http", "$q", "apiEndpoint", "storage", ToDoService]);
    })(toDo = app.toDo || (app.toDo = {}));
})(app || (app = {}));

//# sourceMappingURL=../../toDo/services/toDoService.js.map