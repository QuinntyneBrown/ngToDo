'use strict';
var GulpConfig = (function () {

    function GulpConfig() {

        this.source = './src/';
        this.sourceApp = this.source + 'app/';

        this.tsOutputPath = this.source + '/js';
        this.allJavaScript = [this.source + '/js/**/*.js'];
        this.allTypeScript = this.sourceApp + '/**/*.ts!(*.unit.ts)';

        this.typings = './Scripts/typings/';
        this.libraryTypeScriptDefinitions = './Scripts/typings/**/*.ts';
        this.appTypeScriptReferences = this.typings + 'typeScriptApp.d.ts';
    }
    return GulpConfig;
})();
module.exports = GulpConfig;
