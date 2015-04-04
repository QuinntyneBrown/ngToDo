var app;
(function (app) {
    var ui;
    (function (ui) {
        var AppFooterController = (function () {
            function AppFooterController() {
            }
            return AppFooterController;
        })();
        ui.AppFooterController = AppFooterController;
        angular.module("app.ui").controller("appFooterController", [AppFooterController]);
    })(ui = app.ui || (app.ui = {}));
})(app || (app = {}));

//# sourceMappingURL=../../ui/appFooter/appFooterController.js.map