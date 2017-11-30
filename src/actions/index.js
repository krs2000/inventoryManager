import {ADD_ITEM,SIGNED_IN} from "../constants"

export const add_item = (item) => {

const action={
	type:ADD_ITEM,
	item
}

console.log("action add_inventory",action)
return action;

}


export function logUser(email){

	const action={

		type: SIGNED_IN,
		email
	}

	return action;
}
