const Sentry = require("@sentry/node");

Sentry.init({
  dsn: process.env.SENTRY_DSN, 
  tracesSampleRate: 1.0
});

// function transaction (req, res, next){
//   const transaction = Sentry.startTransaction({
//     op: "error",
//     name: req.originalUrl,
//   });
//   req.transaction = transaction;

//   next();
// }

async function errorHandler(error){
  try {
    Sentry.captureException(error)
  } catch (err) {
    throw err
  }
}

module.exports = errorHandler