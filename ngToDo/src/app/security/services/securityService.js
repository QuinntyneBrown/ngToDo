var app;
(function (app) {
    var security;
    (function (security) {
        var SecurityService = (function () {
            function SecurityService($http, $q, currentUser, formEncode, oauthEndpoint, token) {
                var _this = this;
                this.$http = $http;
                this.$q = $q;
                this.currentUser = currentUser;
                this.formEncode = formEncode;
                this.oauthEndpoint = oauthEndpoint;
                this.token = token;
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
                    _this.$http.post(_this.oauthEndpoint.baseUrl, data, configuration).then(function (response) {
                        _this.processToken(username, response);
                        deferred.resolve(true);
                    }).catch(function (Error) {
                        deferred.reject();
                    });
                    return deferred.promise;
                };
                this.processToken = function (username, response) {
                    var currentUser = { username: username };
                    _this.currentUser.set({ data: currentUser });
                    _this.token.set({ data: response.data.access_token });
                };
            }
            return SecurityService;
        })();
        security.SecurityService = SecurityService;
        angular.module("app.security").service("securityService", ["$http", "$q", "currentUser", "formEncode", "oauthEndpoint", "token", SecurityService]);
    })(security = app.security || (app.security = {}));
})(app || (app = {}));
//# sourceMappingURL=securityService.js.map