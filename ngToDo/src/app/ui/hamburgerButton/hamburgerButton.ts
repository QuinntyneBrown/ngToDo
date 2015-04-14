module app.ui {

    "use strict";

    class HamburgerButton {

        constructor() {

        }

        public static instance = () => {
            return new HamburgerButton();
        }

        public templateUrl: string = "src/app/ui/hamburgerButton/hamburgerButton.html";

        public replace: boolean = true;

        public restrict: string = "E";

        public scope:any = {
            onClick:"&"
        }

    }

    angular.module("app.ui").directive("hamburgerButton", [HamburgerButton.instance]);
} 