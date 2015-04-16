var app;
(function (app) {
    var security;
    (function (security) {
        "use strict";
        var AuthorizedController = (function () {
            function AuthorizedController($location, token) {
                this.$location = $location;
                this.token = token;
            }
            AuthorizedController.prototype.canActivate = function () {
                if (this.token.get())
                    return true;
                this.$location.path("/login");
                return false;
            };
            return AuthorizedController;
        })();
        security.AuthorizedController = AuthorizedController;
    })(security = app.security || (app.security = {}));
})(app || (app = {}));

//# sourceMappingURL=authorizedController.js.map