var app;
(function (app) {
    var security;
    (function (security) {
        "use strict";
        var LoginFormController = (function () {
            function LoginFormController($location, loginRedirect, securityService, token) {
                var _this = this;
                this.$location = $location;
                this.loginRedirect = loginRedirect;
                this.securityService = securityService;
                this.token = token;
                this.username = "quinntynebrown@gmail.com";
                this.password = "P@ssw0rd";
                this.tryToLogin = function () {
                    _this.securityService.login(_this.username, _this.password).then(function (results) {
                        _this.loginRedirect.redirectPreLogin();
                    });
                };
            }
            return LoginFormController;
        })();
        angular.module("app.security").controller("loginFormController", ["$location", "loginRedirect", "securityService", LoginFormController]);
    })(security = app.security || (app.security = {}));
})(app || (app = {}));

//# sourceMappingURL=../../security/directives/loginFormController.js.map