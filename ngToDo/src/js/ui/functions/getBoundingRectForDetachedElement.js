var app;
(function (app) {
    var ui;
    (function (ui) {
        angular.module("app.ui").value("getBoundingRectForDetachedElement", function (detachedElement) {
            var clientRect;
            detachedElement.style.visibility = 'none';
            document.body.appendChild(detachedElement);
            clientRect = detachedElement.getBoundingClientRect();
            detachedElement.parentNode.removeChild(detachedElement);
            return clientRect;
        });
    })(ui = app.ui || (app.ui = {}));
})(app || (app = {}));

//# sourceMappingURL=../../ui/functions/getBoundingRectForDetachedElement.js.map