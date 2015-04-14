module app.ui {

    angular.module("app.ui").value("bind",(element, object) => {
        if (element) {
            for (var event in object) {
                var callback = object[event];

                event.split(/\s+/).forEach((event) => {
                    element.addEventListener(event, callback);
                });
            }
        }
    });
} 