import React, { Component } from "react";
import axios from "axios";
import PriceBreakdownListRow from "../PriceBreakdownListRow/PriceBreakdownListRow";

class PriceBreakdown extends Component {
  constructor(props) {
    super(props);
    this.onChangeProduct = this.onChangeProduct.bind(this);
    this.state = {
      selectedProductId: "",
      productPriceBreakdownList: [],
      productList: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:8081/price-calculator/products")
      .then((res) =>
        this.setState({
          productList: res.data,
        })
      )
      .catch((error) =>
        console.error(
          `${error.response.data.requestError.serviceException.text} : ${error.response.data.requestError.serviceException.variables}`
        )
      );
  }

  onChangeProduct(e) {
    this.setState({ selectedProductId: e.target.value }, function () {
      this.getProductPriceBreakdown(this.state.selectedProductId);
    });
  }

  getProductPriceBreakdown(productId) {
    axios
      .get(
        `http://localhost:8081/price-calculator-breakdown/products/${productId}/price/breakdown`,
        {
          params: {
            qty: 50,
          },
        }
      )
      .then((res) =>
        this.setState({
          productPriceBreakdownList: res.data.quantityPrice,
        })
      )
      .catch((error) =>
        console.error(
          `${error.response.data.requestError.serviceException.text} : ${error.response.data.requestError.serviceException.variables}`
        )
      );
  }

  productPriceBreakdownListTableRow() {
    return this.state.productPriceBreakdownList.map(function (object, i) {
      return (
        <PriceBreakdownListRow productPriceBreakdownListObj={object} key={i} />
      );
    });
  }

  render() {
    return (
      <div className="container mt-4">
        <div className="form-group">
          <small className="text-muted">
            <h3>Price Breakdown</h3>
          </small>
        </div>
        <div className="form-group">
          <label>Product : </label>
          <select
            className="browser-default custom-select"
            onChange={this.onChangeProduct}
          >
            <option selected disabled>Select Product</option>
            {this.state.productList.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <table className="table table-striped">
            <thead>
              <tr>
                <th align="left" scope="col">
                  Quantity
                </th>
                <th align="left" scope="col">
                  Price
                </th>
              </tr>
            </thead>
            <tbody>{this.productPriceBreakdownListTableRow()}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default PriceBreakdown;
