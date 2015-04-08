module app.common {

    "use strict";

    export class RoutesProvider implements ng.IServiceProvider, IRoutesProvider {

        public routes: IRouteConfig[] = [];

        public configure = (routes: IRouteConfig[]) => {
            for (var i = 0; i < routes.length; i++) {
                this.routes.push(routes[i]);
            }
        }


        $get(): IRouteConfig[] {
            return this.routes;
        }
    }

    angular.module("app.common").provider("routes", RoutesProvider);

} 