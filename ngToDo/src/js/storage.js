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