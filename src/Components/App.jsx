import React, { Component } from "react";

import "../Styles/style.css";

import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from "react-bootstrap";

import {withRouter, BrowserRouter as Router, Route, Link } from "react-router-dom";
import { connect } from "react-redux";

import AddItem from "./AddItem";
import Receipt from "./Receipt";
import { firebaseApp } from "../firebase";

class App extends Component {
	signOut() {
		firebaseApp.auth().signOut();
	}



	render() {
		return (
			<Router>
				<div>
					<Navbar inverse collapseOnSelect>
						<Navbar.Header>
							<Navbar.Brand>
								<span>Inventory Manager</span>
							</Navbar.Brand>
							<Navbar.Toggle />
						</Navbar.Header>
						<Navbar.Collapse>
							<Nav className="Link">
								<NavItem>
									<Link to="/home">
										<span className="whiteFont">Home</span>
									</Link>
								</NavItem>
								<NavItem>
									<Link to="/add">
										<span className="whiteFont">
											Add Item
										</span>
									</Link>
								</NavItem>
								<NavItem>
									<Link to="/receipt">
										<span className="whiteFont">
											New Receipt
										</span>
									</Link>
								</NavItem>
								<NavItem>
									<Link to="/topics">
										<span className="whiteFont">
											New Ticket
										</span>
									</Link>
								</NavItem>
								<NavDropdown
									title="Dropdown"
									id="basic-nav-dropdown"
								>
									<MenuItem>Action</MenuItem>
									<MenuItem>Another action</MenuItem>
									<MenuItem>Something else here</MenuItem>
									<MenuItem divider />
									<MenuItem>Separated link</MenuItem>
								</NavDropdown>
							</Nav>
							<Nav pullRight>
								<NavItem eventKey={1} href="#">
									Link Right
								</NavItem>
								<NavItem eventKey={2} href="#">
									<button
										className="btn btn-danger"
										onClick={this.signOut()}
									>
										{" "}
										Sign Out{" "}
									</button>
								</NavItem>
							</Nav>
						</Navbar.Collapse>
					</Navbar>

					<hr />

					<Route exact path="/home" component={Home} />
					<Route path="/receipt" component={Receipt} />

					<Route path="/add" component={AddItem} />
				</div>
			</Router>
		);

		const Home = () => (
			<div>
				<h2>Home</h2>
			</div>
		);

		const About = () => (
			<div>
				<h2>About</h2>
			</div>
		);
	}
}

function mapStateToProps(state) {
	// console.log("state,", state);
	return {};
}

export default withRouter(connect(mapStateToProps, null)(App));
