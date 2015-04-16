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