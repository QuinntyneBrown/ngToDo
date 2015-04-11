var app;
(function (app) {
    var ui;
    (function (ui) {
        "use strict";
        var DynamicElementService = (function () {
            function DynamicElementService() {
            }
            return DynamicElementService;
        })();
        angular.module("app.ui").service("dynamicElement", [DynamicElementService]);
    })(ui = app.ui || (app.ui = {}));
})(app || (app = {}));
//# sourceMappingURL=dynamicElement.js.map