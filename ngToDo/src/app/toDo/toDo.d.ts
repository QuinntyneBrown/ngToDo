declare module app.toDo {
    
    export interface IToDo extends common.IEntity<IToDo> {
        id: number;
        name: string;
        description: string;
        status: number;
        completedDateTime: Date;
        createdDateTime: Date;
        complete():void;
        getRecent(): ng.IPromise<any>;
    }

    export interface IToDoService extends common.IDataService {
        getRecent(): ng.IPromise<any>;
    }

    export interface IToDoFormController {
        toDo: IToDo;
    }

    export interface IToDoDetailController {
        toDo: IToDo;
    }

    export interface IToDoDetailRouteParams extends ng.route.IRouteParamsService {
        toDoId:string;
    }

    export interface IToDoListController {
        toDos: IToDo[];
    }

    export interface IToDoRecentController {
        toDos: IToDo[];
    }

    export interface IToDoAboutController {

    }

    export interface IToDoAboutInfo {
        title: string;
        description: string;
    }
} 