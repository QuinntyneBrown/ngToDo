var app;
(function (app) {
    var common;
    (function (common) {
        var HistoryService = (function () {
            function HistoryService() {
            }
            return HistoryService;
        })();
        common.HistoryService = HistoryService;
        angular.module("app.common").service("historyService", [HistoryService]);
    })(common = app.common || (app.common = {}));
})(app || (app = {}));
//# sourceMappingURL=historyService.js.map