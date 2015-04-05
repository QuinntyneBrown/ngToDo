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
            "templateMappingsProvider",
            config])
        .controller("appController", ["$rootScope","$router",AppController]);

    function config($componentLoaderProvider:any,
        $httpProvider: ng.IHttpProvider,
        $locationProvider: ng.ILocationProvider,
        apiEndpointProvider: common.IApiEndpointProvider,
        templateMappingsProvider:any) {

        var mappings = templateMappingsProvider.mappings;

        $componentLoaderProvider.setTemplateMapping((name) => {
            for (var i = 0; i < mappings.length; i++) {
                if (name === mappings[i].componentName) {
                    return 'src/app/' + mappings[i].moduleName + '/views/' + name + '.html';                        
                }
            }            
        });

        $httpProvider.interceptors.push("authorizationInterceptor");

        $httpProvider.interceptors.push("requestCounter");

        apiEndpointProvider.configure("/api/");

    }

} 