var app;
(function (app) {
    var security;
    (function (security) {
        "use strict";
        var LoginRedirectProvider = (function () {
            function LoginRedirectProvider() {
                var _this = this;
                this.loginUrl = "/login";
                this.defaultPath = "/";
                this.setLoginUrl = function (value) {
                    _this.loginUrl = value;
                };
                this.setDefaultUrl = function (value) {
                    _this.defaultPath = value;
                };
                this.$get = ["$q", "$location", function ($q, $location) {
                    return {
                        responseError: function (response) {
                            if (response.status == 401) {
                                _this.lastPath = $location.path();
                                $location.path(_this.loginUrl);
                            }
                            return $q.reject(response);
                        },
                        redirectPreLogin: function () {
                            if (_this.lastPath) {
                                $location.path(_this.lastPath);
                                _this.lastPath = "";
                            }
                            else {
                                $location.path(_this.defaultPath);
                            }
                        }
                    };
                }];
            }
            return LoginRedirectProvider;
        })();
        angular.module("app.security").provider("loginRedirect", [LoginRedirectProvider]).config(["$httpProvider", config]);
        function config($httpProvider) {
            $httpProvider.interceptors.push("loginRedirect");
        }
    })(security = app.security || (app.security = {}));
})(app || (app = {}));

//# sourceMappingURL=../../security/services/loginRedirectProvider.js.map