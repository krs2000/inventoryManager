import React, { Component } from "react";
import MyDatePicker from "./DatePicker";
import { FormGroup, ControlLabel, FormControl } from "react-bootstrap";
import { connect } from "react-redux";

import {add_receipt} from '../actions';
import Navigation from "./Navigation";

class Receipt extends Component {
	constructor(props) {
		super(props);
		this.state = {
  			id: 1,

		};
	}


	addReceipt() {


		console.log("this state", this.state);
		const { reference, date, amount, price , name  } = this.state;


		this.props.dispatch(add_receipt( { reference, date, amount, price , name  }));

		this.setState({id: this.state.id + 1});
		console.log(this.props.receipts);

	}

	render() {
		return (
			<div>
			<Navigation/>
				<form className="form-group">
					<input
						placeholder="Receipt Reference"
						onChange={event =>
							this.setState({ reference: event.target.value })
						}
					/>
					<MyDatePicker />
					<div className="col-xs-2">
						<select className=" form-control"
						onChange={event =>
							this.setState({ name: event.target.value })
						}
						>
							{this.props.items.map(item => {
					return (
					
						
							<option key={item.id} >{item.name}</option>
					
					
					);	})}
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
		receipts:  state.itemReducer.receipts
	}
}
export default connect(mapStateToProps, null)(Receipt);
