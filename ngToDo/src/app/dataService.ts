module app.common {
    
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

} 