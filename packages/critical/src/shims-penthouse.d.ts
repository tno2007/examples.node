declare module "penthouse" {
  interface IPenthouseOptions {
    url?: string;
    css?: string;
    // OPTIONAL params
    width?: number; // viewport width
    height?: number; // viewport height
    forceInclude?: string[] | RegExp[];
    timeout?: number; // ms; abort critical CSS generation after this timeout
    strict?: boolean; // set to true to throw on CSS errors (will run faster if no errors)
    maxEmbeddedBase64Length?: number; // characters; strip out inline base64 encoded resources larger than this
    userAgent?: string; // specify which user agent string when loading the page
    renderWaitTime?: number; // ms; render wait timeout before CSS processing starts (default: 100)
    blockJSRequests?: boolean; // set to false to load (external) JS (default: true)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    phantomJsOptions?: any;
    customPageHeaders?: {
      [key: string]: string;
    };
  }
  export default function penthouse(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    penthouseOptions: IPenthouseOptions
  ): Promise;
}
