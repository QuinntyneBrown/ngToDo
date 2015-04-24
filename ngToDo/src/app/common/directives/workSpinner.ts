module app.common {

    "use strict";

    class WorkSpinner implements ng.IDirective {

        constructor(private requestCounter: IRequestCounter) {

        }

        public static instance = (requestCounter: IRequestCounter) => {
            return new WorkSpinner(requestCounter);
        }

        public restrict: string = "E";

        public replace: boolean = true;

        public scope:any = {};

        public template = "<div data-ng-show='requestCount > 0' class='work-spinner'><i class='fa fa-spinner fa-spin fade'></i></div>";

        public link = (scope: ng.IScope) => {
            scope.$watch(() => {
                return this.requestCounter.getRequestCount();
            },(requestCount:number) => {
                    scope["requestCount"] = requestCount;
            });

        };

    }

    angular.module("app.common").directive("workSpinner", ["requestCounter",WorkSpinner.instance]);
} 