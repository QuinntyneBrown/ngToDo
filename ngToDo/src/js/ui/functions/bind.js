var app;
(function (app) {
    var ui;
    (function (ui) {
        angular.module("app.ui").value("bind", function (element, object) {
            if (element) {
                for (var event in object) {
                    var callback = object[event];
                    event.split(/\s+/).forEach(function (event) {
                        element.addEventListener(event, callback);
                    });
                }
            }
        });
    })(ui = app.ui || (app.ui = {}));
})(app || (app = {}));

//# sourceMappingURL=../../ui/functions/bind.js.map