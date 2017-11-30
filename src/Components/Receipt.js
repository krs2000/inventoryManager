import React, {  Component } from "react";
import MyDatePicker from "./DatePicker";
import {FormGroup,ControlLabel,FormControl} from "react-bootstrap";

class Receipt extends Component {
		constructor(props) {
		super(props);
		this.state = {
	  

		};
	}

  AddItem()  { 		return (

	  <FormGroup controlId="formControlsSelect">
      <ControlLabel>Select</ControlLabel>
      <FormControl componentClass="select" placeholder="select">
        <option value="select">select</option>
        <option value="other">...</option>
      </FormControl>
    </FormGroup>)
}


	render(){


		return(
			<div><form className="form-group">
					<input
						placeholder="Receipt Reference"
						onChange={event =>
							this.setState({ newDeadLine: event.target.value })}
					/>
					<MyDatePicker/>



					<button className="btn btn-success" onClick={() => this.AddItem()}>
						Add Item
					</button>
				</form>



			</div>

			)
		}
}






export default Receipt;