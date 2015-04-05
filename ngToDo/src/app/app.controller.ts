module app {
    
    export class AppController {
        constructor($router:any) {
            $router.config([
                { path: '/', component: 'toDoRecent' },
                { path: '/toDo/recent', component: 'toDoRecent' },
                { path: '/toDo/list', component: 'toDoList' },
                { path: '/toDo/detail/:toDoId', component: 'toDoMasterDetail' },
                { path: '/toDo/create', component: 'toDoForm' },
                { path: '/toDo/edit/:toDoId', component: 'toDoForm' }
            ]);
        }
    }
}