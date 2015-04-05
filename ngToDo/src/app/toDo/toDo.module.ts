 module app.toDo {

     angular.module("app.toDo", [
         "app.common",
         "app.ui"
     ]).config(["featureComponentsMappingsProvider", config]);

     function config(featureComponentsMappingsProvider:  common.IFeatureComponentsMappingsProvider ) {
         featureComponentsMappingsProvider.mappings.push(
             {
                 feature: "toDo",
                 components: ["toDoRecent","toDoForm","toDoList","toDoDetail","toDoAbout"]
             });
     }

 }