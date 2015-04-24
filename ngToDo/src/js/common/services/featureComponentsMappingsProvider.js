var app;
(function (app) {
    var common;
    (function (common) {
        "use strict";
        var FeatureComponentsMappingsProvider = (function () {
            function FeatureComponentsMappingsProvider() {
                var _this = this;
                this.mappings = [];
                this.setTemplateMapping = function ($componentLoaderProvider) {
                    $componentLoaderProvider.setTemplateMapping(function (name) {
                        var viewLocation = null;
                        _this.mappings.forEach(function (mapping) {
                            mapping.components.forEach(function (component) {
                                if (name === component) {
                                    viewLocation = "src/app/" + mapping.feature + "/views/" + name + ".html";
                                }
                            });
                        });
                        return viewLocation;
                    });
                };
            }
            FeatureComponentsMappingsProvider.prototype.$get = function () {
                return this.mappings;
            };
            return FeatureComponentsMappingsProvider;
        })();
        common.FeatureComponentsMappingsProvider = FeatureComponentsMappingsProvider;
        angular.module("app.common").provider("featureComponentsMappings", FeatureComponentsMappingsProvider).config([
            "$componentLoaderProvider",
            "featureComponentsMappingsProvider",
            function ($componentLoaderProvider, featureComponentsMappingsProvider) {
                featureComponentsMappingsProvider.setTemplateMapping($componentLoaderProvider);
                $componentLoaderProvider.setCtrlNameMapping(function (name) {
                    return name[0].toLowerCase() + name.substr(1) + "Controller";
                });
            }
        ]);
    })(common = app.common || (app.common = {}));
})(app || (app = {}));

//# sourceMappingURL=../../common/services/featureComponentsMappingsProvider.js.map