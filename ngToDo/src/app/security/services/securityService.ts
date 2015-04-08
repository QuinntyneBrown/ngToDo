module app.security {
    
    export class SecurityService implements ISecurityService {
        
        constructor(
            public $http: ng.IHttpService,
            public $q: ng.IQService,
            public currentUser: ISessionStorageProperty,
            public formEncode: common.IFormEncode,
            public oauthEndpoint: common.IApiEndpointConfig,
            public token: ISessionStorageProperty) {
            
        }

        public login = (username: string, password: string) => {
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

            this.$http.post(this.oauthEndpoint.baseUrl, data, configuration).then((response) => {
                this.processToken(username, response);
                deferred.resolve(true);
            }).catch((Error) => {
                deferred.reject();
            });

            return deferred.promise;
        }

        private processToken = (username: string, response: any) => {
            var currentUser = { username: username };
            this.currentUser.set({ data: currentUser });
            this.token.set({ data: response.data.access_token });
        }
    }

    angular.module("app.security").service("securityService", ["$http","$q","currentUser","formEncode","oauthEndpoint","token", SecurityService]);
} 