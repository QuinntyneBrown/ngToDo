module app.ui {

    angular.module("app.ui").value("getSurroundingWindowSpace", (element: HTMLElement, _window: Window): IRect => {

        var clientRect = element.getBoundingClientRect();
        return {
            top: clientRect.top,
            left: clientRect.left,
            bottom: _window.innerHeight - clientRect.bottom,
            right: _window.innerWidth - clientRect.right
    };

    });
} 