module app.common {

    "use strict";

    export class ApiEndpointProvider implements IApiEndpointProvider {
        config: IApiEndpointConfig = {
            getBaseUrl: (name?:string) => {
                var baseUrl = "";

                if (name) {
                    this.config.baseUrls.forEach((endpointDefinition: IEndpointDefinition) => {
                        if (name === endpointDefinition.name) {
                            baseUrl = endpointDefinition.url;
                        }
                    });
                }

                if (!name || baseUrl === "") {
                    this.config.baseUrls.forEach((endpointDefinition: IEndpointDefinition ) => {
                        if (!endpointDefinition.name && baseUrl === "") {
                            baseUrl = endpointDefinition.url;
                        }
                    });
                }
                return baseUrl;
            },
            baseUrls: []
        };

        configure(baseUrl: string, name?: string): void {
            this.config.baseUrls.push({ url: baseUrl, name: name });
        }

        $get(): IApiEndpointConfig {
            return this.config;
        }
    }

    angular.module("app.common").provider("apiEndpoint", ApiEndpointProvider);

} 