var app;
(function (app) {
    var toDo;
    (function (toDo) {
        angular.module("app.toDo", [
            "app.common",
            "app.ui"
        ]).config(["featureComponentsMappingsProvider", config]);
        function config(featureComponentsMappingsProvider) {
            featureComponentsMappingsProvider.mappings.push({
                feature: "toDo",
                components: ["toDoRecent", "toDoForm", "toDoList", "toDoDetail", "toDoAbout"]
            });
        }
    })(toDo = app.toDo || (app.toDo = {}));
})(app || (app = {}));

//# sourceMappingURL=../toDo/toDo.module.js.map