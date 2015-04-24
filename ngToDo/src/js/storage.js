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