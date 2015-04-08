module app.security {

    "use strict";

    class Token extends common.SessionStorageProperty {

        constructor($rootScope: ng.IRootScopeService, storage: any) {
            super($rootScope, storage, "token");
        }

    }

    angular.module("app.security").service("token", ["$rootScope","storage",Token]);
} 