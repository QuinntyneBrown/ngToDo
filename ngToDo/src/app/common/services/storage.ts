module app.common {

    "use strict";

    class CommonStorage extends Storage implements IStorage {
        constructor($rootScope: ng.IRootScopeService) {
            super("commonLocalStorage");

            $rootScope.$on("$locationChangeStart",(event: ng.IAngularEvent, newState: string) => {
                if (newState.indexOf("/login") > 0) {
                    this.get().forEach((item: INameValuePair) => {
                        this.put({ name: item.name, value: null });
                    });
                }
            });
        }
    }

    angular.module("app.common").service("storage", ["$rootScope",CommonStorage]);

} 