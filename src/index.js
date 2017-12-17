import React from "react";
import ReactDOM from "react-dom";
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {Router,Route,browserHistory} from 'react-router';
import {firebaseApp} from './firebase';
import {logUser} from './actions';
import reducer from './reducers';

import Start from './Components/Start';
import SignIn from './Components/SignIn';
import SignUp from './Components/SignUp';
import Inventory from './Components/Inventory';
import Receipt from './Components/Receipt';
import Ticket from './Components/Ticket';
import Transactions from './Components/Transactions';
import Options from './Components/Options';


import "./Styles/style.css"

const store =createStore(reducer,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	);


firebaseApp.auth().onAuthStateChanged(user=>{
if (user){

	// console.log('user has signed up', user);
	const {email} = user ;
	store.dispatch(logUser(email));
	browserHistory.push('/Start');
	
} else {

	// console.log('user has signed out or still has to sign in');
	browserHistory.replace('/signin');
}

})



ReactDOM.render(
<Provider store={store}>
<Router history={browserHistory}>
<Route path="/Start" component = {Start} />
<Route path="/Signin" component = {SignIn}/>
<Route path="/Signup" component = {SignUp}/>
<Route path="/Inventory" component = {Inventory}/>
<Route path="/Receipt" component = {Receipt}/>
<Route path="/Ticket" component = {Ticket}/>
<Route path="/Options" component = {Options}/>
<Route path="/Transactions" component = {Transactions}/>
</Router>
</Provider>
, document.getElementById('root')

	)