module app.ui {

    export class AppHeader {

        constructor() {

        }

        public static instance = () => {
            return new AppHeader();
        }

        public templateUrl: string = "src/app/ui/appHeader/appHeader.html";

        public replace: boolean = true;

        public restrict: string = "E";

        public controller: string = "appHeaderController";

        public controllerAs: string = "appHeader";

        public scope:any = {
            title: "@",
            isLoggedIn: "&",
            getUsername:"&"
        };

    }

    angular.module("app.ui").directive("appHeader", [AppHeader.instance]);
} 