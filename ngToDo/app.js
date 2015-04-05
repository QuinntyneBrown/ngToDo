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
    var SessionStorageProperty = (function () {
        function SessionStorageProperty($rootScope, storage, name) {
            var _this = this;
            this.$rootScope = $rootScope;
            this.storage = storage;
            this.name = name;
            this.onRouteChangeStart = function (event, newUrl) {
                if (newUrl.originalPath == "/login") {
                    _this.data = null;
                    _this.set({ data: null });
                }
            };
            this.get = function () {
                if (_this.data) {
                    return _this.data;
                }
                try {
                    _this.data = _this.storage.getByName({ name: _this.key }).value;
                }
                catch (error) {
                }
                return _this.data;
            };
            this.set = function (params) {
            };
            $rootScope.$on("$routeChangeStart", this.onRouteChangeStart);
        }
        return SessionStorageProperty;
    })();
    app.SessionStorageProperty = SessionStorageProperty;
    var Storage = (function () {
        function Storage(storageId) {
            var _this = this;
            this.storageId = storageId;
            this.get = function () {
                return JSON.parse(localStorage.getItem(_this.storageId) || '[]');
            };
            this.getByName = function (params) {
                var items = JSON.parse(localStorage.getItem(_this.storageId) || '[]');
                for (var i = 0; i < items.length; i++) {
                    if (params.name === items[i].name) {
                        return items[i];
                    }
                    ;
                }
                ;
                return null;
            };
            this.put = function (params) {
                var items = JSON.parse(localStorage.getItem(_this.storageId) || '[]');
                for (var i = 0; i < items.length; i++) {
                    if (params.name === items[i].name) {
                        items[i].value = params.value;
                        localStorage.setItem(_this.storageId, JSON.stringify(items));
                        return;
                    }
                    ;
                }
                ;
                items.push(params);
                localStorage.setItem(_this.storageId, JSON.stringify(items));
            };
        }
        return Storage;
    })();
    app.Storage = Storage;
})(app || (app = {}));

//# sourceMappingURL=app.base.js.map
var app;
(function (app) {
    var AppController = (function () {
        function AppController($rootScope, $router) {
            $router.config([
                { path: '/', component: 'toDoRecent' },
                { path: '/toDo/recent', component: 'toDoRecent' },
                { path: '/toDo/list', component: 'toDoList' },
                { path: '/toDo/detail/:toDoId', component: 'toDoMasterDetail' },
                { path: '/toDo/create', component: 'toDoForm' },
                { path: '/toDo/edit/:toDoId', component: 'toDoForm' },
                { path: '/login', component: 'login' }
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
        "app.security",
        "app.toDo",
        "app.ui"
    ]).config([
        "$componentLoaderProvider",
        "$httpProvider",
        "$locationProvider",
        "apiEndpointProvider",
        "templateMappingsProvider",
        config
    ]).controller("appController", ["$rootScope", "$router", app.AppController]);
    function config($componentLoaderProvider, $httpProvider, $locationProvider, apiEndpointProvider, templateMappingsProvider) {
        var mappings = templateMappingsProvider.mappings;
        $componentLoaderProvider.setTemplateMapping(function (name) {
            for (var i = 0; i < mappings.length; i++) {
                if (name === mappings[i].componentName) {
                    return 'src/app/' + mappings[i].moduleName + '/views/' + name + '.html';
                }
            }
        });
        $httpProvider.interceptors.push("authorizationInterceptor");
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
    var security;
    (function (security) {
        angular.module("app.security", [
            "app.common",
            "app.ui"
        ]).config(["templateMappingsProvider", config]);
        function config(templateMappingsProvider) {
            templateMappingsProvider.push({ moduleName: "security", componentName: "login" });
        }
    })(security = app.security || (app.security = {}));
})(app || (app = {}));

//# sourceMappingURL=../security/security.module.js.map
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
        ]).config(["templateMappingsProvider", config]);
        function config(templateMappingsProvider) {
            templateMappingsProvider.push({ moduleName: "toDo", componentName: "toDoRecent" });
            templateMappingsProvider.push({ moduleName: "toDo", componentName: "toDoForm" });
            templateMappingsProvider.push({ moduleName: "toDo", componentName: "toDoList" });
            templateMappingsProvider.push({ moduleName: "toDo", componentName: "toDoDetail" });
        }
    })(toDo = app.toDo || (app.toDo = {}));
})(app || (app = {}));

//# sourceMappingURL=../toDo/toDo.module.js.map
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
    var security;
    (function (security) {
        var LoginController = (function () {
            function LoginController() {
            }
            return LoginController;
        })();
        angular.module("app.security").controller("LoginController", [LoginController]);
    })(security = app.security || (app.security = {}));
})(app || (app = {}));

//# sourceMappingURL=../../security/controllers/loginController.js.map
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
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var app;
(function (app) {
    var common;
    (function (common) {
        var Storage = (function (_super) {
            __extends(Storage, _super);
            function Storage() {
                _super.call(this, "commonLocalStorage");
            }
            return Storage;
        })(app.Storage);
        common.Storage = Storage;
        angular.module("app.common").service("storage", [Storage]);
    })(common = app.common || (app.common = {}));
})(app || (app = {}));

//# sourceMappingURL=../../common/services/storage.js.map
var app;
(function (app) {
    var common;
    (function (common) {
        "use strict";
        var TemplateMappingsProvider = (function () {
            function TemplateMappingsProvider() {
                this.mappings = [];
            }
            TemplateMappingsProvider.prototype.push = function (map) {
                this.mappings.push(map);
            };
            TemplateMappingsProvider.prototype.$get = function () {
                return this.mappings;
            };
            return TemplateMappingsProvider;
        })();
        common.TemplateMappingsProvider = TemplateMappingsProvider;
        angular.module("app.common").provider("templateMappings", TemplateMappingsProvider);
    })(common = app.common || (app.common = {}));
})(app || (app = {}));

//# sourceMappingURL=../../common/services/templateMappingsProvider.js.map
var app;
(function (app) {
    var security;
    (function (security) {
        var LoginForm = (function () {
            function LoginForm() {
            }
            LoginForm.instance = function () {
                return new LoginForm();
            };
            return LoginForm;
        })();
        security.LoginForm = LoginForm;
        angular.module("app.security").directive("loginForm", [LoginForm.instance]);
    })(security = app.security || (app.security = {}));
})(app || (app = {}));

//# sourceMappingURL=../../security/directives/loginForm.js.map


//# sourceMappingURL=../../security/directives/loginFormController.js.map
var app;
(function (app) {
    var security;
    (function (security) {
        "use strict";
        var AuthorizationInterceptor = (function () {
            function AuthorizationInterceptor(token) {
                var _this = this;
                this.token = token;
                this.request = function (config) {
                    if (_this.token.get()) {
                        config.headers.Authorization = "Bearer " + _this.token.get();
                    }
                    return config;
                };
            }
            AuthorizationInterceptor.instance = function (token) {
                return new AuthorizationInterceptor(token);
            };
            return AuthorizationInterceptor;
        })();
        angular.module("app.security").factory("authorizationInterceptor", ["token", AuthorizationInterceptor.instance]);
    })(security = app.security || (app.security = {}));
})(app || (app = {}));

//# sourceMappingURL=../../security/services/authorizationInterceptor.js.map
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var app;
(function (app) {
    var security;
    (function (security) {
        "use strict";
        var CurrentUser = (function (_super) {
            __extends(CurrentUser, _super);
            function CurrentUser($rootScope, storage) {
                _super.call(this, $rootScope, storage, "currentUser");
            }
            return CurrentUser;
        })(app.SessionStorageProperty);
        angular.module("app.security").service("currentUser", ["$rootScope", "storage", CurrentUser]);
    })(security = app.security || (app.security = {}));
})(app || (app = {}));

//# sourceMappingURL=../../security/services/currentUser.js.map


//# sourceMappingURL=../../security/services/securityService.js.map
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var app;
(function (app) {
    var security;
    (function (security) {
        "use strict";
        var Token = (function (_super) {
            __extends(Token, _super);
            function Token($rootScope, storage) {
                _super.call(this, $rootScope, storage, "token");
            }
            return Token;
        })(app.SessionStorageProperty);
        angular.module("app.security").service("token", ["$rootScope", "storage", Token]);
    })(security = app.security || (app.security = {}));
})(app || (app = {}));

//# sourceMappingURL=../../security/services/token.js.map
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


//# sourceMappingURL=../../ui/hamburgerButton/hamburgerButton.js.map
var app;
(function (app) {
    var toDo;
    (function (toDo) {
        "use strict";
        var ToDoDetailController = (function () {
            function ToDoDetailController($q, toDoService, $routeParams) {
                var _this = this;
                this.$q = $q;
                this.toDoService = toDoService;
                this.$routeParams = $routeParams;
                this.canActivate = function () {
                    var deferred = _this.$q.defer();
                    _this.toDoService.getById(_this.$routeParams.toDoId).then(function (results) {
                        _this.toDo = results;
                        deferred.resolve(true);
                    }).catch(function (Error) {
                        deferred.resolve(false);
                    });
                    return deferred.promise;
                };
            }
            return ToDoDetailController;
        })();
        angular.module("app.toDo").controller("ToDoDetailController", ["$q", "toDoService", "$routeParams", ToDoDetailController]);
    })(toDo = app.toDo || (app.toDo = {}));
})(app || (app = {}));

//# sourceMappingURL=../../toDo/controllers/toDoDetailController.js.map
var app;
(function (app) {
    var toDo;
    (function (toDo) {
        "use strict";
        var ToDoFormController = (function () {
            function ToDoFormController($q, toDoService, $routeParams) {
                var _this = this;
                this.$q = $q;
                this.toDoService = toDoService;
                this.$routeParams = $routeParams;
                this.canActivate = function () {
                    var deferred = _this.$q.defer();
                    if (_this.$routeParams.toDoId) {
                        _this.toDoService.getById(_this.$routeParams.toDoId).then(function (results) {
                            _this.toDo = results;
                            deferred.resolve(true);
                        }).catch(function (Error) {
                            deferred.resolve(false);
                        });
                    }
                    else {
                        deferred.resolve(true);
                    }
                    return deferred.promise;
                };
            }
            return ToDoFormController;
        })();
        angular.module("app.toDo").controller("ToDoFormController", ["$q", "toDoService", "$routeParams", ToDoFormController]);
    })(toDo = app.toDo || (app.toDo = {}));
})(app || (app = {}));

//# sourceMappingURL=../../toDo/controllers/toDoFormController.js.map
var app;
(function (app) {
    var toDo;
    (function (toDo) {
        "use strict";
        var ToDoListController = (function () {
            function ToDoListController($q, toDoService) {
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
            return ToDoListController;
        })();
        angular.module("app.toDo").controller("ToDoListController", ["$q", "toDoService", ToDoListController]);
    })(toDo = app.toDo || (app.toDo = {}));
})(app || (app = {}));

//# sourceMappingURL=../../toDo/controllers/toDoListController.js.map
var app;
(function (app) {
    var toDo;
    (function (toDo) {
        "use strict";
        var ToDoMasterDetailController = (function () {
            function ToDoMasterDetailController($router) {
                $router.config([
                    {
                        path: '/toDo/detail/:toDoId',
                        component: {
                            master: 'toDoList',
                            detail: 'toDoDetail'
                        }
                    }
                ]);
            }
            return ToDoMasterDetailController;
        })();
        angular.module("app.toDo").controller("ToDoMasterDetailController", ["$router", ToDoMasterDetailController]);
    })(toDo = app.toDo || (app.toDo = {}));
})(app || (app = {}));

//# sourceMappingURL=../../toDo/controllers/toDoMasterDetailController.js.map
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