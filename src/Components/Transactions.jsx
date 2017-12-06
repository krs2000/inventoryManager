import React, {Component} from 'react';
import Navigation from "./Navigation";
import TableTransactions from './TableTransactions';

class Transactions extends Component{



	render(){
		return(
    <div>
   	<Navigation/>

   <TableTransactions/>
    </div>

			)
	}

}


export default Transactions;