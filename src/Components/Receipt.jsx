import React, { Component } from "react";
import { connect } from "react-redux";
import { add_receipt } from "../actions";
import { firebaseDb } from "../firebase";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";

class Receipt extends Component {
	constructor(props) {
		super(props);
		this.state = {
			type: "receipt",
			date: moment(),
			price: "",
			name: "",
			amount: "",
			reference: "",
			uniqueName: true
		};

		this.handleReference = this.handleReference.bind(this);
		this.handleDate = this.handleDate.bind(this);
		this.handleName = this.handleName.bind(this);
		this.handlePrice = this.handlePrice.bind(this);
		this.handleAmount = this.handleAmount.bind(this);
		this.addReceipt = this.addReceipt.bind(this);
	}

	addReceipt() {
		this.setState({
			uniqueName: false
		});
		const { reference, price, amount, type } = this.state;
		const user = this.props.user;
		let { date, name } = this.state;
		date = date.format("MMM Do YY");
		let totalPrice = this.state.price * this.state.amount;
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
					parseInt(this.props.items[i].amount, 10) +
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

		let element = document.getElementById("addReceipt");
		element.classList.remove("bounce");
		void element.offsetWidth;
		element.classList.add("bounce");
	}

	handleReference(e) {
		if (this.props.receipts.length === 0) {
			this.setState({
				reference: e.target.value
			});
		} else {
			for (let i = 0; i < this.props.items.length; i++) {
				if (e.target.value === this.props.items[i].name) {
					this.setState({
						uniqueName: false
					});
					break;
				} else {
					this.setState({
						reference: e.target.value,
						uniqueName: true
					});
				}
			}
		}
	}

	handleDate(date) {
		this.setState({
			date
		});
	}

	handleName(e) {
		this.setState({ name: e.target.value });
	}

	handlePrice(e) {
		this.setState({ price: e.target.value });
	}

	handleAmount(e) {
		this.setState({ amount: e.target.value });
	}
	render() {
		return (
			<div class="subContent">
				<form className="form-group">
					<select className="form-control" onChange={this.handleName}>
						<option>Choose</option>
						{this.props.items.map(item => {
							return (
								<option key={item.itemId}>{item.name}</option>
							);
						})}
					</select>
					<input
						placeholder="Receipt Reference"
						className="form-control"
						onChange={this.handleReference}
					/>
					<DatePicker
						selected={this.state.date}
						onChange={this.handleDate}
						className="form-control "
					/>
					<input
						placeholder="amount"
						className="form-control"
						type="number"
						onChange={this.handleAmount}
					/>
					<input
						placeholder="price"
						className="form-control"
						type="number"
						onChange={this.handlePrice}
					/>
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
						id="addReceipt"
						className="btn btn-info "
						onClick={this.addReceipt}
					>
						Add Receipt
					</button>
					{!this.state.uniqueName && (
						<div>This reference is already added</div>
					)}
				</form>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		items: state.itemReducer.items,
		receipts: state.receiptReducer.receipts,
		user: state.user.email,
		userDb: state.user.userDb
	};
}
export default connect(mapStateToProps, null)(Receipt);
