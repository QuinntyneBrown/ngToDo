var app;
(function (app) {
    var ui;
    (function (ui) {
        "use strict";
        var ModalService = (function () {
            function ModalService($q) {
                var _this = this;
                this.$q = $q;
                this.showModal = function (options) {
                    var deferred = _this.$q.defer();
                    return deferred.promise;
                };
            }
            return ModalService;
        })();
        angular.module("app.ui").service("modalService", [ModalService]);
    })(ui = app.ui || (app.ui = {}));
})(app || (app = {}));
//# sourceMappingURL=modalService.js.map