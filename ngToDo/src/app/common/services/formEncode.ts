module app.common {

    "use strict";

    var formEncode = () => {
        return (data) => {
            var pairs = [];
            for (var name in data) {
                pairs.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
            }
            return pairs.join('&').replace(/%20/g, '+');
        };
    };

    angular.module("app.common").factory("formEncode", formEncode);

}