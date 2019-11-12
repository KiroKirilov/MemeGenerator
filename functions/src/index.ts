import * as functions from 'firebase-functions';

const checkUsernames = require('./check-username');

module.exports = {
  checkUsernames: functions.region("europe-west1").https.onRequest(checkUsernames),
};
