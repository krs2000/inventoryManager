import React, { Component } from "react";

import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from "react-bootstrap";

import { Link } from "react-router";
import { connect } from "react-redux";

import { firebaseApp } from "../firebase";
import { browserHistory } from "react-router";

class Navigation extends Component {
	signOut() {
		firebaseApp.auth().signOut();
	}

	render() {
		return (
			<div>
				<Navbar inverse collapseOnSelect>
					<Navbar.Header>
						<Navbar.Brand>IM lite</Navbar.Brand>
						<Navbar.Toggle />
					</Navbar.Header>
					<Navbar.Collapse>
						<Nav>
							<NavItem>
								<span
									onClick={() =>
										browserHistory.push("/Inventory")
									}
									className="whiteFont"
								>
									Inventory
								</span>
							</NavItem>
							<NavItem eventKey={2}>
								<span
									onClick={() =>
										browserHistory.push("/Receipt")
									}
									className="whiteFont"
								>
									Receipt
								</span>
							</NavItem>
							<NavItem eventKey={2}>
								<span
									onClick={() =>
										browserHistory.push("/Ticket")
									}
									className="whiteFont"
								>
									Ticket
								</span>
							</NavItem>
							<NavItem eventKey={2}>
								<span
									onClick={() =>
										browserHistory.push("/Transactions")
									}
									className="whiteFont"
								>
									Transactions
								</span>
							</NavItem>
							<NavDropdown
								eventKey={3}
								title="Dropdown"
								id="basic-nav-dropdown"
							>
								<MenuItem eventKey={3.1}>Action</MenuItem>
								<MenuItem eventKey={3.2}>
									Another action
								</MenuItem>
								<MenuItem eventKey={3.3}>
									Something else here
								</MenuItem>
								<MenuItem divider />
								<MenuItem eventKey={3.3}>
									Separated link
								</MenuItem>
							</NavDropdown>
						</Nav>
						<Nav pullRight>
							<NavItem eventKey={2}>
								<button
									className="btn btn-danger"
									onClick={() => this.signOut()}
								>
									Sign Out
								</button>
							</NavItem>
						</Nav>
					</Navbar.Collapse>
				</Navbar>
			</div>
		);
	}
}

export default Navigation;
