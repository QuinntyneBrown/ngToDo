module app.common {

    "use strict";

    angular.module("app.common").value("bind",(element: HTMLElement, object:any) => {
        if (element) {
            for (var events in object) {
                var callback: any = object[events];

                events.split(/\s+/).forEach((event: string) => {
                    element.addEventListener(event, callback);
                });
            }
        }
    });
} 