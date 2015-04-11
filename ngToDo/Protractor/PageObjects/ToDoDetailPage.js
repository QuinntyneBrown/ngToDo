var config = require("./config");

var ToDoDetailPage = function () {

    this.go = function () {
        browser.get(ToDoDetailPage.url);
    };

};

ToDoDetailPage.url = config.baseUrl + "#/toDo/detail/1";

module.exports = ToDoDetailPage;