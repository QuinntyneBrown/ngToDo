module app {
    
    export class AppController {
        constructor(private $location: ng.ILocationService, $rootScope: ng.IRootScopeService, $router: any, routes: common.IRouteConfig[], public token: ISessionStorageProperty) {

            $router.config(routes);

        }

        public isLoggedIn = () => {
            return this.token.get();
        }

    }
}