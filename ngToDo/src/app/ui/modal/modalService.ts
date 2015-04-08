module app.ui {

    "use strict";

    class ModalService implements IModalService {

        constructor(private $q: ng.IQService) {
            
        }

        public showModal = (options: IModalOptions) => {

            var deferred = this.$q.defer();


            return deferred.promise;

        }
    }

    angular.module("app.ui").service("modalService", [ModalService]);
} 