var app;
(function (app) {
    var AppController = (function () {
        function AppController($location, $rootScope, $router, routes, token) {
            var _this = this;
            this.$location = $location;
            this.token = token;
            this.isLoggedIn = function () {
                return _this.token.get();
            };
            $router.config(routes);
        }
        return AppController;
    })();
    app.AppController = AppController;
})(app || (app = {}));

//# sourceMappingURL=app.controller.js.map