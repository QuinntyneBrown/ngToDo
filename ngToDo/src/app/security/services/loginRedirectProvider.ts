module app.security {

    "use strict";

    class LoginRedirectProvider implements ng.IServiceProvider {
        constructor() {
            
        }

        public loginUrl:string = "/login";

        public lastPath:string;

        public defaultPath:string = "/";

        public setLoginUrl =  (value) => {
            this.loginUrl = value;
        };

        public setDefaultUrl = (value) => {
            this.defaultPath = value;
        };

        public $get = ["$q","$location",($q,$location) => {
            return {

                responseError:  (response) => {
                    if (response.status == 401) {
                        this.lastPath = $location.path();
                        $location.path(this.loginUrl);
                    }
                    return $q.reject(response);
                },

                redirectPreLogin: () => {

                    if (this.lastPath) {
                        $location.path(this.lastPath);
                        this.lastPath = "";

                    } else {
                        $location.path(this.defaultPath);
                    }

                }
            };            
        }]
    }

    angular.module("app.security").provider("loginRedirect", [LoginRedirectProvider])
        .config(["$httpProvider", config]);

    function config($httpProvider) {
        $httpProvider.interceptors.push("loginRedirect");
    }
} 