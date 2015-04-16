var app;
(function (app) {
    var common;
    (function (common) {
        "use strict";
        var HistoryService = (function () {
            function HistoryService() {
            }
            return HistoryService;
        })();
        angular.module("app.common").service("historyService", [HistoryService]);
    })(common = app.common || (app.common = {}));
})(app || (app = {}));

//# sourceMappingURL=../../common/services/historyService.js.map