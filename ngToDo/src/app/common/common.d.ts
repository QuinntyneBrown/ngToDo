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

    export interface IDataService {

        getAll(): ng.IPromise<any>;

        getById(id: any): ng.IPromise<any>;

        remove(id: any): ng.IPromise<any>;

        add(options: any): ng.IPromise<any>;

        update(options: any): ng.IPromise<any>;
    }

    export interface IViewDataPrimer {

        resolveViewData(): ng.IPromise<any>;

    }

    export interface IHttpAction {

        method: string;

        uri: string;

        data: any;

    }

    export interface INameValuePair {

        name: string;

        value: any;
    }

    export interface ISessionStorageProperty {
        get(): any;

        set(params: any): void;
    }

    export interface IStorage {

    }
} 