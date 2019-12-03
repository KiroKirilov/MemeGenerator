import * as functions from 'firebase-functions';
import * as admin from "firebase-admin";
import * as cors from 'cors';
const corsHandler = cors({origin: true});
admin.initializeApp(functions.config().firebase)

exports.rateMeme = functions.https.onRequest((req, res) => {
    // Set CORS headers
    corsHandler(req, res, () => {
        return res.json("Hello from Firebase!"); 
    });

    res.json("Hello from Firebase!");
});