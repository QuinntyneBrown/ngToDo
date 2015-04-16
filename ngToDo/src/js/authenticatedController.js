var app;
(function (app) {
    var security;
    (function (security) {
        "use strict";
        var AuthenticatedController = (function () {
            function AuthenticatedController($location, $timeout, token) {
                this.$location = $location;
                this.$timeout = $timeout;
                this.token = token;
            }
            AuthenticatedController.prototype.canActivate = function () {
                var _this = this;
                if (this.token.get())
                    return true;
                this.$timeout(function () {
                    _this.$location.path("/login");
                }, 0);
                return false;
            };
            return AuthenticatedController;
        })();
        security.AuthenticatedController = AuthenticatedController;
    })(security = app.security || (app.security = {}));
})(app || (app = {}));

//# sourceMappingURL=authenticatedController.js.map