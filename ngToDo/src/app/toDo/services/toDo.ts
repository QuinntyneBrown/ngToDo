module app.toDo {
    
    class ToDo extends common.Entity<ToDo> implements IToDo {

        constructor(public $q: ng.IQService, private toDoService: IToDoService) {
            super($q, toDoService);
            this.status = 1;
        }

        public instance = (data: any = null) => {
            var deferred = this.$q.defer();

            var toDo;

            if (data === null) {
                toDo = new ToDo(this.$q, this.toDoService);
            } else {
                toDo = new ToDo(this.$q, this.toDoService);
                toDo.id = data.id || 0;
                toDo.name = data.name;
                toDo.description = data.description;
                toDo.status = data.status || 1;
            }

            deferred.resolve(toDo);

            return deferred.promise;
        }

        public id: number;

        public name: string;

        public description: string;

        public status: number;

        public completedDateTime: Date;

        public createdDateTime: Date;

        public getValidationErrors = (): string[]=> {
            
            var validationErrors: string[] = [];

            if (this.name.length < 0)
                validationErrors.push("Name can not be empty");

            if (this.description.length < 0)
                validationErrors.push("Description can not be empty");

            return validationErrors;
        }

        public complete = () => {

            return this.setStatus(5);
        }

        public toDo = () => {
            return this.setStatus(2);
        }

        public toDoNever = () => {
            return this.setStatus(3);
        }

        public start = () => {
            return this.setStatus(4);
        }

        public setStatus = (status: number) => {

            var deferred = this.$q.defer();

            this.status = status;

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

    }

    angular.module("app.toDo").service("toDo", ["$q","toDoService",ToDo]);
} 