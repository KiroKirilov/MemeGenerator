import { IStore } from "../IStore";

const initialState: IStore = {
	someProp: "startVal",
	anotherVal: "other val"
}

export const someReducer = (state = initialState, action: any): IStore => {
	switch (action.type) {
		case "CHANGE_PROP":
			return {
				...state,
                someProp: action.payload
			};
		default:
			return state;
	}
};