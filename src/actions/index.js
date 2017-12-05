import {ADD_ITEM, SIGNED_IN, ADD_RECEIPT , INVENTORY} from "../constants"

export const add_item = (item) => {

const action={
	type:ADD_ITEM,
	item
}
return action;
}


export const update_inventory = (inventory) => {

const action={
	type:INVENTORY,
	inventory
}

return action;

}


export function logUser(email){

	const action={

		type: SIGNED_IN,
		email
	}

	return action;
}

export const add_receipt = (receipt) => {

const action={
	type: ADD_RECEIPT,
	receipt
}

console.log("action add_RECEIPTy",action)
return action;

}
