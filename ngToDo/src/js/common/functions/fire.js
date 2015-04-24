var app;
(function (app) {
    var common;
    (function (common) {
        "use strict";
        angular.module("app.common").value("fire", function (target, type, properties) {
            var htmlEvent = document.createEvent("HTMLEvents");
            htmlEvent.initEvent(type, true, true);
            for (var j in properties) {
                htmlEvent[j] = properties[j];
            }
            target.dispatchEvent(htmlEvent);
        });
    })(common = app.common || (app.common = {}));
})(app || (app = {}));

//# sourceMappingURL=../../common/functions/fire.js.map