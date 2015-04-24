var app;
(function (app) {
    var common;
    (function (common) {
        "use strict";
        angular.module("app.common").value("bind", function (element, object) {
            if (element) {
                for (var events in object) {
                    var callback = object[events];
                    events.split(/\s+/).forEach(function (event) {
                        element.addEventListener(event, callback);
                    });
                }
            }
        });
    })(common = app.common || (app.common = {}));
})(app || (app = {}));

//# sourceMappingURL=../../common/functions/bind.js.map