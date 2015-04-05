var app;
(function (app) {
    var security;
    (function (security) {
        angular.module("app.security", [
            "app.common",
            "app.ui"
        ]).config(["templateMappingsProvider", config]);
        function config(templateMappingsProvider) {
            templateMappingsProvider.push({ moduleName: "security", componentName: "login" });
        }
    })(security = app.security || (app.security = {}));
})(app || (app = {}));

//# sourceMappingURL=../security/security.module.js.map