var app;
(function (app) {
    var ui;
    (function (ui) {
        "use strict";
        var AppBarController = (function () {
            function AppBarController(appBarService) {
                this.appBarService = appBarService;
            }
            return AppBarController;
        })();
        angular.module("app.ui").controller("appBarController", ["appBarService", AppBarController]);
    })(ui = app.ui || (app.ui = {}));
})(app || (app = {}));

//# sourceMappingURL=../../ui/appBar/appBarController.js.map