import React, {Component} from 'react';
import { connect } from "react-redux";

import Table from './Table';
import Navigation from "./Navigation";
import AddItem from "./AddItem";

class Inventory extends Component{

	constructor(props){
		super(props);
		this.state={
		items:[],
		id:0

		}
	}

componentWillReceiveProps (newProps) {
  if( newProps.items !== this.props.items ){
   this.setState({data: this.state.id+1})}
}




lol(){
	()=>console.log(this.props.items);
	this.setState({data: this.state.id+1})
}


	render(){
		return(
			<div>
 			<Navigation/>
 			<AddItem/>
    				<hr/>


			<div className="pt-4">
						<Table products={this.props.items} />
				</div>


				<button onClick={ ()=>this.lol() }>Update</button>

  			  </div>

 
			)
	}

}




function mapStateToProps(state) {
	// console.log("state,", state);
	return {
		items: state.itemReducer.items
	};
}
export default connect(mapStateToProps, null)(Inventory);

