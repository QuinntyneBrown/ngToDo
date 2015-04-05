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
        config
    ]).controller("appController", ["$router", app.AppController]);
    function config($componentLoaderProvider, $httpProvider, $locationProvider, apiEndpointProvider) {
        $componentLoaderProvider.setTemplateMapping(function (name) {
            return 'src/app/toDo/views/' + name + '.html';
        });
        $httpProvider.interceptors.push("authorizationInterceptor");
        $httpProvider.interceptors.push("requestCounter");
        apiEndpointProvider.configure("/api/");
    }
})(app || (app = {}));

//# sourceMappingURL=app.module.js.map