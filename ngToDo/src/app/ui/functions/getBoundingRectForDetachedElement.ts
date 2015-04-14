module app.ui {

    angular.module("app.ui").value("getBoundingRectForDetachedElement", (detachedElement: HTMLElement) => {

        var clientRect: ClientRect;
        detachedElement.style.visibility = 'none';
        document.body.appendChild(detachedElement);
        clientRect = detachedElement.getBoundingClientRect();
        detachedElement.parentNode.removeChild(detachedElement);
        return clientRect;

    });
} 