module app.common {

    export class SessionStorageProperty implements ISessionStorageProperty {

        constructor(private $rootScope: ng.IRootScopeService, private storage: any, private name: string) {

            $rootScope.$on("$locationChangeStart", this.onLocationChangeStart);
        }

        public onLocationChangeStart = (event: ng.IAngularEvent, newState: string) => {
            if (newState.indexOf("/login") > 0) {
                this.data = null;
                this.set({ data: null });
            }
        }

        public get = () => {
            if (this.data) {
                return this.data;
            }

            try {
                this.data = this.storage.getByName({ name: this.key }).value;
            } catch (error) {

            }

            return this.data;
        }

        public set = (params: any) => {
            this.data = params.data;
            this.storage.put({ name: this.key, value: params.data });
        }

        private data: any;

        private key: string;
    }
} 