var app;
(function (app) {
    var ui;
    (function (ui) {
        "use strict";
        var AppBarService = (function () {
            function AppBarService($rootScope, historyService, notificationService) {
                var _this = this;
                this.historyService = historyService;
                this.notificationService = notificationService;
                this.getPreviousUrl = function () {
                    return null;
                };
                this.goBack = function () {
                };
                this.hasNotifications = function () {
                    return false;
                };
                this.setButtons = function (buttons) {
                    _this.buttons = buttons;
                };
                this.resetButtons = function () {
                    _this.buttons = null;
                };
                this.getButtons = function () {
                    return _this.buttons;
                };
                this.buttons = [];
                $rootScope.$on("$locationChangeStart", this.resetButtons);
            }
            return AppBarService;
        })();
        ui.AppBarService = AppBarService;
        angular.module("app.ui").service("appBarService", ["$rootScope", "historyService", "notificationService", AppBarService]);
    })(ui = app.ui || (app.ui = {}));
})(app || (app = {}));

//# sourceMappingURL=../../ui/appBar/appBarService.js.map