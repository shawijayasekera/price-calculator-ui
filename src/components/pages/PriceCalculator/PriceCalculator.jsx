import React, { Component } from "react";
import axios from "axios";

class PriceCalculator extends Component {
  constructor(props) {
    super(props);

    this.onChangeProduct = this.onChangeProduct.bind(this);
    this.onChangeQuantity = this.onChangeQuantity.bind(this);
    this.onChangeOrderType = this.onChangeOrderType.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      selectedProductId: "",
      productList: [],
      product_id: "",
      quantity: "",
      order_type: "",
      calculatedProductPrice: "",
    };
  }

  onChangeProduct(e) {
    this.setState({ product_id: e.target.value });
  }

  onChangeQuantity(e) {
    this.setState({ quantity: e.target.value });
  }

  onChangeOrderType(e) {
    this.setState({ order_type: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const productId = this.state.product_id;
    const orderQty = this.state.quantity;
    const productOrderType = this.state.order_type;
    axios
      .get(
        `http://localhost:8081/price-calculator/products/${productId}/price`,
        {
          params: {
            qty: orderQty,
            orderType: productOrderType,
          },
        }
      )
      .then((res) =>
        this.setState(
          {
            calculatedProductPrice: res.data.quantityPrice.calculatedPrice,
          },
          function () {
            this.updatedCalculatedProductPrice(
              this.state.calculatedProductPrice
            );
          }
        )
      )
      .catch((error) =>
        console.error(
          `${error.response.data.requestError.serviceException.text} : ${error.response.data.requestError.serviceException.variables}`
        )
      );
  }

  updatedCalculatedProductPrice(calculatedPrice) {
    console.log("updatedCalculatedProductPrice Called");
    console.log(calculatedPrice);
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

  render() {
    return (
      <div className="container mt-4">
        <small className="text-muted">
          <h3>Price Calculator</h3>
        </small>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Product Name : </label>
            <select
              className="browser-default custom-select"
              onChange={this.onChangeProduct}
            >
              <option selected disabled>
                Select Product
              </option>
              {this.state.productList.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Quantity : </label>
            <input
              type="text"
              className="form-control"
              onChange={this.onChangeQuantity}
            />
          </div>

          <div className="form-group">
            <label>Order Type : </label>
            <select
              className="browser-default custom-select"
              onChange={this.onChangeOrderType}
            >
              <option selected disabled>
                Select Order Type
              </option>
              <option key="1" value="Units">
                Units
              </option>
              <option key="2" value="Carton">
                Carton
              </option>
            </select>
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Calculate Price"
              className="btn btn-primary"
            />
          </div>
        </form>

        <div className="form-group">
          <label>
            <b>Calculated Price : </b>
          </label>
          <textarea
            readOnly
            className="form-control"
            value={this.state.calculatedProductPrice}
            rows="1"
          ></textarea>
        </div>
      </div>
    );
  }
}

export default PriceCalculator;
