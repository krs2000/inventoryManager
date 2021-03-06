import React, { Component } from "react";
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from "recharts";
import { connect } from "react-redux";



 class SimpleBarChart extends Component {

	render () {
  	return (
      <div className="chart">
    	<BarChart width={600} height={300} data={this.props.items}
            margin={{top: 5, right: 30, left: 20, bottom: 5}} className="bgWhite">
       <XAxis dataKey="name"/>
       <YAxis/>
       <CartesianGrid strokeDasharray="3 3"/>
       <Tooltip/>
       <Legend />
       <Bar dataKey="amount" fill="#82ca9d" />
      </BarChart>
      </div>
    );
  }
}

function mapStateToProps(state) {
	return {
		items: state.itemReducer.items,		
	};
}

export default connect(mapStateToProps, null)(SimpleBarChart);