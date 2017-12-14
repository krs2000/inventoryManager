import React, {Component} from 'react';
import Navigation from "./Navigation";
import TableTransactions from './TableTransactions';

import { firebaseDb } from "../firebase";
import { connect } from "react-redux";
import { add_receipt } from "../actions";


class Transactions extends Component{

	

	componentDidMount() {
			const user = this.props.user;
			const userDB = user.split(".").join("")

			firebaseDb.ref(userDB+'/receipts').on("value", snap => {
				let receipts = [];
				snap.forEach(receipt => {
					const {
						amount,
						date,
						name,
						price,
						reference,
						totalPrice,
						type
					} = receipt.val();
					const serverKey = receipt.key;
					receipts.push({
						amount,
						date,
						name,
						price,
						reference,
						totalPrice,
						type,
						serverKey
					});
				});						
			this.props.dispatch(add_receipt(receipts));				
			});	
	}


	render(){
		return(
    <div>
   	<Navigation/>

   <TableTransactions data={this.props.receipts}/>
    </div>

			)
	}

}

function mapStateToProps(state) {
	console.log("state,", state);
	return {
		receipts: state.receiptReducer.receipts,
		 user: state.user.email

	};
}


export default connect(mapStateToProps, null)(Transactions);