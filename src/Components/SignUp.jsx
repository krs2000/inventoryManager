import React, {Component} from 'react';
import {firebaseApp} from '../firebase';
import logo from '../img/logoBlack.png' 
import { browserHistory } from "react-router";

class SignUp extends Component{

	constructor(props){
	super(props);
	this.state={
		email:"",
		password:"",
		error:{
			message:""
		}
	}

	}


	signUp(){
		const {email,password}=this.state;
		firebaseApp.auth().createUserWithEmailAndPassword(email,password)
		.catch(error=>{
			this.setState({error})
		})
	}

	render(){
		return(
			<div>
			<div className="containerSign"><img src={logo} alt="logo" className="logo"/></div>
			<div className="containerSign">			
			<div className="form-inline">
			<div className = "form-group">
			<input
			className="formControl"
			type="text"
			placeholder="email"
			onChange={event=>this.setState({email:event.target.value})}
			/>
			<input
			className="formControl"
			type="password"
			placeholder="password"
			onChange={event=>this.setState({password:event.target.value})}
			/>
			<button
			className="btn btn-primary"
			type="button"
			onClick={()=>this.signUp()}
			>Sign Up</button>
			</div>
			<div>{this.state.error.message}</div>
			<button
			className = "btn btn-warning"
			onClick={() =>
										browserHistory.push("/signin")
									}

									>Already a user? Sign in instead</button>
			</div>
			
		
			</div>
			</div>
			)
	}

}


export default SignUp;