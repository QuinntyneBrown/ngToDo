module app.ui {

    angular.module("app.ui").value("fire",(target, type, properties) =>{
        var htmlEvent = document.createEvent("HTMLEvents");

        htmlEvent.initEvent(type, true, true);

        for (var j in properties) {
            htmlEvent[j] = properties[j];
        }

        target.dispatchEvent(htmlEvent);
    });

} 