import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css";
import { connect } from "react-redux";

class TableTransactions extends Component {

  render() {
    return (
      <div>
        <BootstrapTable data={this.props.receipts}>
          <TableHeaderColumn dataField="reference" isKey>
            Reference
          </TableHeaderColumn>
          <TableHeaderColumn dataField="type">Type</TableHeaderColumn>
          <TableHeaderColumn dataField="name">
            Product Name
          </TableHeaderColumn>
          <TableHeaderColumn dataField="amount">Amount</TableHeaderColumn>
          <TableHeaderColumn dataField="price">Unit Price</TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {

    receipts: state.receiptReducer.receipts,

  };
}


export default connect(mapStateToProps, null)(TableTransactions);
