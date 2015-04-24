module app.ui {

    "use strict";

    class YouTubeVideoDirective {

        constructor(private $window: ng.IWindowService) {

        }

        public static instance = ($window: ng.IWindowService) => {
            return new YouTubeVideoDirective($window);
        }

        public restrict: string = "E";

        public template:string = "<div></div>";

        public scope: any = {
            height:"@",
            width:"@",
            videoid:"@",
            playerVars:"@"
        };

        public link = (scope: ng.IScope, element: ng.IAugmentedJQuery) => {

            var tag = <HTMLScriptElement>document.getElementById("you-tube-video");

            if (tag) {
                player = new YT.Player(element.children()[0], {
                    playerVars: scope["playerVars"],
                    height: scope["height"],
                    width: scope["width"],
                    videoId: scope["videoid"]
                });
            }
            else {


                tag = document.createElement("script");
                tag.src = "https://www.youtube.com/iframe_api";
                tag.id = "you-tube-video";
                var firstScriptTag = document.getElementsByTagName('script')[0];
                firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
                var player;

                scope.$watch("videoid", (newValue, oldValue) => {
                    if (newValue == oldValue) {
                        return;
                    }

                    player.cueVideoById(scope["videoid"]);

                });

                this.$window["onYouTubeIframeAPIReady"] =  () => {
                    player = new YT.Player(element.children()[0], {
                        playerVars: scope["playerVars"],
                        height: scope["height"],
                        width: scope["width"],
                        videoId: scope["videoid"]
                    });
                };
            }
        }
    }

    angular.module("app.ui").directive("youTubeVideo", ["$window",YouTubeVideoDirective.instance]);
} 