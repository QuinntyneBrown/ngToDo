var app;
(function (app) {
    var common;
    (function (common) {
        "use strict";
        var ApiEndpointProvider = (function () {
            function ApiEndpointProvider() {
                var _this = this;
                this.config = {
                    getBaseUrl: function (name) {
                        var baseUrl = "";
                        if (name) {
                            _this.config.baseUrls.forEach(function (endpointDefinition) {
                                if (name === endpointDefinition.name) {
                                    baseUrl = endpointDefinition.url;
                                }
                            });
                        }
                        if (!name || baseUrl === "") {
                            _this.config.baseUrls.forEach(function (endpointDefinition) {
                                if (!endpointDefinition.name && baseUrl === "") {
                                    baseUrl = endpointDefinition.url;
                                }
                            });
                        }
                        return baseUrl;
                    },
                    baseUrls: []
                };
            }
            ApiEndpointProvider.prototype.configure = function (baseUrl, name) {
                this.config.baseUrls.push({ url: baseUrl, name: name });
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

//# sourceMappingURL=../../common/services/apiEndpointProvider.js.map