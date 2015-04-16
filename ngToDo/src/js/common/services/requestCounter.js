var app;
(function (app) {
    var common;
    (function (common) {
        "use strict";
        var RequestCounter = (function () {
            function RequestCounter($q) {
                var _this = this;
                this.$q = $q;
                this.requests = 0;
                this.request = function (config) {
                    _this.requests += 1;
                    return _this.$q.when(config);
                };
                this.requestError = function (error) {
                    _this.requests -= 1;
                    return _this.$q.reject(error);
                };
                this.response = function (response) {
                    _this.requests -= 1;
                    return _this.$q.when(response);
                };
                this.responseError = function (error) {
                    _this.requests -= 1;
                    return _this.$q.reject(error);
                };
                this.getRequestCount = function () {
                    return _this.requests;
                };
            }
            RequestCounter.instance = function ($q) {
                return new RequestCounter($q);
            };
            return RequestCounter;
        })();
        angular.module("app.common").factory("requestCounter", ["$q", RequestCounter.instance]).config([
            "$httpProvider",
            function ($httpProvider) {
                $httpProvider.interceptors.push("requestCounter");
            }
        ]);
    })(common = app.common || (app.common = {}));
})(app || (app = {}));

//# sourceMappingURL=../../common/services/requestCounter.js.map