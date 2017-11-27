import React, { Component } from "react";

class Receipt extends Component {


	render(){
		return(
			<div><form className="form-group">
					<input
						placeholder="new date"
						onChange={event =>
							this.setState({ newDeadLine: event.target.value })}
					/>
					<button className="btn btn-success" onClick={() => this.changeDeadLine()}>
						Submit
					</button>
				</form></div>

			)
		}
}

export default Receipt;