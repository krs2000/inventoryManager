import React, { Component } from "react";
// import MyDatePicker from "./DatePicker";
import { Col, Grid} from "react-bootstrap";
import { connect } from "react-redux";

import { add_receipt } from "../actions";
import Navigation from "./Navigation";


import { firebaseDb } from "../firebase";

class Ticket extends Component {
		constructor(props){
		super(props);
		this.state={
		type :"ticket"
	}
}

	


	render() {
		return (
			<div>
				<Navigation />
					Welcome to Inventory Lite v0.1
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		items: state.itemReducer.items,
		receipts: state.itemReducer.receipts,
		user: state.user.email,
	};
}
export default connect(mapStateToProps, null)(Ticket);
