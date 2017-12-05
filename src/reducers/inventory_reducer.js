import { INVENTORY  } from "../constants";

let initialState = {
	inventories: []
};

export default (state = initialState, action) => {
	switch (action.type) {
		case INVENTORY :
			const {inventory} = action;
			const { inventories } = state
			inventories.push(inventory)
			const newState = {
				inventories
			}
			return newState;
		default:
			return state;
	}
};
