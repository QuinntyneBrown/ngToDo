var app;
(function (app) {
    var security;
    (function (security) {
        angular.module("app.security", [
            "app.common",
            "app.ui"
        ]);
    })(security = app.security || (app.security = {}));
})(app || (app = {}));
//# sourceMappingURL=security.module.js.map