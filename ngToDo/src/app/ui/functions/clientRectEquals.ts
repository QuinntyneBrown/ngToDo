module app.ui {

    angular.module("app.ui").value("clientRectEquals",(clientRectA: ClientRect, clientRectB: ClientRect) => {
        if (!clientRectA || !clientRectB) {
            return false;
        }
        return (clientRectA.top === clientRectB.top
            && clientRectA.left === clientRectB.left
            && clientRectA.bottom === clientRectB.bottom
            && clientRectA.right === clientRectB.right);
    });
}
 