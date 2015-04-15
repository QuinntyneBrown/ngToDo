module app.security {

    "use strict";

    class CurrentUser extends common.SessionStorageProperty {
        constructor($rootScope: ng.IRootScopeService, storage: any) {
            super($rootScope, storage, "currentUser");
        }
    }

    angular.module("app.security").service("currentUser", ["$rootScope", "storage", CurrentUser]);
} 