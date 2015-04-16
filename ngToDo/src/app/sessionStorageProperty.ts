module app.common {

    "use strict";

    export class StorageProperty {

        constructor(public storage: any, public name: string) {

        }

        public get = () => {
            if (this.data) {
                return this.data;
            }

            try {
                this.data = this.storage.getByName({ name: this.name }).value;
            } catch (error) {

            }

            return this.data;
        }

        public set = (params: any) => {
            this.data = params.data;
            this.storage.put({ name: this.name, value: params.data });
        }

        public data: any;
    }

    export class SessionStorageProperty extends StorageProperty implements ISessionStorageProperty {

        constructor(private $rootScope: ng.IRootScopeService, public storage: any, public name: string) {
            super(storage, name);
            $rootScope.$on("$locationChangeStart", this.onLocationChangeStart);
        }

        public onLocationChangeStart = (event: ng.IAngularEvent, newState: string) => {
            if (newState.indexOf("/login") > 0) {
                this.data = null;
                this.set({ data: null });
            }
        }

    }
} 