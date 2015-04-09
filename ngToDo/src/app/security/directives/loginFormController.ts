module app.security {
    
    class LoginFormController implements ILoginController {

        constructor(private $location:ng.ILocationService, private securityService: ISecurityService, private token: common.ISessionStorageProperty) {
            
        }

        public username: string = "quinntynebrown@gmail.com";

        public password: string = "P@ssw0rd";

        public rememberMe: boolean;

        public tryToLogin = () => {

            this.securityService.login(this.username, this.password).then((results:any) => {

                this.$location.path("/toDo/recent");

            });
        }
    }

    angular.module("app.security").controller("loginFormController", ["$location","securityService",LoginFormController]);
} 