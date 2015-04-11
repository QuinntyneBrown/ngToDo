declare module app.security {
    
    export interface ISecurityService {        
        login(username: string, password: string): ng.IPromise<any>;
        tokenExpired(): boolean;
    }

    export interface ILoginController {        
        username: string;
        password: string;
        rememberMe: boolean;        
        tryToLogin():void;
    }


} 