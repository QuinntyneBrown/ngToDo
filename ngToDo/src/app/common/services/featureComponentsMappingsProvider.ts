module app.common {

    "use strict";

    export class FeatureComponentsMappingsProvider implements IFeatureComponentsMappingsProvider {

        private mappings: IFeatureComponentsMapping[] = [];

        public mapFeatureComponents = (featureComponentsMapping: common.IFeatureComponentsMapping) => {
            this.mappings.push(featureComponentsMapping);
        };

        public setTemplateMapping = ($componentLoaderProvider: any) => {
            $componentLoaderProvider.setTemplateMapping((name:string) => {
                var viewLocation = null;
                this.mappings.forEach((mapping: IFeatureComponentsMapping) => {
                    mapping.components.forEach((component:string) => {
                        if (name === component) {
                            viewLocation = "src/app/" + mapping.feature + "/views/" + name + ".html";
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
        "$componentLoaderProvider", "featureComponentsMappingsProvider",
        ($componentLoaderProvider: any, featureComponentsMappingsProvider: IFeatureComponentsMappingsProvider) => {
            featureComponentsMappingsProvider.setTemplateMapping($componentLoaderProvider);

            $componentLoaderProvider.setCtrlNameMapping((name:string) => {
                return name[0].toLowerCase() +
                    name.substr(1) +
                    "Controller";
            });

            }
        ]);

} 