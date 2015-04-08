module app.ui {
    
    export class Backdrop implements IBackdrop {

        constructor(private $timeout: ng.ITimeoutService) {
            
        }

        public static instance = ($timeout: ng.ITimeoutService) => {
            return new Backdrop($timeout);
        }

        public replace: boolean = true;

        public restrict: string = "E";

        public link = (scope:IBackdropScope, element: ng.IAugmentedJQuery, attributes: IBackdropAttributes) => {
            scope.backdropClass = attributes.backdropClass || '';

            scope.animate = false;

            this.$timeout(() => {
                scope.animate = true;
            });
        }
    }

    angular.module("app.ui").directive("modalBackdrop", [Backdrop.instance]);
} 