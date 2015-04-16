declare module app.ui {
    
    export interface IAppBarService {        
        setButtons(buttons: IAppBarButton[]);
        getButtons():IAppBarButton[];
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

    interface IGetSurroundingWindowSpace {
        (element: HTMLElement, window: Window): IRect
    }

    interface IGetBoundingRectForDetachedElement {
        (htmlElement: HTMLElement): ClientRect;
    }

    export interface IBackdropAttributes extends ng.IAttributes {
        backdropClass: string;
    }

    interface IClientRectEquals {
        (clientRectA: ClientRect, clientRectB: ClientRect): boolean;
    }

    interface IPositionDetachedElement {

        (triggerElement: HTMLElement,
        element: HTMLElement,
        directionPriorityList: string[],
        elementRect: ClientRect,
        alignment: string,
        elementSurroundingWindowSpaceRect: IRect): IPositionDetachedElementResponseDto;

    }

    interface IRect {
        top: number;
        left: number;
        right: number;
        bottom: number;
    }

    interface IPositionDetachedElementResponseDto {
        position: string;
        elementRect: ClientRect;
    }

    interface IDynamicElement {
        viewBag: any;
        showDynamicElement: (params: IDynamicElementOptions) => any;
        dismiss: () => ng.IPromise<any>;
    }

    interface IDynamicElementOptions {
        alignment: string;
        directionPriorityList: string[];
        displayArrow: boolean;
        element: HTMLElement;
        margin: string;
        templateUrl: string;
        triggerScope: IDynamicElementScope;
        transitionDurationInMilliseconds: number;
        viewBag: any;
        visibilityDurationInMilliseconds: number;
    }

    interface IDynamicElementScope extends ng.IScope {
        templateUrl: string;
        triggerEvent: string;
        directionPriorityList: string[];
        visibilityDurationInMilliseconds: number;
        viewBag: any;
        transitionDurationInMilliseconds: number;
        popUpTrigger: any;
        alignment: string;
        margin: string;
        displayArrow: boolean;
    }
} 