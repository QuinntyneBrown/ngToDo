var app;
(function (app) {
    var ui;
    (function (ui) {
        "use strict";
        var DynamicElementDirective = (function () {
            function DynamicElementDirective(dynamicElement) {
                this.dynamicElement = dynamicElement;
                this.restrict = "A";
                this.link = function (scope, element, attributes) {
                };
            }
            DynamicElementDirective.instance = function (dynamicElement) {
                return new DynamicElementDirective(dynamicElement);
            };
            return DynamicElementDirective;
        })();
        angular.module("app.ui").directive("dynamicElement", ["dynamicElement", DynamicElementDirective.instance]);
    })(ui = app.ui || (app.ui = {}));
})(app || (app = {}));

//# sourceMappingURL=../../../ui/dynamicElement/directives/dynamicElement.js.map