var app;
(function (app) {
    var ui;
    (function (ui) {
        "use strict";
        var AppBar = (function () {
            function AppBar() {
                this.templateUrl = "src/app/ui/appBar/appBar.html";
                this.replace = true;
                this.restrict = "E";
                this.controller = "appBarController";
                this.controllerAs = "appBar";
            }
            AppBar.instance = function () {
                return new AppBar();
            };
            return AppBar;
        })();
        ui.AppBar = AppBar;
        angular.module("app.ui").directive("appBar", [AppBar.instance]);
    })(ui = app.ui || (app.ui = {}));
})(app || (app = {}));

//# sourceMappingURL=../../ui/appBar/appBar.js.map