var app;
(function (app) {
    var common;
    (function (common) {
        "use strict";
        var NotificationService = (function () {
            function NotificationService() {
            }
            return NotificationService;
        })();
        angular.module("app.common").service("notificationService", [NotificationService]);
    })(common = app.common || (app.common = {}));
})(app || (app = {}));

//# sourceMappingURL=../../common/services/notificationService.js.map