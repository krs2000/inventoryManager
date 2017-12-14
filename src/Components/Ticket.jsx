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

	addTicket() {
		const { reference, date, price, amount , type } = this.state;
		let { name } = this.state;
		const user = this.props.user;
		const userDB = user.split(".").join("")

		this.props.dispatch(
			add_receipt({ reference, date, price, name, amount ,type,user})
		);

		for (let i = 0; i < this.props.items.length; i++) {
			if (name === this.props.items[i].name) {
				let sum = 0;
				sum =
					parseInt(this.props.items[i].amount, 10) -
					parseInt(this.state.amount, 10);
				firebaseDb
					.ref(userDB+'/receipts/' + this.props.items[i].serverKey)
					.update({ amount: sum });
			}
		}
	}



	render() {
		return (
			<div>
				<Navigation />
				<Grid>
				<form className="form-group">

					<Col xs={12} md={3} className="receiptReferenceAndDate">
					
					<input
						placeholder="Receipt Reference"
						className="form-control smallMarginBottom"
						onChange={event =>
							this.setState({ reference: event.target.value })
						}
					/>

				
					</Col>
					<Col xs={12} md={2} className="smallMarginBottom">
						<select
							className="form-control"
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
					</Col>
					<Col xs={12} md={2} className="smallMarginBottom">
					<input
						placeholder="amount"
						className="form-control"
						onChange={event =>
							this.setState({ amount: event.target.value })
						}
					/>
					</Col>
					<Col xs={12} md={2} className="smallMarginBottom">
					<input
						placeholder="price"
						className="form-control"
						onChange={event =>
							this.setState({ price: event.target.value })
						}
					/>
					</Col>
					<Col xs={12} md={2} className="smallMarginBottom" >
					<button
						type="button"
						className="btn btn-success"
						onClick={() => this.addTicket()}
					>
						Add Ticket
					</button>
					</Col>
				</form>	
				</Grid>			
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
