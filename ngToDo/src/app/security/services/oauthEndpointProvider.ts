module app.security {

    "use strict";

    export class OAuthEndpointProvider implements ng.IServiceProvider, common.IApiEndpointProvider {
        config: common.IApiEndpointConfig = {
            baseUrl: "/login"
        };

        configure(baseUrl: string): void {
            this.config = {
                baseUrl: baseUrl
            };
        }

        $get(): common.IApiEndpointConfig {
            return this.config;
        }
    }

    angular.module("app.security").provider("oauthEndpoint", OAuthEndpointProvider);

} 