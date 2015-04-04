var app;
(function (app) {
    var common;
    (function (common) {
        "use strict";
        var ApiEndpointProvider = (function () {
            function ApiEndpointProvider() {
                this.config = {
                    baseUrl: "/api/"
                };
            }
            ApiEndpointProvider.prototype.configure = function (baseUrl) {
                this.config = {
                    baseUrl: baseUrl
                };
            };
            ApiEndpointProvider.prototype.$get = function () {
                return this.config;
            };
            return ApiEndpointProvider;
        })();
        common.ApiEndpointProvider = ApiEndpointProvider;
        angular.module("app.common").provider("apiEndpoint", ApiEndpointProvider);
    })(common = app.common || (app.common = {}));
})(app || (app = {}));
//# sourceMappingURL=apiEndpointProvider.js.map