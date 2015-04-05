module app {

    angular.module("app", [

        "ngNewRouter",

        "app.common",
        "app.security",
        "app.toDo",
        "app.ui"

    ])
        .config([
            "$componentLoaderProvider",
            "$httpProvider",
            "$locationProvider",
            "apiEndpointProvider",         
            config])
        .controller("appController", ["$router",AppController]);

    function config($componentLoaderProvider:any,
        $httpProvider: ng.IHttpProvider,
        $locationProvider: ng.ILocationProvider,
        apiEndpointProvider: common.IApiEndpointProvider) {

        $componentLoaderProvider.setTemplateMapping((name) => {
            return 'src/app/toDo/views/' + name + '.html';
        });

        $httpProvider.interceptors.push("authorizationInterceptor");

        $httpProvider.interceptors.push("requestCounter");

        apiEndpointProvider.configure("/api/");

    }

} 