﻿module app.security {

    angular.module("app.security", [
        "app.common",
        "app.ui"
    ]).config(["apiEndpointProvider","featureComponentsMappingsProvider", "routesProvider",config]);

    function config(
        apiEndpointProvider: common.IApiEndpointProvider,
        featureComponentsMappingsProvider: common.IFeatureComponentsMappingsProvider,
        routesProvider: common.IRoutesProvider) {

        apiEndpointProvider.configure("/login", "login");

        featureComponentsMappingsProvider.mapFeatureComponents({
            feature: "security",
            components: ["login"]
        });

        routesProvider.mapRoutes([
            { path: '/login', component: 'login' }
        ]);
    }
}