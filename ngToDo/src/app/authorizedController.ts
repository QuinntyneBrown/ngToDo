module app.security {

    export class AuthorizedController {

        constructor(public $location: ng.ILocationService,
            public token: common.ISessionStorageProperty) {

        }

        public canActivate() {
            if (this.token.get())
                return true;

            this.$location.path("/login");

            return false;
        }
    }
} 