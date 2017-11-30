import React, { Component } from "react";
import { connect } from "react-redux";
import Table from './Table'
import {add_item} from '../actions'



class AddItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
	  id: 100,
      name: "",
      description: "",
      category : "",
  

		};
	}
	

	addItem() {


		console.log("this state", this.state);
		const { id, name, description, category } = this.state;


		this.props.dispatch(add_item({ id, name, description, category }));

		this.setState({id: this.state.id + 1});
		console.log(this.props.items);

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
							placeholder="description"
							onChange={event =>
								this.setState({ description: event.target.value })
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
				<hr/>
				<div className="pt-4">
				<Table products ={this.props.items}/>
				</div>
				


			</div>
		);
	}
}


function mapStateToProps(state) {
	// console.log("state,", state);
	return {
		items: state.itemReducer.items
	};
}

                                                                      
export default connect(mapStateToProps, null)(AddItem);