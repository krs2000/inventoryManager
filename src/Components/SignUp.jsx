import React, { Component } from "react";
import { firebaseApp } from "../firebase";
import logo from "../img/logoBlack.png";
import { browserHistory } from "react-router";

class SignUp extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: "",
			error: {
				message: ""
			}
		};
		this.handleEmail = this.handleEmail.bind(this);
		this.handlePassword = this.handlePassword.bind(this);
		this.signUp = this.signUp.bind(this);
	}

	signUp() {
		const { email, password } = this.state;
		firebaseApp
			.auth()
			.createUserWithEmailAndPassword(email, password)
			.catch(error => {
				this.setState({ error });
			});
	}

	handleEmail(e) {
		this.setState({ email: e.target.value });
	}
	handlePassword(e) {
		this.setState({ password: e.target.value });
	}

	render() {
		return (
			<div>
				<div className="containerSign">
					<img src={logo} alt="logo" className="logo" />
				</div>
				<div className="containerSign">
					<div className="form-inline">
						<div className="form-group">
							<input
								className="formControl"
								type="text"
								placeholder="email"
								onChange={this.handleEmail
								}
							/>
							<input
								className="formControl"
								type="password"
								placeholder="password"
								onChange={this.handlePassword
								}
							/>
							<button
								className="btn btn-primary"
								type="button"
								onClick={this.signUp}
							>
								Sign Up
							</button>
						</div>
						<div>{this.state.error.message}</div>
						<button
							className="btn btn-warning"
							onClick={() => browserHistory.push("/signin")}
						>
							Already a user? Sign in instead
						</button>
					</div>
				</div>
			</div>
		);
	}
}

export default SignUp;
