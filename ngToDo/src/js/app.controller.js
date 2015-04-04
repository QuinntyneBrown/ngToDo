var app;
(function (app) {
    var AppController = (function () {
        function AppController($router) {
            $router.config([
                { path: '/', component: 'toDoRecent' }
            ]);
        }
        return AppController;
    })();
    app.AppController = AppController;
})(app || (app = {}));

//# sourceMappingURL=app.controller.js.map