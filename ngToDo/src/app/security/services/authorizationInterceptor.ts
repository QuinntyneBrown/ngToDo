module app.security {

    "use strict";

    class AuthorizationInterceptor {

        constructor(private token: common.ISessionStorageProperty) {
            
        }

        public static instance = (token: common.ISessionStorageProperty) => {
            return new AuthorizationInterceptor(token);
        }

        public request = (config) => {
            if (this.token.get()) {
                config.headers.Authorization = "Bearer " + this.token.get();
            }

            return config;
        }
    }

    angular.module("app.security")
        .factory("authorizationInterceptor", ["token", AuthorizationInterceptor.instance])
        .config([
        "$httpProvider", ($httpProvider) => {
            $httpProvider.interceptors.push("authorizationInterceptor");
            }
        ]);

}