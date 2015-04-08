 module app.toDo {

     angular.module("app.toDo", [
         "app.common",
         "app.ui"
     ]).config(["featureComponentsMappingsProvider", "routesProvider", config]);

     function config(featureComponentsMappingsProvider: common.IFeatureComponentsMappingsProvider,
         routesProvider: common.IRoutesProvider) {


         featureComponentsMappingsProvider.mappings.push(
             {
                 feature: "toDo",
                 components: ["toDoRecent", "toDoForm", "toDoList", "toDoDetail", "toDoAbout"]
             });

         routesProvider.configure([
             { path: '/toDo/recent', component: 'toDoRecent' },
             { path: '/toDo/list', component: 'toDoList' },
             { path: '/toDo/detail/:toDoId', component: 'toDoMasterDetail' },
             { path: '/toDo/create', component: 'toDoForm' },
             { path: '/toDo/edit/:toDoId', component: 'toDoForm' }
         ]);

     }

 }