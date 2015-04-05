var app;
(function (app) {
    var AppController = (function () {
        function AppController($router) {
            $router.config([
                { path: '/', component: 'toDoRecent' },
                { path: '/toDo/recent', component: 'toDoRecent' },
                { path: '/toDo/list', component: 'toDoList' },
                { path: '/toDo/detail/:toDoId', component: 'toDoDetail' },
                { path: '/toDo/create', component: 'toDoForm' },
                { path: '/toDo/edit/:toDoId', component: 'toDoForm' }
            ]);
        }
        return AppController;
    })();
    app.AppController = AppController;
})(app || (app = {}));

//# sourceMappingURL=app.controller.js.map