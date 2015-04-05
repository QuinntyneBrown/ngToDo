var app;
(function (app) {
    var security;
    (function (security) {
        angular.module("app.security", [
            "app.common",
            "app.ui"
        ]).config(["featureComponentsMappingsProvider", config]);
        function config(featureComponentsMappingsProvider) {
            featureComponentsMappingsProvider.mappings.push({
                feature: "security",
                components: ["login"]
            });
        }
    })(security = app.security || (app.security = {}));
})(app || (app = {}));

//# sourceMappingURL=../security/security.module.js.map