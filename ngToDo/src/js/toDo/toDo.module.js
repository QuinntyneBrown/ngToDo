var app;
(function (app) {
    var toDo;
    (function (toDo) {
        angular.module("app.toDo", [
            "ngNewRouter",
            "ngAnimate",
            "app.common",
            "app.security",
            "app.ui"
        ]).config([
            "$componentLoaderProvider",
            "$httpProvider",
            "$locationProvider",
            "apiEndpointProvider",
            "featureComponentsMappingsProvider",
            "loginRedirectProvider",
            "routesProvider",
            config
        ]);
        function config($componentLoaderProvider, $httpProvider, $locationProvider, apiEndpointProvider, featureComponentsMappingsProvider, loginRedirectProvider, routesProvider) {
            loginRedirectProvider.setDefaultUrl("/toDo/list");
            featureComponentsMappingsProvider.mapFeatureComponents({
                feature: "toDo",
                components: ["toDoRecent", "toDoForm", "toDos", "toDoDetail", "toDoAbout"]
            });
            routesProvider.mapRoutes([
                { path: '/', redirectTo: '/login' },
                { path: '/toDo/about', component: 'toDoAbout' },
                { path: '/toDo/list', components: { default: 'toDos' } },
                { path: '/toDo/detail/:toDoId', components: { default: 'toDoDetail' } },
                { path: '/toDo/create', component: 'toDoForm' },
                { path: '/toDo/edit/:toDoId', component: 'toDoForm' }
            ]);
            apiEndpointProvider.configure("/api/v1");
        }
    })(toDo = app.toDo || (app.toDo = {}));
})(app || (app = {}));

//# sourceMappingURL=../toDo/toDo.module.js.map