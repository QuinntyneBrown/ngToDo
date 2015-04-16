module app.security {
    
    "use strict";

    class LoginFormController implements ILoginController {

        constructor(
            private $location: ng.ILocationService,
            private loginRedirect: any,
            private securityService: ISecurityService,
            private token: common.ISessionStorageProperty) {
            
        }

        public username: string = "quinntynebrown@gmail.com";

        public password: string = "P@ssw0rd";
        
        public rememberMe: boolean;

        public tryToLogin = () => {
            this.securityService.login(this.username, this.password).then((results:any) => {
                this.loginRedirect.redirectPreLogin();               
            });
        }
    }

    angular.module("app.security").controller("loginFormController", ["$location","loginRedirect","securityService",LoginFormController]);
} 