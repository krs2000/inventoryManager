import { ADD_ITEM  } from "../constants";

let initialState = {
	items: []
};

export default (state = initialState, action) => {
	switch (action.type) {
		case ADD_ITEM :
			const {item} = action;
			const {items} = state;
			console.log(items)
			console.log(item)
			// items = [].concat(items,item)
			// items.push(item)
			const newState = {
				items: item
			}
			
			console.log(newState)
			return newState;
		default:
			return state;
	}
};
