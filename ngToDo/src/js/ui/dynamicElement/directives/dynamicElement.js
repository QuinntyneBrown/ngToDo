var app;
(function (app) {
    var ui;
    (function (ui) {
        "use strict";
        var DynamicElementDirective = (function () {
            function DynamicElementDirective() {
            }
            DynamicElementDirective.instance = function () {
                return new DynamicElementDirective();
            };
            return DynamicElementDirective;
        })();
        angular.module("app.ui").directive("dynamicElement", [DynamicElementDirective.instance]);
    })(ui = app.ui || (app.ui = {}));
})(app || (app = {}));

//# sourceMappingURL=../../../ui/dynamicElement/directives/dynamicElement.js.map