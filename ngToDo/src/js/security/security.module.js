var app;
(function (app) {
    var security;
    (function (security) {
        angular.module("app.security", [
            "app.common",
            "app.ui"
        ]).config(["apiEndpointProvider", "featureComponentsMappingsProvider", "routesProvider", config]);
        function config(apiEndpointProvider, featureComponentsMappingsProvider, routesProvider) {
            apiEndpointProvider.configure("/login", "login");
            featureComponentsMappingsProvider.mappings.push({
                feature: "security",
                components: ["login"]
            });
            routesProvider.configure([
                { path: '/login', component: 'login' }
            ]);
        }
    })(security = app.security || (app.security = {}));
})(app || (app = {}));

//# sourceMappingURL=../security/security.module.js.map