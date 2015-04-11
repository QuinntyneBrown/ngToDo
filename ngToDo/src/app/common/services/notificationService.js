var app;
(function (app) {
    var common;
    (function (common) {
        var NotificationService = (function () {
            function NotificationService() {
            }
            return NotificationService;
        })();
        common.NotificationService = NotificationService;
        angular.module("app.common").service("notificationService", [NotificationService]);
    })(common = app.common || (app.common = {}));
})(app || (app = {}));
//# sourceMappingURL=notificationService.js.map