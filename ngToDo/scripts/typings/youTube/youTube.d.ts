declare module YT {
    interface Player {
        name: string;
        message: string;
    }

    export var Player: {
        new (element: any, options: any): Player;
    }
}