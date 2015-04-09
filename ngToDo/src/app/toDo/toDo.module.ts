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
            "routesProvider",
             config
         ]);

     function config($componentLoaderProvider: any,
         $httpProvider: ng.IHttpProvider,
         $locationProvider: ng.ILocationProvider,
         apiEndpointProvider: common.IApiEndpointProvider,
         featureComponentsMappingsProvider: common.IFeatureComponentsMappingsProvider,
         routesProvider: common.IRoutesProvider) {


         featureComponentsMappingsProvider.mappings.push(
             {
                 feature: "toDo",
                 components: ["toDoRecent", "toDoForm", "toDoList", "toDoDetail", "toDoAbout"]
             });

         routesProvider.configure([
             { path: '/', component: 'toDoAbout' },
             { path: '/toDo/recent', component: 'toDoRecent' },
             { path: '/toDo/list', component: 'toDoList' },
             { path: '/toDo/detail/:toDoId', component: 'toDoMasterDetail' },
             { path: '/toDo/create', component: 'toDoForm' },
             { path: '/toDo/edit/:toDoId', component: 'toDoForm' }
         ]);

         var mappings = featureComponentsMappingsProvider.mappings;

         $componentLoaderProvider.setTemplateMapping((name) => {
             for (var i = 0; i < mappings.length; i++) {
                 for (var c = 0; c < mappings[i].components.length; c++) {
                     if (name === mappings[i].components[c]) {
                         return 'src/app/' + mappings[i].feature + '/views/' + name + '.html';
                     }
                 }
             }

             throw new Error("Unmapped Component " + name);
         });

         $componentLoaderProvider.setCtrlNameMapping((name) => {
             return name[0].toLowerCase() +
                 name.substr(1) +
                 'Controller';
         });

         $httpProvider.interceptors.push("authorizationInterceptor");

         $httpProvider.interceptors.push("requestCounter");

         apiEndpointProvider.configure("/api/");

     }

 }