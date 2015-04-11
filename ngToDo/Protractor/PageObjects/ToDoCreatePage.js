var config = require("./config");

var ToDoCreatePage = function () {

    this.go = function () {
        browser.get(ToDoCreatePage.url);
    };

};

ToDoCreatePage.url = config.baseUrl + "#/toDo/create";

module.exports = ToDoCreatePage;