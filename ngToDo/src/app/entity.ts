module app.common {

    export class Entity<T> implements IEntity<T> {

        constructor(public $location, public $q: ng.IQService, public fire:IFire, private dataService: common.IDataService, public entityName: string) {
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

                var promises = [];

                results.data.forEach((result) => { promises.push(this.instance(result)); });

                this.$q.all(promises).then((allResults) => {

                    allResults.forEach((result) => { entities.push(result); });

                    deferred.resolve(entities);
                });
            });

            return deferred.promise;
        }

        public save = () => {
            
            var deferred = this.$q.defer();

            var promises = [];

            var action: string;

            if (this.isValid()) {
                if (this.id) {
                    action = "update";
                    promises.push(this.dataService.update(this));
                } else {
                    action = "add";
                    promises.push(this.dataService.add(this));
                }
            } else {
                deferred.reject();
            }

            this.$q.all(promises).then((results) => {
                this.instance(results[0].data).then((results) => {                    
                    this.fire(document.getElementsByTagName("body")[0], this.entityName + "Saved", { entity: this, action: action });
                    deferred.resolve();
                });
            }).catch(() => {
                deferred.reject();
            });

            return deferred.promise;
        }

        public remove = () => {
            var deferred = this.$q.defer();

            if (this.id) {
                this.dataService.remove(this.id).then(() => {         
                    this.fire(document.getElementsByTagName("body")[0], this.entityName + "Removed", { entity: this, action: "remove" });           
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