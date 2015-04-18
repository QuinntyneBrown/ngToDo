module app.common {

    angular.module("app.common").value("fire",(target, type, properties) =>{
        var htmlEvent = document.createEvent("HTMLEvents");

        htmlEvent.initEvent(type, true, true);

        for (var j in properties) {
            htmlEvent[j] = properties[j];
        }

        target.dispatchEvent(htmlEvent);
    });

} 