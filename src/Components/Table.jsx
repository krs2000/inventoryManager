import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css";


class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
            
    };
  }




  render() {
    return (
      <div>
        <BootstrapTable data={this.props.products}>
          <TableHeaderColumn dataField="itemId" isKey>
            Product ID
          </TableHeaderColumn>
          <TableHeaderColumn dataField="name">Product Name</TableHeaderColumn>
          <TableHeaderColumn dataField="description">
            Description
          </TableHeaderColumn>
          <TableHeaderColumn dataField="category">Category</TableHeaderColumn>
          <TableHeaderColumn dataField="amount">Amount</TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}




export default Table;
