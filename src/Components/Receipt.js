import React, { Component } from "react";
import MyDatePicker from "./DatePicker";
import { FormGroup, ControlLabel, FormControl } from "react-bootstrap";
import { connect } from "react-redux";

import { add_receipt } from "../actions";
import Navigation from "./Navigation";
import { update_inventory } from "../actions";

class Receipt extends Component {
	constructor(props) {
		super(props);
		this.state = {
			ReceiptId: 1
		};
	}

	addReceipt() {
		const { reference, date, price, amount } = this.state;
		let { name } = this.state;
		this.props.dispatch(
			add_receipt({ reference, date, price, name, amount })
		);

		for (let i = 0; i < this.props.items.length; i++) {
			if (name === this.props.items[i].name) {
				let sum = 0;
				sum =
					parseInt(this.props.items[i].amount, 10) +
					parseInt(this.state.amount, 10);
				this.props.items[i].amount = sum;
			}
		}
	}



	render() {
		return (
			<div>
				<Navigation />
				<form className="form-group">
					<input
						placeholder="Receipt Reference"
						onChange={event =>
							this.setState({ reference: event.target.value })
						}
					/>
					<MyDatePicker />
					<div className="col-xs-2">
						<select
							className=" form-control"
							onChange={event =>
								this.setState({ name: event.target.value })
							}
						>
							<option>Choose</option>
							{this.props.items.map(item => {
								return (
									<option key={item.itemId}>
										{item.name}
									</option>
								);
							})}
						</select>
					</div>
					<input
						placeholder="amount"
						onChange={event =>
							this.setState({ amount: event.target.value })
						}
					/>
					<input
						placeholder="price"
						onChange={event =>
							this.setState({ price: event.target.value })
						}
					/>
					<button
						type="button"
						className="btn btn-success"
						onClick={() => this.addReceipt()}
					>
						Add Receipt
					</button>
				</form>				
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		items: state.itemReducer.items,
		receipts: state.itemReducer.receipts,
		inventory: state.inventoryReducer.inventories
	};
}
export default connect(mapStateToProps, null)(Receipt);
