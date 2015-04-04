var app;
(function (app) {
    angular.module("app", [
        "ngNewRouter",
        "app.common",
        "app.toDo",
        "app.ui"
    ]).config([
        "$componentLoaderProvider",
        "$httpProvider",
        "apiEndpointProvider",
        config
    ]).controller("appController", ["$router", app.AppController]);
    function config($componentLoaderProvider, $httpProvider, apiEndpointProvider) {
        $componentLoaderProvider.setTemplateMapping(function (name) {
            // name is component namegu
            return 'src/app/toDo/views/' + name + '.html';
        });
        $httpProvider.interceptors.push("requestCounter");
        apiEndpointProvider.configure("/api/");
    }
})(app || (app = {}));

//# sourceMappingURL=app.module.js.map