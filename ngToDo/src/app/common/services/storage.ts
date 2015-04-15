module app.common {

    "use strict";

    class CommonStorage extends Storage implements IStorage {
        constructor() {
            super("commonLocalStorage");
        }
    }

    angular.module("app.common").service("storage", [CommonStorage]);

} 