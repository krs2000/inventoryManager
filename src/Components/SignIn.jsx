import React, {Component} from 'react';
import {firebaseApp} from '../firebase';
import logo from '../img/logoBlack.png' 
import { browserHistory } from "react-router";

class SignIn extends Component{

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



	signIn(){
		const {email,password}=this.state;
		firebaseApp.auth().signInWithEmailAndPassword(email,password)
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
			onClick={()=>this.signIn()}
			>Sign In</button>
			</div>
			<div>{this.state.error.message}</div>
			<button
			className = "btn btn-warning"
			onClick={() =>
										browserHistory.push("/signup")
									}

									>Don't have account? Sign up instead</button>
			</div>
			</div>
			</div>
			)
	}

}


export default SignIn;