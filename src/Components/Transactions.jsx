import React, {Component} from 'react';
import Navigation from "./Navigation";
import TableTransactions from './TableTransactions';
import { firebaseDb } from "../firebase";
import { connect } from "react-redux";
import { add_receipt } from "../actions";


class Transactions extends Component{

	componentDidMount() {
		
	
			firebaseDb.ref(this.props.userDb+'/Receipts').on("value", snap => {
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
	return {
		receipts: state.receiptReducer.receipts,
		userDb: state.user.userDb,

	};
}


export default connect(mapStateToProps, null)(Transactions);