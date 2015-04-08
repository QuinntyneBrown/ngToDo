declare module app.ui {
    
    export interface IModalService {        
        showModal(options: IModalOptions): ng.IPromise<any>;
    }

    export interface IModalOptions {
        
    }

    export interface IBackdrop extends  ng.IDirective {

    }

    export interface IBackdropScope {
        backdropClass: string;
        animate:boolean;
    }

    export interface IBackdropAttributes extends ng.IAttributes {
        backdropClass: string;
    }
} 