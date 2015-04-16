module app.ui {

    "use strict";

    export class AppBarService implements IAppBarService {

        constructor($rootScope: ng.IRootScopeService, public historyService: common.IHistoryService, public notificationService: common.INotificationService) {
            $rootScope.$on("$locationChangeStart", this.resetButtons);
        }

        public getPreviousUrl = () => {
            return null;
        }

        public goBack = () => {
            
        }

        public hasNotifications = () => {
            return false;
        }

        public setButtons = (buttons: IAppBarButton[]) => {
            this.buttons = buttons;
        }

        public resetButtons = () => {
            this.buttons = null;
        }

        public getButtons = () => {
            return this.buttons;
        }

        public notificationButton: IAppBarButton;

        public backButton: IAppBarButton;

        private buttons:IAppBarButton[] = [];
    }

    angular.module("app.ui").service("appBarService", ["$rootScope","historyService","notificationService", AppBarService]);
} 