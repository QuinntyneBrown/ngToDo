module app.ui {

    "use strict";

    class AppBarController {

        constructor(public appBarService: IAppBarService) {
            
        }

    }

    angular.module("app.ui").controller("appBarController", ["appBarService",AppBarController]);
} 