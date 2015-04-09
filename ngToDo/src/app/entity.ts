module app.common {

    export class Entity<T> implements IEntity<T> {

        constructor(public $q: ng.IQService, private dataService: common.IDataService) {
            this.id = 0;
            this.isDeleted = false;
        }

        public id: number;

        public isDeleted: boolean;

        public getById = (id:any) => {

            var deferred = this.$q.defer();

            this.dataService.getById(id).then((results) => {
                var entity:T = null;

                this.instance(results.data).then((results) => {
                    entity = results;
                    deferred.resolve(entity);
                });

                
            });

            return deferred.promise;
        }

        public getAll = () => {

            var deferred = this.$q.defer();

            this.dataService.getAll().then((results) => {
                var entities = [];

                for (var i = 0; i < results.data.length; i++) {
                    entities.push(this.instance(results.data[i]));    
                }
                
                deferred.resolve(entities);
            });

            return deferred.promise;
        }

        public save = () => {

            var deferred = this.$q.defer();

            if (this.id) {
                this.dataService.update(this).then(() => {
                    deferred.resolve();
                });
            } else {
                this.dataService.add(this).then(() => {
                    deferred.resolve();
                });
            }

            return deferred.promise;
        }

        public remove = () => {
            var deferred = this.$q.defer();

            if (this.id) {
                this.dataService.remove(this.id).then(() => {
                    this.isDeleted = true;
                    deferred.resolve();
                });
            } else {
                deferred.reject();
            } 

            return deferred.promise;
        }

        public isValid = ():boolean => {
            if (this.getValidationErrors().length < 1) {
                return true;
            }
            return false;
        }

        public instance = (data: any): ng.IPromise<any> => {
            throw new Error("Not Implemented");
        }

        public getValidationErrors = (): string[]=> {
            throw new Error("Not Implemented");
        }
    }
} 