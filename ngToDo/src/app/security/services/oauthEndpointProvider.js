var app;
(function (app) {
    var security;
    (function (security) {
        "use strict";
        var OAuthEndpointProvider = (function () {
            function OAuthEndpointProvider() {
                this.config = {
                    baseUrl: "/login"
                };
            }
            OAuthEndpointProvider.prototype.configure = function (baseUrl) {
                this.config = {
                    baseUrl: baseUrl
                };
            };
            OAuthEndpointProvider.prototype.$get = function () {
                return this.config;
            };
            return OAuthEndpointProvider;
        })();
        security.OAuthEndpointProvider = OAuthEndpointProvider;
        angular.module("app.security").provider("oauthEndpoint", OAuthEndpointProvider);
    })(security = app.security || (app.security = {}));
})(app || (app = {}));
//# sourceMappingURL=oauthEndpointProvider.js.map