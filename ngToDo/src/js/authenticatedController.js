var app;
(function (app) {
    var security;
    (function (security) {
        var AuthenticatedController = (function () {
            function AuthenticatedController($location, token) {
                this.$location = $location;
                this.token = token;
            }
            AuthenticatedController.prototype.canActivate = function () {
                if (this.token.get())
                    return true;
                this.$location.path("/login");
                return false;
            };
            return AuthenticatedController;
        })();
        security.AuthenticatedController = AuthenticatedController;
    })(security = app.security || (app.security = {}));
})(app || (app = {}));

//# sourceMappingURL=authenticatedController.js.map