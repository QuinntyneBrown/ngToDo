module app.common {

    angular.module("app.common").value("bind",(element, object) => {
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