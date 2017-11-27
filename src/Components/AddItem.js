import React, { Component } from "react";

import Table from './Table'

const tableData = [];
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
		const {id} = this.state;
		const {name} = this.state;
		const {description} = this.state;
		const {category}= this.state;
		console.log(name)
		tableData.push({name,description,category,id})
		console.log(tableData);
		this.setState({id: this.state.id + 1})

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
				<Table products ={tableData}/>
				</div>
			</div>
		);
	}
}

                                                                      
export default AddItem;