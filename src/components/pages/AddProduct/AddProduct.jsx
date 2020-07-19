import React, { Component } from "react";
import axios from "axios";

class AddProduct extends Component {
  constructor(props) {
    super(props);

    this.onChangeProductName = this.onChangeProductName.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onChangeUnitsPerCarton = this.onChangeUnitsPerCarton.bind(this);
    this.onChangeCompensate = this.onChangeCompensate.bind(this);
    this.onChangeEligibleQuantityForDiscount = this.onChangeEligibleQuantityForDiscount.bind(
      this
    );
    this.onChangeDiscount = this.onChangeDiscount.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      product_name: "",
      price: "",
      units_per_carton: "",
      compensate: "",
      eligible_quantity_for_discount: "",
      discount: "",
    };
  }

  onChangeProductName(e) {
    this.setState({ product_name: e.target.value });
  }

  onChangePrice(e) {
    this.setState({ price: e.target.value });
  }

  onChangeUnitsPerCarton(e) {
    this.setState({ units_per_carton: e.target.value });
  }

  onChangeCompensate(e) {
    this.setState({ compensate: e.target.value });
  }

  onChangeEligibleQuantityForDiscount(e) {
    this.setState({ eligible_quantity_for_discount: e.target.value });
  }

  onChangeDiscount(e) {
    this.setState({ discount: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    console.log(
      `Input values : ${this.state.product_name}, ${this.state.price}, ${this.state.units_per_carton}, ${this.state.compensate}, ${this.state.eligible_quantity_for_discount}, ${this.state.discount}`
    );
    const headers = {
      "Content-Type": "application/json",
    };
    const addProductRequestObj = {
      name: this.state.product_name,
      price: this.state.price,
      unitsPerCarton: this.state.units_per_carton,
      compensate: this.state.compensate,
      discountQty: this.state.eligible_quantity_for_discount,
      discount: this.state.discount,
    };
    console.log(addProductRequestObj);
    axios
      .post(
        "http://localhost:8081/price-calculator/products",
        addProductRequestObj,
        { headers }
      )
      .then((res) => console.log(res.data))
      .catch((error) =>
        console.error(
          `${error.response.data.requestError.serviceException.text} : ${error.response.data.requestError.serviceException.variables}`
        )
      );

    this.setState({
      product_name: "",
      price: "",
      units_per_carton: "",
      compensate: "",
      eligible_quantity_for_discount: "",
      discount: "",
    });
  }

  render() {
    return (
      <div className="container mt-4">
        <small className="text-muted">
          <h3>Add New Product</h3>
        </small>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Product Name : </label>
            <input
              type="text"
              className="form-control"
              value={this.state.product_name}
              onChange={this.onChangeProductName}
            />
          </div>

          <div className="form-group">
            <label>Price : </label>
            <input
              type="text"
              className="form-control"
              value={this.state.price}
              onChange={this.onChangePrice}
            />
          </div>

          <div className="form-group">
            <label>Units Per Carton : </label>
            <input
              type="text"
              className="form-control"
              value={this.state.units_per_carton}
              onChange={this.onChangeUnitsPerCarton}
            />
          </div>

          <div className="form-group">
            <label>Compensate - % : </label>
            <input
              type="text"
              className="form-control"
              value={this.state.compensate}
              onChange={this.onChangeCompensate}
            />
          </div>

          <div className="form-group">
            <label>Eligible Quantity for Discount : </label>
            <input
              type="text"
              className="form-control"
              value={this.state.eligible_quantity_for_discount}
              onChange={this.onChangeEligibleQuantityForDiscount}
            />
          </div>

          <div className="form-group">
            <label>Discount - % : </label>
            <input
              type="text"
              className="form-control"
              value={this.state.discount}
              onChange={this.onChangeDiscount}
            />
          </div>

          <div className="form-group">
            <input
              type="submit"
              value="Add Product"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}

export default AddProduct;
