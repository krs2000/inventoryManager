import React, { Component } from "react";
import { connect } from "react-redux";

import { add_item } from "../actions";
import Navigation from "./Navigation";

import { firebaseDb } from "../firebase";

class Ticket extends Component {
	constructor(props) {
		super(props);
		this.state = {
			type: "ticket"
		};
	}

	componentDidMount() {
		firebaseDb.ref(this.props.userDb + "/Items").on("value", snap => {
			let items = [];
			snap.forEach(item => {
				const {
					amount,
					category,
					description,
					itemId,
					name,
					user
				} = item.val();
				const serverKey = item.key;
				items.push({
					amount,
					category,
					description,
					itemId,
					name,
					serverKey,
					user
				});
			});
			this.props.dispatch(add_item(items));
		});
	}

	render() {
		return (
			<div>
				<Navigation />
				<h2>Welcome to Inventory Lite v0.12 </h2>
				<p>This is a beta version of stock managament app dedicated to small, private ecommerce.<br/>It has been built with react.js and firebase.</p>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		items: state.itemReducer.items,
		receipts: state.itemReducer.receipts,
		user: state.user.email,
		userDb: state.user.userDb
	};
}
export default connect(mapStateToProps, null)(Ticket);
