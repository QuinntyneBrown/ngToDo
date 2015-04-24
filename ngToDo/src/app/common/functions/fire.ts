module app.common {

    "use strict";

    angular.module("app.common").value("fire",(target: HTMLElement, type:string, properties:any) =>{
        var htmlEvent = document.createEvent("HTMLEvents");

        htmlEvent.initEvent(type, true, true);

        for (var j in properties) {
            htmlEvent[j] = properties[j];
        }

        target.dispatchEvent(htmlEvent);
    });

} 