var app;
(function (app) {
    var ui;
    (function (ui) {
        "use strict";
        var YouTubeVideoDirective = (function () {
            function YouTubeVideoDirective($window) {
                var _this = this;
                this.$window = $window;
                this.restrict = "E";
                this.template = "<div></div>";
                this.scope = {
                    height: "@",
                    width: "@",
                    videoid: "@",
                    playerVars: "@"
                };
                this.link = function (scope, element) {
                    var tag = document.getElementById("you-tube-video");
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
                        scope.$watch("videoid", function (newValue, oldValue) {
                            if (newValue == oldValue) {
                                return;
                            }
                            player.cueVideoById(scope["videoid"]);
                        });
                        _this.$window["onYouTubeIframeAPIReady"] = function () {
                            player = new YT.Player(element.children()[0], {
                                playerVars: scope["playerVars"],
                                height: scope["height"],
                                width: scope["width"],
                                videoId: scope["videoid"]
                            });
                        };
                    }
                };
            }
            YouTubeVideoDirective.instance = function ($window) {
                return new YouTubeVideoDirective($window);
            };
            return YouTubeVideoDirective;
        })();
        angular.module("app.ui").directive("youTubeVideo", ["$window", YouTubeVideoDirective.instance]);
    })(ui = app.ui || (app.ui = {}));
})(app || (app = {}));

//# sourceMappingURL=../../ui/youTubeVideo/youTubeVideo.js.map