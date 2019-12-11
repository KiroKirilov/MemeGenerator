import * as functions from 'firebase-functions';
import * as admin from "firebase-admin";
//import * as cors from 'cors';
//const corsHandler = cors({origin: true});
admin.initializeApp(functions.config().firebase);

function getNewRatings(meme: any, uid: string, ratingType: any) {
    if (meme.ratings) {
        const otherRatings: any[] = meme.ratings.filter((r: any) => r.userId !== uid);

        return [...otherRatings, {
            userId: uid,
            ratingType: ratingType,
        }];
    } else {
        return [{
            userId: uid,
            ratingType: ratingType,
        }];
    }
}

exports.rateMeme = functions.https.onCall(async (data, context) => {
    if (!context.auth || !context.auth.uid) {
        return null;
    }

    const firestore = admin.firestore();
    const memeSnapshot = await firestore.doc(`memes/${data.memeId}`).get();
    const meme: any = memeSnapshot.data();
    const newRatings = getNewRatings(meme, context.auth.uid, data.ratingType);
    const score = newRatings.map((r: any) => r.ratingType).reduce((a: number, b: number) => a + b);

    const writeResult = await firestore.collection("memes").doc(data.memeId).update({
        id: data.memeId,
        ratings: newRatings,
        score
    });

    return writeResult;
});
