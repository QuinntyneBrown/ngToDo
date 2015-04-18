var app;
(function (app) {
    var common;
    (function (common) {
        angular.module("app.common").value("bind", function (element, object) {
            if (element) {
                for (var event in object) {
                    var callback = object[event];
                    event.split(/\s+/).forEach(function (event) {
                        element.addEventListener(event, callback);
                    });
                }
            }
        });
    })(common = app.common || (app.common = {}));
})(app || (app = {}));

//# sourceMappingURL=../../common/functions/bind.js.map