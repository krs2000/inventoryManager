import { ADD_RECEIPT  } from "../constants";

let initialState = {
	receipts: []
};

export default (state = initialState, action) => {
	switch (action.type) {
		case ADD_RECEIPT :
			const { receipt } = action;
			const { receipts } = state;
			receipts.push(receipt);
			const newState = {
				receipts
			}
			return newState;
		default:
			return state;
	}
};
