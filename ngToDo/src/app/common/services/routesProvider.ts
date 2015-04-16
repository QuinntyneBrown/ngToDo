module app.common {

    "use strict";

    class RoutesProvider implements ng.IServiceProvider, IRoutesProvider {

        public routes: IRouteConfig[] = [];

        public configure = (routes: IRouteConfig[]) => {
            routes.forEach((route) => {
                this.routes.push(route);
            });
        }

        $get(): IRouteConfig[] {
            return this.routes;
        }
    }

    angular.module("app.common").provider("routes", RoutesProvider);

} 