module app.common {

    "use strict";

    export class TemplateMappingsProvider implements ng.IServiceProvider {
        mappings = [];

        push(map: any): void {
            this.mappings.push(map);
        }

        $get(): any {
            return this.mappings;
        }
    }

    angular.module("app.common").provider("templateMappings", TemplateMappingsProvider);

} 