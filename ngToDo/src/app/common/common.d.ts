﻿declare module app.common {
    
    export interface IApiEndpointProvider {
        
    }

    export interface IApiEndpointConfig {
        baseUrl: string;
    }

    export interface IApiEndpointProvider {
        configure(baseUrl: string): void;
    }

    export interface IRequestCounter {
        getRequestCount():number;
    }

    export interface IWorkSpinnerScope extends ng.IScope {
        requestCount: number;
    }
} 