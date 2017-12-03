import React from "react";
import ReactDOM from "react-dom";
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {Router,Route,browserHistory} from 'react-router';


import {firebaseApp} from './firebase';
import {logUser} from './actions';
import reducer from './reducers';

import App from './Components/App';
import SignIn from './Components/SignIn';
import SignUp from './Components/SignUp';
import Inventory from './Components/Inventory';
import Receipt from './Components/Receipt';
import Ticket from './Components/Ticket';
import Transactions from './Components/Transactions';

const store =createStore(reducer,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	);


firebaseApp.auth().onAuthStateChanged(user=>{
if (user){

	// console.log('user has signed up', user);
	const {email} = user ;
	store.dispatch(logUser(email));
	browserHistory.push('/app');
	
} else {

	// console.log('user has signed out or still has to sign in');
	browserHistory.replace('/signin');
}

})



ReactDOM.render(
<Provider store={store}>
<Router path="/" history={browserHistory}>
<Route path="/app" component = {App} />
<Route path="/Signin" component = {SignIn}/>
<Route path="/Signup" component = {SignUp}/>
<Route path="/Inventory" component = {Inventory}/>
<Route path="/Receipt" component = {Receipt}/>
<Route path="/Ticket" component = {Ticket}/>
<Route path="/home" component = {Inventory}/>
</Router>
</Provider>
, document.getElementById('root')

	)


