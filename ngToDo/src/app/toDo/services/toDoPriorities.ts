module app.toDo {

    "use strict";

    enum ToDoPriorities {
        low,
        medium,
        high
    }

    angular.module("app.toDo").value("toDoPriorities", ToDoPriorities);
} 