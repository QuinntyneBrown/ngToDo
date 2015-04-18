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