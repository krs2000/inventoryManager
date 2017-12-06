import React, { Component } from "react";

import "../Styles/style.css";


import { connect } from "react-redux";


import Receipt from "./Receipt";
import { firebaseApp } from "../firebase";
import Navigation from "./Navigation";


class App extends Component {
	signOut() {
		firebaseApp.auth().signOut();
	}

	render() {
		return (
				
			<div>
		
			<Navigation/>
				{

				}
			</div>
		
		);


		const Home = () => (
			<div>
				<h2>Home</h2>
			</div>
		);
	}
}

function mapStateToProps(state) {
	// console.log("state,", state);
	return {};
}
export default connect(mapStateToProps, null)(App);
