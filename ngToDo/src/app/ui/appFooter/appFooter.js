var app;
(function (app) {
    var ui;
    (function (ui) {
        var AppFooter = (function () {
            function AppFooter() {
                this.templateUrl = "src/app/ui/appFooter/appFooter.html";
                this.replace = true;
                this.restrict = "E";
                this.controller = "appFooterController";
                this.controllerAs = "appFooter";
                this.scope = {
                    viewBag: "="
                };
                this.link = function (scope, element, attributes) {
                };
            }
            AppFooter.instance = function () {
                return new AppFooter();
            };
            return AppFooter;
        })();
        ui.AppFooter = AppFooter;
        angular.module("app.ui").directive("appFooter", [AppFooter.instance]);
    })(ui = app.ui || (app.ui = {}));
})(app || (app = {}));
//# sourceMappingURL=appFooter.js.map