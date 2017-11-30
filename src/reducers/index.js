import { combineReducers } from "redux";
import user from "./reducer_user";
import itemReducer from "./reducer_item";
import receiptReducer from "./reducer_receipt";


export default combineReducers({
	user,
	itemReducer,
	receiptReducer

});
