module app.security {
    
    class LoginFormController implements ILoginController {

        constructor(private $location:ng.ILocationService, private securityService: ISecurityService, private token: ISessionStorageProperty) {
            
        }

        public username: string;

        public password: string;

        public rememberMe: boolean;

        public tryToLogin = () => {

            this.securityService.login(this.username, this.password).then((results:any) => {

                this.token.set({ data: results.access_token });

                this.$location.path("/");
            });
        }
    }

    angular.module("app.security").controller("loginFormController", ["$location","securityService",LoginFormController]);
} 