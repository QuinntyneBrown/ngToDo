module app.common {

    "use strict";

    export class FeatureComponentsMappingsProvider implements IFeatureComponentsMappingsProvider {

        mappings: IFeatureComponentsMapping[] = [];

        $get(): any {
            return this.mappings;
        }
    }

    angular.module("app.common").provider("featureComponentsMappings", FeatureComponentsMappingsProvider);

} 