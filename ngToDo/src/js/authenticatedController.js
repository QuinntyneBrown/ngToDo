var app;
(function (app) {
    var security;
    (function (security) {
        "use strict";
        var AuthenticatedController = (function () {
            function AuthenticatedController($location, $timeout, token) {
                var _this = this;
                this.$location = $location;
                this.$timeout = $timeout;
                this.token = token;
                this.canActivate = function () {
                    if (_this.token.get())
                        return true;
                    _this.promise = _this.$timeout(function () {
                        _this.$location.path("/login");
                    }, 0);
                    return false;
                };
            }
            return AuthenticatedController;
        })();
        security.AuthenticatedController = AuthenticatedController;
    })(security = app.security || (app.security = {}));
})(app || (app = {}));

//# sourceMappingURL=authenticatedController.js.map