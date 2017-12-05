import { combineReducers } from "redux";
import user from "./reducer_user";
import itemReducer from "./reducer_item";
import receiptReducer from "./reducer_receipt";
import inventoryReducer from "./inventory_reducer"

export default combineReducers({
	user,
	itemReducer,
	receiptReducer,
	inventoryReducer


});
