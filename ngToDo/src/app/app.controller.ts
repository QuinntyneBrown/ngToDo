module app {
    
    export class AppController {
        constructor($router) {
            $router.config([
                { path: '/', component: 'toDoRecent' }
            ]);
        }
    }
}