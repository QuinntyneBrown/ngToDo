module app.security {
 
    export class LoginForm {

        constructor(private securityService: ISecurityService) {
            
        }

        public static instance = (securityService: ISecurityService) => {
            return new LoginForm(securityService);
        }

        public templateUrl: string = "/src/app/security/directives/loginForm.html";

        public controllerAs: string = "loginForm";

        public controller: string = "loginFormController";

        public restrict: string = "E";

        public replace: boolean = true;
        
    }

    angular.module("app.security").directive("loginForm", ["securityService",LoginForm.instance]);
}