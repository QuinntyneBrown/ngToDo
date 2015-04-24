module app.toDo {

    "use strict";

    class ToDo extends common.Entity<ToDo> implements IToDo {

        constructor(public $location: ng.ILocationService,
            public $q: ng.IQService,
            public fire: common.IFire,
            private toDoService: IToDoService,
            private toDoStatuses: IToDoStatuses,
            private toDoPritories: IToDoPritories) {
            super($location,$q, fire, toDoService,'toDo');
            this.toDoStatus = toDoStatuses.new;
            this.toDoPriority = toDoPritories.medium;
        }

        public instance = (data: any = null) => {
            var deferred = this.$q.defer();

            var toDo;

            if (data === null) {
                toDo = new ToDo(this.$location, this.$q, this.fire, this.toDoService, this.toDoStatuses, this.toDoPritories);
            } else {
                toDo = new ToDo(this.$location, this.$q, this.fire, this.toDoService, this.toDoStatuses, this.toDoPritories);
                toDo.id = data.id || 0;
                toDo.name = data.name;
                toDo.description = data.description;
                toDo.toDoStatus = data.toDoStatus;
                toDo.toDoPriority = data.toDoPriority;
                toDo.dueDate = data.dueDate;
                toDo.username = data.username;
            }

            deferred.resolve(toDo);

            return deferred.promise;
        }

        public id: number;

        public name: string;

        public description: string;

        public toDoStatus: number;

        public toDoPriority: number;

        public completedDateTime: Date;

        public createdDateTime: Date;

        public getValidationErrors = (): string[]=> {
            
            var validationErrors: string[] = [];

            if (!this.name || this.name.length < 0)
                validationErrors.push("Name can not be empty");

            // if (!this.description || this.description.length < 0)
            //    validationErrors.push("Description can not be empty");

            return validationErrors;
        }

        public complete = () => {
            if (this.isValid()) {
                return this.setStatus(this.toDoStatuses.completed);
            }
        }

        public toDo = () => {
            if (this.isValid()) {
                return this.setStatus(this.toDoStatuses.toDo);
            }
        }

        public toDoNever = () => {
            if (this.isValid()) {
                return this.setStatus(this.toDoStatuses.toDoNever);    
            }            
        }

        public start = () => {
            if (this.isValid()) {
                return this.setStatus(this.toDoStatuses.started);
            }
        }

        private setStatus = (toDoStatus: number) => {

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

    angular.module("app.toDo").service("toDo", ["$location", "$q","fire","toDoService", "toDoStatuses", "toDoPriorities",ToDo]);
} 