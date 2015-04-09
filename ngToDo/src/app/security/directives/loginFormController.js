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
                this.username = "quinntynebrown@gmail.com";
                this.password = "P@ssw0rd";
                this.tryToLogin = function () {
                    _this.securityService.login(_this.username, _this.password).then(function (results) {
                        _this.$location.path("/toDo/recent");
                    });
                };
            }
            return LoginFormController;
        })();
        angular.module("app.security").controller("loginFormController", ["$location", "securityService", LoginFormController]);
    })(security = app.security || (app.security = {}));
})(app || (app = {}));
//# sourceMappingURL=loginFormController.js.map