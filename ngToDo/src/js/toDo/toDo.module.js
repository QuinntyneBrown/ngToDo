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
                components: ["toDoRecent", "toDoForm", "toDoList", "toDoDetail", "toDoAbout", "toDoMasterDetail"]
            });
            routesProvider.configure([
                { path: '/', redirectTo: '/login' },
                { path: '/toDo/about', component: 'toDoAbout' },
                { path: '/toDo/recent', component: 'toDoRecent' },
                { path: '/toDo/list', component: 'toDoList' },
                { path: '/toDo/detail/:toDoId', component: 'toDoDetail' },
                { path: '/toDo/create', component: 'toDoForm' },
                { path: '/toDo/edit/:toDoId', component: 'toDoForm' }
            ]);
            var mappings = featureComponentsMappingsProvider.mappings;
            $componentLoaderProvider.setTemplateMapping(function (name) {
                for (var i = 0; i < mappings.length; i++) {
                    for (var c = 0; c < mappings[i].components.length; c++) {
                        if (name === mappings[i].components[c]) {
                            return 'src/app/' + mappings[i].feature + '/views/' + name + '.html';
                        }
                    }
                }
                throw new Error("Unmapped Component " + name);
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