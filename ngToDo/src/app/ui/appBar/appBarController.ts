module app.ui {

    export class AppBarController {

        constructor(public appBarService: IAppBarService) {
            
        }

    }

    angular.module("app.ui").controller("appBarController", ["appBarService",AppBarController]);
} 