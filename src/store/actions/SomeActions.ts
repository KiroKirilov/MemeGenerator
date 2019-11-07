export class SomeActions {
    public static makeChange(newval: string) {
        return async (dispatch: any, getState: any) => {
            await new Promise((resolve) => setTimeout(resolve, 2000));
            dispatch({ type: "CHANGE_PROP", payload: newval });
        };
    }
}