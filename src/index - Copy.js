import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router ,Route,Switch, Link} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducer from './reducers';
import {firebaseApp} from './firebase';
import {logUser} from './actions';

import App from './Components/App';
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";


// import {browserHistory} from 'react-router';
const browserHistory = createBrowserHistory();

const store =createStore(
	reducer,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	);

firebaseApp.auth().onAuthStateChanged(user=>{
if (user){

	console.log('user has signed up', user);
	const {email} = user ;
	store.dispatch(logUser(email));
	browserHistory.push('/app');

	




} else {

	console.log('user has signed out or still has to sign in');
	browserHistory.replace('/signin');

}

})



ReactDOM.render(

<Provider store={store}>
<Router exact path="/" history={browserHistory}>
		<Switch>
			<Route path="/app" component = {App}/>
				<Route path="/signin" component = {SignIn}/>
			<Route path="/signup" component = {SignUp}/>
		</Switch>
	</Router>

</Provider>

, document.getElementById('root')
)