import React, { Component } from "react";

class ProductListRow extends Component {
  render() {
    return (
      <tr>
        <td align="left">{this.props.productListObj.id}</td>
        <td align="left">{this.props.productListObj.name}</td>
        <td align="left">{this.props.productListObj.price}</td>
        <td align="left">{this.props.productListObj.unitsPerCarton}</td>
        <td align="left">{this.props.productListObj.compensate}</td>
        <td align="center">{this.props.productListObj.discountQty}</td>
        <td align="left">{this.props.productListObj.discount}</td>
      </tr>
    );
  }
}

export default ProductListRow;
