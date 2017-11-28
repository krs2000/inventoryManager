import {ADD_INVENTORY,SIGNED_IN} from "../constants"

export const add_inventory = (data) => {

const action={
	type:ADD_INVENTORY,
	data

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
