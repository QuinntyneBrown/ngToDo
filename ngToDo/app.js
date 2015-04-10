var app;
(function (app) {
    var security;
    (function (security) {
        var AuthenticatedController = (function () {
            function AuthenticatedController($location, token) {
                this.$location = $location;
                this.token = token;
            }
            AuthenticatedController.prototype.canActivate = function () {
                if (this.token.get())
                    return true;
                this.$location.path("/login");
                return false;
            };
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
            function DataService($http, $cacheFactory, $q, baseUri) {
                var _this = this;
                this.$http = $http;
                this.$cacheFactory = $cacheFactory;
                this.$q = $q;
                this.baseUri = baseUri;
                this.add = function (entity) {
                    var deferred = _this.$q.defer();
                    _this.$http({ method: "POST", url: _this.baseUri + "add", data: entity }).then(function (results) {
                        deferred.resolve(results);
                    }).catch(function (error) {
                        deferred.reject(error);
                    });
                    return deferred.promise;
                };
                this.update = function (entity) {
                    var deferred = _this.$q.defer();
                    _this.$http({ method: "PUT", url: _this.baseUri + "update", data: JSON.stringify(entity) }).then(function (results) {
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
                        deferred.resolve(results);
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
        common.DataService = DataService;
    })(common = app.common || (app.common = {}));
})(app || (app = {}));

//# sourceMappingURL=dataService.js.map
var app;
(function (app) {
    var common;
    (function (common) {
        var Entity = (function () {
            function Entity($location, $q, dataService, baseUri) {
                var _this = this;
                this.$location = $location;
                this.$q = $q;
                this.dataService = dataService;
                this.baseUri = baseUri;
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
                        for (var i = 0; i < results.data.length; i++) {
                            promises.push(_this.instance(results.data[i]));
                        }
                        _this.$q.all(promises).then(function (allResults) {
                            for (var x = 0; x < allResults.length; x++) {
                                entities.push(allResults[x]);
                            }
                            deferred.resolve(entities);
                        });
                    });
                    return deferred.promise;
                };
                this.save = function () {
                    var deferred = _this.$q.defer();
                    if (_this.isValid()) {
                        if (_this.id) {
                            _this.dataService.update(_this).then(function () {
                                _this.notifySaved();
                                deferred.resolve();
                            });
                        }
                        else {
                            _this.dataService.add(_this).then(function () {
                                _this.notifySaved();
                                deferred.resolve();
                            });
                        }
                    }
                    else {
                        deferred.reject();
                    }
                    return deferred.promise;
                };
                this.remove = function () {
                    var deferred = _this.$q.defer();
                    if (_this.id) {
                        _this.dataService.remove(_this.id).then(function () {
                            _this.isDeleted = true;
                            _this.notifyDeleted();
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
                this.notifySaved = function () {
                    _this.notifyChanged("saved");
                };
                this.notifyDeleted = function () {
                    _this.notifyChanged("deleted");
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
            Entity.prototype.notifyChanged = function (changeType) {
                this.notify("entityChanged", { target: this, changeType: changeType });
            };
            Entity.prototype.notify = function (customeEventName, detailArg) {
                var event = document.createEvent('CustomEvent');
                event.initCustomEvent(customeEventName, false, false, detailArg);
                document.dispatchEvent(event);
            };
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
        ]).config(["featureComponentsMappingsProvider", "routesProvider", config]);
        function config(featureComponentsMappingsProvider, routesProvider) {
            featureComponentsMappingsProvider.mappings.push({
                feature: "security",
                components: ["login"]
            });
            routesProvider.configure([
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
            "routesProvider",
            config
        ]);
        function config($componentLoaderProvider, $httpProvider, $locationProvider, apiEndpointProvider, featureComponentsMappingsProvider, routesProvider) {
            featureComponentsMappingsProvider.mappings.push({
                feature: "toDo",
                components: ["toDoRecent", "toDoForm", "toDoList", "toDoDetail", "toDoAbout", "toDoMasterDetail"]
            });
            routesProvider.configure([
                { path: '/', component: 'toDoAbout' },
                { path: '/toDo/about', component: 'toDoAbout' },
                { path: '/toDo/recent', component: 'toDoRecent' },
                { path: '/toDo/list', component: 'toDoList' },
                { path: '/toDo/detail/:toDoId', component: 'toDoDetail' },
                { path: '/toDo/create', component: 'toDoForm' },
                { path: '/toDo/edit/:toDoId', component: 'toDoForm' }
            ]);
            var mappings = featureComponentsMappingsProvider.mappings;
            $componentLoaderProvider.setTemplateMapping(function (name) {
                for (var i = 0; i < mappings.length; i++) {
                    for (var c = 0; c < mappings[i].components.length; c++) {
                        if (name === mappings[i].components[c]) {
                            return 'src/app/' + mappings[i].feature + '/views/' + name + '.html';
                        }
                    }
                }
                throw new Error("Unmapped Component " + name);
            });
            $componentLoaderProvider.setCtrlNameMapping(function (name) {
                return name[0].toLowerCase() + name.substr(1) + 'Controller';
            });
            $httpProvider.interceptors.push("authorizationInterceptor");
            $httpProvider.interceptors.push("requestCounter");
            apiEndpointProvider.configure("/api/");
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
                this.template = "<div data-ng-show='requestCount' class='work-spinner'><i class='fa fa-spinner fa-spin fade'></i></div>";
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
        "use strict";
        var FeatureComponentsMappingsProvider = (function () {
            function FeatureComponentsMappingsProvider() {
                this.mappings = [];
            }
            FeatureComponentsMappingsProvider.prototype.$get = function () {
                return this.mappings;
            };
            return FeatureComponentsMappingsProvider;
        })();
        common.FeatureComponentsMappingsProvider = FeatureComponentsMappingsProvider;
        angular.module("app.common").provider("featureComponentsMappings", FeatureComponentsMappingsProvider);
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
        var HistoryService = (function () {
            function HistoryService() {
            }
            return HistoryService;
        })();
        common.HistoryService = HistoryService;
        angular.module("app.common").service("historyService", [HistoryService]);
    })(common = app.common || (app.common = {}));
})(app || (app = {}));

//# sourceMappingURL=../../common/services/historyService.js.map
var app;
(function (app) {
    var common;
    (function (common) {
        var NotificationService = (function () {
            function NotificationService() {
            }
            return NotificationService;
        })();
        common.NotificationService = NotificationService;
        angular.module("app.common").service("notificationService", [NotificationService]);
    })(common = app.common || (app.common = {}));
})(app || (app = {}));

//# sourceMappingURL=../../common/services/notificationService.js.map
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
        var RoutesProvider = (function () {
            function RoutesProvider() {
                var _this = this;
                this.routes = [];
                this.configure = function (routes) {
                    for (var i = 0; i < routes.length; i++) {
                        _this.routes.push(routes[i]);
                    }
                };
            }
            RoutesProvider.prototype.$get = function () {
                return this.routes;
            };
            return RoutesProvider;
        })();
        common.RoutesProvider = RoutesProvider;
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
        var CommonStorage = (function (_super) {
            __extends(CommonStorage, _super);
            function CommonStorage() {
                _super.call(this, "commonLocalStorage");
            }
            return CommonStorage;
        })(common.Storage);
        common.CommonStorage = CommonStorage;
        angular.module("app.common").service("storage", [CommonStorage]);
    })(common = app.common || (app.common = {}));
})(app || (app = {}));

//# sourceMappingURL=../../common/services/storage.js.map
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
        var OAuthEndpointProvider = (function () {
            function OAuthEndpointProvider() {
                this.config = {
                    baseUrl: "/login"
                };
            }
            OAuthEndpointProvider.prototype.configure = function (baseUrl) {
                this.config = {
                    baseUrl: baseUrl
                };
            };
            OAuthEndpointProvider.prototype.$get = function () {
                return this.config;
            };
            return OAuthEndpointProvider;
        })();
        security.OAuthEndpointProvider = OAuthEndpointProvider;
        angular.module("app.security").provider("oauthEndpoint", OAuthEndpointProvider);
    })(security = app.security || (app.security = {}));
})(app || (app = {}));

//# sourceMappingURL=../../security/services/oauthEndpointProvider.js.map
var app;
(function (app) {
    var security;
    (function (security) {
        var SecurityService = (function () {
            function SecurityService($http, $q, currentUser, formEncode, oauthEndpoint, token) {
                var _this = this;
                this.$http = $http;
                this.$q = $q;
                this.currentUser = currentUser;
                this.formEncode = formEncode;
                this.oauthEndpoint = oauthEndpoint;
                this.token = token;
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
                    _this.$http.post(_this.oauthEndpoint.baseUrl, data, configuration).then(function (response) {
                        _this.processToken(username, response);
                        deferred.resolve(true);
                    }).catch(function (Error) {
                        deferred.reject();
                    });
                    return deferred.promise;
                };
                this.processToken = function (username, response) {
                    var currentUser = { username: username };
                    _this.currentUser.set({ data: currentUser });
                    _this.token.set({ data: response.data.access_token });
                };
            }
            return SecurityService;
        })();
        security.SecurityService = SecurityService;
        angular.module("app.security").service("securityService", ["$http", "$q", "currentUser", "formEncode", "oauthEndpoint", "token", SecurityService]);
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
var app;
(function (app) {
    var security;
    (function (security) {
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
            function ToDoAboutController($location, token) {
                _super.call(this, $location, token);
                this.$location = $location;
                this.token = token;
            }
            return ToDoAboutController;
        })(app.security.AuthenticatedController);
        angular.module("app.toDo").controller("toDoAboutController", ["$location", "token", ToDoAboutController]);
    })(toDo = app.toDo || (app.toDo = {}));
})(app || (app = {}));

//# sourceMappingURL=../../toDo/controllers/toDoAboutController.js.map
var app;
(function (app) {
    var toDo;
    (function (toDo) {
        var ToDoAppController = (function () {
            function ToDoAppController($location, $rootScope, $router, routes, token) {
                var _this = this;
                this.$location = $location;
                this.$router = $router;
                this.token = token;
                this.isLoggedIn = function () {
                    return _this.token.get();
                };
                $router.config(routes);
            }
            return ToDoAppController;
        })();
        toDo.ToDoAppController = ToDoAppController;
        angular.module("app.toDo").controller("toDoAppController", ["$location", "$rootScope", "$router", "routes", "token", ToDoAppController]);
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
            function ToDoDetailController($location, $q, $routeParams, toDo, token) {
                var _this = this;
                _super.call(this, $location, token);
                this.$location = $location;
                this.$q = $q;
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
        angular.module("app.toDo").controller("toDoDetailController", ["$location", "$q", "$routeParams", "toDo", "token", ToDoDetailController]);
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
            function ToDoFormController($location, $q, $routeParams, appBarService, toDo, token) {
                var _this = this;
                _super.call(this, $location, token);
                this.$location = $location;
                this.$q = $q;
                this.$routeParams = $routeParams;
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
                            onClick: _this.toDo.save,
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
                document.addEventListener("entityChanged", function (event) {
                    if (event.detail.changeType == "saved") {
                        $location.path("/toDo/list");
                    }
                });
            }
            return ToDoFormController;
        })(app.security.AuthenticatedController);
        angular.module("app.toDo").controller("toDoFormController", ["$location", "$q", "$routeParams", "appBarService", "toDo", "token", ToDoFormController]);
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
        var ToDoListController = (function (_super) {
            __extends(ToDoListController, _super);
            function ToDoListController($location, $q, toDo, token) {
                var _this = this;
                _super.call(this, $location, token);
                this.$location = $location;
                this.$q = $q;
                this.toDo = toDo;
                this.token = token;
                this.activate = function () {
                    var deferred = _this.$q.defer();
                    _this.toDo.getAll().then(function (results) {
                        _this.toDos = results;
                        deferred.resolve(true);
                    }).catch(function (Error) {
                        deferred.resolve(false);
                    });
                    return deferred.promise;
                };
            }
            return ToDoListController;
        })(app.security.AuthenticatedController);
        angular.module("app.toDo").controller("toDoListController", ["$location", "$q", "toDo", "token", ToDoListController]);
    })(toDo = app.toDo || (app.toDo = {}));
})(app || (app = {}));

//# sourceMappingURL=../../toDo/controllers/toDoListController.js.map
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
        var ToDoMasterDetailController = (function (_super) {
            __extends(ToDoMasterDetailController, _super);
            function ToDoMasterDetailController($location, $q, toDoService, token) {
                _super.call(this, $location, token);
                this.$location = $location;
                this.$q = $q;
                this.toDoService = toDoService;
                this.token = token;
            }
            return ToDoMasterDetailController;
        })(app.security.AuthenticatedController);
        angular.module("app.toDo").controller("toDoMasterDetailController", ["$location", "$q", "toDoService", "token", ToDoMasterDetailController]);
    })(toDo = app.toDo || (app.toDo = {}));
})(app || (app = {}));

//# sourceMappingURL=../../toDo/controllers/toDoMasterDetailController.js.map
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
            function ToDoRecentController($location, $q, toDo, token) {
                var _this = this;
                _super.call(this, $location, token);
                this.$location = $location;
                this.$q = $q;
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
        angular.module("app.toDo").controller("toDoRecentController", ["$location", "$q", "toDo", "token", ToDoRecentController]);
    })(toDo = app.toDo || (app.toDo = {}));
})(app || (app = {}));

//# sourceMappingURL=../../toDo/controllers/toDoRecentController.js.map
var app;
(function (app) {
    var security;
    (function (security) {
        var LoginForm = (function () {
            function LoginForm(securityService) {
                this.securityService = securityService;
                this.templateUrl = "/src/app/security/directives/loginForm.html";
                this.controllerAs = "loginForm";
                this.controller = "loginFormController";
                this.restrict = "E";
                this.replace = true;
            }
            LoginForm.instance = function (securityService) {
                return new LoginForm(securityService);
            };
            return LoginForm;
        })();
        security.LoginForm = LoginForm;
        angular.module("app.security").directive("loginForm", ["securityService", LoginForm.instance]);
    })(security = app.security || (app.security = {}));
})(app || (app = {}));

//# sourceMappingURL=../../security/directives/loginForm.js.map
var app;
(function (app) {
    var security;
    (function (security) {
        var LoginFormController = (function () {
            function LoginFormController($location, securityService, token) {
                var _this = this;
                this.$location = $location;
                this.securityService = securityService;
                this.token = token;
                this.username = "quinntynebrown@gmail.com";
                this.password = "P@ssw0rd";
                this.tryToLogin = function () {
                    _this.securityService.login(_this.username, _this.password).then(function (results) {
                        _this.$location.path("/toDo/list");
                    });
                };
            }
            return LoginFormController;
        })();
        angular.module("app.security").controller("loginFormController", ["$location", "securityService", LoginFormController]);
    })(security = app.security || (app.security = {}));
})(app || (app = {}));

//# sourceMappingURL=../../security/directives/loginFormController.js.map
var app;
(function (app) {
    var ui;
    (function (ui) {
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
        var AppBarController = (function () {
            function AppBarController(appBarService) {
                this.appBarService = appBarService;
            }
            return AppBarController;
        })();
        ui.AppBarController = AppBarController;
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
            function AppBarService($rootScope, appBarButtonConstructorFn, historyService, notificationService) {
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
        angular.module("app.ui").service("appBarService", ["$rootScope", "appBarButtonConstructorFn", "historyService", "notificationService", AppBarService]);
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
                    isLoggedIn: "&"
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
        var ToDo = (function (_super) {
            __extends(ToDo, _super);
            function ToDo($location, $q, toDoService) {
                var _this = this;
                _super.call(this, $location, $q, toDoService, '/toDo');
                this.$location = $location;
                this.$q = $q;
                this.toDoService = toDoService;
                this.instance = function (data) {
                    if (data === void 0) { data = null; }
                    var deferred = _this.$q.defer();
                    var toDo;
                    if (data === null) {
                        toDo = new ToDo(_this.$location, _this.$q, _this.toDoService);
                    }
                    else {
                        toDo = new ToDo(_this.$location, _this.$q, _this.toDoService);
                        toDo.id = data.id || 0;
                        toDo.name = data.name;
                        toDo.description = data.description;
                        toDo.status = data.status || 1;
                    }
                    deferred.resolve(toDo);
                    return deferred.promise;
                };
                this.getValidationErrors = function () {
                    var validationErrors = [];
                    if (!_this.name || _this.name.length < 0)
                        validationErrors.push("Name can not be empty");
                    if (!_this.description || _this.description.length < 0)
                        validationErrors.push("Description can not be empty");
                    return validationErrors;
                };
                this.complete = function () {
                    if (_this.isValid()) {
                        return _this.setStatus(5);
                    }
                };
                this.toDo = function () {
                    return _this.setStatus(2);
                };
                this.toDoNever = function () {
                    return _this.setStatus(3);
                };
                this.start = function () {
                    return _this.setStatus(4);
                };
                this.setStatus = function (status) {
                    var deferred = _this.$q.defer();
                    _this.status = status;
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
                        for (var i = 0; i < results.data.length; i++) {
                            promises.push(_this.instance(results.data[i]));
                        }
                        _this.$q.all(promises).then(function (allResults) {
                            for (var x = 0; x < allResults.length; x++) {
                                entities.push(allResults[x]);
                            }
                            deferred.resolve(entities);
                        });
                    });
                    return deferred.promise;
                };
                this.status = 1;
            }
            return ToDo;
        })(app.common.Entity);
        angular.module("app.toDo").service("toDo", ["$location", "$q", "toDoService", ToDo]);
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
                breeze.config.initializeAdapterInstance('modelLibrary', 'backingStore', true);
                breeze.NamingConvention.camelCase.setAsDefault();
                this.entityManager = new breeze.EntityManager("breeze/breezedataservice");
            }
            return ToDoBreezeService;
        })();
        toDo.ToDoBreezeService = ToDoBreezeService;
    })(toDo = app.toDo || (app.toDo = {}));
})(app || (app = {}));

//# sourceMappingURL=../../toDo/services/toDoBreezeService.js.map
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
            function ToDoService($http, $cacheFactory, $q, apiEndpoint) {
                var _this = this;
                _super.call(this, $http, $cacheFactory, $q, apiEndpoint.baseUrl + "todo/");
                this.$http = $http;
                this.$cacheFactory = $cacheFactory;
                this.$q = $q;
                this.apiEndpoint = apiEndpoint;
                this.getRecent = function () {
                    var deferred = _this.$q.defer();
                    _this.$http({ method: "GET", url: _this.baseUri + "getRecent" }).then(function (results) {
                        deferred.resolve(results);
                    }).catch(function (error) {
                        deferred.reject(error);
                    });
                    return deferred.promise;
                };
            }
            return ToDoService;
        })(app.common.DataService);
        toDo.ToDoService = ToDoService;
        angular.module("app.toDo").service("toDoService", ["$http", "$cacheFactory", "$q", "apiEndpoint", ToDoService]);
    })(toDo = app.toDo || (app.toDo = {}));
})(app || (app = {}));

//# sourceMappingURL=../../toDo/services/toDoService.js.map
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
        function AppBarButtonConstructorFn(text, onClick, type) {
            return {
                type: type,
                text: text,
                onClick: onClick
            };
        }
        ui.AppBarButtonConstructorFn = AppBarButtonConstructorFn;
        angular.module("app.ui").value("appBarButtonConstructorFn", AppBarButtonConstructorFn);
    })(ui = app.ui || (app.ui = {}));
})(app || (app = {}));

//# sourceMappingURL=../../ui/appBarButton/appBarButtonConstructorFn.js.map


//# sourceMappingURL=../../ui/hamburgerButton/hamburgerButton.js.map