module app.security {

    "use strict";

    export class AuthenticatedController {

        constructor(public $location: ng.ILocationService, public $timeout: ng.ITimeoutService, public token: common.ISessionStorageProperty) {

        }

        public canActivate = () => {
            if (this.token.get())
                return true;

            this.promise = this.$timeout(() => {
                this.$location.path("/login");
            },0);

            return false;
        }

        public promise: ng.IPromise<any>;
    }
} 