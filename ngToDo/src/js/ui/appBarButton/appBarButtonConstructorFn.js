var app;
(function (app) {
    var ui;
    (function (ui) {
        function AppBarButtonConstructorFn(text, onClick, type) {
            return {
                type: type,
                text: text,
                onClick: onClick
            };
        }
        ui.AppBarButtonConstructorFn = AppBarButtonConstructorFn;
        angular.module("app.ui").value("appBarButtonConstructorFn", AppBarButtonConstructorFn);
    })(ui = app.ui || (app.ui = {}));
})(app || (app = {}));

//# sourceMappingURL=../../ui/appBarButton/appBarButtonConstructorFn.js.map