module app.common {

    export class Entity<T> implements IEntity<T> {

        constructor(public $location, public $q: ng.IQService, private dataService: common.IDataService, public baseUri: string) {
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

                for (var i = 0; i < results.data.length; i++) {
                    promises.push(this.instance(results.data[i]));
                }

                this.$q.all(promises).then((allResults) => {
                    for (var x = 0; x < allResults.length; x++) {
                        entities.push(allResults[x]);
                    }
                    deferred.resolve(entities);
                });
            });

            return deferred.promise;
        }

        public save = () => {
            
            var deferred = this.$q.defer();

            if (this.isValid()) {
                if (this.id) {
                    this.dataService.update(this).then(() => {
                        this.notifySaved();
                        deferred.resolve();
                    });
                } else {
                    this.dataService.add(this).then(() => {
                        this.notifySaved();
                        deferred.resolve();
                    });
                }
            } else {
                deferred.reject();
            }

            return deferred.promise;
        }

        public remove = () => {
            var deferred = this.$q.defer();

            if (this.id) {
                this.dataService.remove(this.id).then(() => {
                    this.isDeleted = true;
                    this.notifyDeleted();
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

        public notifySaved = () => {
            this.notifyChanged("saved");
        }

        public notifyDeleted = () => {
            this.notifyChanged("deleted");
        }

        public notifyChanged(changeType:string) {
            this.notify("entityChanged",{ target: this, changeType: changeType });
        }

        public notify(customeEventName: string, detailArg:any) {
            var event = document.createEvent('CustomEvent');
            event.initCustomEvent(customeEventName, false, false, detailArg);
            document.dispatchEvent(event);
        }

        public instance = (data: any): ng.IPromise<any> => {
            throw new Error("Not Implemented");
        }

        public getValidationErrors = (): string[]=> {
            throw new Error("Not Implemented");
        }
    }
} 