var app;
(function (app) {
    var security;
    (function (security) {
        "use strict";
        var SecurityService = (function () {
            function SecurityService($http, $q, formEncode) {
                var _this = this;
                this.$http = $http;
                this.$q = $q;
                this.formEncode = formEncode;
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
                    _this.$http.post("/login", data, configuration).then(function (results) {
                        return results.data.access_token;
                    }).catch(function (error) {
                    });
                    return deferred.promise;
                };
            }
            return SecurityService;
        })();
        angular.module("app.security").service("securityService", ["$http", "$q", SecurityService]);
    })(security = app.security || (app.security = {}));
})(app || (app = {}));

//# sourceMappingURL=../../security/services/securityService.js.map