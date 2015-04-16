var app;
(function (app) {
    var common;
    (function (common) {
        "use strict";
        var RoutesProvider = (function () {
            function RoutesProvider() {
                var _this = this;
                this.routes = [];
                this.configure = function (routes) {
                    routes.forEach(function (route) {
                        _this.routes.push(route);
                    });
                };
            }
            RoutesProvider.prototype.$get = function () {
                return this.routes;
            };
            return RoutesProvider;
        })();
        angular.module("app.common").provider("routes", RoutesProvider);
    })(common = app.common || (app.common = {}));
})(app || (app = {}));

//# sourceMappingURL=../../common/services/routesProvider.js.map