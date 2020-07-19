import React, { Component } from "react";

class PriceBreakdownListRow extends Component {
  render() {
    return (
      <tr>
        <td align="left">{this.props.productPriceBreakdownListObj.orderQty}</td>
        <td align="left">{this.props.productPriceBreakdownListObj.calculatedPrice}</td>
      </tr>
    );
  }
}

export default PriceBreakdownListRow;
