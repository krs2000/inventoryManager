import React, { Component } from "react";
import { Col, Grid } from "react-bootstrap";
import { connect } from "react-redux";
import DatePicker from "react-datepicker";
import { add_receipt } from "../actions";
import Navigation from "./Navigation";
import moment from "moment";

import { firebaseDb } from "../firebase";

class Ticket extends Component {
	constructor(props) {
		super(props);
		this.state = {
			type: "ticket",
			date: moment(),
			price: "",
			name: "",
			amount: "",
			reference: "",
			uniqueName: true
		};
	}

	addTicket() {
			this.setState({
			uniqueName:false
		})
		const { reference, price, amount, type } = this.state;
		let { name, date } = this.state;
		const user = this.props.user;

		let totalPrice = this.state.price * this.state.amount;

		date = date.format("MMM Do YY");

		this.props.dispatch(
			add_receipt({
				reference,
				date,
				price,
				name,
				amount,
				type,
				totalPrice,
				user
			})
		);

		firebaseDb.ref(this.props.userDb + "/Receipts").push({
			reference,
			date,
			price,
			name,
			amount,
			type,
			totalPrice,
			user
		});

		for (let i = 0; i < this.props.items.length; i++) {
			if (name === this.props.items[i].name) {
				let sum = 0;
				sum =
					parseInt(this.props.items[i].amount, 10) -
					parseInt(this.state.amount, 10);
				firebaseDb
					.ref(
						this.props.userDb +
							"/Items/" +
							this.props.items[i].serverKey
					)
					.update({ amount: sum });
			}
		}

let element = document.getElementById("addTicket")
element.classList.remove("bounce")
void element.offsetWidth;
element.classList.add("bounce");
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
									onChange= {event => {
										if (this.props.receipts.length === 0) {
											this.setState({
												reference: event.target.value
											});
										} else {
											for (
												let i = 0;
												i < this.props.items.length;
												i++
											) {			
												if (
													event.target.value ===
													this.props.items[i].name
												) {
													this.setState({
														uniqueName: false
													});
													break;
												} else {
													this.setState({
														reference:
															event.target.value,
														uniqueName: true
													});
												}
											}
										}
									}}
							/>
							<DatePicker
								selected={this.state.date}
								onChange={date =>
									this.setState({
										date
									})
								}
								className="form-control smallMarginBottom "
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
								type="number"
								onChange={event =>
									this.setState({
										amount: event.target.value
									})
								}
							/>
						</Col>
						<Col xs={12} md={2} className="smallMarginBottom">
							<input
								placeholder="price"
								className="form-control"
								type="number"
								onChange={event =>
									this.setState({ price: event.target.value })
								}
							/>
						</Col>
						<Col xs={12} md={2} className="smallMarginBottom">
							<button
								disabled={
									!(
										this.state.reference.length > 0 &&
										this.state.price.length > 0 &&
										this.state.name.length > 0 &&
										this.state.amount.length > 0 &&
										this.state.uniqueName
									)
								}
								type="button"
								className="btn btn-success"
								id= "addTicket"
								onClick={() => this.addTicket()}
							>
								Add Ticket
							</button>
								{!this.state.uniqueName && <div>This reference is already added</div>}
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
		user: state.user.email,
		userDb: state.user.userDb,
	    receipts: state.receiptReducer.receipts,

	};
}
export default connect(mapStateToProps, null)(Ticket);
