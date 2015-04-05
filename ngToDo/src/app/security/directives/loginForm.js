var app;
(function (app) {
    var security;
    (function (security) {
        var LoginForm = (function () {
            function LoginForm() {
            }
            LoginForm.instance = function () {
                return new LoginForm();
            };
            return LoginForm;
        })();
        security.LoginForm = LoginForm;
        angular.module("app.security").directive("loginForm", [LoginForm.instance]);
    })(security = app.security || (app.security = {}));
})(app || (app = {}));
//# sourceMappingURL=loginForm.js.map