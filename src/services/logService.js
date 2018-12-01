import * as Sentry from "@sentry/browser";

function init() {
  Sentry.init({
    dsn: "https://0d350fff4f5a4559a247e634dc6d4c0e@sentry.io/1330930"
  });
}

function log(error) {
  Sentry.captureException(error);
}

export default { init, log };
