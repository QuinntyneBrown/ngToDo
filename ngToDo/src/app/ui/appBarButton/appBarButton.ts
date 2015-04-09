module app.ui {

    "use strict";

    export class AppBarButton {
        
        constructor() {
            
        }

        public static instance = () => {
            return new AppBarButton();
        }

        public restrict: string = "E";

        public replace: boolean = true;

        public templateUrl: string = "/src/app/ui/appBarButton/appBarButton.html";

        public scope = {
            button:"="
        }
    }

    angular.module("app.ui").directive("appBarButton", [AppBarButton.instance]);
} 