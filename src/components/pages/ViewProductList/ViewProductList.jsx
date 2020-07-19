import React, { Component } from "react";
import axios from "axios";
import ProductListRow from "../ProductListRow/ProductListRow";

class PriceBreakdown extends Component {
  constructor(props) {
    super(props);
    this.state = { productList: [] };
  }

  componentDidMount() {
    axios
      .get("http://localhost:8081/price-calculator/products")
      .then((res) => this.setState({ productList: res.data }))
      .catch((error) =>
        console.error(
          `${error.response.data.requestError.serviceException.text} : ${error.response.data.requestError.serviceException.variables}`
        )
      );
  }

  productListTableRow() {
    return this.state.productList.map(function (object, i) {
      return <ProductListRow productListObj={object} key={i} />;
    });
  }

  render() {
    return (
      <div className="container mt-4">
        <h3>
          <small className="text-muted">Product List</small>
        </h3>
        <table className="table table-striped">
          <thead>
            <tr>
              <th align="left" scope="col">
                Product Id
              </th>
              <th align="left" scope="col">
                Product Name
              </th>
              <th align="left" scope="col">
                Price
              </th>
              <th align="left" scope="col">
                Units Per Carton
              </th>
              <th align="left" scope="col">
                Compensate
              </th>
              <th align="left" scope="col">
                Eligible Quantity for Discount
              </th>
              <th align="left" scope="col">
                Discount
              </th>
            </tr>
          </thead>
          <tbody>{this.productListTableRow()}</tbody>
        </table>
      </div>
    );
  }
}

export default PriceBreakdown;
