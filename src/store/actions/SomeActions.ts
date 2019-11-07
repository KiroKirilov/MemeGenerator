export class SomeActions {
    public static makeChange(newval: string) {
        // @ts-ignore
        return async (dispatch: any, getState: any, { getFirestore, getFirebase }) => {
            try {
                const firestore = getFirestore();
                await firestore
                    .collection("test-collection")
                    .add({
                        title: "new one",
                        content: "new content",
                        createdAt: new Date()
                    })
                debugger;
            } catch (error) {
                console.log(error);
                debugger
            }
            
            dispatch({ type: "CHANGE_PROP", payload: newval });
        };
    }
}