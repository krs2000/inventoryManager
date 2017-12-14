import React, { Component } from "react";
import { Navbar, Nav, NavItem} from "react-bootstrap";
import { firebaseApp } from "../firebase";
import { browserHistory } from "react-router";
import logo from '../img/logo.png' 
import { connect } from "react-redux";

class Navigation extends Component {
	signOut() {
		firebaseApp.auth().signOut();
	}

	render() {
		return (
			<div>
				<Navbar inverse collapseOnSelect>
					<Navbar.Header>
				
						<Navbar.Brand><img src={logo} alt="logo" className="logo"/></Navbar.Brand>
					
						<Navbar.Toggle />
					</Navbar.Header>
					<Navbar.Collapse>
						<Nav className="paddingTop25">
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
							
						</Nav>

						<Nav pullRight >
						<div className="logged">
						Welcome {this.props.user}
						</div>
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

function mapStateToProps(state) {
	return {
	
		user: state.user.email,
	};
}

export default connect(mapStateToProps, null)(Navigation);
