import React, { Component } from "react";
import { connect } from "react-redux";

import TableItems from "./TableItems";
import Navigation from "./Navigation";
import SimpleBarChart from "./chart";
import { add_item } from "../actions";
import {store} from "../index"
import { firebaseDb } from "../firebase";
class Inventory extends Component {
	constructor(props) {
		super(props);
		this.state = {
			active: false,
			amount: 0,		
		};

		this.handleClick = this.handleClick.bind(this);

		// this.componentDidMount = this.componentDidMount.bind(this);
	}

	addItem() {
		console.log("this state", this.state);
		const { name, description, category, amount} = this.state;
		const itemId = Math.random();	
		const user = this.props.user;
		const userDB = user.split(".").join("")
		console.log(this.state)
		// this.props.dispatch(add_item({itemId, name, description, category, amount,user}));
		firebaseDb.ref(userDB+"/Items").push({ itemId, name, description, category, amount,user });
	
	}

	handleClick() {
		this.setState({
			active: !this.state.active
		});
	}

	componentDidMount() {
			console.log(this.props.user)
			const user = this.props.user;
			const userDB = user.split(".").join("")
			firebaseDb.ref(userDB+"/Items").on("value", snap => {
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
				console.log(items, "itemz")					
				this.props.dispatch(add_item(items));	
				console.log(this.props, "propppppps")

			});	
	}


	render() {
		return (
			<div>
				<Navigation />
				<div>
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
									onChange={event =>
										this.setState({
											name: event.target.value
										})
									}

								/>
								<input
									className="form-control"
									placeholder="description"
									required 
									onChange={event =>
										this.setState({
											description: event.target.value
										})
									}
								/>
								<input
									className="form-control"
									placeholder="category"
									required
									onChange={event =>
										this.setState({
											category: event.target.value
										})
									}
								/>
							</div>
							<button
								type="button"
								className="btn btn-success"
								onClick={() => this.addItem()}
							>
								Confirm
							</button>
						</div>
					)}
				</div>
				<hr />
				  <SimpleBarChart products={this.props.items} />
				
				<div className="pt-4">
					<TableItems products={this.props.items} />
				</div>
			</div>
		);
	}
}



function mapStateToProps(state) {
	return {
		items: state.itemReducer.items,
		receipts: state.receiptReducer.receipts,
		user: state.user.email,
	};
}
export default connect(mapStateToProps, null)(Inventory);
