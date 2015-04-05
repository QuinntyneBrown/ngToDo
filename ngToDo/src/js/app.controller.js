var app;
(function (app) {
    var AppController = (function () {
        function AppController($location, $rootScope, $router, token) {
            this.$location = $location;
            $rootScope.$on("$locationChangeStart", function (event, newState, oldState) {
                if (!token.get() && newState.indexOf('/login') < 0) {
                    $location.path("/login");
                }
            });
            $router.config([
                { path: '/', component: 'login' },
                { path: '/toDo/recent', component: 'toDoRecent' },
                { path: '/toDo/list', component: 'toDoList' },
                { path: '/toDo/detail/:toDoId', component: 'toDoMasterDetail' },
                { path: '/toDo/create', component: 'toDoForm' },
                { path: '/toDo/edit/:toDoId', component: 'toDoForm' },
                { path: '/login', component: 'login' }
            ]);
        }
        return AppController;
    })();
    app.AppController = AppController;
})(app || (app = {}));

//# sourceMappingURL=app.controller.js.map