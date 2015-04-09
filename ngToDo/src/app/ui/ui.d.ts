declare module app.ui {
    
    export interface IAppBarService {
        
        setButtons(buttons: IAppBarButton[]);

        getButtons():IAppBarButton[];

    }

    export interface IAppBarButtonConstructorFn {
        (
            text: string,
            onClick: void,
            type:string
        ):IAppBarButton
    }

    export interface IAppBarButton {
        text: string;
        type: string;
        onClick():void;
    }

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