var app;
(function (app) {
    angular.module("app", [
        "ngNewRouter",
        "app.common",
        "app.security",
        "app.toDo",
        "app.ui"
    ]).config([
        "$componentLoaderProvider",
        "$httpProvider",
        "$locationProvider",
        "apiEndpointProvider",
        "featureComponentsMappingsProvider",
        config
    ]).run(["$location", "$rootScope", "token", run]).controller("appController", ["$location", "$rootScope", "$router", "routes", "token", app.AppController]);
    function run($location, $rootScope, token) {
        $rootScope.$on("$locationChangeStart", function (event, newState, oldState) {
            if (!token.get() && newState.indexOf('/login') < 0) {
                $location.path("/login");
            }
        });
    }
    function config($componentLoaderProvider, $httpProvider, $locationProvider, apiEndpointProvider, featureComponentsMappingsProvider) {
        var mappings = featureComponentsMappingsProvider.mappings;
        $componentLoaderProvider.setTemplateMapping(function (name) {
            for (var i = 0; i < mappings.length; i++) {
                for (var c = 0; c < mappings[i].components.length; c++) {
                    if (name === mappings[i].components[c]) {
                        return 'src/app/' + mappings[i].feature + '/views/' + name + '.html';
                    }
                }
            }
        });
        $httpProvider.interceptors.push("authorizationInterceptor");
        $httpProvider.interceptors.push("requestCounter");
        apiEndpointProvider.configure("/api/");
    }
})(app || (app = {}));

//# sourceMappingURL=app.module.js.map