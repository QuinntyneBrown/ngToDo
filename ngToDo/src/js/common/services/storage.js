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
            function CommonStorage() {
                _super.call(this, "commonLocalStorage");
            }
            return CommonStorage;
        })(common.Storage);
        angular.module("app.common").service("storage", [CommonStorage]);
    })(common = app.common || (app.common = {}));
})(app || (app = {}));

//# sourceMappingURL=../../common/services/storage.js.map