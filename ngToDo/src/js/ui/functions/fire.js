var app;
(function (app) {
    var ui;
    (function (ui) {
        angular.module("app.ui").value("fire", function (target, type, properties) {
            var htmlEvent = document.createEvent("HTMLEvents");
            htmlEvent.initEvent(type, true, true);
            for (var j in properties) {
                htmlEvent[j] = properties[j];
            }
            target.dispatchEvent(htmlEvent);
        });
    })(ui = app.ui || (app.ui = {}));
})(app || (app = {}));

//# sourceMappingURL=../../ui/functions/fire.js.map