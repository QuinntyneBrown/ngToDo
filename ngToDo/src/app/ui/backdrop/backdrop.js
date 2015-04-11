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
//# sourceMappingURL=backdrop.js.map