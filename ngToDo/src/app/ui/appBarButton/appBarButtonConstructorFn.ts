module app.ui {

    export function AppBarButtonConstructorFn(text:string,onClick:()=>void, type:string) {
        return {
            type: type,
            text: text,
            onClick: onClick
        };
    }

    angular.module("app.ui").value("appBarButtonConstructorFn", AppBarButtonConstructorFn);
} 