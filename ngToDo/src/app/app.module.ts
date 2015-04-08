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
            "featureComponentsMappingsProvider",
            config])
        .run(["$location","$rootScope","token",run])
        .controller("appController", ["$location","$rootScope","$router","routes", "token",AppController]);

    function run($location: ng.ILocationService,$rootScope: ng.IRootScopeService, token: ISessionStorageProperty) {

        $rootScope.$on("$locationChangeStart",(event: ng.IAngularEvent, newState: string, oldState: string) => {
            if (!token.get() && newState.indexOf('/login') < 0) {

                $location.path("/login");
            }
        });
    }
    function config($componentLoaderProvider:any,
        $httpProvider: ng.IHttpProvider,
        $locationProvider: ng.ILocationProvider,
        apiEndpointProvider: common.IApiEndpointProvider,
        featureComponentsMappingsProvider: common.IFeatureComponentsMappingsProvider) {

        var mappings = featureComponentsMappingsProvider.mappings;

        $componentLoaderProvider.setTemplateMapping((name) => {
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

} 