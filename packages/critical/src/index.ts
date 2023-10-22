/*eslint no-undef: "error"*/

import penthouse, { IPenthouseOptions } from "penthouse";
import { writeFileSync } from "fs";
import { URL } from "url";
import console from "console";
import { Buffer } from "buffer";
import { DownloaderHelper } from "node-downloader-helper";
import { getAbsolutePath } from "esm-path";

// populate with as many urls as you want,
// only X will be executed in parallel;
// configured at the bottom
const urls = [
  //'https://google.com',
  //'https://amazon.co.uk'
  //"http://127.0.0.1:8080",
  "https://www.sableinternational.com/forex",
];

const __dirname = getAbsolutePath(import.meta.url);

const viewPorts = {
  mobile: {
    width: 414,
    height: 736,
  },
  tablet: {
    width: 768,
    height: 1024,
  },
  desktop: {
    width: 1366,
    height: 768,
  },
};

const resolution = viewPorts.mobile;

const dl = new DownloaderHelper(
  "https://www.sableinternational.com/ResourcePackages/SableMasterCore/assets/dist/css/sable.min.css",
  __dirname
);

dl.on("end", () => console.log("Download Completed"));
dl.on("error", (err) => console.log("Download Failed", err));
await dl.start().catch((err) => console.error(err));

const penthouseOptions: IPenthouseOptions = {
  //cssString: 'body {color: red}, .someCss {}'
  //css: "./index_files/nicepage.css"
  css: getAbsolutePath(import.meta.url, "sable.min.css"),
  width: resolution.width,
  height: resolution.height,
};

// recursively generates critical css for one url at the time,
// until all urls have been handled
function startNewJob() {
  const url = urls.pop(); // NOTE: mutates urls array
  if (!url) {
    // no more new jobs to process (might still be jobs currently in process)
    return Promise.resolve();
  }
  return penthouse({
    url,
    ...penthouseOptions,
  }).then((criticalCss: any) => {
    // do something with your criticalCSS here!
    const targetCssFileName = Buffer.from(new URL(url).pathname).toString(
      "base64"
    );
    const fileName = getAbsolutePath(
      import.meta.url,
      `${targetCssFileName}_${resolution.width}x${resolution.height}.css`
    );
    writeFileSync(fileName, criticalCss);
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
]).then(() => {
  console.log("all done!");
});
