"use strict";
/*eslint no-undef: "error"*/
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var penthouse_1 = require("penthouse");
var fs_1 = require("fs");
var url_1 = require("url");
var console_1 = require("console");
var buffer_1 = require("buffer");
var node_downloader_helper_1 = require("node-downloader-helper");
var esm_path_1 = require("esm-path");
// populate with as many urls as you want,
// only X will be executed in parallel;
// configured at the bottom
var urls = [
    "file://index.html",
];
var __dirname = (0, esm_path_1.getAbsolutePath)(import.meta.url);
var viewPorts = {
    mobile: {
        width: 414,
        height: 736
    },
    tablet: {
        width: 768,
        height: 1024
    },
    desktop: {
        width: 1366,
        height: 768
    }
};
var resolution = viewPorts.mobile;

/*
var dl = new node_downloader_helper_1.DownloaderHelper("https://www.sableinternational.com/ResourcePackages/SableMasterCore/assets/dist/css/sable.min.css", __dirname);
dl.on("end", function () { return console_1["default"].log("Download Completed"); });
dl.on("error", function (err) { return console_1["default"].log("Download Failed", err); });
await dl.start()["catch"](function (err) { return console_1["default"].error(err); });
*/

var penthouseOptions = {
    //cssString: 'body {color: red}, .someCss {}'
    //css: "./index_files/nicepage.css"
    css: (0, esm_path_1.getAbsolutePath)(import.meta.url, "app.css"),
    width: resolution.width,
    height: resolution.height
};
// recursively generates critical css for one url at the time,
// until all urls have been handled
function startNewJob() {
    var url = urls.pop(); // NOTE: mutates urls array
    if (!url) {
        // no more new jobs to process (might still be jobs currently in process)
        return Promise.resolve();
    }
    return (0, penthouse_1["default"])(__assign({ url: url }, penthouseOptions)).then(function (criticalCss) {
        // do something with your criticalCSS here!
        var targetCssFileName = buffer_1.Buffer.from(new url_1.URL(url).pathname).toString("base64");
        var fileName = (0, esm_path_1.getAbsolutePath)(import.meta.url, "".concat(targetCssFileName, "_").concat(resolution.width, "x").concat(resolution.height, ".css"));
        (0, fs_1.writeFileSync)(fileName, criticalCss);
        // Then call to see if there are more jobs to process
        return startNewJob();
    });
}
// how many jobs do we want to handle in paralell?
// Below, 5:
Promise.all([
    startNewJob(),
    startNewJob(),
    startNewJob(),
    startNewJob(),
    startNewJob(),
]).then(function () {
    console_1["default"].log("all done!");
});
