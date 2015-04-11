var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var app;
(function (app) {
    var toDo;
    (function (_toDo) {
        "use strict";
        var ToDoFormController = (function (_super) {
            __extends(ToDoFormController, _super);
            function ToDoFormController($location, $q, $routeParams, appBarService, toDo, token) {
                var _this = this;
                _super.call(this, $location, token);
                this.$location = $location;
                this.$q = $q;
                this.$routeParams = $routeParams;
                this.appBarService = appBarService;
                this.toDo = toDo;
                this.token = token;
                this.setAppBarButtons = function () {
                    _this.appBarService.setButtons([
                        {
                            type: "Done",
                            text: "Done",
                            onClick: _this.toDo.complete,
                            isValid: _this.toDo.isValid
                        },
                        {
                            type: "Save",
                            text: "Save",
                            onClick: function () {
                                _this.toDo.save().then(function (results) {
                                    _this.$location.path("/toDo/edit/" + results.id);
                                });
                            },
                            isValid: _this.toDo.isValid
                        }
                    ]);
                };
                this.activate = function () {
                    var deferred = _this.$q.defer();
                    if (_this.$routeParams["toDoId"]) {
                        _this.toDo.getById(_this.$routeParams["toDoId"]).then(function (results) {
                            _this.toDo = results;
                            _this.setAppBarButtons();
                            deferred.resolve(true);
                        }).catch(function (Error) {
                            deferred.resolve(false);
                        });
                    }
                    else {
                        _this.toDo.instance(null).then(function (results) {
                            _this.toDo = results;
                            _this.setAppBarButtons();
                            deferred.resolve(true);
                        });
                    }
                    return deferred.promise;
                };
            }
            return ToDoFormController;
        })(app.security.AuthenticatedController);
        angular.module("app.toDo").controller("toDoFormController", ["$location", "$q", "$routeParams", "appBarService", "toDo", "token", ToDoFormController]);
    })(toDo = app.toDo || (app.toDo = {}));
})(app || (app = {}));

//# sourceMappingURL=../../toDo/controllers/toDoFormController.js.map