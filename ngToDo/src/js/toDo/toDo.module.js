var app;
(function (app) {
    var toDo;
    (function (toDo) {
        angular.module("app.toDo", [
            "app.common",
            "app.ui"
        ]).config(["templateMappingsProvider", config]);
        function config(templateMappingsProvider) {
            templateMappingsProvider.push({ moduleName: "toDo", componentName: "toDoRecent" });
            templateMappingsProvider.push({ moduleName: "toDo", componentName: "toDoForm" });
            templateMappingsProvider.push({ moduleName: "toDo", componentName: "toDoList" });
            templateMappingsProvider.push({ moduleName: "toDo", componentName: "toDoDetail" });
        }
    })(toDo = app.toDo || (app.toDo = {}));
})(app || (app = {}));

//# sourceMappingURL=../toDo/toDo.module.js.map