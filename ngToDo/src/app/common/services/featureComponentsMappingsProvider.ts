module app.common {

    "use strict";

    export class FeatureComponentsMappingsProvider implements IFeatureComponentsMappingsProvider {

        public mappings: IFeatureComponentsMapping[] = [];

        public setTemplateMapping = ($componentLoaderProvider: any) => {
            $componentLoaderProvider.setTemplateMapping((name) => {
                var viewLocation = null;
                this.mappings.forEach((mapping) => {
                    mapping.components.forEach((component) => {
                        if (name === component) {
                            viewLocation = 'src/app/' + mapping.feature + '/views/' + name + '.html';
                        }
                    });
                });

                return viewLocation;
            });
        }

        public $get(): any {
            return this.mappings;
        }
    }

    angular.module("app.common")
        .provider("featureComponentsMappings", FeatureComponentsMappingsProvider)
        .config([
        "$componentLoaderProvider", "featureComponentsMappingsProvider", ($componentLoaderProvider, featureComponentsMappingsProvider) => {
            featureComponentsMappingsProvider.setTemplateMapping($componentLoaderProvider);

            $componentLoaderProvider.setCtrlNameMapping((name) => {
                return name[0].toLowerCase() +
                    name.substr(1) +
                    'Controller';
            });

            }
        ]);

} 