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
            "oauthEndpointProvider",
            "routesProvider",
            config
        ]);
        function config($componentLoaderProvider, $httpProvider, $locationProvider, apiEndpointProvider, featureComponentsMappingsProvider, loginRedirectProvider, oauthEndpointProvider, routesProvider) {
            loginRedirectProvider.setDefaultUrl("/toDo/list");
            featureComponentsMappingsProvider.mappings.push({
                feature: "toDo",
                components: ["toDoRecent", "toDoForm", "toDos", "toDoDetail", "toDoAbout"]
            });
            routesProvider.configure([
                { path: '/', redirectTo: '/login' },
                { path: '/toDo/about', component: 'toDoAbout' },
                { path: '/toDo/list', component: 'toDos' },
                { path: '/toDo/detail/:toDoId', component: 'toDoDetail' },
                { path: '/toDo/create', component: 'toDoForm' },
                { path: '/toDo/edit/:toDoId', component: 'toDoForm' }
            ]);
            $componentLoaderProvider.setTemplateMapping(function (name) {
                var viewLocation = null;
                featureComponentsMappingsProvider.mappings.forEach(function (mapping) {
                    mapping.components.forEach(function (component) {
                        if (name === component) {
                            viewLocation = 'src/app/' + mapping.feature + '/views/' + name + '.html';
                        }
                    });
                });
                return viewLocation;
            });
            $componentLoaderProvider.setCtrlNameMapping(function (name) {
                return name[0].toLowerCase() + name.substr(1) + 'Controller';
            });
            $httpProvider.interceptors.push("authorizationInterceptor");
            $httpProvider.interceptors.push("requestCounter");
            apiEndpointProvider.configure("/api/");
        }
    })(toDo = app.toDo || (app.toDo = {}));
})(app || (app = {}));

//# sourceMappingURL=../toDo/toDo.module.js.map