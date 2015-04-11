module app.security {

    "use strict";

    class Token extends common.SessionStorageProperty {

        constructor($rootScope: ng.IRootScopeService, storage: any) {
            super($rootScope, storage, "tokenExpiryDate");
        }

    }

    angular.module("app.security").service("tokenExpiryDate", ["$rootScope", "storage", Token]);
} 