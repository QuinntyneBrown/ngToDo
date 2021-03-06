var app;
(function (app) {
    var security;
    (function (security) {
        "use strict";
        var AuthenticatedController = (function () {
            function AuthenticatedController($location, $timeout, token) {
                var _this = this;
                this.$location = $location;
                this.$timeout = $timeout;
                this.token = token;
                this.canActivate = function () {
                    if (_this.token.get())
                        return true;
                    _this.promise = _this.$timeout(function () {
                        _this.$location.path("/login");
                    }, 0);
                    return false;
                };
            }
            return AuthenticatedController;
        })();
        security.AuthenticatedController = AuthenticatedController;
    })(security = app.security || (app.security = {}));
})(app || (app = {}));

//# sourceMappingURL=authenticatedController.js.map
var app;
(function (app) {
    var common;
    (function (common) {
        var DataService = (function () {
            function DataService($http, $q, _baseUri, entityName, storage) {
                var _this = this;
                this.$http = $http;
                this.$q = $q;
                this._baseUri = _baseUri;
                this.entityName = entityName;
                this.storage = storage;
                this.getById = function (id) {
                    return _this.fromCacheOrService({ method: "GET", uri: _this.baseUri + "/getbyid", params: { id: id } });
                };
                this.getAll = function () {
                    return _this.fromCacheOrService({ method: "GET", uri: _this.baseUri + "/getAll" });
                };
                this.fromCacheOrService = function (action) {
                    var deferred = _this.$q.defer();
                    var cachedData = _this.storage.getByName({ name: action.uri + JSON.stringify(action.params) });
                    if (!cachedData || !cachedData.value) {
                        _this.$http({ method: action.method, url: action.uri, data: action.data, params: action.params }).then(function (results) {
                            _this.storage.put({ category: _this.entityName, name: action.uri + JSON.stringify(action.params), value: results });
                            deferred.resolve(results);
                        }).catch(function (error) {
                            deferred.reject(error);
                        });
                    }
                    else {
                        deferred.resolve(cachedData.value);
                    }
                    return deferred.promise;
                };
                this.add = function (entity) {
                    var deferred = _this.$q.defer();
                    _this.$http({ method: "POST", url: _this.baseUri + "/add", data: entity }).then(function (results) {
                        _this.invalidateCache();
                        deferred.resolve(results);
                    }).catch(function (error) {
                        if (error.status && error.status === 400) {
                            deferred.resolve(error);
                        }
                        else {
                            deferred.reject(error);
                        }
                    });
                    return deferred.promise;
                };
                this.update = function (entity) {
                    var deferred = _this.$q.defer();
                    _this.$http({ method: "PUT", url: _this.baseUri + "/update", data: JSON.stringify(entity) }).then(function (results) {
                        _this.invalidateCache();
                        deferred.resolve(results);
                    }).catch(function (error) {
                        deferred.reject(error);
                    });
                    return deferred.promise;
                };
                this.remove = function (id) {
                    var deferred = _this.$q.defer();
                    _this.$http({ method: "DELETE", url: _this.baseUri + "/remove?id=" + id }).then(function (results) {
                        _this.invalidateCache();
                        deferred.resolve(results);
                    }).catch(function (error) {
                        deferred.reject(error);
                    });
                    return deferred.promise;
                };
                this.invalidateCache = function () {
                    _this.storage.get().forEach(function (item) {
                        if (item.category === _this.entityName) {
                            _this.storage.put({ name: item.name, value: null });
                        }
                    });
                };
            }
            Object.defineProperty(DataService.prototype, "baseUri", {
                get: function () {
                    return this._baseUri + "/" + this.entityName;
                },
                enumerable: true,
                configurable: true
            });
            return DataService;
        })();
        common.DataService = DataService;
    })(common = app.common || (app.common = {}));
})(app || (app = {}));

//# sourceMappingURL=dataService.js.map
var app;
(function (app) {
    var common;
    (function (common) {
        var Entity = (function () {
            function Entity($location, $q, fire, dataService, entityName) {
                var _this = this;
                this.$location = $location;
                this.$q = $q;
                this.fire = fire;
                this.dataService = dataService;
                this.entityName = entityName;
                this.getById = function (id) {
                    var deferred = _this.$q.defer();
                    _this.dataService.getById(id).then(function (results) {
                        var entity = null;
                        _this.instance(results.data).then(function (results) {
                            entity = results;
                            deferred.resolve(entity);
                        });
                    });
                    return deferred.promise;
                };
                this.getAll = function () {
                    var deferred = _this.$q.defer();
                    _this.dataService.getAll().then(function (results) {
                        var entities = [];
                        var promises = [];
                        results.data.forEach(function (result) {
                            promises.push(_this.instance(result));
                        });
                        _this.$q.all(promises).then(function (allResults) {
                            allResults.forEach(function (result) {
                                entities.push(result);
                            });
                            deferred.resolve(entities);
                        });
                    });
                    return deferred.promise;
                };
                this.save = function () {
                    var deferred = _this.$q.defer();
                    var action;
                    var promise;
                    if (_this.isValid()) {
                        if (_this.id) {
                            action = "update";
                            promise = _this.dataService.update(_this);
                        }
                        else {
                            action = "add";
                            promise = _this.dataService.add(_this);
                        }
                    }
                    else {
                        deferred.reject();
                    }
                    _this.$q.when(promise).then(function (result) {
                        _this.instance(result.data).then(function (results) {
                            _this.fire(document.getElementsByTagName("body")[0], _this.entityName + "Saved", { entity: _this, action: action });
                            deferred.resolve();
                        });
                    }).catch(function () {
                        deferred.reject();
                    });
                    return deferred.promise;
                };
                this.remove = function () {
                    var deferred = _this.$q.defer();
                    if (_this.id) {
                        _this.dataService.remove(_this.id).then(function () {
                            _this.fire(document.getElementsByTagName("body")[0], _this.entityName + "Removed", { entity: _this, action: "remove" });
                            deferred.resolve();
                        });
                    }
                    else {
                        deferred.reject();
                    }
                    return deferred.promise;
                };
                this.isValid = function () {
                    if (_this.getValidationErrors().length < 1) {
                        return true;
                    }
                    return false;
                };
                this.instance = function (data) {
                    throw new Error("Not Implemented");
                };
                this.getValidationErrors = function () {
                    throw new Error("Not Implemented");
                };
                this.id = 0;
                this.isDeleted = false;
            }
            return Entity;
        })();
        common.Entity = Entity;
    })(common = app.common || (app.common = {}));
})(app || (app = {}));

//# sourceMappingURL=entity.js.map
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
        "use strict";
        var StorageProperty = (function () {
            function StorageProperty(storage, name) {
                var _this = this;
                this.storage = storage;
                this.name = name;
                this.get = function () {
                    if (_this.data) {
                        return _this.data;
                    }
                    try {
                        _this.data = _this.storage.getByName({ name: _this.name }).value;
                    }
                    catch (error) {
                    }
                    return _this.data;
                };
                this.set = function (params) {
                    _this.data = params.data;
                    _this.storage.put({ name: _this.name, value: params.data });
                };
            }
            return StorageProperty;
        })();
        common.StorageProperty = StorageProperty;
        var SessionStorageProperty = (function (_super) {
            __extends(SessionStorageProperty, _super);
            function SessionStorageProperty($rootScope, storage, name) {
                var _this = this;
                _super.call(this, storage, name);
                this.$rootScope = $rootScope;
                this.storage = storage;
                this.name = name;
                this.onLocationChangeStart = function (event, newState) {
                    if (newState.indexOf("/login") > 0) {
                        _this.data = null;
                        _this.set({ data: null });
                    }
                };
                $rootScope.$on("$locationChangeStart", this.onLocationChangeStart);
            }
            return SessionStorageProperty;
        })(StorageProperty);
        common.SessionStorageProperty = SessionStorageProperty;
    })(common = app.common || (app.common = {}));
})(app || (app = {}));

//# sourceMappingURL=sessionStorageProperty.js.map
var app;
(function (app) {
    var common;
    (function (common) {
        "use strict";
        var Storage = (function () {
            function Storage(storageId) {
                var _this = this;
                this.storageId = storageId;
                this.instance = function (storageId) {
                    return new Storage(storageId);
                };
                this.get = function () {
                    return JSON.parse(localStorage.getItem(_this.storageId) || "[]");
                };
                this.getByName = function (params) {
                    var items = JSON.parse(localStorage.getItem(_this.storageId) || "[]");
                    var storageItem = null;
                    items.forEach(function (item) {
                        if (params.name === item.name) {
                            storageItem = item;
                        }
                    });
                    return storageItem;
                };
                this.put = function (params) {
                    var items = JSON.parse(localStorage.getItem(_this.storageId) || "[]");
                    var itemExist = false;
                    items.forEach(function (item) {
                        if (params.name === item.name) {
                            itemExist = true;
                            item.value = params.value;
                            item.category = params.category;
                            localStorage.setItem(_this.storageId, JSON.stringify(items));
                        }
                    });
                    if (!itemExist) {
                        items.push(params);
                        localStorage.setItem(_this.storageId, JSON.stringify(items));
                    }
                };
            }
            return Storage;
        })();
        common.Storage = Storage;
    })(common = app.common || (app.common = {}));
})(app || (app = {}));

//# sourceMappingURL=storage.js.map
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
        ]).config(["apiEndpointProvider", "featureComponentsMappingsProvider", "routesProvider", config]);
        function config(apiEndpointProvider, featureComponentsMappingsProvider, routesProvider) {
            apiEndpointProvider.configure("/login", "login");
            featureComponentsMappingsProvider.mapFeatureComponents({
                feature: "security",
                components: ["login"]
            });
            routesProvider.mapRoutes([
                { path: '/login', component: 'login' }
            ]);
        }
    })(security = app.security || (app.security = {}));
})(app || (app = {}));

//# sourceMappingURL=../security/security.module.js.map
var app;
(function (app) {
    var toDo;
    (function (toDo) {
        angular.module("app.toDo", [
            "ngNewRouter",
            "ngAnimate",
            "app.common",
            "app.security",
            "app.ui"
        ]).config([
            "$componentLoaderProvider",
            "$httpProvider",
            "$locationProvider",
            "apiEndpointProvider",
            "featureComponentsMappingsProvider",
            "loginRedirectProvider",
            "routesProvider",
            config
        ]);
        function config($componentLoaderProvider, $httpProvider, $locationProvider, apiEndpointProvider, featureComponentsMappingsProvider, loginRedirectProvider, routesProvider) {
            loginRedirectProvider.setDefaultUrl("/toDo/list");
            featureComponentsMappingsProvider.mapFeatureComponents({
                feature: "toDo",
                components: ["toDoRecent", "toDoForm", "toDos", "toDoDetail", "toDoAbout"]
            });
            routesProvider.mapRoutes([
                { path: '/', redirectTo: '/login' },
                { path: '/toDo/about', component: 'toDoAbout' },
                { path: '/toDo/list', components: { default: 'toDos' } },
                { path: '/toDo/detail/:toDoId', components: { default: 'toDoDetail' } },
                { path: '/toDo/create', component: 'toDoForm' },
                { path: '/toDo/edit/:toDoId', component: 'toDoForm' }
            ]);
            apiEndpointProvider.configure("/api/v1");
        }
    })(toDo = app.toDo || (app.toDo = {}));
})(app || (app = {}));

//# sourceMappingURL=../toDo/toDo.module.js.map
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
                this.template = "<div data-ng-show='requestCount > 0' class='work-spinner'><i class='fa fa-spinner fa-spin fade'></i></div>";
                this.link = function (scope) {
                    scope.$watch(function () {
                        return _this.requestCounter.getRequestCount();
                    }, function (requestCount) {
                        scope["requestCount"] = requestCount;
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
    var common;
    (function (common) {
        "use strict";
        angular.module("app.common").value("bind", function (element, object) {
            if (element) {
                for (var events in object) {
                    var callback = object[events];
                    events.split(/\s+/).forEach(function (event) {
                        element.addEventListener(event, callback);
                    });
                }
            }
        });
    })(common = app.common || (app.common = {}));
})(app || (app = {}));

//# sourceMappingURL=../../common/functions/bind.js.map
var app;
(function (app) {
    var common;
    (function (common) {
        "use strict";
        angular.module("app.common").value("fire", function (target, type, properties) {
            var htmlEvent = document.createEvent("HTMLEvents");
            htmlEvent.initEvent(type, true, true);
            for (var j in properties) {
                htmlEvent[j] = properties[j];
            }
            target.dispatchEvent(htmlEvent);
        });
    })(common = app.common || (app.common = {}));
})(app || (app = {}));

//# sourceMappingURL=../../common/functions/fire.js.map
var app;
(function (app) {
    var security;
    (function (security) {
        "use strict";
        var LoginForm = (function () {
            function LoginForm() {
                this.templateUrl = "/src/app/security/directives/loginForm.html";
                this.controllerAs = "loginForm";
                this.controller = "loginFormController";
                this.restrict = "E";
                this.replace = true;
            }
            LoginForm.instance = function () {
                return new LoginForm();
            };
            return LoginForm;
        })();
        angular.module("app.security").directive("loginForm", ["securityService", LoginForm.instance]);
    })(security = app.security || (app.security = {}));
})(app || (app = {}));

//# sourceMappingURL=../../security/directives/loginForm.js.map
var app;
(function (app) {
    var security;
    (function (security) {
        "use strict";
        var LoginFormController = (function () {
            function LoginFormController($location, loginRedirect, securityService, token) {
                var _this = this;
                this.$location = $location;
                this.loginRedirect = loginRedirect;
                this.securityService = securityService;
                this.token = token;
                this.username = "quinntynebrown@gmail.com";
                this.password = "P@ssw0rd";
                this.tryToLogin = function () {
                    _this.securityService.login(_this.username, _this.password).then(function (results) {
                        _this.loginRedirect.redirectPreLogin();
                    });
                };
            }
            return LoginFormController;
        })();
        angular.module("app.security").controller("loginFormController", ["$location", "loginRedirect", "securityService", LoginFormController]);
    })(security = app.security || (app.security = {}));
})(app || (app = {}));

//# sourceMappingURL=../../security/directives/loginFormController.js.map
var app;
(function (app) {
    var common;
    (function (common) {
        "use strict";
        var ApiEndpointProvider = (function () {
            function ApiEndpointProvider() {
                var _this = this;
                this.config = {
                    getBaseUrl: function (name) {
                        var baseUrl = "";
                        if (name) {
                            _this.config.baseUrls.forEach(function (endpointDefinition) {
                                if (name === endpointDefinition.name) {
                                    baseUrl = endpointDefinition.url;
                                }
                            });
                        }
                        if (!name || baseUrl === "") {
                            _this.config.baseUrls.forEach(function (endpointDefinition) {
                                if (!endpointDefinition.name && baseUrl === "") {
                                    baseUrl = endpointDefinition.url;
                                }
                            });
                        }
                        return baseUrl;
                    },
                    baseUrls: []
                };
            }
            ApiEndpointProvider.prototype.configure = function (baseUrl, name) {
                this.config.baseUrls.push({ url: baseUrl, name: name });
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
        "use strict";
        var FeatureComponentsMappingsProvider = (function () {
            function FeatureComponentsMappingsProvider() {
                var _this = this;
                this.mappings = [];
                this.mapFeatureComponents = function (featureComponentsMapping) {
                    _this.mappings.push(featureComponentsMapping);
                };
                this.setTemplateMapping = function ($componentLoaderProvider) {
                    $componentLoaderProvider.setTemplateMapping(function (name) {
                        var viewLocation = null;
                        _this.mappings.forEach(function (mapping) {
                            mapping.components.forEach(function (component) {
                                if (name === component) {
                                    viewLocation = "src/app/" + mapping.feature + "/views/" + name + ".html";
                                }
                            });
                        });
                        return viewLocation;
                    });
                };
            }
            FeatureComponentsMappingsProvider.prototype.$get = function () {
                return this.mappings;
            };
            return FeatureComponentsMappingsProvider;
        })();
        common.FeatureComponentsMappingsProvider = FeatureComponentsMappingsProvider;
        angular.module("app.common").provider("featureComponentsMappings", FeatureComponentsMappingsProvider).config([
            "$componentLoaderProvider",
            "featureComponentsMappingsProvider",
            function ($componentLoaderProvider, featureComponentsMappingsProvider) {
                featureComponentsMappingsProvider.setTemplateMapping($componentLoaderProvider);
                $componentLoaderProvider.setCtrlNameMapping(function (name) {
                    return name[0].toLowerCase() + name.substr(1) + "Controller";
                });
            }
        ]);
    })(common = app.common || (app.common = {}));
})(app || (app = {}));

//# sourceMappingURL=../../common/services/featureComponentsMappingsProvider.js.map
var app;
(function (app) {
    var common;
    (function (common) {
        "use strict";
        var formEncode = function () {
            return function (data) {
                var pairs = [];
                for (var name in data) {
                    pairs.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
                }
                return pairs.join('&').replace(/%20/g, '+');
            };
        };
        angular.module("app.common").factory("formEncode", formEncode);
    })(common = app.common || (app.common = {}));
})(app || (app = {}));

//# sourceMappingURL=../../common/services/formEncode.js.map
var app;
(function (app) {
    var common;
    (function (common) {
        "use strict";
        var HistoryService = (function () {
            function HistoryService() {
            }
            return HistoryService;
        })();
        angular.module("app.common").service("historyService", [HistoryService]);
    })(common = app.common || (app.common = {}));
})(app || (app = {}));

//# sourceMappingURL=../../common/services/historyService.js.map
var app;
(function (app) {
    var common;
    (function (common) {
        "use strict";
        var NotificationService = (function () {
            function NotificationService() {
            }
            return NotificationService;
        })();
        angular.module("app.common").service("notificationService", [NotificationService]);
    })(common = app.common || (app.common = {}));
})(app || (app = {}));

//# sourceMappingURL=../../common/services/notificationService.js.map
var app;
(function (app) {
    var common;
    (function (common) {
        "use strict";
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
        angular.module("app.common").factory("requestCounter", ["$q", RequestCounter.instance]).config([
            "$httpProvider",
            function ($httpProvider) {
                $httpProvider.interceptors.push("requestCounter");
            }
        ]);
    })(common = app.common || (app.common = {}));
})(app || (app = {}));

//# sourceMappingURL=../../common/services/requestCounter.js.map
var app;
(function (app) {
    var common;
    (function (common) {
        "use strict";
        var RoutesProvider = (function () {
            function RoutesProvider() {
                var _this = this;
                this.routes = [];
                this.mapRoutes = function (routes) {
                    routes.forEach(function (route) {
                        _this.routes.push(route);
                    });
                };
            }
            RoutesProvider.prototype.$get = function () {
                return this.routes;
            };
            return RoutesProvider;
        })();
        angular.module("app.common").provider("routes", RoutesProvider);
    })(common = app.common || (app.common = {}));
})(app || (app = {}));

//# sourceMappingURL=../../common/services/routesProvider.js.map
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
        "use strict";
        var CommonStorage = (function (_super) {
            __extends(CommonStorage, _super);
            function CommonStorage($rootScope) {
                var _this = this;
                _super.call(this, "commonLocalStorage");
                $rootScope.$on("$locationChangeStart", function (event, newState) {
                    if (newState.indexOf("/login") > 0) {
                        _this.get().forEach(function (item) {
                            _this.put({ name: item.name, value: null });
                        });
                    }
                });
            }
            return CommonStorage;
        })(common.Storage);
        angular.module("app.common").service("storage", ["$rootScope", CommonStorage]);
    })(common = app.common || (app.common = {}));
})(app || (app = {}));

//# sourceMappingURL=../../common/services/storage.js.map
var app;
(function (app) {
    var security;
    (function (security) {
        "use strict";
        var LoginController = (function () {
            function LoginController() {
            }
            return LoginController;
        })();
        angular.module("app.security").controller("loginController", [LoginController]);
    })(security = app.security || (app.security = {}));
})(app || (app = {}));

//# sourceMappingURL=../../security/controllers/loginController.js.map
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
        var ToDoAboutController = (function (_super) {
            __extends(ToDoAboutController, _super);
            function ToDoAboutController($location, token, $timeout) {
                _super.call(this, $location, $timeout, token);
                this.$location = $location;
                this.token = token;
                this.$timeout = $timeout;
            }
            return ToDoAboutController;
        })(app.security.AuthenticatedController);
        angular.module("app.toDo").controller("toDoAboutController", ["$location", "$timeout", "token", ToDoAboutController]);
    })(toDo = app.toDo || (app.toDo = {}));
})(app || (app = {}));

//# sourceMappingURL=../../toDo/controllers/toDoAboutController.js.map
var app;
(function (app) {
    var toDo;
    (function (toDo) {
        "use strict";
        var ToDoAppController = (function () {
            function ToDoAppController($interval, $location, $rootScope, $router, currentUser, routes, securityService, token) {
                var _this = this;
                this.$interval = $interval;
                this.$location = $location;
                this.$rootScope = $rootScope;
                this.$router = $router;
                this.currentUser = currentUser;
                this.routes = routes;
                this.securityService = securityService;
                this.token = token;
                this.isLoggedIn = function () {
                    return _this.token.get();
                };
                this.getUsername = function () {
                    var currentUser = _this.currentUser.get();
                    if (currentUser)
                        return currentUser.firstname + ' ' + currentUser.lastname;
                    return null;
                };
                $router.config(routes);
                $interval(function () {
                    if (securityService.tokenExpired()) {
                        //if(this.currentRouteRequiresAuthentication()) {
                        //  this.loginRedirect.lastPath = this.$location.path();
                        //  this.$location.path('/login');
                        //}
                        $location.path("/login");
                    }
                }, 6000);
            }
            return ToDoAppController;
        })();
        angular.module("app.toDo").controller("toDoAppController", ["$interval", "$location", "$rootScope", "$router", "currentUser", "routes", "securityService", "token", ToDoAppController]);
    })(toDo = app.toDo || (app.toDo = {}));
})(app || (app = {}));

//# sourceMappingURL=../../toDo/controllers/toDoAppController.js.map
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var app;
(function (app) {
    var toDo;
    (function (_toDo) {
        "use strict";
        var ToDoDetailController = (function (_super) {
            __extends(ToDoDetailController, _super);
            function ToDoDetailController($location, $q, $timeout, $routeParams, toDo, token) {
                var _this = this;
                _super.call(this, $location, $timeout, token);
                this.$location = $location;
                this.$q = $q;
                this.$timeout = $timeout;
                this.$routeParams = $routeParams;
                this.toDo = toDo;
                this.token = token;
                this.activate = function () {
                    var deferred = _this.$q.defer();
                    if (_this.$routeParams["toDoId"]) {
                        _this.toDo.getById(_this.$routeParams["toDoId"]).then(function (results) {
                            _this.toDo = results;
                            deferred.resolve(true);
                        }).catch(function (Error) {
                            deferred.resolve(false);
                        });
                    }
                    else {
                        _this.toDo.instance(null).then(function (results) {
                            _this.toDo = results;
                            deferred.resolve(true);
                        });
                    }
                    return deferred.promise;
                };
            }
            return ToDoDetailController;
        })(app.security.AuthenticatedController);
        angular.module("app.toDo").controller("toDoDetailController", ["$location", "$q", "$timeout", "$routeParams", "toDo", "token", ToDoDetailController]);
    })(toDo = app.toDo || (app.toDo = {}));
})(app || (app = {}));

//# sourceMappingURL=../../toDo/controllers/toDoDetailController.js.map
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var app;
(function (app) {
    var toDo;
    (function (_toDo) {
        "use strict";
        var ToDoFormController = (function (_super) {
            __extends(ToDoFormController, _super);
            function ToDoFormController($location, $q, $routeParams, $timeout, appBarService, toDo, token) {
                var _this = this;
                _super.call(this, $location, $timeout, token);
                this.$location = $location;
                this.$q = $q;
                this.$routeParams = $routeParams;
                this.$timeout = $timeout;
                this.appBarService = appBarService;
                this.toDo = toDo;
                this.token = token;
                this.setAppBarButtons = function () {
                    _this.appBarService.setButtons([
                        {
                            type: "Done",
                            text: "Done",
                            onClick: _this.toDo.complete,
                            isValid: _this.toDo.isValid
                        },
                        {
                            type: "Save",
                            text: "Save",
                            onClick: function () {
                                _this.toDo.save().then(function (results) {
                                    _this.$location.path("/toDo/list");
                                });
                            },
                            isValid: _this.toDo.isValid
                        }
                    ]);
                };
                this.activate = function () {
                    var deferred = _this.$q.defer();
                    if (_this.$routeParams["toDoId"]) {
                        _this.toDo.getById(_this.$routeParams["toDoId"]).then(function (results) {
                            _this.toDo = results;
                            _this.setAppBarButtons();
                            deferred.resolve(true);
                        }).catch(function (Error) {
                            deferred.resolve(false);
                        });
                    }
                    else {
                        _this.toDo.instance(null).then(function (results) {
                            _this.toDo = results;
                            _this.setAppBarButtons();
                            deferred.resolve(true);
                        });
                    }
                    return deferred.promise;
                };
                this.deactivate = function () {
                    _this.toDo = null;
                    _this.token = null;
                    _this.appBarService = null;
                    _this.promise = null;
                };
            }
            return ToDoFormController;
        })(app.security.AuthenticatedController);
        angular.module("app.toDo").controller("toDoFormController", ["$location", "$q", "$routeParams", "$timeout", "appBarService", "toDo", "token", ToDoFormController]);
    })(toDo = app.toDo || (app.toDo = {}));
})(app || (app = {}));

//# sourceMappingURL=../../toDo/controllers/toDoFormController.js.map
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var app;
(function (app) {
    var toDo;
    (function (_toDo) {
        "use strict";
        var ToDoRecentController = (function (_super) {
            __extends(ToDoRecentController, _super);
            function ToDoRecentController($location, $q, $timeout, toDo, token) {
                var _this = this;
                _super.call(this, $location, $timeout, token);
                this.$location = $location;
                this.$q = $q;
                this.$timeout = $timeout;
                this.toDo = toDo;
                this.token = token;
                this.activate = function () {
                    var deferred = _this.$q.defer();
                    _this.toDo.getRecent().then(function (results) {
                        _this.toDos = results;
                        deferred.resolve(true);
                    }).catch(function (Error) {
                        deferred.resolve(false);
                    });
                    return deferred.promise;
                };
            }
            return ToDoRecentController;
        })(app.security.AuthenticatedController);
        angular.module("app.toDo").controller("toDoRecentController", ["$location", "$timeout", "$q", "toDo", "token", ToDoRecentController]);
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
    (function (_toDo) {
        "use strict";
        var ToDosController = (function (_super) {
            __extends(ToDosController, _super);
            function ToDosController($document, $location, $q, $timeout, bind, toDo, token) {
                var _this = this;
                _super.call(this, $location, $timeout, token);
                this.$document = $document;
                this.$location = $location;
                this.$q = $q;
                this.$timeout = $timeout;
                this.bind = bind;
                this.toDo = toDo;
                this.token = token;
                this.activate = function () {
                    angular.element(_this.$document).bind("toDoRemoved", _this.onToDoRemoved);
                    var deferred = _this.$q.defer();
                    _this.toDo.getAll().then(function (results) {
                        _this.toDos = results;
                        deferred.resolve(true);
                    }).catch(function (Error) {
                        deferred.resolve(false);
                    });
                    return deferred.promise;
                };
                this.deactivate = function () {
                    angular.element(_this.$document).unbind("toDoRemoved");
                    _this.toDos = null;
                    _this.token = null;
                    _this.toDo = null;
                    _this.promise = null;
                };
                this.onToDoRemoved = function (event) {
                    for (var i = 0; i < _this.toDos.length; i++) {
                        if (_this.toDos[i].id === event.originalEvent.entity.id) {
                            _this.toDos.splice(i, 1);
                        }
                    }
                };
            }
            return ToDosController;
        })(app.security.AuthenticatedController);
        angular.module("app.toDo").controller("toDosController", ["$document", "$location", "$q", "$timeout", "bind", "toDo", "token", ToDosController]);
    })(toDo = app.toDo || (app.toDo = {}));
})(app || (app = {}));

//# sourceMappingURL=../../toDo/controllers/toDosController.js.map
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
        angular.module("app.security").factory("authorizationInterceptor", ["token", AuthorizationInterceptor.instance]).config([
            "$httpProvider",
            function ($httpProvider) {
                $httpProvider.interceptors.push("authorizationInterceptor");
            }
        ]);
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
        })(app.common.SessionStorageProperty);
        angular.module("app.security").service("currentUser", ["$rootScope", "storage", CurrentUser]);
    })(security = app.security || (app.security = {}));
})(app || (app = {}));

//# sourceMappingURL=../../security/services/currentUser.js.map
var app;
(function (app) {
    var security;
    (function (security) {
        "use strict";
        var LoginRedirectProvider = (function () {
            function LoginRedirectProvider() {
                var _this = this;
                this.loginUrl = "/login";
                this.defaultPath = "/";
                this.setLoginUrl = function (value) {
                    _this.loginUrl = value;
                };
                this.setDefaultUrl = function (value) {
                    _this.defaultPath = value;
                };
                this.$get = ["$q", "$location", function ($q, $location) {
                    return {
                        responseError: function (response) {
                            if (response.status == 401) {
                                _this.lastPath = $location.path();
                                $location.path(_this.loginUrl);
                            }
                            return $q.reject(response);
                        },
                        redirectPreLogin: function () {
                            if (_this.lastPath) {
                                $location.path(_this.lastPath);
                                _this.lastPath = "";
                            }
                            else {
                                $location.path(_this.defaultPath);
                            }
                        }
                    };
                }];
            }
            return LoginRedirectProvider;
        })();
        angular.module("app.security").provider("loginRedirect", [LoginRedirectProvider]).config(["$httpProvider", config]);
        function config($httpProvider) {
            $httpProvider.interceptors.push("loginRedirect");
        }
    })(security = app.security || (app.security = {}));
})(app || (app = {}));

//# sourceMappingURL=../../security/services/loginRedirectProvider.js.map
var app;
(function (app) {
    var security;
    (function (security) {
        "use strict";
        var SecurityService = (function () {
            function SecurityService($http, $interval, $location, $q, currentUser, formEncode, apiEndpoint, token, tokenExpiryDate) {
                var _this = this;
                this.$http = $http;
                this.$interval = $interval;
                this.$location = $location;
                this.$q = $q;
                this.currentUser = currentUser;
                this.formEncode = formEncode;
                this.apiEndpoint = apiEndpoint;
                this.token = token;
                this.tokenExpiryDate = tokenExpiryDate;
                this.login = function (username, password) {
                    var deferred = _this.$q.defer();
                    var configuration = {
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        }
                    };
                    var data = _this.formEncode({
                        username: username,
                        password: password,
                        grant_type: "password"
                    });
                    _this.$http.post(_this.apiEndpoint.getBaseUrl("login"), data, configuration).then(function (response) {
                        _this.processToken(username, response).then(function (results) {
                            deferred.resolve(true);
                        });
                    }).catch(function (Error) {
                        deferred.reject();
                    });
                    return deferred.promise;
                };
                this.processToken = function (username, response) {
                    var deferred = _this.$q.defer();
                    _this.token.set({ data: response.data.access_token });
                    _this.tokenExpiryDate.set({ data: Date.now() + response.data.expires_in * 100 });
                    _this.getCurrentUser().then(function (results) {
                        _this.currentUser.set({ data: results });
                        deferred.resolve();
                    });
                    return deferred.promise;
                };
                this.getCurrentUser = function () {
                    var deferred = _this.$q.defer();
                    _this.$http({ method: "GET", url: _this.apiEndpoint.getBaseUrl() + "/identity/getCurrentUser" }).then(function (results) {
                        deferred.resolve(results.data);
                    }).catch(function (error) {
                        deferred.reject(error);
                    });
                    return deferred.promise;
                };
                this.tokenExpired = function () {
                    return Date.now() > _this.tokenExpiryDate.get();
                };
            }
            return SecurityService;
        })();
        security.SecurityService = SecurityService;
        angular.module("app.security").service("securityService", ["$http", "$interval", "$location", "$q", "currentUser", "formEncode", "apiEndpoint", "token", "tokenExpiryDate", SecurityService]);
    })(security = app.security || (app.security = {}));
})(app || (app = {}));

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
        })(app.common.SessionStorageProperty);
        angular.module("app.security").service("token", ["$rootScope", "storage", Token]);
    })(security = app.security || (app.security = {}));
})(app || (app = {}));

//# sourceMappingURL=../../security/services/token.js.map
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
                _super.call(this, $rootScope, storage, "tokenExpiryDate");
            }
            return Token;
        })(app.common.SessionStorageProperty);
        angular.module("app.security").service("tokenExpiryDate", ["$rootScope", "storage", Token]);
    })(security = app.security || (app.security = {}));
})(app || (app = {}));

//# sourceMappingURL=../../security/services/tokenExpiryDate.js.map
var app;
(function (app) {
    var security;
    (function (security) {
        "use strict";
        var User = (function () {
            function User() {
                this.instance = function (data) {
                };
                this.getName = function () {
                };
                this.getCurrent = function () {
                };
            }
            return User;
        })();
    })(security = app.security || (app.security = {}));
})(app || (app = {}));

//# sourceMappingURL=../../security/services/user.js.map
var app;
(function (app) {
    var toDo;
    (function (toDo) {
        "use strict";
        var ToDoItem = (function () {
            function ToDoItem() {
                this.restrict = "E";
                this.replace = true;
                this.templateUrl = "/src/app/toDo/directives/toDoItem.html";
                this.scope = {
                    toDoItem: "="
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
    (function (toDo) {
        "use strict";
        var ToDoItems = (function () {
            function ToDoItems() {
                this.replace = true;
                this.restrict = "E";
                this.templateUrl = "/src/app/toDo/directives/toDoItems.html";
                this.scope = {
                    toDoItems: "="
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
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var app;
(function (app) {
    var toDo;
    (function (_toDo) {
        "use strict";
        var ToDo = (function (_super) {
            __extends(ToDo, _super);
            function ToDo($location, $q, fire, toDoService, toDoStatuses, toDoPritories) {
                var _this = this;
                _super.call(this, $location, $q, fire, toDoService, 'toDo');
                this.$location = $location;
                this.$q = $q;
                this.fire = fire;
                this.toDoService = toDoService;
                this.toDoStatuses = toDoStatuses;
                this.toDoPritories = toDoPritories;
                this.instance = function (data) {
                    if (data === void 0) { data = null; }
                    var deferred = _this.$q.defer();
                    var toDo;
                    if (data === null) {
                        toDo = new ToDo(_this.$location, _this.$q, _this.fire, _this.toDoService, _this.toDoStatuses, _this.toDoPritories);
                    }
                    else {
                        toDo = new ToDo(_this.$location, _this.$q, _this.fire, _this.toDoService, _this.toDoStatuses, _this.toDoPritories);
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
                };
                this.getValidationErrors = function () {
                    var validationErrors = [];
                    if (!_this.name || _this.name.length < 0)
                        validationErrors.push("Name can not be empty");
                    // if (!this.description || this.description.length < 0)
                    //    validationErrors.push("Description can not be empty");
                    return validationErrors;
                };
                this.complete = function () {
                    if (_this.isValid()) {
                        return _this.setStatus(_this.toDoStatuses.completed);
                    }
                };
                this.toDo = function () {
                    if (_this.isValid()) {
                        return _this.setStatus(_this.toDoStatuses.toDo);
                    }
                };
                this.toDoNever = function () {
                    if (_this.isValid()) {
                        return _this.setStatus(_this.toDoStatuses.toDoNever);
                    }
                };
                this.start = function () {
                    if (_this.isValid()) {
                        return _this.setStatus(_this.toDoStatuses.started);
                    }
                };
                this.setStatus = function (toDoStatus) {
                    var deferred = _this.$q.defer();
                    _this.toDoStatus = toDoStatus;
                    _this.save().then(function (results) {
                        deferred.resolve();
                    });
                    return deferred.promise;
                };
                this.getRecent = function () {
                    var deferred = _this.$q.defer();
                    _this.toDoService.getRecent().then(function (results) {
                        var entities = [];
                        var promises = [];
                        results.data.forEach(function (result) {
                            promises.push(_this.instance(result));
                        });
                        _this.$q.all(promises).then(function (resultsArray) {
                            resultsArray.forEach(function (results) {
                                promises.push(_this.instance(results));
                            });
                            deferred.resolve(entities);
                        });
                    });
                    return deferred.promise;
                };
                this.toDoStatus = toDoStatuses.new;
                this.toDoPriority = toDoPritories.medium;
            }
            return ToDo;
        })(app.common.Entity);
        angular.module("app.toDo").service("toDo", ["$location", "$q", "fire", "toDoService", "toDoStatuses", "toDoPriorities", ToDo]);
    })(toDo = app.toDo || (app.toDo = {}));
})(app || (app = {}));

//# sourceMappingURL=../../toDo/services/toDo.js.map
var app;
(function (app) {
    var toDo;
    (function (toDo) {
        "use strict";
        var ToDoBreezeService = (function () {
            function ToDoBreezeService($q) {
                var _this = this;
                this.$q = $q;
                this.getAll = function () {
                    var deferred = _this.$q.defer();
                    var query = new breeze.EntityQuery().from("todos");
                    query.using(_this.entityManager).execute().then(function (results) {
                        results.data = results.results;
                        deferred.resolve(results);
                    }).catch(function (error) {
                    });
                    return deferred.promise;
                };
                this.getById = function (id) {
                    var deferred = _this.$q.defer();
                    id = Math.floor(id);
                    var query = new breeze.EntityQuery().from('todos').where('id', '==', id);
                    query.using(_this.entityManager).execute().then(function (results) {
                        results.data = results.results[0];
                        deferred.resolve(results);
                    }).catch(function (error) {
                    });
                    return deferred.promise;
                };
                this.getRecent = function () {
                    var deferred = _this.$q.defer();
                    var query = new breeze.EntityQuery().from("todos");
                    query.using(_this.entityManager).execute().then(function (results) {
                        results.data = results.results;
                        deferred.resolve(results);
                    }).catch(function (error) {
                    });
                    return deferred.promise;
                };
                this.remove = function (id) {
                    var deferred = _this.$q.defer();
                    return deferred.promise;
                };
                this.add = function (entity) {
                    var deferred = _this.$q.defer();
                    return deferred.promise;
                };
                this.update = function (entity) {
                    var deferred = _this.$q.defer();
                    _this.entityManager.saveChanges();
                    return deferred.promise;
                };
                this.fromCacheOrService = function (action) {
                    var deferred = _this.$q.defer();
                    return deferred.promise;
                };
                this.invalidateCache = function () {
                };
                breeze.config.initializeAdapterInstance('modelLibrary', 'backingStore', true);
                breeze.NamingConvention.camelCase.setAsDefault();
                this.entityManager = new breeze.EntityManager("breeze/breezedataservice");
            }
            return ToDoBreezeService;
        })();
    })(toDo = app.toDo || (app.toDo = {}));
})(app || (app = {}));

//# sourceMappingURL=../../toDo/services/toDoBreezeService.js.map
var app;
(function (app) {
    var toDo;
    (function (toDo) {
        "use strict";
        var ToDoPriorities;
        (function (ToDoPriorities) {
            ToDoPriorities[ToDoPriorities["low"] = 0] = "low";
            ToDoPriorities[ToDoPriorities["medium"] = 1] = "medium";
            ToDoPriorities[ToDoPriorities["high"] = 2] = "high";
        })(ToDoPriorities || (ToDoPriorities = {}));
        angular.module("app.toDo").value("toDoPriorities", ToDoPriorities);
    })(toDo = app.toDo || (app.toDo = {}));
})(app || (app = {}));

//# sourceMappingURL=../../toDo/services/toDoPriorities.js.map
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
        var ToDoService = (function (_super) {
            __extends(ToDoService, _super);
            function ToDoService($http, $q, apiEndpoint, storage) {
                var _this = this;
                _super.call(this, $http, $q, apiEndpoint.getBaseUrl(), "toDo", storage);
                this.$http = $http;
                this.$q = $q;
                this.apiEndpoint = apiEndpoint;
                this.storage = storage;
                this.getRecent = function () {
                    return _this.fromCacheOrService({ method: "GET", uri: _this.baseUri + "/getRecent" });
                };
            }
            return ToDoService;
        })(app.common.DataService);
        angular.module("app.toDo").service("toDoService", ["$http", "$q", "apiEndpoint", "storage", ToDoService]);
    })(toDo = app.toDo || (app.toDo = {}));
})(app || (app = {}));

//# sourceMappingURL=../../toDo/services/toDoService.js.map
var app;
(function (app) {
    var toDo;
    (function (toDo) {
        "use strict";
        var ToDoStatuses;
        (function (ToDoStatuses) {
            ToDoStatuses[ToDoStatuses["new"] = 0] = "new";
            ToDoStatuses[ToDoStatuses["toDo"] = 1] = "toDo";
            ToDoStatuses[ToDoStatuses["toDoNever"] = 2] = "toDoNever";
            ToDoStatuses[ToDoStatuses["started"] = 3] = "started";
            ToDoStatuses[ToDoStatuses["completed"] = 4] = "completed";
        })(ToDoStatuses || (ToDoStatuses = {}));
        angular.module("app.toDo").value("toDoStatuses", ToDoStatuses);
    })(toDo = app.toDo || (app.toDo = {}));
})(app || (app = {}));

//# sourceMappingURL=../../toDo/services/toDoStatuses.js.map
var app;
(function (app) {
    var ui;
    (function (ui) {
        "use strict";
        var AppBar = (function () {
            function AppBar() {
                this.templateUrl = "src/app/ui/appBar/appBar.html";
                this.replace = true;
                this.restrict = "E";
                this.controller = "appBarController";
                this.controllerAs = "appBar";
            }
            AppBar.instance = function () {
                return new AppBar();
            };
            return AppBar;
        })();
        ui.AppBar = AppBar;
        angular.module("app.ui").directive("appBar", [AppBar.instance]);
    })(ui = app.ui || (app.ui = {}));
})(app || (app = {}));

//# sourceMappingURL=../../ui/appBar/appBar.js.map
var app;
(function (app) {
    var ui;
    (function (ui) {
        "use strict";
        var AppBarController = (function () {
            function AppBarController(appBarService) {
                this.appBarService = appBarService;
            }
            return AppBarController;
        })();
        angular.module("app.ui").controller("appBarController", ["appBarService", AppBarController]);
    })(ui = app.ui || (app.ui = {}));
})(app || (app = {}));

//# sourceMappingURL=../../ui/appBar/appBarController.js.map
var app;
(function (app) {
    var ui;
    (function (ui) {
        "use strict";
        var AppBarService = (function () {
            function AppBarService($rootScope, historyService, notificationService) {
                var _this = this;
                this.historyService = historyService;
                this.notificationService = notificationService;
                this.getPreviousUrl = function () {
                    return null;
                };
                this.goBack = function () {
                };
                this.hasNotifications = function () {
                    return false;
                };
                this.setButtons = function (buttons) {
                    _this.buttons = buttons;
                };
                this.resetButtons = function () {
                    _this.buttons = null;
                };
                this.getButtons = function () {
                    return _this.buttons;
                };
                this.buttons = [];
                $rootScope.$on("$locationChangeStart", this.resetButtons);
            }
            return AppBarService;
        })();
        ui.AppBarService = AppBarService;
        angular.module("app.ui").service("appBarService", ["$rootScope", "historyService", "notificationService", AppBarService]);
    })(ui = app.ui || (app.ui = {}));
})(app || (app = {}));

//# sourceMappingURL=../../ui/appBar/appBarService.js.map
var app;
(function (app) {
    var ui;
    (function (ui) {
        var Backdrop = (function () {
            function Backdrop($timeout) {
                var _this = this;
                this.$timeout = $timeout;
                this.replace = true;
                this.restrict = "E";
                this.link = function (scope, element, attributes) {
                    scope.backdropClass = attributes.backdropClass || '';
                    scope.animate = false;
                    _this.$timeout(function () {
                        scope.animate = true;
                    });
                };
            }
            Backdrop.instance = function ($timeout) {
                return new Backdrop($timeout);
            };
            return Backdrop;
        })();
        ui.Backdrop = Backdrop;
        angular.module("app.ui").directive("modalBackdrop", [Backdrop.instance]);
    })(ui = app.ui || (app.ui = {}));
})(app || (app = {}));

//# sourceMappingURL=../../ui/backdrop/backdrop.js.map
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
                    title: "@",
                    isLoggedIn: "&",
                    getUsername: "&"
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
        "use strict";
        var AppBarButton = (function () {
            function AppBarButton() {
                this.restrict = "E";
                this.replace = true;
                this.templateUrl = "/src/app/ui/appBarButton/appBarButton.html";
                this.scope = {
                    button: "="
                };
            }
            AppBarButton.instance = function () {
                return new AppBarButton();
            };
            return AppBarButton;
        })();
        ui.AppBarButton = AppBarButton;
        angular.module("app.ui").directive("appBarButton", [AppBarButton.instance]);
    })(ui = app.ui || (app.ui = {}));
})(app || (app = {}));

//# sourceMappingURL=../../ui/appBarButton/appBarButton.js.map
var app;
(function (app) {
    var ui;
    (function (ui) {
        angular.module("app.ui").value("clientRectEquals", function (clientRectA, clientRectB) {
            if (!clientRectA || !clientRectB) {
                return false;
            }
            return (clientRectA.top === clientRectB.top && clientRectA.left === clientRectB.left && clientRectA.bottom === clientRectB.bottom && clientRectA.right === clientRectB.right);
        });
    })(ui = app.ui || (app.ui = {}));
})(app || (app = {}));

//# sourceMappingURL=../../ui/functions/clientRectEquals.js.map
var app;
(function (app) {
    var ui;
    (function (ui) {
        angular.module("app.ui").value("getBoundingRectForDetachedElement", function (detachedElement) {
            var clientRect;
            detachedElement.style.visibility = 'none';
            document.body.appendChild(detachedElement);
            clientRect = detachedElement.getBoundingClientRect();
            detachedElement.parentNode.removeChild(detachedElement);
            return clientRect;
        });
    })(ui = app.ui || (app.ui = {}));
})(app || (app = {}));

//# sourceMappingURL=../../ui/functions/getBoundingRectForDetachedElement.js.map
var app;
(function (app) {
    var ui;
    (function (ui) {
        angular.module("app.ui").value("getSurroundingWindowSpace", function (element, _window) {
            var clientRect = element.getBoundingClientRect();
            return {
                top: clientRect.top,
                left: clientRect.left,
                bottom: _window.innerHeight - clientRect.bottom,
                right: _window.innerWidth - clientRect.right
            };
        });
    })(ui = app.ui || (app.ui = {}));
})(app || (app = {}));

//# sourceMappingURL=../../ui/functions/getSurroundingWindowSpace.js.map
var app;
(function (app) {
    var ui;
    (function (ui) {
        angular.module("app.ui").value("positionDetachedElement", function (triggerElement, element, directionPriorityList, elementRect, alignment, elementSurroundingWindowSpaceRect) {
            var triggerElementRect = triggerElement.getBoundingClientRect();
            if (alignment === "center") {
                var triggerElementVerticalMiddle = ((triggerElementRect.bottom - triggerElementRect.top) / 2) + triggerElementRect.top;
                var triggerElementHorizontalMiddle = ((triggerElementRect.right - triggerElementRect.left) / 2) + triggerElementRect.left;
                for (var i = 0; i < directionPriorityList.length; i++) {
                    var lastOption = directionPriorityList.length == i + 1;
                    switch (directionPriorityList[i]) {
                        case "top":
                            if (triggerElementRect.top > elementRect.height || lastOption) {
                                if (triggerElementRect.width > elementRect.width || lastOption) {
                                    element.style.top = (triggerElementRect.top - elementRect.height) + "px";
                                    element.style.left = triggerElementHorizontalMiddle - (elementRect.width / 2) + "px";
                                    return {
                                        position: directionPriorityList[i],
                                        elementRect: elementRect
                                    };
                                }
                                else {
                                    var diff = (elementRect.width - triggerElementRect.width) / 2;
                                    if (((triggerElementRect.right + diff) < window.innerWidth) && triggerElementRect.left > diff) {
                                        element.style.top = (triggerElementRect.top - elementRect.height) + "px";
                                        element.style.left = triggerElementHorizontalMiddle - (elementRect.width / 2) + "px";
                                        return {
                                            position: directionPriorityList[i],
                                            elementRect: elementRect
                                        };
                                    }
                                }
                            }
                            break;
                        case "left":
                            if (triggerElementRect.left > elementRect.width || lastOption) {
                                if (triggerElementRect.height > elementRect.height || lastOption) {
                                    element.style.left = (triggerElementRect.left - elementRect.width) + "px";
                                    element.style.top = triggerElementVerticalMiddle - (elementRect.height / 2) + "px";
                                    return {
                                        position: directionPriorityList[i],
                                        elementRect: elementRect
                                    };
                                }
                                else {
                                    var diff = (elementRect.height - triggerElementRect.height) / 2;
                                    if (((triggerElementRect.bottom + diff) < window.innerHeight) && triggerElementRect.top > diff) {
                                        element.style.left = (triggerElementRect.left - elementRect.width) + "px";
                                        element.style.top = triggerElementVerticalMiddle - (elementRect.height / 2) + "px";
                                        return {
                                            position: directionPriorityList[i],
                                            elementRect: elementRect
                                        };
                                    }
                                }
                            }
                            break;
                        case "bottom":
                            if (((window.innerHeight - triggerElementRect.bottom) > elementRect.height) || lastOption) {
                                if (triggerElementRect.width > elementRect.width || lastOption) {
                                    element.style.top = triggerElementRect.bottom + "px";
                                    element.style.left = triggerElementHorizontalMiddle - (elementRect.width / 2) + "px";
                                    return {
                                        position: directionPriorityList[i],
                                        elementRect: elementRect
                                    };
                                }
                                else {
                                    var diff = (elementRect.width - triggerElementRect.width) / 2;
                                    if (((triggerElementRect.right + diff) < window.innerWidth) && triggerElementRect.left > diff) {
                                        element.style.top = triggerElementRect.bottom + "px";
                                        element.style.left = triggerElementHorizontalMiddle - (elementRect.width / 2) + "px";
                                        return {
                                            position: directionPriorityList[i],
                                            elementRect: elementRect
                                        };
                                    }
                                }
                            }
                            break;
                        case "right":
                            if (((window.innerWidth - triggerElementRect.right) > elementRect.width) || lastOption) {
                                if (triggerElementRect.height > elementRect.height || lastOption) {
                                    element.style.left = triggerElementRect.right + "px";
                                    element.style.top = triggerElementVerticalMiddle - (elementRect.height / 2) + "px";
                                    return {
                                        position: directionPriorityList[i],
                                        elementRect: elementRect
                                    };
                                }
                                else {
                                    var diff = (elementRect.height - triggerElementRect.height) / 2;
                                    if (((triggerElementRect.bottom + diff) < window.innerHeight) && triggerElementRect.top > diff) {
                                        element.style.left = triggerElementRect.right + "px";
                                        element.style.top = triggerElementVerticalMiddle - (elementRect.height / 2) + "px";
                                        return {
                                            position: directionPriorityList[i],
                                            elementRect: elementRect
                                        };
                                    }
                                }
                            }
                            break;
                    }
                }
                throw new Error("Unable to position place pop up.");
            }
            if (alignment === "left") {
                element.style.left = triggerElementRect.left + "px";
                for (var i = 0; i < directionPriorityList.length; i++) {
                    var lastOption = directionPriorityList.length == i + 1;
                    if (directionPriorityList[i] === "top") {
                        if (triggerElementRect.top >= elementRect.height || lastOption) {
                            element.style.bottom = triggerElementRect.top + "px";
                            return {
                                position: directionPriorityList[i],
                                elementRect: elementRect
                            };
                        }
                    }
                    if (directionPriorityList[i] === "bottom") {
                        if (window.innerHeight - triggerElementRect.bottom >= elementRect.height || lastOption) {
                            element.style.top = triggerElementRect.bottom + "px";
                            return {
                                position: directionPriorityList[i],
                                elementRect: elementRect
                            };
                        }
                    }
                }
            }
        });
    })(ui = app.ui || (app.ui = {}));
})(app || (app = {}));

//# sourceMappingURL=../../ui/functions/positionDetachedElement.js.map
var app;
(function (app) {
    var ui;
    (function (ui) {
        "use strict";
        var ModalService = (function () {
            function ModalService($q) {
                var _this = this;
                this.$q = $q;
                this.showModal = function (options) {
                    var deferred = _this.$q.defer();
                    return deferred.promise;
                };
            }
            return ModalService;
        })();
        angular.module("app.ui").service("modalService", [ModalService]);
    })(ui = app.ui || (app.ui = {}));
})(app || (app = {}));

//# sourceMappingURL=../../ui/modal/modalService.js.map
var app;
(function (app) {
    var ui;
    (function (ui) {
        "use strict";
        var HamburgerButton = (function () {
            function HamburgerButton() {
                this.templateUrl = "src/app/ui/hamburgerButton/hamburgerButton.html";
                this.replace = true;
                this.restrict = "E";
                this.scope = {
                    onClick: "&"
                };
            }
            HamburgerButton.instance = function () {
                return new HamburgerButton();
            };
            return HamburgerButton;
        })();
        angular.module("app.ui").directive("hamburgerButton", [HamburgerButton.instance]);
    })(ui = app.ui || (app.ui = {}));
})(app || (app = {}));

//# sourceMappingURL=../../ui/hamburgerButton/hamburgerButton.js.map
var app;
(function (app) {
    var ui;
    (function (ui) {
        "use strict";
        var YouTubeVideoDirective = (function () {
            function YouTubeVideoDirective($window) {
                var _this = this;
                this.$window = $window;
                this.restrict = "E";
                this.template = "<div></div>";
                this.scope = {
                    height: "@",
                    width: "@",
                    videoid: "@",
                    playerVars: "@"
                };
                this.link = function (scope, element) {
                    var tag = document.getElementById("you-tube-video");
                    if (tag) {
                        player = new YT.Player(element.children()[0], {
                            playerVars: scope["playerVars"],
                            height: scope["height"],
                            width: scope["width"],
                            videoId: scope["videoid"]
                        });
                    }
                    else {
                        tag = document.createElement("script");
                        tag.src = "https://www.youtube.com/iframe_api";
                        tag.id = "you-tube-video";
                        var firstScriptTag = document.getElementsByTagName('script')[0];
                        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
                        var player;
                        scope.$watch("videoid", function (newValue, oldValue) {
                            if (newValue == oldValue) {
                                return;
                            }
                            player.cueVideoById(scope["videoid"]);
                        });
                        _this.$window["onYouTubeIframeAPIReady"] = function () {
                            player = new YT.Player(element.children()[0], {
                                playerVars: scope["playerVars"],
                                height: scope["height"],
                                width: scope["width"],
                                videoId: scope["videoid"]
                            });
                        };
                    }
                };
            }
            YouTubeVideoDirective.instance = function ($window) {
                return new YouTubeVideoDirective($window);
            };
            return YouTubeVideoDirective;
        })();
        angular.module("app.ui").directive("youTubeVideo", ["$window", YouTubeVideoDirective.instance]);
    })(ui = app.ui || (app.ui = {}));
})(app || (app = {}));

//# sourceMappingURL=../../ui/youTubeVideo/youTubeVideo.js.map
var app;
(function (app) {
    var ui;
    (function (ui) {
        "use strict";
        var DynamicElementDirective = (function () {
            function DynamicElementDirective(dynamicElement) {
                this.dynamicElement = dynamicElement;
                this.restrict = "A";
                this.link = function (scope, element, attributes) {
                };
            }
            DynamicElementDirective.instance = function (dynamicElement) {
                return new DynamicElementDirective(dynamicElement);
            };
            return DynamicElementDirective;
        })();
        angular.module("app.ui").directive("dynamicElement", ["dynamicElement", DynamicElementDirective.instance]);
    })(ui = app.ui || (app.ui = {}));
})(app || (app = {}));

//# sourceMappingURL=../../../ui/dynamicElement/directives/dynamicElement.js.map
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