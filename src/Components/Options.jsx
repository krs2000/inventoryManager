import React, { Component } from "react";
import { connect } from "react-redux";
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
		this.handlePassoword = this.handlePassoword.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
		this.handleX = this.handleX.bind(this);
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

	handlePassoword(e) {
		this.setState({
			password: e.target.value
		});
	}

	handleDelete() {
		this.setState({ delete: true });
	}

	handleX() {
		this.setState({
			delete: false,
			error: ""
		});
	}

	render() {
		return (
			<div className="subContent">
				{this.state.delete && (
					<div>
								<input
									type="password"
									name="password"
									placeholder="Confirm Password"
									className="form-control smallMarginBottom"
									onChange={this.handlePassoword}
								/>					
								<button
									onClick={this.deleteUser}
									className="btn btn-basic"
								>
									Confirm
								</button>
								<button
									onClick={this.handleX
									}
									className="btn btn-danger"
								>
									X
								</button>					
					</div>
				)}
				<div className="center">
					<button
						onClick={this.handleDelete}
						className="btn btn-warning"
					>
						Delete account
					</button>
				</div>
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
