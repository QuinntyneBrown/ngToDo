module app.ui {

    "use strict";

    class DynamicElementDirective {
        constructor() {
            
        }

        public static instance = () => {
            return new DynamicElementDirective();
        }
    }

    angular.module("app.ui").directive("dynamicElement", [DynamicElementDirective.instance]);
} 