import { ADD_ITEM  } from "../constants";

let initialState = {
	items: []
};

export default (state = initialState, action) => {
	switch (action.type) {
		case ADD_ITEM :
			const {item} = action;
			const { items } = state
			items.push(item)
			const newState = {
				items
			}
			return newState;
		default:
			return state;
	}
};
