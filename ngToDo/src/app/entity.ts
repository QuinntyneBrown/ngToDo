/// <reference path="../app/common/common.d.ts" />

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
            var _entity = this;
            var promises = [];
            if (this.isValid()) {
                if (this.id) {
                    promises.push(this.dataService.update(this));
                } else {
                    promises.push(this.dataService.add(this));
                }
            } else {
                deferred.reject();
            }

            this.$q.all(promises).then((results) => {
                this.instance(results[0].data).then((results) => {
                    _entity = results;
                    _entity.notifySaved();
                    deferred.resolve(_entity);
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