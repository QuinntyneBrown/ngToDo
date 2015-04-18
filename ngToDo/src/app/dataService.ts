module app.common {
    
    export class DataService implements IDataService {

        constructor(
            public $http: ng.IHttpService,
            public $q: ng.IQService,
            public baseUri:string,
            public entityName: string,
            public storage: IStorage) {
            this.baseUri = this.baseUri + "/" + entityName;

            document.addEventListener(this.entityName + "InvalidateCache",(event: CustomEvent) => {
                    this.storage.get().forEach((item) => {
                        if (item.category === entityName) {
                            this.storage.put({ name: item.name, value: null });
                        }
                    });                
            });
        }

        public fromCacheOrService(action: IHttpAction) {

            var deferred = this.$q.defer();

            var dataCache = this.storage.getByName({ name: action.uri + JSON.stringify(action.params) });

            if (!dataCache || !dataCache.value) {
                this.$http({ method: action.method, url: action.uri, data: action.data, params: action.params }).then((results) => {
                    this.storage.put({ category: this.entityName, name: action.uri + JSON.stringify(action.params), value: results });
                    deferred.resolve(results);
                }).catch((error) => {
                    deferred.reject(error);
                });
            } else {
                deferred.resolve(dataCache.value);
            }

            return deferred.promise;
        }

        public add = (entity) => {

            var deferred = this.$q.defer();

            this.$http({ method: "POST", url: this.baseUri + "/add", data: entity }).then((results) => {
                this.notifySaved();
                deferred.resolve(results);
            }).catch((error) => {
                deferred.reject(error);
            });

            return deferred.promise;
        }

        public update = (entity) => {

            var deferred = this.$q.defer();

            this.$http({ method: "PUT", url: this.baseUri + "/update", data: JSON.stringify(entity) }).then((results) => {
                this.notifySaved();
                deferred.resolve(results);
            }).catch((error) => {
                deferred.reject(error);
            });

            return deferred.promise;
        }

        public getById = (id: string) => {
            return this.fromCacheOrService({ method: "GET", uri: this.baseUri + "/getbyid", params: { id: id } });
        }

        public getAll = () => {
            return this.fromCacheOrService({ method: "GET", uri: this.baseUri + "/getAll" });
        }

        public remove = (id: string) => {

            var deferred = this.$q.defer();

            this.$http({ method: "DELETE", url: this.baseUri + "/remove?id=" + id }).then((results) => {
                this.notifyDeleted();
                deferred.resolve(results);
            }).catch((error) => {
                deferred.reject(error);
            });

            return deferred.promise;
        }

        public notifySaved = () => {
            this.notifyChanged("saved");
        }

        public notifyDeleted = () => {
            this.notifyChanged("deleted");
        }

        public notifyChanged = (changeType: string) => {
            this.notify( this.entityName + "InvalidateCache", { changeType: changeType });
        }

        public notify = (name: string, detailArg: any) => {
            var event = document.createEvent('CustomEvent');
            event.initCustomEvent(name, false, false, detailArg);
            document.dispatchEvent(event);
        }

    }

} 