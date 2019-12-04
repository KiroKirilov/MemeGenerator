import * as functions from 'firebase-functions';
import * as admin from "firebase-admin";
//import * as cors from 'cors';
//const corsHandler = cors({origin: true});
admin.initializeApp(functions.config().firebase);

// enum RatingType {
//     Negative = -1,
//     Neutral = 0,
//     Positive = 1
// }

// function getNewRatingType(ratingType: RatingType, memeRatings: any[], uid: string): RatingType {
//     let newRatingType: RatingType;
//     const currentRating = memeRatings.filter((r) => r.userId === uid)[0];
//     if (!currentRating) {
//         newRatingType = ratingType;
//     } else if (currentRating.ratingType === ratingType) {
//         newRatingType = RatingType.Neutral;
//     } else {
//         newRatingType = ratingType;
//     }

//     return newRatingType;
// }

exports.rateMeme = functions.https.onCall(async (data, context) => {
    if (!context.auth || !context.auth.uid) {
        return null;
    }

    const firestore = admin.firestore();
    const meme = await firestore.doc(`memes/${data.memeId}`).get();
    return meme;

    // const newRatingType = getNewRatingType(data.ratingType,);

    // await firestore.collection("memes").doc(data.memeId).update({
    //     id: data.memeId,
    //     ratings: updatedRatings
    // })
    // const returnObj = {
    //     params: data.params,
    //     query: data.query,
    //     data,
    //     nibba: "nibba"
    // }
    // return returnObj; 
});
