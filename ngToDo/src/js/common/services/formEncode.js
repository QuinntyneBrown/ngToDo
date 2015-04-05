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