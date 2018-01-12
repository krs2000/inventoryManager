import React, { Component } from "react";
import { connect } from "react-redux";
import { firebaseApp } from "../firebase";
import { add_item } from "../actions";
import Inventory from "./Inventory";
import Receipt from "./Receipt";
import Ticket from "./Ticket";
import Transactions from "./Transactions";
import Options from "./Options";
import logo from "../img/logo.png";
import { browserHistory } from "react-router";
import { firebaseDb } from "../firebase";
import {Layout, Header, Drawer, Content,Navigation} from 'react-mdl';
import "../extra/material.css";
import "../extra/material.js";

const a = (
	<div>
		{" "}
		<h2>Welcome to Inventory Lite v0.12 </h2>
		<p>
			This is a beta version of stock managament app dedicated to small,
			private ecommerce.
			<br />It has been built with react.js and firebase.
		</p>
	</div>
);

class Start extends Component {
	constructor(props) {
		super(props);
		this.state = {
			type: "ticket",
			content: "Transactions"

		};
	}

	componentDidMount() {
		firebaseDb.ref(this.props.userDb + "/Items").on("value", snap => {
			let items = [];
			snap.forEach(item => {
				const {
					amount,
					category,
					description,
					itemId,
					name,
					user
				} = item.val();
				const serverKey = item.key;
				items.push({
					amount,
					category,
					description,
					itemId,
					name,
					serverKey,
					user
				});
			});
			this.props.dispatch(add_item(items));
		});
	}

		signOut() {
		firebaseApp.auth().signOut();
	}


	render() {
		var content;
		return (
			<div style={{height: '100vh', position: 'relative'}}>
    <Layout fixedDrawer>
        <Drawer title='Menu' className="navBg">
            <Navigation >
                <a id="whiteFont" onClick={() =>this.setState({content: "Inventory"})}> Inventory</a>
                <a id="whiteFont" onClick={() =>this.setState({content: "Receipt"})}> Receipt</a>
                <a id="whiteFont" onClick={() =>this.setState({content: "Ticket"})}> Ticket</a>
                <a id="whiteFont" onClick={() =>this.setState({content: "Transactions"})}>Transactions</a>
                <a id="whiteFont" onClick={() =>this.setState({content: "Options"})}> Options</a>
                <a id="whiteFont" onClick={this.signOut.bind(this)}>Sign Out</a>
            </Navigation>
        </Drawer>
        <div class="content">
      
{this.state.content == "Inventory" && <Inventory/>}
{this.state.content == "Receipt" && <Receipt/>}
{this.state.content == "Ticket" && <Ticket/>}
{this.state.content == "Transactions" && <Transactions/>}
{this.state.content == "Options" && <Options/>}

        </div>
         <p className="logoContainer"> <img src={logo} alt="logo" className="logo"/></p>
    </Layout>
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		items: state.itemReducer.items,
		receipts: state.itemReducer.receipts,
		user: state.user.email,
		userDb: state.user.userDb
	};
}
export default connect(mapStateToProps, null)(Start);
