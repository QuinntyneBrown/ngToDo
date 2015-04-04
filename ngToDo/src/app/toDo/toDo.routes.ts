module app.toDo {

    'use strict';

    export class Routes {

        static configure(
            $routeProvider: ng.route.IRouteProvider,
            toDoDetailControllerActivateFn: any,
            toDoRecentControllerActivateFn: any,
            toDoListControllerActivateFn: any,
            toDoFormControllerActivateFn: any
            ) {

            $routeProvider
                .when('/', {
                controller: 'toDoRecentController',
                controllerAs: 'toDoRecent',
                templateUrl: '/src/toDo/views/recent.html',
                resolve: toDoRecentControllerActivateFn,
                caseInsensitiveMatch: false
                });

            $routeProvider
                .when('/about', {
                templateUrl: '/src/toDo/views/about.html',
                caseInsensitiveMatch: false
            });

            $routeProvider
                .when('/toDo/edit/:toDoId', {
                controller: 'toDoFormController',
                controllerAs: 'toDoDetail',
                templateUrl: '/src/toDo/views/form.html',
                resolve: toDoDetailControllerActivateFn,
                caseInsensitiveMatch: false
                });

            $routeProvider
                .when('/toDo/create', {
                controller: 'toDoFormController',
                controllerAs: 'toDoForm',
                templateUrl: '/src/toDo/views/form.html',
                caseInsensitiveMatch: false
            });

            $routeProvider
                .when('/toDo/list', {
                controller: 'toDoListController',
                controllerAs: 'toDoList',
                templateUrl: '/src/toDo/views/list.html',
                resolve: toDoListControllerActivateFn,
                caseInsensitiveMatch: false
            });

            $routeProvider
                .when('/toDo/:toDoId', {
                controller: 'toDoDetailController',
                controllerAs: 'toDoDetail',
                templateUrl: '/src/toDo/views/detail.html',
                resolve: toDoDetailControllerActivateFn,
                caseInsensitiveMatch: false
                });

            $routeProvider.otherwise({ redirectTo: '/' });

        }
    }
} 