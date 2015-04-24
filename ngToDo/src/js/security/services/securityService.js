var app;
(function (app) {
    var security;
    (function (security) {
        "use strict";
        var SecurityService = (function () {
            function SecurityService($http, $interval, $location, $q, currentUser, formEncode, apiEndpoint, token, tokenExpiryDate) {
                var _this = this;
                this.$http = $http;
                this.$interval = $interval;
                this.$location = $location;
                this.$q = $q;
                this.currentUser = currentUser;
                this.formEncode = formEncode;
                this.apiEndpoint = apiEndpoint;
                this.token = token;
                this.tokenExpiryDate = tokenExpiryDate;
                this.login = function (username, password) {
                    var deferred = _this.$q.defer();
                    var configuration = {
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        }
                    };
                    var data = _this.formEncode({
                        username: username,
                        password: password,
                        grant_type: "password"
                    });
                    _this.$http.post(_this.apiEndpoint.getBaseUrl("login"), data, configuration).then(function (response) {
                        _this.processToken(username, response).then(function (results) {
                            deferred.resolve(true);
                        });
                    }).catch(function (Error) {
                        deferred.reject();
                    });
                    return deferred.promise;
                };
                this.processToken = function (username, response) {
                    var deferred = _this.$q.defer();
                    _this.token.set({ data: response.data.access_token });
                    _this.tokenExpiryDate.set({ data: Date.now() + response.data.expires_in * 100 });
                    _this.getCurrentUser().then(function (results) {
                        _this.currentUser.set({ data: results });
                        deferred.resolve();
                    });
                    return deferred.promise;
                };
                this.getCurrentUser = function () {
                    var deferred = _this.$q.defer();
                    _this.$http({ method: "GET", url: _this.apiEndpoint.getBaseUrl() + "/identity/getCurrentUser" }).then(function (results) {
                        deferred.resolve(results.data);
                    }).catch(function (error) {
                        deferred.reject(error);
                    });
                    return deferred.promise;
                };
                this.tokenExpired = function () {
                    return Date.now() > _this.tokenExpiryDate.get();
                };
            }
            return SecurityService;
        })();
        security.SecurityService = SecurityService;
        angular.module("app.security").service("securityService", ["$http", "$interval", "$location", "$q", "currentUser", "formEncode", "apiEndpoint", "token", "tokenExpiryDate", SecurityService]);
    })(security = app.security || (app.security = {}));
})(app || (app = {}));

//# sourceMappingURL=../../security/services/securityService.js.map