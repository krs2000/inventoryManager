import React, { Component } from "react";
import { connect } from "react-redux";
import Navigation from "./Navigation";
import { Col, Row } from "react-bootstrap";
import * as firebase from "firebase";

class Options extends Component {
	constructor(props) {
		super(props);
		this.state = {
			password: "",
			delete: false,
			error: ""
		};
		this.deleteUser = this.deleteUser.bind(this);
	}

	deleteUser() {
		var user = firebase.auth().currentUser;
		var credential = firebase.auth.EmailAuthProvider.credential(
			this.props.user,
			this.state.password
		);
		// Prompt the user to re-provide their sign-in credentials
		user
			.reauthenticateWithCredential(credential)
			.then(function() {
				// User re-authenticated.

				user
					.delete()
					.then(function() {
						// User deleted.
					})
					.catch(error => {
						this.setState({ error });
						// An error happened.
					});
			})
			.catch(error => {
				// An error happened.
				this.setState({ error: "Wrong Password!" });
			});
	}

	render() {
		return (
			<div>
				<Navigation />
				{this.state.delete && (
					<div>
						<Row className="center">
							<Col
								xs={3}
								md={3}
								className="receiptReferenceAndDate"
							>
								<input
									type="password"
									name="password"
									placeholder="Confirm Old Password"
									className="form-control smallMarginBottom"
									onChange={event =>
										this.setState({
											password: event.target.value
										})
									}
								/>
							</Col>
							<Row>
								<button
									onClick={() => this.deleteUser()}
									className="btn btn-basic"
								>
									Confirm
								</button>

								<button
									onClick={() =>
										this.setState({
											delete: false,
											error: ""
										})
									}
									className="btn btn-danger"
								>
									X
								</button>
							</Row>
						</Row>
					</div>
				)}
				<Row className="center">
					<button
						onClick={() => this.setState({ delete: true })}
						className="btn btn-warning"
					>
						Delete account
					</button>
				</Row>
				{this.state.error.length > 0 && (
					<div className="center">{this.state.error}</div>
				)}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		user: state.user.email
	};
}
export default connect(mapStateToProps, null)(Options);
