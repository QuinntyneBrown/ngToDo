declare module app.common {
    
    export interface IApiEndpointConfig {
        baseUrl: string;
    }

    export interface IApiEndpointProvider extends ng.IServiceProvider {
        configure(baseUrl: string): void;
    }

    export interface IRequestCounter {
        getRequestCount():number;
    }

    export interface IWorkSpinnerScope extends ng.IScope {
        requestCount: number;
    }

    export interface IFeatureComponentsMapping {
        feature: string;
        components: string[];
    }

    export interface IRouteConfig {
        path: string;
        component: string;
    }

    export interface IFeatureComponentsMappingsProvider extends ng.IServiceProvider {
        mappings: IFeatureComponentsMapping[];
    }

    export interface IRoutesProvider extends ng.IServiceProvider {
        routes: IRouteConfig[];
        configure(routes:IRouteConfig[]);
    }

    export interface IFormEncode {
        (data: any): string;
    }
} 