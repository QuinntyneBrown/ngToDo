var app;
(function (app) {
    var DataService = (function () {
        function DataService($http, $cacheFactory, $q, baseUri) {
            var _this = this;
            this.$http = $http;
            this.$cacheFactory = $cacheFactory;
            this.$q = $q;
            this.baseUri = baseUri;
            this.add = function (options) {
                var deferred = _this.$q.defer();
                _this.$http({ method: "POST", url: _this.baseUri + "add", data: options.entity }).then(function (results) {
                    deferred.resolve(results);
                }).catch(function (error) {
                    deferred.reject(error);
                });
                return deferred.promise;
            };
            this.update = function (options) {
                var deferred = _this.$q.defer();
                _this.$http({ method: "POST", url: _this.baseUri + "add", data: options.entity }).then(function (results) {
                    deferred.resolve(results);
                }).catch(function (error) {
                    deferred.reject(error);
                });
                return deferred.promise;
            };
            this.getById = function (id) {
                var deferred = _this.$q.defer();
                _this.$http({ method: "GET", url: _this.baseUri + "getbyid?id=" + id }).then(function (results) {
                    deferred.resolve(results);
                }).catch(function (error) {
                    deferred.reject(error);
                });
                return deferred.promise;
            };
            this.getAll = function () {
                var deferred = _this.$q.defer();
                _this.$http({ method: "GET", url: _this.baseUri + "getAll" }).then(function (results) {
                    deferred.resolve(results.data);
                }).catch(function (error) {
                    deferred.reject(error);
                });
                return deferred.promise;
            };
            this.remove = function (id) {
                var deferred = _this.$q.defer();
                _this.$http({ method: "DELETE", url: _this.baseUri + "remove?id=" + id }).then(function (results) {
                    deferred.resolve(results);
                }).catch(function (error) {
                    deferred.reject(error);
                });
                return deferred.promise;
            };
            this.deleteFromCache = function (key) {
            };
        }
        DataService.prototype.fromCacheOrService = function (action, key) {
            var deferred = this.$q.defer();
            var dataCache = this.$cacheFactory.get(key);
            if (!dataCache) {
                this.$http({ method: "GET", url: this.baseUri + "getAll" }).then(function (results) {
                    deferred.resolve(results.data);
                }).catch(function (error) {
                    deferred.reject(error);
                });
            }
            else {
                deferred.resolve(dataCache);
            }
            return deferred.promise;
        };
        return DataService;
    })();
    app.DataService = DataService;
})(app || (app = {}));

//# sourceMappingURL=app.base.js.map
var app;
(function (app) {
    var AppController = (function () {
        function AppController($router) {
            $router.config([
                { path: '/', component: 'toDoRecent' }
            ]);
        }
        return AppController;
    })();
    app.AppController = AppController;
})(app || (app = {}));

//# sourceMappingURL=app.controller.js.map
var app;
(function (app) {
    angular.module("app", [
        "ngNewRouter",
        "app.common",
        "app.toDo",
        "app.ui"
    ]).config([
        "$componentLoaderProvider",
        "$httpProvider",
        "apiEndpointProvider",
        config
    ]).controller("appController", ["$router", app.AppController]);
    function config($componentLoaderProvider, $httpProvider, apiEndpointProvider) {
        $componentLoaderProvider.setTemplateMapping(function (name) {
            // name is component namegu
            return 'src/app/toDo/views/' + name + '.html';
        });
        $httpProvider.interceptors.push("requestCounter");
        apiEndpointProvider.configure("/api/");
    }
})(app || (app = {}));

//# sourceMappingURL=app.module.js.map
var app;
(function (app) {
    var common;
    (function (common) {
        angular.module("app.common", []);
    })(common = app.common || (app.common = {}));
})(app || (app = {}));

//# sourceMappingURL=../common/common.module.js.map
var app;
(function (app) {
    var ui;
    (function (ui) {
        angular.module("app.ui", []);
    })(ui = app.ui || (app.ui = {}));
})(app || (app = {}));

//# sourceMappingURL=../ui/ui.module.js.map
var app;
(function (app) {
    var toDo;
    (function (toDo) {
        angular.module("app.toDo", [
            "app.common",
            "app.ui"
        ]);
    })(toDo = app.toDo || (app.toDo = {}));
})(app || (app = {}));

//# sourceMappingURL=../toDo/toDo.module.js.map
var app;
(function (app) {
    var toDo;
    (function (toDo) {
        'use strict';
        var Routes = (function () {
            function Routes() {
            }
            Routes.configure = function ($routeProvider, toDoDetailControllerActivateFn, toDoRecentControllerActivateFn, toDoListControllerActivateFn, toDoFormControllerActivateFn) {
                $routeProvider.when('/', {
                    controller: 'toDoRecentController',
                    controllerAs: 'toDoRecent',
                    templateUrl: '/src/toDo/views/recent.html',
                    resolve: toDoRecentControllerActivateFn,
                    caseInsensitiveMatch: false
                });
                $routeProvider.when('/about', {
                    templateUrl: '/src/toDo/views/about.html',
                    caseInsensitiveMatch: false
                });
                $routeProvider.when('/toDo/edit/:toDoId', {
                    controller: 'toDoFormController',
                    controllerAs: 'toDoDetail',
                    templateUrl: '/src/toDo/views/form.html',
                    resolve: toDoDetailControllerActivateFn,
                    caseInsensitiveMatch: false
                });
                $routeProvider.when('/toDo/create', {
                    controller: 'toDoFormController',
                    controllerAs: 'toDoForm',
                    templateUrl: '/src/toDo/views/form.html',
                    caseInsensitiveMatch: false
                });
                $routeProvider.when('/toDo/list', {
                    controller: 'toDoListController',
                    controllerAs: 'toDoList',
                    templateUrl: '/src/toDo/views/list.html',
                    resolve: toDoListControllerActivateFn,
                    caseInsensitiveMatch: false
                });
                $routeProvider.when('/toDo/:toDoId', {
                    controller: 'toDoDetailController',
                    controllerAs: 'toDoDetail',
                    templateUrl: '/src/toDo/views/detail.html',
                    resolve: toDoDetailControllerActivateFn,
                    caseInsensitiveMatch: false
                });
                $routeProvider.otherwise({ redirectTo: '/' });
            };
            return Routes;
        })();
        toDo.Routes = Routes;
    })(toDo = app.toDo || (app.toDo = {}));
})(app || (app = {}));

//# sourceMappingURL=../toDo/toDo.routes.js.map
var app;
(function (app) {
    var common;
    (function (common) {
        "use strict";
        var ApiEndpointProvider = (function () {
            function ApiEndpointProvider() {
                this.config = {
                    baseUrl: "/api/"
                };
            }
            ApiEndpointProvider.prototype.configure = function (baseUrl) {
                this.config = {
                    baseUrl: baseUrl
                };
            };
            ApiEndpointProvider.prototype.$get = function () {
                return this.config;
            };
            return ApiEndpointProvider;
        })();
        common.ApiEndpointProvider = ApiEndpointProvider;
        angular.module("app.common").provider("apiEndpoint", ApiEndpointProvider);
    })(common = app.common || (app.common = {}));
})(app || (app = {}));

//# sourceMappingURL=../../common/services/apiEndpointProvider.js.map
var app;
(function (app) {
    var common;
    (function (common) {
        var RequestCounter = (function () {
            function RequestCounter($q) {
                var _this = this;
                this.$q = $q;
                this.requests = 0;
                this.request = function (config) {
                    _this.requests += 1;
                    return _this.$q.when(config);
                };
                this.requestError = function (error) {
                    _this.requests -= 1;
                    return _this.$q.reject(error);
                };
                this.response = function (response) {
                    _this.requests -= 1;
                    return _this.$q.when(response);
                };
                this.responseError = function (error) {
                    _this.requests -= 1;
                    return _this.$q.reject(error);
                };
                this.getRequestCount = function () {
                    return _this.requests;
                };
            }
            RequestCounter.instance = function ($q) {
                return new RequestCounter($q);
            };
            return RequestCounter;
        })();
        common.RequestCounter = RequestCounter;
        angular.module("app.common").factory("requestCounter", ["$q", RequestCounter.instance]);
    })(common = app.common || (app.common = {}));
})(app || (app = {}));

//# sourceMappingURL=../../common/services/requestCounter.js.map
var app;
(function (app) {
    var common;
    (function (common) {
        "use strict";
        var WorkSpinner = (function () {
            function WorkSpinner(requestCounter) {
                var _this = this;
                this.requestCounter = requestCounter;
                this.restrict = "E";
                this.replace = true;
                this.scope = {};
                this.template = "<div ng-show='requestCount' class='work-spinner'><i class='fa fa-spinner fa-spin fade'></i></div>";
                this.link = function (scope) {
                    scope.$watch(function () {
                        return _this.requestCounter.getRequestCount();
                    }, function (requestCount) {
                        scope.requestCount = requestCount;
                    });
                };
            }
            WorkSpinner.instance = function (requestCounter) {
                return new WorkSpinner(requestCounter);
            };
            return WorkSpinner;
        })();
        angular.module("app.common").directive("workSpinner", ["requestCounter", WorkSpinner.instance]);
    })(common = app.common || (app.common = {}));
})(app || (app = {}));

//# sourceMappingURL=../../common/directives/workSpinner.js.map
var app;
(function (app) {
    var ui;
    (function (ui) {
        var AppHeader = (function () {
            function AppHeader() {
                this.templateUrl = "src/app/ui/appHeader/appHeader.html";
                this.replace = true;
                this.restrict = "E";
                this.controller = "appHeaderController";
                this.controllerAs = "appHeader";
                this.scope = {
                    title: "@"
                };
                this.link = function (scope, element, attributes) {
                };
            }
            AppHeader.instance = function () {
                return new AppHeader();
            };
            return AppHeader;
        })();
        ui.AppHeader = AppHeader;
        angular.module("app.ui").directive("appHeader", [AppHeader.instance]);
    })(ui = app.ui || (app.ui = {}));
})(app || (app = {}));

//# sourceMappingURL=../../ui/appHeader/appHeader.js.map
var app;
(function (app) {
    var ui;
    (function (ui) {
        var AppHeaderController = (function () {
            function AppHeaderController() {
            }
            return AppHeaderController;
        })();
        ui.AppHeaderController = AppHeaderController;
        angular.module("app.ui").controller("appHeaderController", [AppHeaderController]);
    })(ui = app.ui || (app.ui = {}));
})(app || (app = {}));

//# sourceMappingURL=../../ui/appHeader/appHeaderController.js.map
var app;
(function (app) {
    var ui;
    (function (ui) {
        var AppFooter = (function () {
            function AppFooter() {
                this.templateUrl = "src/app/ui/appFooter/appFooter.html";
                this.replace = true;
                this.restrict = "E";
                this.controller = "appFooterController";
                this.controllerAs = "appFooter";
                this.scope = {
                    viewBag: "="
                };
                this.link = function (scope, element, attributes) {
                };
            }
            AppFooter.instance = function () {
                return new AppFooter();
            };
            return AppFooter;
        })();
        ui.AppFooter = AppFooter;
        angular.module("app.ui").directive("appFooter", [AppFooter.instance]);
    })(ui = app.ui || (app.ui = {}));
})(app || (app = {}));

//# sourceMappingURL=../../ui/appFooter/appFooter.js.map
var app;
(function (app) {
    var ui;
    (function (ui) {
        var AppFooterController = (function () {
            function AppFooterController() {
            }
            return AppFooterController;
        })();
        ui.AppFooterController = AppFooterController;
        angular.module("app.ui").controller("appFooterController", [AppFooterController]);
    })(ui = app.ui || (app.ui = {}));
})(app || (app = {}));

//# sourceMappingURL=../../ui/appFooter/appFooterController.js.map
var app;
(function (app) {
    var toDo;
    (function (_toDo) {
        "use strict";
        var ToDoDetailController = (function () {
            function ToDoDetailController(toDoService, $routeParams) {
                var _this = this;
                this.toDoService = toDoService;
                this.$routeParams = $routeParams;
                this.canActivate = function () {
                    return _this.toDoService.getById(_this.$routeParams.toDoId).then(function (toDo) {
                        _this.toDo = toDo;
                    });
                };
                toDoService.getById($routeParams.toDoId).then(function (toDo) {
                    return toDo;
                });
            }
            return ToDoDetailController;
        })();
        angular.module("app.toDo").controller("ToDoDetailController", ["toDo", ToDoDetailController]);
    })(toDo = app.toDo || (app.toDo = {}));
})(app || (app = {}));

//# sourceMappingURL=../../toDo/controllers/toDoDetailController.js.map
var app;
(function (app) {
    var toDo;
    (function (_toDo) {
        "use strict";
        var ToDoFormController = (function () {
            function ToDoFormController(toDo) {
                this.toDo = toDo;
            }
            ToDoFormController.canActivate = {
                toDo: [
                    "toDoService",
                    "$routeParams",
                    function (toDoService, $routeParams) {
                        return toDoService.getById($routeParams.toDoId).then(function (toDo) {
                            return toDo;
                        });
                    }
                ]
            };
            return ToDoFormController;
        })();
        angular.module("app.toDo").controller("ToDoFormController", ["toDo", ToDoFormController]);
    })(toDo = app.toDo || (app.toDo = {}));
})(app || (app = {}));

//# sourceMappingURL=../../toDo/controllers/toDoFormController.js.map
var app;
(function (app) {
    var toDo;
    (function (toDo) {
        "use strict";
        var ToDoListController = (function () {
            function ToDoListController(toDos) {
                this.toDos = toDos;
            }
            ToDoListController.canActivate = {
                toDos: [
                    "toDoService",
                    function (toDoService) {
                        return toDoService.getAll().then(function (toDos) {
                            return toDos;
                        });
                    }
                ]
            };
            return ToDoListController;
        })();
        angular.module("app.toDo").controller("ToDoListController", ["toDos", ToDoListController]);
    })(toDo = app.toDo || (app.toDo = {}));
})(app || (app = {}));

//# sourceMappingURL=../../toDo/controllers/toDoListController.js.map
var app;
(function (app) {
    var toDo;
    (function (toDo) {
        "use strict";
        var ToDoRecentController = (function () {
            function ToDoRecentController($q, toDoService) {
                var _this = this;
                this.$q = $q;
                this.toDoService = toDoService;
                this.canActivate = function () {
                    var deferred = _this.$q.defer();
                    _this.toDoService.getRecent().then(function (results) {
                        _this.toDos = results;
                        deferred.resolve(true);
                    }).catch(function (Error) {
                        deferred.resolve(false);
                    });
                    return deferred.promise;
                };
            }
            return ToDoRecentController;
        })();
        angular.module("app.toDo").controller("ToDoRecentController", ["$q", "toDoService", ToDoRecentController]);
    })(toDo = app.toDo || (app.toDo = {}));
})(app || (app = {}));

//# sourceMappingURL=../../toDo/controllers/toDoRecentController.js.map
var app;
(function (app) {
    var toDo;
    (function (toDo) {
        var ToDoItem = (function () {
            function ToDoItem() {
                this.controller = "toDoItemController";
                this.controllerAs = "toDo";
                this.restrict = "E";
                this.replace = true;
                this.templateUrl = "/src/app/toDo/directives/toDoItem.html";
                this.scope = {
                    toDoItem: "="
                };
                this.link = function (scope, element, attributes) {
                };
            }
            ToDoItem.instance = function () {
                return new ToDoItem();
            };
            return ToDoItem;
        })();
        angular.module("app.toDo").directive("toDoItem", [ToDoItem.instance]);
    })(toDo = app.toDo || (app.toDo = {}));
})(app || (app = {}));

//# sourceMappingURL=../../toDo/directives/toDoItem.js.map
var app;
(function (app) {
    var toDo;
    (function (_toDo) {
        var ToDoItemController = (function () {
            function ToDoItemController(toDo) {
                this.toDo = toDo;
            }
            return ToDoItemController;
        })();
        angular.module("app.toDo").controller("toDoItemController", [ToDoItemController]);
    })(toDo = app.toDo || (app.toDo = {}));
})(app || (app = {}));

//# sourceMappingURL=../../toDo/directives/toDoItemController.js.map
var app;
(function (app) {
    var toDo;
    (function (toDo) {
        var ToDoItems = (function () {
            function ToDoItems() {
                this.controller = "toDoItemsController";
                this.controllerAs = "toDoItems";
                this.replace = true;
                this.restrict = "E";
                this.templateUrl = "/src/app/toDo/directives/toDoItems.html";
                this.scope = {
                    toDoItems: "="
                };
                this.link = function (scope, element, attributes) {
                };
            }
            ToDoItems.instance = function () {
                return new ToDoItems();
            };
            return ToDoItems;
        })();
        angular.module("app.toDo").directive("toDoItems", [ToDoItems.instance]);
    })(toDo = app.toDo || (app.toDo = {}));
})(app || (app = {}));

//# sourceMappingURL=../../toDo/directives/toDoItems.js.map
var app;
(function (app) {
    var toDo;
    (function (toDo) {
        var ToDoItemsController = (function () {
            function ToDoItemsController() {
            }
            return ToDoItemsController;
        })();
        angular.module("app.toDo").controller("toDoItemsController", [ToDoItemsController]);
    })(toDo = app.toDo || (app.toDo = {}));
})(app || (app = {}));

//# sourceMappingURL=../../toDo/directives/toDoItemsController.js.map
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var app;
(function (app) {
    var toDo;
    (function (toDo) {
        "use strict";
        var toDoService = (function (_super) {
            __extends(toDoService, _super);
            function toDoService($http, $cacheFactory, $q, apiEndpoint) {
                var _this = this;
                _super.call(this, $http, $cacheFactory, $q, apiEndpoint.baseUrl + "todo/");
                this.$http = $http;
                this.$cacheFactory = $cacheFactory;
                this.$q = $q;
                this.apiEndpoint = apiEndpoint;
                this.getRecent = function () {
                    var deferred = _this.$q.defer();
                    _this.$http({ method: "GET", url: _this.baseUri + "getRecent" }).then(function (results) {
                        deferred.resolve(results.data);
                    }).catch(function (error) {
                        deferred.reject(error);
                    });
                    return deferred.promise;
                };
            }
            return toDoService;
        })(app.DataService);
        angular.module("app.toDo").service("toDoService", ["$http", "$cacheFactory", "$q", "apiEndpoint", toDoService]);
    })(toDo = app.toDo || (app.toDo = {}));
})(app || (app = {}));

//# sourceMappingURL=../../toDo/services/toDoService.js.map