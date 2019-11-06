import { IStore } from "../IStore";

const initialState: IStore = {
    someProp: "startVal"
}

export const someReducer = (state = initialState, action: any): IStore => {
	switch (action.type) {
		case "CHANGE_PROP":
			return {
                someProp: action.payload
			}
		default: 
			return state;
	}
};