module app.security {

    angular.module("app.security", [
        "app.common",
        "app.ui"
    ]).config(["featureComponentsMappingsProvider", config]);

    function config(featureComponentsMappingsProvider: common.IFeatureComponentsMappingsProvider) {
        featureComponentsMappingsProvider.mappings.push(
            {
                feature: "security",
                components: ["login"]
            });
    }
}