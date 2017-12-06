import React, {Component} from 'react';
import { connect } from "react-redux";

import TableItems from './TableItems';
import Navigation from "./Navigation";

import { add_item } from "../actions";

class Inventory extends Component{

	constructor(props){
		super(props);
		this.state={
		items:[],
		receipts:[],
		amount:0
		}
	}

addItem() {
		console.log("this state", this.state);
		const { name, description, category ,amount } = this.state;
		const itemId =Math.random();
		this.props.dispatch(add_item({ itemId, name, description, category, amount }));
		this.setState({ itemId: this.state.itemId + 1 });

	}







	render(){
		return(
			<div>
 			<Navigation/>
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
							placeholder="description"
							onChange={event =>
								this.setState({
									description: event.target.value
								})
							}
						/>
						<input
							className="form-control"
							placeholder="category"
							onChange={event =>
								this.setState({ category: event.target.value })
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
    				<hr/>


			<div className="pt-4">
						<TableItems products={this.props.items} />
				</div>



  			  </div>

 
			)
	}

}






function mapStateToProps(state) {
	// console.log("state,", state);
	return {
		items: state.itemReducer.items,
		receipts: state.receiptReducer.receipts,
		inventory: state.inventoryReducer.inventories
	};
}
export default connect(mapStateToProps)(Inventory);

