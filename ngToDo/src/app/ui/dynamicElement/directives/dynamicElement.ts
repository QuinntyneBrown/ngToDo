module app.ui {

    "use strict";

    class DynamicElementDirective {

        constructor(private dynamicElement: IDynamicElement) {
            
        }

        public restrict: string = "A";

        public static instance = (dynamicElement: IDynamicElement) => {
            return new DynamicElementDirective(dynamicElement);
        }

        public link = (scope: ng.IScope, element: ng.IAugmentedJQuery, attributes: ng.IAttributes) => {
            
        }
    }

    angular.module("app.ui").directive("dynamicElement", ["dynamicElement",DynamicElementDirective.instance]);
} 