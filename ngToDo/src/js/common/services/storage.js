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