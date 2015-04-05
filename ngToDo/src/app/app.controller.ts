module app {
    
    export class AppController {
        constructor(private $location: ng.ILocationService, $rootScope: ng.IRootScopeService, $router: any, token: ISessionStorageProperty) {

            $rootScope.$on("$locationChangeStart",(event: ng.IAngularEvent, newState: string, oldState: string) => {
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
    }
}