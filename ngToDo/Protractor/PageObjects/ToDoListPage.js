var config = require("./config");

var ToDoListPage = function () {

    this.go = function () {
        browser.get(ToDoListPage.url);
    };

};

ToDoListPage.url = config.baseUrl + "#/todo/list";

module.exports = ToDoListPage;