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
            "apiEndpointProvider",         
            config])
        .controller("appController", ["$router",AppController]);

    function config($componentLoaderProvider:any,
        $httpProvider: ng.IHttpProvider,
        apiEndpointProvider: common.IApiEndpointProvider) {

        $componentLoaderProvider.setTemplateMapping((name) => {
            return 'src/app/toDo/views/' + name + '.html';
        });

        $httpProvider.interceptors.push("authorizationInterceptor");

        $httpProvider.interceptors.push("requestCounter");

        apiEndpointProvider.configure("/api/");

    }

} 