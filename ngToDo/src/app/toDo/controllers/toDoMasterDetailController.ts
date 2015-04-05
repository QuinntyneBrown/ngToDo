module app.toDo {

    "use strict";

    class ToDoMasterDetailController {

        constructor($router:any) {
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

    }

    angular.module("app.toDo").controller("ToDoMasterDetailController", ["$router",ToDoMasterDetailController]);
} 