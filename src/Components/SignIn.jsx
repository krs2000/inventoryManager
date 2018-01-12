import React, { Component } from "react";
import { firebaseApp } from "../firebase";
import logo from "../img/logo.png";
import { browserHistory } from "react-router";

class SignIn extends Component {
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
			this.signIn = this.signIn.bind(this);
	}

	signIn() {
		const { email, password } = this.state;
		firebaseApp
			.auth()
			.signInWithEmailAndPassword(email, password)
			.catch(error => {
				this.setState({ error });
			});
	}

	handleEmail(e){
		this.setState({ email: e.target.value })
	}
		handlePassword(e){
		this.setState({ password: e.target.value })
	}

	render() {
		return (
			<div >
			
				<p className="logoContainer"><img src={logo} alt="logo"/></p>
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
								onClick={this.signIn}
							>
								Sign In
							</button>
						</div>
						<div>{this.state.error.message}</div>
						<button
							className="btn btn-warning"
							onClick={() => browserHistory.push("/signup")}
						>
							Don't have account? Sign up instead
						</button>
					</div>
				</div>
			</div>
		);
	}
}

export default SignIn;
