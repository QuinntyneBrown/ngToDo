module app.ui {

    "use strict";

    export class AppBar {

        constructor() {

        }

        public static instance = () => {
            return new AppBar();
        }

        public templateUrl: string = "src/app/ui/appBar/appBar.html";

        public replace: boolean = true;

        public restrict: string = "E";

        public controller: string = "appBarController";

        public controllerAs: string = "appBar";

    }

    angular.module("app.ui").directive("appBar", [AppBar.instance]);
} 