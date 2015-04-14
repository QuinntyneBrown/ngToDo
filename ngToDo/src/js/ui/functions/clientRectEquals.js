var app;
(function (app) {
    var ui;
    (function (ui) {
        angular.module("app.ui").value("clientRectEquals", function (clientRectA, clientRectB) {
            if (!clientRectA || !clientRectB) {
                return false;
            }
            return (clientRectA.top === clientRectB.top && clientRectA.left === clientRectB.left && clientRectA.bottom === clientRectB.bottom && clientRectA.right === clientRectB.right);
        });
    })(ui = app.ui || (app.ui = {}));
})(app || (app = {}));

//# sourceMappingURL=../../ui/functions/clientRectEquals.js.map