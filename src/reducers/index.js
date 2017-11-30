import { combineReducers } from "redux";
import user from "./reducer_user";
import itemReducer from "./reducer_item";


export default combineReducers({
	user,
	itemReducer

});
