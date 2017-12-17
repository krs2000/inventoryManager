import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css";
import { connect } from "react-redux";
import { firebaseDb } from "../firebase";

let rowKey = "";

const selectRowProp = {
  mode: 'radio',
  clickToSelect: true,
  onSelect: onRowSelect,
};

function onRowSelect(row, isSelected){
  for(let prop in row){
    if (prop==="serverKey"){
    rowKey=row[prop];
  }
  }
}

class TableItems extends Component {
  deleteItem(){
    firebaseDb.ref(this.props.userDb+"/Items/"+rowKey).remove();
  }


  render() {
    return (
      <div >
      <button
                type="button"
                className="btn btn-warning smallMarginBottom"
                onClick={() => this.deleteItem()}
              >
                Delete Item
              </button>
        <BootstrapTable data={this.props.products} selectRow={selectRowProp} className="bgWhite" >
          <TableHeaderColumn dataField="name" isKey>Product Name</TableHeaderColumn>
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

function mapStateToProps(state) {
  return {
    user: state.user.email,
     userDb: state.user.userDb
    

  };
}


export default connect(mapStateToProps, null)(TableItems);
