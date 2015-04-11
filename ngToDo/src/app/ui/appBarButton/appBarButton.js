var app;
(function (app) {
    var ui;
    (function (ui) {
        "use strict";
        var AppBarButton = (function () {
            function AppBarButton() {
                this.restrict = "E";
                this.replace = true;
                this.templateUrl = "/src/app/ui/appBarButton/appBarButton.html";
                this.scope = {
                    button: "="
                };
            }
            AppBarButton.instance = function () {
                return new AppBarButton();
            };
            return AppBarButton;
        })();
        ui.AppBarButton = AppBarButton;
        angular.module("app.ui").directive("appBarButton", [AppBarButton.instance]);
    })(ui = app.ui || (app.ui = {}));
})(app || (app = {}));
//# sourceMappingURL=appBarButton.js.map