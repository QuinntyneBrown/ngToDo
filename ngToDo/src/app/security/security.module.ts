module app.security {

    angular.module("app.security", [
        "app.common",
        "app.ui"
    ]).config(["templateMappingsProvider", config]);

    function config(templateMappingsProvider: any) {
        templateMappingsProvider.push({ moduleName: "security", componentName: "login" });
    }
}