module app.common {

    "use strict";

    class RoutesProvider implements IRoutesProvider {

        public routes: IRouteConfig[] = [];

        public mapRoutes = (routes: IRouteConfig[]) => {
            routes.forEach((route:any) => {
                this.routes.push(route);
            });
        }

        $get(): IRouteConfig[] {
            return this.routes;
        }
    }

    angular.module("app.common").provider("routes", RoutesProvider);

} 