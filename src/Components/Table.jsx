import React, { Component } from "react";
import {BootstrapTable , TableHeaderColumn, cellEdit} from 'react-bootstrap-table';
import '../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

const cellEditProp = {
  mode: 'click',
  blurToSave: true
};

class Table extends Component {
  


  render() {
    return (<div>
      <BootstrapTable data={ this.props.products }  cellEdit={ cellEditProp } >
        <TableHeaderColumn dataField='id' isKey>Product ID</TableHeaderColumn>
        <TableHeaderColumn dataField='name'>Product Name</TableHeaderColumn>
   		  <TableHeaderColumn dataField='description'>Description</TableHeaderColumn>
   		 <TableHeaderColumn dataField='category'>Category</TableHeaderColumn>
       <TableHeaderColumn dataField='amount'>Amount</TableHeaderColumn>
      </BootstrapTable>
      </div>
    );
  }
}



	
export default Table;