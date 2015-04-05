 module app.toDo {

     angular.module("app.toDo", [
         "app.common",
         "app.ui"
     ]).config(["templateMappingsProvider", config]);

     function config(templateMappingsProvider: any) {
         templateMappingsProvider.push({ moduleName: "toDo", componentName: "toDoRecent" });
         templateMappingsProvider.push({ moduleName: "toDo", componentName: "toDoForm" });
         templateMappingsProvider.push({ moduleName: "toDo", componentName: "toDoList" });
         templateMappingsProvider.push({ moduleName: "toDo", componentName: "toDoDetail" });
     }

 }