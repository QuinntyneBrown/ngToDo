module app.common {
    
    export class CommonStorage extends Storage implements IStorage {
        constructor() {

            super("commonLocalStorage");
        }
    }

    angular.module("app.common").service("storage", [CommonStorage]);

} 