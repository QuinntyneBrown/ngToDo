module app.security {

    angular.module("app.security", [
        "app.common",
        "app.ui"
    ]).config(["featureComponentsMappingsProvider", "routesProvider",config]);

    function config(
        featureComponentsMappingsProvider: common.IFeatureComponentsMappingsProvider,
        routesProvider: common.IRoutesProvider) {

        featureComponentsMappingsProvider.mappings.push(
            {
                feature: "security",
                components: ["login"]
            });

        routesProvider.configure([
            { path: '/login', component: 'login' }
        ]);
    }
}