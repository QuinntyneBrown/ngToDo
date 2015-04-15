var app;
(function (app) {
    var security;
    (function (security) {
        "use strict";
        var LoginForm = (function () {
            function LoginForm(securityService) {
                this.securityService = securityService;
                this.templateUrl = "/src/app/security/directives/loginForm.html";
                this.controllerAs = "loginForm";
                this.controller = "loginFormController";
                this.restrict = "E";
                this.replace = true;
            }
            LoginForm.instance = function (securityService) {
                return new LoginForm(securityService);
            };
            return LoginForm;
        })();
        angular.module("app.security").directive("loginForm", ["securityService", LoginForm.instance]);
    })(security = app.security || (app.security = {}));
})(app || (app = {}));

//# sourceMappingURL=../../security/directives/loginForm.js.map