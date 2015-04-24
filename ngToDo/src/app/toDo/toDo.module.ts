 module app.toDo {

     angular.module("app.toDo", [
             "ngNewRouter",
             "ngAnimate",
             "app.common",
             "app.security",
             "app.ui"
         ])
         .config([
            "$componentLoaderProvider",
            "$httpProvider",
            "$locationProvider",
            "apiEndpointProvider",
            "featureComponentsMappingsProvider",
            "loginRedirectProvider",
            "routesProvider",
             config
         ]);
    
     function config($componentLoaderProvider: any,
         $httpProvider: ng.IHttpProvider,
         $locationProvider: ng.ILocationProvider,
         apiEndpointProvider: common.IApiEndpointProvider,
         featureComponentsMappingsProvider: common.IFeatureComponentsMappingsProvider,
         loginRedirectProvider: any,
         routesProvider: common.IRoutesProvider) {

         loginRedirectProvider.setDefaultUrl("/toDo/list");

         featureComponentsMappingsProvider.mappings.push(
             {
                 feature: "toDo",
                 components: ["toDoRecent", "toDoForm", "toDos", "toDoDetail", "toDoAbout"]
             });

         routesProvider.configure([
             { path: '/', redirectTo: '/login' },
             { path: '/toDo/about', component: 'toDoAbout' },
             { path: '/toDo/list', components: { default: 'toDos' } },
             { path: '/toDo/detail/:toDoId', components: { default: 'toDoDetail' } },
             { path: '/toDo/create', component: 'toDoForm' },
             { path: '/toDo/edit/:toDoId', component: 'toDoForm' }
         ]);

         apiEndpointProvider.configure("/api/v1");

     }

 }