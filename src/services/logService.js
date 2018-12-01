import * as Sentry from "@sentry/browser";

function init() {
  Sentry.init({
    dsn: "https://bfd2628ed2df45bb91cd910b5c901645@sentry.io/1335132"
  });
}

function log(error) {
  Sentry.captureException(error);
}

export default { init, log };
