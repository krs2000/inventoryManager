import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css";
import { firebaseDb } from "../firebase";
import { connect } from "react-redux";

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
     const user = this.props.user;
    const userDB = user.split(".").join("")
    firebaseDb.ref(userDB+"/Items/"+rowKey).remove();
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

function mapStateToProps(state) {
  return {
    user: state.user.email,
 
    

  };
}


export default connect(mapStateToProps, null)(TableItems);
