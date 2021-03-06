import React, { Component } from "react";
import { connect } from "react-redux";
import TableItems from "./TableItems";
import SimpleBarChart from "./chart";
import { add_item } from "../actions";
import { firebaseDb } from "../firebase";

class Inventory extends Component {
	constructor(props) {
		super(props);
		this.state = {
			active: false,
			amount: 0,
			name: "",
			description: "",
			category: "",
			uniqueName: true
		};
		this.handleClick = this.handleClick.bind(this);
		this.handleName = this.handleName.bind(this);
		this.handleCategory = this.handleCategory.bind(this);
		this.handleDescription = this.handleDescription.bind(this);
		this.addItem = this.addItem.bind(this);
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

	addItem() {
		const { name, description, category, amount } = this.state;
		const itemId = Math.random();
		const user = this.props.user;
		this.setState({
			uniqueName: false
		});
		firebaseDb
			.ref(this.props.userDb + "/Items")
			.push({ itemId, name, description, category, amount, user });
	}

	handleClick() {
		this.setState({
			active: !this.state.active
		});
	}

	handleName(e) {
		if (this.props.items.length === 0) {
			this.setState({
				name: e.target.value
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
						name: e.target.value,
						uniqueName: true
					});
				}
			}
		}
	}

	handleCategory(e) {
		this.setState({ category: e.target.value });
	}

	handleDescription(e) {
		this.setState({ description: e.target.value });
	}

	render() {



		return (

			<div class="subContent">
					<button
						className="btn btn-warning smallMarginBottom"
						type="button"
						onClick={this.handleClick}
					>
						Add Item
					</button>

					{this.state.active && (
						<div className="form-inline ">
							<div className="form-group">
								<input
									className="form-control"
									placeholder="Item Name"
									required
									onChange={this.handleName}
								/>

								<input
									className="form-control"
									placeholder="description"
									required
									onChange={this.handleDescription}
								/>
								<input
									className="form-control"
									placeholder="category"
									required
									onChange={this.handleCategory}
								/>
							</div>
							<button
								disabled={
									!(
										this.state.name.length > 0 &&
										this.state.description.length > 0 &&
										this.state.category.length > 0 &&
										this.state.uniqueName
									)
								}
								type="button"
								className="btn btn-success"
								onClick={this.addItem}
							>
								Confirm
							</button>
							{!this.state.uniqueName && (
								<div>This item is already added</div>
							)}
						</div>
					)}
					<SimpleBarChart products={this.props.items} />
					<TableItems products={this.props.items} />
			
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
export default connect(mapStateToProps, null)(Inventory);
