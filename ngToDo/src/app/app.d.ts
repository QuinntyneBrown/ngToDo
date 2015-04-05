declare module app {
    
    export interface IAppController {
        
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