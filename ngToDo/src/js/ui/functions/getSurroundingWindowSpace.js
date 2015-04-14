var app;
(function (app) {
    var ui;
    (function (ui) {
        angular.module("app.ui").value("getSurroundingWindowSpace", function (element, _window) {
            var clientRect = element.getBoundingClientRect();
            return {
                top: clientRect.top,
                left: clientRect.left,
                bottom: _window.innerHeight - clientRect.bottom,
                right: _window.innerWidth - clientRect.right
            };
        });
    })(ui = app.ui || (app.ui = {}));
})(app || (app = {}));

//# sourceMappingURL=../../ui/functions/getSurroundingWindowSpace.js.map