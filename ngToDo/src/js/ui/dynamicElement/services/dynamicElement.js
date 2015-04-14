var app;
(function (app) {
    var ui;
    (function (ui) {
        var DynamicElement = (function () {
            function DynamicElement($compile, $http, $q, $templateCache, $timeout, clientRectEquals, getBoundingRectForDetachedElement, getSurroundingWindowSpace, positionDetachedElement) {
                var _this = this;
                this.$compile = $compile;
                this.$http = $http;
                this.$q = $q;
                this.$templateCache = $templateCache;
                this.$timeout = $timeout;
                this.clientRectEquals = clientRectEquals;
                this.getBoundingRectForDetachedElement = getBoundingRectForDetachedElement;
                this.getSurroundingWindowSpace = getSurroundingWindowSpace;
                this.positionDetachedElement = positionDetachedElement;
                this.showDynamicElement = function (DynamicElementOptions) {
                    var deferred = _this.$q.defer();
                    _this.$timeout.cancel(_this.timeoutPromise);
                    if (_this.clientRectEquals(_this.triggerElementRect, DynamicElementOptions.element.getBoundingClientRect())) {
                        _this.triggerElementRect = null;
                        _this.hideAsync().then(function () {
                            _this.destroy(true);
                            deferred.resolve();
                        });
                        return deferred.promise;
                    }
                    else {
                        _this.destroy(true);
                    }
                    _this.initialize(DynamicElementOptions);
                    _this.fetchAndSetTemplateAsync(DynamicElementOptions.templateUrl).then(function () {
                        _this.DynamicElementElement = _this.createDynamicElementElement(_this.htmlTemplate);
                        _this.$compile(_this.DynamicElementElement)(DynamicElementOptions.triggerScope);
                        _this.$timeout(function () {
                            _this.styleDynamicElement(_this.DynamicElementElement, _this.displayArrow);
                            var responseDto = _this.positionDetachedElement(DynamicElementOptions.element, _this.DynamicElementElement, DynamicElementOptions.directionPriorityList, _this.getBoundingRectForDetachedElement(_this.DynamicElementElement), _this.alignment, _this.getSurroundingWindowSpace(DynamicElementOptions.element, window));
                            var arrowElement = _this.DynamicElementElement.querySelector(".arrow");
                            var arrowBorderElement = _this.DynamicElementElement.querySelector(".arrow-border");
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
                            document.body.appendChild(_this.DynamicElementElement);
                            _this.$timeout(function () {
                                _this.DynamicElementElement.style.opacity = "100";
                                _this.hideElementAsync(_this.DynamicElementElement, DynamicElementOptions.visibilityDurationInMilliseconds).then(function (results) {
                                }).then(function () {
                                    deferred.resolve();
                                });
                            }, 100);
                        }, 0);
                    });
                    return deferred.promise;
                };
                this.dismiss = function () {
                    var deferred = _this.$q.defer();
                    _this.$timeout.cancel(_this.timeoutPromise);
                    var DynamicElementElement = document.querySelector("#pop-up");
                    if (DynamicElementElement) {
                        _this.triggerElementRect = null;
                        _this.hideAsync().then(function () {
                            _this.destroy(true);
                            deferred.resolve();
                        });
                    }
                    else {
                        deferred.resolve();
                    }
                    return deferred.promise;
                };
                this.initialize = function (DynamicElementOptions) {
                    _this.alignment = DynamicElementOptions.alignment || "center";
                    _this.displayArrow = DynamicElementOptions.displayArrow;
                    _this.margin = DynamicElementOptions.margin || "5px";
                    _this.triggerElement = DynamicElementOptions.element;
                    _this.triggerScope = DynamicElementOptions.triggerScope;
                    _this.visibilityDurationInMilliseconds = DynamicElementOptions.visibilityDurationInMilliseconds;
                    _this.triggerElementRect = DynamicElementOptions.element.getBoundingClientRect();
                    _this.transitionDurationInMilliseconds = DynamicElementOptions.transitionDurationInMilliseconds;
                    _this.viewBag = DynamicElementOptions.viewBag;
                };
                this.fetchAndSetTemplateAsync = function (templateUrl) {
                    return _this.$http({ method: "GET", url: templateUrl, cache: _this.$templateCache }).then(function (results) {
                        _this.htmlTemplate = results.data;
                    });
                };
                this.hideElementAsync = function (element, visibilityDurationInMilliseconds) {
                    var deferred = _this.$q.defer();
                    _this.timeoutPromise = _this.$timeout(function () {
                        _this.destroy(false).then(function () {
                            deferred.resolve();
                        });
                    }, visibilityDurationInMilliseconds);
                    return deferred.promise;
                };
                this.createDynamicElementElement = function (template) {
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
                };
                this.destroy = function (force) {
                    var deferred = _this.$q.defer();
                    var DynamicElementElement = document.getElementById("pop-up");
                    if (!force) {
                        _this.$timeout(function () {
                            DynamicElementElement.style.opacity = "0";
                        }, 0).then(function () {
                            _this.triggerElementRect = null;
                            _this.$timeout(function () {
                                if (DynamicElementElement && DynamicElementElement.parentNode) {
                                    DynamicElementElement.parentNode.removeChild(DynamicElementElement);
                                }
                            }, _this.transitionDurationInMilliseconds).then(function () {
                                deferred.resolve();
                            });
                        });
                        return deferred.promise;
                    }
                    else {
                        if (DynamicElementElement) {
                            try {
                                DynamicElementElement.parentNode.removeChild(DynamicElementElement);
                            }
                            catch (error) {
                                console.log("error");
                            }
                        }
                    }
                };
                this.setOpacityToZeroAsync = function () {
                    var deferred = _this.$q.defer();
                    _this.$timeout(function () {
                        _this.DynamicElementElement.style.opacity = "0";
                        deferred.resolve();
                    }, 0);
                    return deferred.promise;
                };
                this.waitForTransitionAsync = function () {
                    var deferred = _this.$q.defer();
                    _this.$timeout(function () {
                        deferred.resolve();
                    }, _this.transitionDurationInMilliseconds);
                    return deferred.promise;
                };
                this.hideAsync = function () {
                    var deferred = _this.$q.defer();
                    _this.setOpacityToZeroAsync().then(_this.waitForTransitionAsync).then(function () {
                        deferred.resolve();
                    });
                    return deferred.promise;
                };
                this.styleDynamicElement = function (DynamicElementElement, displayArrow) {
                    DynamicElementElement.setAttribute("class", "pop-up");
                    DynamicElementElement.setAttribute("style", "-webkit-transition: opacity " + _this.transitionDurationInMilliseconds + "ms ease-in-out;-o-transition: opacity " + _this.transitionDurationInMilliseconds + "ms ease-in-out;transition: opacity " + _this.transitionDurationInMilliseconds + "ms ease-in-out;");
                    DynamicElementElement.style.opacity = "0";
                    DynamicElementElement.style.position = "absolute";
                    DynamicElementElement.style.display = "block";
                    if (displayArrow) {
                        DynamicElementElement.style.border = "10px solid transparent";
                    }
                    var innerElement = DynamicElementElement.querySelector(".inner");
                    innerElement.setAttribute("style", "-webkit-box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);border-radius:5px;");
                    innerElement.style.backgroundColor = "white";
                    innerElement.style.margin = _this.margin;
                    innerElement.style.border = "1px solid #cccccc";
                    innerElement.style.boxShadow = "0 5px 10px rgba(0, 0, 0, 0.2)";
                };
            }
            DynamicElement.prototype.processResponse = function (results) {
                var deferred = this.$q.defer();
                this.createDynamicElementElement(results.data);
                this.$compile(this.DynamicElementElement)(this.triggerScope);
                deferred.resolve();
                return deferred.promise;
            };
            return DynamicElement;
        })();
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
            DynamicElement
        ]);
    })(ui = app.ui || (app.ui = {}));
})(app || (app = {}));

//# sourceMappingURL=../../../ui/dynamicElement/services/dynamicElement.js.map