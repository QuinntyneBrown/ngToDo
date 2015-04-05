module app.security {
 
    export class LoginForm {

        constructor() {
            
        }

        public static instance = () => {
            return new LoginForm();
        }

        
    }

    angular.module("app.security").directive("loginForm", [LoginForm.instance]);
}