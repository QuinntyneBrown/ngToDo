module app.common {

    export class Storage extends app.Storage implements IStorage {
        constructor() {

            super("commonLocalStorage");
        }
    }

    angular.module("app.common").service("storage", [Storage]);
} 