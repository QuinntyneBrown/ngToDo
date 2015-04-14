var app;
(function (app) {
    var ui;
    (function (ui) {
        "use strict";
        var HamburgerButton = (function () {
            function HamburgerButton() {
                this.templateUrl = "src/app/ui/hamburgerButton/hamburgerButton.html";
                this.replace = true;
                this.restrict = "E";
                this.scope = {
                    onClick: "&"
                };
            }
            HamburgerButton.instance = function () {
                return new HamburgerButton();
            };
            return HamburgerButton;
        })();
        angular.module("app.ui").directive("hamburgerButton", [HamburgerButton.instance]);
    })(ui = app.ui || (app.ui = {}));
})(app || (app = {}));

//# sourceMappingURL=../../ui/hamburgerButton/hamburgerButton.js.map