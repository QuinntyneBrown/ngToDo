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
        baseUrls: IEndpointDefinition[];
        getBaseUrl(name?:string):string;
    }

    export interface IEndpointDefinition {
        name?: string;
        url: string;
    }

    export interface IApiEndpointProvider extends ng.IServiceProvider {
        configure(baseUrl: string, name?: string): void;
    }

    export interface IBind {
        (element: HTMLElement, object: any): void;
    }

    export interface IFire {

        (target: HTMLElement, type: string, properties:any):void;
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
        setTemplateMapping($componentLoaderProvider: any):void;
    }

    export interface IRoutesProvider extends ng.IServiceProvider {
        routes: IRouteConfig[];
        configure(routes:IRouteConfig[]);
    }

    export interface IFormEncode {
        (data: any): string;
    }

    export interface IDataService {

        fromCacheOrService(action: IHttpAction) : ng.IPromise<any>;

        invalidateCache(): void;

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

        data?: any;

        params?:any;

    }

    export interface INameValuePair {

        category?: string;

        name: string;

        value?: any;
    }

    export interface ISessionStorageProperty {
        get(): any;

        set(params: any): void;
    }

    export interface IStorage {

        instance(storageId: string): IStorage;

        put(params: INameValuePair): void;

        get(): any;

        getByName(params: INameValuePair):any;

    }
} 