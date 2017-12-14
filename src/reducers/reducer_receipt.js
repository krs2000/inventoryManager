import { ADD_RECEIPT  } from "../constants";

let initialState = {
	receipts: []
};

export default (state = initialState, action) => {
	switch (action.type) {
		case ADD_RECEIPT :
			const { receipt } = action;
			const newState = {
				receipts : receipt
			}
			return newState;
		default:
			return state;
	}
};
