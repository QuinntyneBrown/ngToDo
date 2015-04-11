declare module app.common {
    
    export interface IEntity<T> {
        id: number;
        instance(data: any): ng.IPromise<any>;
        getById(id: any): ng.IPromise<any>;
        getAll(): ng.IPromise<any>;
        save(): ng.IPromise<any>;
        remove(): ng.IPromise<any>;
        isValid(): boolean;
        getValidationErrors():string[];
    }
    export interface IApiEndpointConfig {
        baseUrl: string;
    }

    export interface IApiEndpointProvider extends ng.IServiceProvider {
        configure(baseUrl: string): void;
    }

    export interface IHistoryService {

    }

    export interface INotificationService {

    }

    export interface IRequestCounter {
        getRequestCount():number;
    }

    export interface IFeatureComponentsMapping {
        feature: string;
        components: string[];
    }

    export interface IRouteConfig {
        path: string;
        component?: string;
        redirectTo?:string;
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

        add(entity: any): ng.IPromise<any>;

        update(entity: any): ng.IPromise<any>;
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