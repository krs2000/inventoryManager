import React, { Component } from "react";

class AddItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: "",
			value: ""
		};
	}

	// addItem(){
	// 	console.log("this state",this);
	// 	const {title} = this.state;
	// 	const {email} = this.props.user;
	// 	goalRef.push ({email, title})
	// }

	addItem() {
		console.log("this state", this.state);
	}

	render() {
		return (
			<div>
				<div className="form-inline reminder-form">
					<div className="form-group">
						<input
							className="form-control"
							placeholder="Item Name"
							onChange={event =>
								this.setState({ name: event.target.value })
							}
						/>
						<input
							className="form-control"
							type="number"
							placeholder="amount"
							onChange={event =>
								this.setState({ value: event.target.value })
							}
						/>
					</div>

					<button
						type="button"
						className="btn btn-success"
						onClick={() => this.addItem()}
					>
						Add Item
					</button>
				</div>
			</div>
		);
	}
}

export default AddItem;
