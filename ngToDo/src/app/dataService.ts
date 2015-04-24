module app.common {
    
    export class DataService implements IDataService {

        constructor(
            public $http: ng.IHttpService,
            public $q: ng.IQService,
            public _baseUri:string,
            public entityName: string,
            public storage: IStorage) {

        }

        public getById = (id: string) => {
            return this.fromCacheOrService({ method: "GET", uri: this.baseUri + "/getbyid", params: { id: id } });
        }

        public getAll = () => {
            return this.fromCacheOrService({ method: "GET", uri: this.baseUri + "/getAll" });
        }

        public fromCacheOrService = (action: IHttpAction) => {
            var deferred = this.$q.defer();
            var cachedData = this.storage.getByName({ name: action.uri + JSON.stringify(action.params) });
            if (!cachedData || !cachedData.value) {
                this.$http({ method: action.method, url: action.uri, data: action.data, params: action.params }).then((results) => {
                    this.storage.put({ category: this.entityName, name: action.uri + JSON.stringify(action.params), value: results });
                    deferred.resolve(results);
                }).catch((error) => {
                    deferred.reject(error);
                });
            } else {
                deferred.resolve(cachedData.value);
            }
            return deferred.promise;
        }

        public add = (entity) => {
            var deferred = this.$q.defer();
            this.$http({ method: "POST", url: this.baseUri + "/add", data: entity }).then((results) => {
                this.invalidateCache();
                deferred.resolve(results);
            }).catch((error) => {
                deferred.reject(error);
            });
            return deferred.promise;
        }

        public update = (entity) => {
            var deferred = this.$q.defer();
            this.$http({ method: "PUT", url: this.baseUri + "/update", data: JSON.stringify(entity) }).then((results) => {
                this.invalidateCache();
                deferred.resolve(results);
            }).catch((error) => {
                deferred.reject(error);
            });
            return deferred.promise;
        }

        public remove = (id: string) => {
            var deferred = this.$q.defer();
            this.$http({ method: "DELETE", url: this.baseUri + "/remove?id=" + id }).then((results) => {
                this.invalidateCache();
                deferred.resolve(results);
            }).catch((error) => {
                deferred.reject(error);
            });
            return deferred.promise;
        }

        public invalidateCache = () => {
            this.storage.get().forEach((item) => {
                if (item.category === this.entityName) {
                    this.storage.put({ name: item.name, value: null });
                }
            });
        }

        public get baseUri() {
            return this._baseUri + "/" + this.entityName;
        }
    }
} 