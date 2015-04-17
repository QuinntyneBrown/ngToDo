module app.toDo {

    "use strict";

    class ToDo extends common.Entity<ToDo> implements IToDo {

        constructor(public $location: ng.ILocationService,
            public $q: ng.IQService,
            private toDoService: IToDoService,
            private toDoStatuses: IToDoStatuses) {
            super($location,$q, toDoService,'/toDo');
            this.toDoStatus = toDoStatuses.new;
        }

        public instance = (data: any = null) => {
            var deferred = this.$q.defer();

            var toDo;

            if (data === null) {
                toDo = new ToDo(this.$location,this.$q, this.toDoService, this.toDoStatuses);
            } else {
                toDo = new ToDo(this.$location, this.$q, this.toDoService, this.toDoStatuses);
                toDo.id = data.id || 0;
                toDo.name = data.name;
                toDo.description = data.description;
                toDo.toDoStatus = data.toDoStatus || 0;
                toDo.username = data.username;
            }

            deferred.resolve(toDo);

            return deferred.promise;
        }

        public id: number;

        public name: string;

        public description: string;

        public toDoStatus: number;

        public completedDateTime: Date;

        public createdDateTime: Date;

        public getValidationErrors = (): string[]=> {
            
            var validationErrors: string[] = [];

            if (!this.name || this.name.length < 0)
                validationErrors.push("Name can not be empty");

            //if (!this.description || this.description.length < 0)
            //    validationErrors.push("Description can not be empty");

            return validationErrors;
        }

        public complete = () => {
            if (this.isValid()) {
                return this.setStatus(this.toDoStatuses.completed);
            }
        }

        public toDo = () => {
            return this.setStatus(this.toDoStatuses.toDo);
        }

        public toDoNever = () => {
            return this.setStatus(this.toDoStatuses.toDoNever);
        }

        public start = () => {
            return this.setStatus(this.toDoStatuses.started);
        }

        public setStatus = (toDoStatus: number) => {

            var deferred = this.$q.defer();

            this.toDoStatus = toDoStatus;

            this.save().then((results) => {
                deferred.resolve();
            });

            return deferred.promise;            
        }

        public getRecent = () => {

            var deferred = this.$q.defer();

            this.toDoService.getRecent().then((results) => {
                var entities = [];

                var promises = [];

                results.data.forEach((result) => {
                    promises.push(this.instance(result));
                });

                this.$q.all(promises).then((resultsArray) => {
                    resultsArray.forEach((results) => {
                        promises.push(this.instance(results));
                    });                               
                    deferred.resolve(entities);
                });

            });

            return deferred.promise;
        }

    }

    angular.module("app.toDo").service("toDo", ["$location", "$q", "toDoService","toDoStatuses",ToDo]);
} 