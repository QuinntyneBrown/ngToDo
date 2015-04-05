var app;
(function (app) {
    var security;
    (function (security) {
        var LoginController = (function () {
            function LoginController() {
            }
            return LoginController;
        })();
        angular.module("app.security").controller("LoginController", [LoginController]);
    })(security = app.security || (app.security = {}));
})(app || (app = {}));
//# sourceMappingURL=loginController.js.map