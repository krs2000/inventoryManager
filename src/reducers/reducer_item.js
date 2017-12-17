import { ADD_ITEM  } from "../constants";

let initialState = {
	items: []
};

export default (state = initialState, action) => {
	switch (action.type) {
		case ADD_ITEM :
			const {item} = action;
			const newState = {
				items: item
			}
			return newState;
		default:
			return state;
	}
};
