module app {

    export class DataService implements IDataService {

        constructor(
            public $http: ng.IHttpService,
            public $cacheFactory: ng.ICacheFactoryService,
            public $q: ng.IQService,
            public baseUri: string) {

        }

        public add = (options) => {

            var deferred = this.$q.defer();

            this.$http({ method: "POST", url: this.baseUri + "add", data: options.entity }).then((results) => {
                deferred.resolve(results);
            }).catch((error) => {
                deferred.reject(error);
            });

            return deferred.promise;
        }

        public update = (options) => {

            var deferred = this.$q.defer();

            this.$http({ method: "POST", url: this.baseUri + "add", data: options.entity }).then((results) => {
                deferred.resolve(results);
            }).catch((error) => {
                deferred.reject(error);
            });

            return deferred.promise;
        }

        public fromCacheOrService(action: IHttpAction, key: string) {

            var deferred = this.$q.defer();

            var dataCache = this.$cacheFactory.get(key);

            if (!dataCache) {
                this.$http({ method: "GET", url: this.baseUri + "getAll" }).then((results) => {
                    deferred.resolve(results.data);
                }).catch((error) => {
                    deferred.reject(error);
                });
            } else {
                deferred.resolve(dataCache);
            }

            return deferred.promise;
        }

        public getById = (id: string) => {

            var deferred = this.$q.defer();

            this.$http({ method: "GET", url: this.baseUri + "getbyid?id=" + id }).then((results) => {
                deferred.resolve(results);
            }).catch((error) => {
                deferred.reject(error);
            });

            return deferred.promise;
        }

        public getAll = () => {

            var deferred = this.$q.defer();

            this.$http({ method: "GET", url: this.baseUri + "getAll" }).then((results) => {
                deferred.resolve(results.data);
            }).catch((error) => {
                deferred.reject(error);
            });

            return deferred.promise;
        }

        public remove = (id: string) => {

            var deferred = this.$q.defer();

            this.$http({ method: "DELETE", url: this.baseUri + "remove?id=" + id }).then((results) => {
                deferred.resolve(results);
            }).catch((error) => {
                deferred.reject(error);
            });

            return deferred.promise;
        }

        public deleteFromCache = (key: string) => {

        }

    }

    export class SessionStorageProperty implements ISessionStorageProperty {

        constructor(private $rootScope: ng.IRootScopeService, private storage: any, private name: string) {

            $rootScope.$on("$locationChangeStart", this.onRouteChangeStart);
        }

        public onRouteChangeStart = (event: ng.IAngularEvent, newState: string) => {
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

    export class Storage implements IStorage {

        constructor(private storageId: string) {

        }

        public get = () => {
            return JSON.parse(localStorage.getItem(this.storageId) || '[]');
        }

        public getByName = (params: INameValuePair) => {
            var items = JSON.parse(localStorage.getItem(this.storageId) || '[]');

            for (var i = 0; i < items.length; i++) {
                if (params.name === items[i].name) {
                    return items[i];
                };
            };

            return null;
        }

        public put = (params: INameValuePair) => {
            var items = JSON.parse(localStorage.getItem(this.storageId) || '[]');

            for (var i = 0; i < items.length; i++) {
                if (params.name === items[i].name) {
                    items[i].value = params.value;
                    localStorage.setItem(this.storageId, JSON.stringify(items));
                    return;
                };
            };

            items.push(params);

            localStorage.setItem(this.storageId, JSON.stringify(items));
        }

    }


    export class AuthenticatedController {

        constructor(public token: ISessionStorageProperty) {
            
        }

        public canActivate() {

            return this.token.get();

        }
    }
}