module app.security {

    "use strict";

    class LoginForm {
        constructor() {
            
        }

        public static instance = () => {
            return new LoginForm();
        }

        public templateUrl: string = "/src/app/security/directives/loginForm.html";

        public controllerAs: string = "loginForm";

        public controller: string = "loginFormController";

        public restrict: string = "E";

        public replace: boolean = true;        
    }

    angular.module("app.security").directive("loginForm", ["securityService",LoginForm.instance]);
}