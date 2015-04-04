module app.ui {
    
    export class AppFooter {

        constructor() {
            
        }

        public static instance = () => {
            return new AppFooter();
        }

        public templateUrl: string = "src/app/ui/appFooter/appFooter.html";

        public replace: boolean = true;

        public restrict: string = "E";

        public controller: string = "appFooterController";

        public controllerAs: string = "appFooter";

        public scope: any = {
            viewBag: "="
        };

        public link = (scope: ng.IScope, element: ng.IAugmentedJQuery, attributes: ng.IAttributes) => {
        
        }
    }

    angular.module("app.ui").directive("appFooter", [AppFooter.instance]);
} 