import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css";
import { connect } from "react-redux";
import { firebaseDb } from "../firebase";

let rowKey = "";

const selectRowProp = {
  mode: "radio",
  clickToSelect: true,
  onSelect: onRowSelect
};

function onRowSelect(row, isSelected) {
  for (let prop in row) {
    if (prop === "serverKey") {
      return (rowKey = row[prop]);
    }
  }
}

class TableTransactions extends Component {

  constructor(props) {
    super(props);
    this.state = {
      canRender:false
    };
  }

  deleteItem() {
    firebaseDb.ref(this.props.userDb + "/Receipts/" + rowKey).remove();
  }

  componentWillReceiveProps (){

    this.setState({canRender:true})
  }

  render() {
    return (
      <div>
      { this.state.canRender && <div>
        <button
          type="button"
          className="btn btn-warning smallMarginBottom"
          onClick={() => this.deleteItem()}
        >
          Delete Transaction
        </button>
        <BootstrapTable
          data={this.props.receipts}
          selectRow={selectRowProp}
          className="table"
        >
          <TableHeaderColumn dataField="type">Type</TableHeaderColumn>
          <TableHeaderColumn dataField="name">Product Name</TableHeaderColumn>
          <TableHeaderColumn dataField="amount">Amount</TableHeaderColumn>
          <TableHeaderColumn dataField="price">Unit Price</TableHeaderColumn>
          <TableHeaderColumn dataField="totalPrice">Total Price</TableHeaderColumn>
          <TableHeaderColumn dataField="reference" isKey>Referene</TableHeaderColumn>
          <TableHeaderColumn dataField="date">Date</TableHeaderColumn>

        </BootstrapTable></div>}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user.email,
    receipts: state.receiptReducer.receipts,
    userDb: state.user.userDb
  };
}

export default connect(mapStateToProps, null)(TableTransactions);
