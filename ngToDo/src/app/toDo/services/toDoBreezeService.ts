module app.toDo {

    "use strict";

    class ToDoBreezeService implements IToDoService {
        constructor(private $q: ng.IQService) {
            breeze.config.initializeAdapterInstance('modelLibrary', 'backingStore', true);
            breeze.NamingConvention.camelCase.setAsDefault();
            this.entityManager = new breeze.EntityManager("breeze/breezedataservice");
        }

        public getAll = () => {

            var deferred = this.$q.defer();
            var query = new breeze.EntityQuery().from("todos");

            query.using(this.entityManager).execute().then((results: any) => {
                results.data = results.results;
                deferred.resolve(results);
            }).catch((error) => {

            });

            return deferred.promise;
        }

        public getById = (id: any) => {
            var deferred = this.$q.defer();

            id = Math.floor(id);

            var query = new breeze.EntityQuery()
                .from('todos')
                .where('id', '==', <number>id);

            query.using(this.entityManager).execute().then((results: any) => {
                results.data = results.results[0];
                deferred.resolve(results);
            }).catch((error) => {

            });

            return deferred.promise;
        }

        public getRecent = () => {
            var deferred = this.$q.defer();
            var query = new breeze.EntityQuery().from("todos");

            query.using(this.entityManager).execute().then((results:any) => {
                results.data = results.results;
                deferred.resolve(results);
            }).catch((error) => {

            });

            return deferred.promise;
        }

        public remove = (id: any) => {
            var deferred = this.$q.defer();

            return deferred.promise;
        }

        public add = (entity: IToDo) => {
            var deferred = this.$q.defer();

            return deferred.promise;
        }

        public update =(entity: IToDo) => {
            var deferred = this.$q.defer();
            this.entityManager.saveChanges();
            return deferred.promise;
        }

        private entityManager: breeze.EntityManager;
    }

    //angular.module("app.toDo").service("toDoService", ["$q", ToDoBreezeService]);
} 