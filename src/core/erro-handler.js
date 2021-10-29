Sentry = require("@sentry/node");

Sentry.init({
  dsn: process.env.SENTRY_DSN
});

async function errorHandler(error){
  try {
    Sentry.captureException(error)
  } catch (err) {
    throw err
  }
}

module.exports = errorHandler