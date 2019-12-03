import * as functions from 'firebase-functions';
import * as admin from "firebase-admin";
admin.initializeApp(functions.config().firebase);

exports.rateMeme = functions.region('europe-west1').https.onRequest((req, res) => {
    console.log(req);
    res.send(req);
});