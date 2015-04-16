var app;
(function (app) {
    var security;
    (function (security) {
        "use strict";
        var AuthorizationInterceptor = (function () {
            function AuthorizationInterceptor(token) {
                var _this = this;
                this.token = token;
                this.request = function (config) {
                    if (_this.token.get()) {
                        config.headers.Authorization = "Bearer " + _this.token.get();
                    }
                    return config;
                };
            }
            AuthorizationInterceptor.instance = function (token) {
                return new AuthorizationInterceptor(token);
            };
            return AuthorizationInterceptor;
        })();
        angular.module("app.security").factory("authorizationInterceptor", ["token", AuthorizationInterceptor.instance]).config([
            "$httpProvider",
            function ($httpProvider) {
                $httpProvider.interceptors.push("authorizationInterceptor");
            }
        ]);
    })(security = app.security || (app.security = {}));
})(app || (app = {}));

//# sourceMappingURL=../../security/services/authorizationInterceptor.js.map