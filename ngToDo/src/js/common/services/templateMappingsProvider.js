var app;
(function (app) {
    var common;
    (function (common) {
        "use strict";
        var TemplateMappingsProvider = (function () {
            function TemplateMappingsProvider() {
                this.mappings = [];
            }
            TemplateMappingsProvider.prototype.push = function (map) {
                this.mappings.push(map);
            };
            TemplateMappingsProvider.prototype.$get = function () {
                return this.mappings;
            };
            return TemplateMappingsProvider;
        })();
        common.TemplateMappingsProvider = TemplateMappingsProvider;
        angular.module("app.common").provider("templateMappings", TemplateMappingsProvider);
    })(common = app.common || (app.common = {}));
})(app || (app = {}));

//# sourceMappingURL=../../common/services/templateMappingsProvider.js.map