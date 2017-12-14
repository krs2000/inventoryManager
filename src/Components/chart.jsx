import React, { Component } from "react";
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from "recharts";
import { connect } from "react-redux";



 
class SimpleBarChart extends Component {

	constructor(props){
		super(props);
		this.state={
		data:[]
		}
	}

	componentWillReceiveProps(){
		this.setState({data:this.props.products})
	}

	render () {
  	return (
    	<BarChart width={600} height={300} data={this.props.items}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
       <XAxis dataKey="name"/>
       <YAxis/>
       <CartesianGrid strokeDasharray="3 3"/>
       <Tooltip/>
       <Legend />
       <Bar dataKey="amount" fill="#82ca9d" />
      </BarChart>
    );
  }
}

function mapStateToProps(state) {
	return {
		items: state.itemReducer.items,		
	};
}

export default connect(mapStateToProps, null)(SimpleBarChart);