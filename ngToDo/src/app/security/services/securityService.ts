module app.security {

    "use strict";

    class SecurityService implements ISecurityService {

        constructor(
            public $http: ng.IHttpService,
            public $q: ng.IQService,
            public formEncode:any) {

        }

        public login = (username:string, password:string) => {
            var deferred = this.$q.defer();

            var configuration = {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            };

            var data = this.formEncode({
                username: username,
                password: password,
                grant_type: "password"
            });

            this.$http.post("/login", data, configuration)
                .then((results:any) => {
                return results.data.access_token;
            }).catch((error) => {

            });
            return deferred.promise;
        }

    }

    angular.module("app.security").service("securityService", ["$http","$q",SecurityService]);
} 