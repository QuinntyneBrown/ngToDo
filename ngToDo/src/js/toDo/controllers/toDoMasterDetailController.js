var app;
(function (app) {
    var toDo;
    (function (toDo) {
        "use strict";
        var ToDoMasterDetailController = (function () {
            function ToDoMasterDetailController($router) {
                $router.config([
                    {
                        path: '/toDo/detail/:toDoId',
                        component: {
                            master: 'toDoList',
                            detail: 'toDoDetail'
                        }
                    }
                ]);
            }
            return ToDoMasterDetailController;
        })();
        angular.module("app.toDo").controller("ToDoMasterDetailController", ["$router", ToDoMasterDetailController]);
    })(toDo = app.toDo || (app.toDo = {}));
})(app || (app = {}));

//# sourceMappingURL=../../toDo/controllers/toDoMasterDetailController.js.map