var config = require("./config");

var ToDoRecentPage = function () {

    this.go = function () {
        browser.get(ToDoRecentPage.url);
    };

};

ToDoRecentPage.url = config.baseUrl + "#/todo/recent";

module.exports = ToDoRecentPage;