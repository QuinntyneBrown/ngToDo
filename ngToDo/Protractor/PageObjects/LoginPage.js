var config = require("./config");

var LoginPage = function () {

    this.go = function () {
        browser.get(LoginPage.url);
    };

};

LoginPage.url = config.baseUrl + "#/login";

module.exports = LoginPage;