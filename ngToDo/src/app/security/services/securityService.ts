module app.security {
    
    "use strict";

    export class SecurityService implements ISecurityService {
        
        constructor(
            public $http: ng.IHttpService,
            public $interval: ng.IIntervalService, 
            public $location: ng.ILocationService,
            public $q: ng.IQService,
            public currentUser: common.ISessionStorageProperty,
            public formEncode: common.IFormEncode,
            public apiEndpoint: common.IApiEndpointConfig,
            public token: common.ISessionStorageProperty,
            public tokenExpiryDate: common.ISessionStorageProperty) {

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

            this.$http.post(this.apiEndpoint.getBaseUrl("login") , data, configuration).then((response) => {
                this.processToken(username, response).then((results) => {
                    deferred.resolve(true);
                });
            }).catch((Error) => {
                deferred.reject();
            });

            return deferred.promise;
        }

        private processToken = (username: string, response: any) => {

            var deferred = this.$q.defer();

            this.token.set({ data: response.data.access_token });

            this.tokenExpiryDate.set({ data: Date.now() + response.data.expires_in * 100 });

            this.getCurrentUser().then((results) => {
                this.currentUser.set({ data: results });                
                deferred.resolve();
            });

            return deferred.promise;
        }
        
        public getCurrentUser = () => {

            var deferred = this.$q.defer();

            this.$http({ method: "GET", url: this.apiEndpoint.getBaseUrl() + "/identity/getCurrentUser" }).then((results) => {
                deferred.resolve(results.data);
            }).catch((error) => {
                deferred.reject(error);
            });

            return deferred.promise;
        }

        public tokenExpired = () => {
            return Date.now() > this.tokenExpiryDate.get();
        }
    }

    angular.module("app.security").service("securityService", ["$http", "$interval", "$location", "$q", "currentUser", "formEncode", "apiEndpoint", "token","tokenExpiryDate", SecurityService]);
} 