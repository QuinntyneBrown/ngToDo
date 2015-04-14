module app.ui {

    class DynamicElement implements IDynamicElement {

        constructor(
            private $compile: ng.ICompileService,
            private $http: ng.IHttpService,
            private $q: ng.IQService,
            private $templateCache: ng.ITemplateCacheService,
            private $timeout: ng.ITimeoutService,
            private clientRectEquals: IClientRectEquals,
            private getBoundingRectForDetachedElement: IGetBoundingRectForDetachedElement,
            private getSurroundingWindowSpace: IGetSurroundingWindowSpace,
            private positionDetachedElement: IPositionDetachedElement) {
        }

        public viewBag: any;

        public showDynamicElement = (DynamicElementOptions: IDynamicElementOptions) => {

            var deferred = this.$q.defer();

            this.$timeout.cancel(this.timeoutPromise);

            if (this.clientRectEquals(this.triggerElementRect, DynamicElementOptions.element.getBoundingClientRect())) {
                this.triggerElementRect = null;
                this.hideAsync().then(() => {
                    this.destroy(true);
                    deferred.resolve();

                });

                return deferred.promise;

            } else {
                this.destroy(true);
            }
            this.initialize(DynamicElementOptions);

            this.fetchAndSetTemplateAsync(DynamicElementOptions.templateUrl).then(() => {
                this.DynamicElementElement = this.createDynamicElementElement(this.htmlTemplate);

                (<any>this.$compile)(this.DynamicElementElement)(DynamicElementOptions.triggerScope);

                this.$timeout(() => {
                    this.styleDynamicElement(this.DynamicElementElement, this.displayArrow);

                    var responseDto: IPositionDetachedElementResponseDto = this.positionDetachedElement(DynamicElementOptions.element, this.DynamicElementElement, DynamicElementOptions.directionPriorityList, this.getBoundingRectForDetachedElement(this.DynamicElementElement), this.alignment, this.getSurroundingWindowSpace(DynamicElementOptions.element, window));

                    var arrowElement: HTMLElement = <HTMLElement>this.DynamicElementElement.querySelector(".arrow");

                    var arrowBorderElement: HTMLElement = <HTMLElement>this.DynamicElementElement.querySelector(".arrow-border");

                    switch (responseDto.position) {
                        case "top":
                            arrowElement.style.width = "0px";
                            arrowElement.style.height = "0px";
                            arrowElement.style.borderLeft = "11px solid transparent";
                            arrowElement.style.borderRight = "11px solid transparent";
                            arrowElement.style.borderBottom = "11px solid white";
                            arrowElement.style.position = "absolute";
                            arrowElement.style.marginLeft = ((responseDto.elementRect.width - 15) / 2) + "px";
                            arrowElement.style.top = ((responseDto.elementRect.height - 31) / 2) + "px";
                            break;

                        case "bottom":
                            arrowElement.style.width = "0px";
                            arrowElement.style.height = "0px";
                            arrowElement.style.borderLeft = "11px solid transparent";
                            arrowElement.style.borderRight = "11px solid transparent";
                            arrowElement.style.borderTop = "11px solid white";
                            arrowElement.style.position = "absolute";
                            arrowElement.style.marginLeft = (responseDto.elementRect.width - 15) + "px";
                            arrowElement.style.top = ((responseDto.elementRect.height - 31) / 2) + "px";
                            break;

                        case "left":
                            arrowElement.style.width = "0px";
                            arrowElement.style.height = "0px";
                            arrowElement.style.borderTop = "11px solid transparent";
                            arrowElement.style.borderBottom = "11px solid transparent";
                            arrowElement.style.borderLeft = "11px solid white";
                            arrowElement.style.position = "absolute";
                            arrowElement.style.marginLeft = (responseDto.elementRect.width - 21) + "px";
                            arrowElement.style.top = ((responseDto.elementRect.height - 31) / 2) + "px";

                            break;

                        case "right":
                            arrowElement.style.width = "0px";
                            arrowElement.style.height = "0px";
                            arrowElement.style.borderTop = "11px solid transparent";
                            arrowElement.style.borderBottom = "11px solid transparent";
                            arrowElement.style.borderRight = "11px solid white";
                            arrowElement.style.position = "absolute";
                            arrowElement.style.marginLeft = "-10px";
                            arrowElement.style.top = ((responseDto.elementRect.height - 31) / 2) + "px";
                            break;

                        default:
                    }


                    document.body.appendChild(this.DynamicElementElement);

                    this.$timeout(() => {
                        this.DynamicElementElement.style.opacity = "100";

                        this.hideElementAsync(this.DynamicElementElement, DynamicElementOptions.visibilityDurationInMilliseconds).then((results: any) => {

                        }).then(() => {
                            deferred.resolve();
                        });

                    }, 100);

                }, 0);
            });
            return deferred.promise;
        }

        public dismiss = () => {

            var deferred = this.$q.defer();

            this.$timeout.cancel(this.timeoutPromise);

            var DynamicElementElement = document.querySelector("#pop-up");

            if (DynamicElementElement) {
                this.triggerElementRect = null;
                this.hideAsync().then(() => {
                    this.destroy(true);
                    deferred.resolve();

                });
            } else {
                deferred.resolve();
            }

            return deferred.promise;
        }
        private initialize = (DynamicElementOptions: IDynamicElementOptions) => {
            this.alignment = DynamicElementOptions.alignment || "center";
            this.displayArrow = DynamicElementOptions.displayArrow;
            this.margin = DynamicElementOptions.margin || "5px";
            this.triggerElement = DynamicElementOptions.element;
            this.triggerScope = DynamicElementOptions.triggerScope;
            this.visibilityDurationInMilliseconds = DynamicElementOptions.visibilityDurationInMilliseconds;
            this.triggerElementRect = DynamicElementOptions.element.getBoundingClientRect();
            this.transitionDurationInMilliseconds = DynamicElementOptions.transitionDurationInMilliseconds;
            this.viewBag = DynamicElementOptions.viewBag;
        }

        private fetchAndSetTemplateAsync = (templateUrl: string) => {
            return this.$http({ method: "GET", url: templateUrl, cache: this.$templateCache }).then((results: any) => {
                this.htmlTemplate = results.data;
            });
        }

        private hideElementAsync = (element: HTMLElement, visibilityDurationInMilliseconds: number) => {

            var deferred = this.$q.defer();

            this.timeoutPromise = this.$timeout(() => {
                this.destroy(false).then(() => {
                    deferred.resolve();
                });
            }, visibilityDurationInMilliseconds);

            return deferred.promise;
        }

        private processResponse(results) {
            var deferred = this.$q.defer();

            this.createDynamicElementElement(results.data);

            (<any>this.$compile)(this.DynamicElementElement)(this.triggerScope);

            deferred.resolve();
            return deferred.promise;
        }
        private createDynamicElementElement = (template: string) => {
            var DynamicElementElement = document.createElement("div");
            DynamicElementElement.id = "pop-up";

            var arrowElement = document.createElement("div");
            arrowElement.setAttribute("class", "arrow");
            DynamicElementElement.appendChild(arrowElement);

            var arrowBorderElement = document.createElement("div");
            arrowBorderElement.setAttribute("class", "arrow-border");
            DynamicElementElement.appendChild(arrowBorderElement);

            var innerElement = document.createElement("div");
            innerElement.setAttribute("class", "inner");
            innerElement.innerHTML = template;
            DynamicElementElement.appendChild(innerElement);

            return DynamicElementElement;
        }

        private destroy = (force: boolean) => {

            var deferred = this.$q.defer();

            var DynamicElementElement = document.getElementById("pop-up");

            if (!force) {
                this.$timeout(() => { DynamicElementElement.style.opacity = "0"; }, 0)
                    .then(() => {

                    this.triggerElementRect = null;
                    this.$timeout(() => {
                        if (DynamicElementElement && DynamicElementElement.parentNode) {
                            DynamicElementElement.parentNode.removeChild(DynamicElementElement);
                        }
                    }, this.transitionDurationInMilliseconds).then(() => {
                        deferred.resolve();
                    });
                });

                return deferred.promise;

            } else {


                if (DynamicElementElement) {
                    try {
                        DynamicElementElement.parentNode.removeChild(DynamicElementElement);
                    } catch (error) {
                        console.log("error");
                    }
                }
            }
        }

        private setOpacityToZeroAsync = () => {
            var deferred = this.$q.defer();

            this.$timeout(() => {
                this.DynamicElementElement.style.opacity = "0";
                deferred.resolve();
            }, 0);

            return deferred.promise;
        }

        private waitForTransitionAsync = () => {
            var deferred = this.$q.defer();

            this.$timeout(() => {
                deferred.resolve();
            }, this.transitionDurationInMilliseconds);

            return deferred.promise;
        }

        private hideAsync = () => {

            var deferred = this.$q.defer();

            this.setOpacityToZeroAsync()
                .then(this.waitForTransitionAsync)
                .then(() => {
                deferred.resolve();
            });


            return deferred.promise;
        }
        private styleDynamicElement = (DynamicElementElement: HTMLElement, displayArrow: boolean) => {
            DynamicElementElement.setAttribute("class", "pop-up");
            DynamicElementElement.setAttribute("style", "-webkit-transition: opacity " + this.transitionDurationInMilliseconds + "ms ease-in-out;-o-transition: opacity " + this.transitionDurationInMilliseconds + "ms ease-in-out;transition: opacity " + this.transitionDurationInMilliseconds + "ms ease-in-out;");
            DynamicElementElement.style.opacity = "0";
            DynamicElementElement.style.position = "absolute";
            DynamicElementElement.style.display = "block";

            if (displayArrow) {
                DynamicElementElement.style.border = "10px solid transparent";
            }

            var innerElement: HTMLElement = <HTMLElement>DynamicElementElement.querySelector(".inner");
            innerElement.setAttribute("style", "-webkit-box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);border-radius:5px;");
            innerElement.style.backgroundColor = "white";
            innerElement.style.margin = this.margin;
            innerElement.style.border = "1px solid #cccccc";
            innerElement.style.boxShadow = "0 5px 10px rgba(0, 0, 0, 0.2)";
        }

        private triggerElementRect: ClientRect;

        private timeoutPromise: ng.IPromise<any>;

        private transitionDurationInMilliseconds: number;

        private visibilityDurationInMilliseconds: number;

        private triggerElement: HTMLElement;

        private DynamicElementElement: HTMLElement;

        private triggerScope: IDynamicElementScope;

        private htmlTemplate: string;

        private alignment: string;

        private margin: string;

        private displayArrow: boolean;

        private position: string;

    }

    angular.module("app.ui").service("dynamicElement", [
        "$compile",
        "$http",
        "$q",
        "$templateCache",
        "$timeout",
        "clientRectEquals",
        "getBoundingRectForDetachedElement",
        "getSurroundingWindowSpace",
        "positionDetachedElement",
        DynamicElement]);
}