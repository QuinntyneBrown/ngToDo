var app;
(function (app) {
    var security;
    (function (security) {
        var LoginFormController = (function () {
            function LoginFormController($location, securityService, token) {
                var _this = this;
                this.$location = $location;
                this.securityService = securityService;
                this.token = token;
                this.tryToLogin = function () {
                    _this.securityService.login(_this.username, _this.password).then(function (results) {
                        _this.token.set({ data: results.access_token });
                        _this.$location.path("/");
                    });
                };
            }
            return LoginFormController;
        })();
        angular.module("app.security").controller("loginFormController", ["$location", "securityService", LoginFormController]);
    })(security = app.security || (app.security = {}));
})(app || (app = {}));

//# sourceMappingURL=../../security/directives/loginFormController.js.map