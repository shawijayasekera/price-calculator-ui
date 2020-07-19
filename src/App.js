import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HeaderBar from "./components/HeaderBar/HeaderBar";
import Home from "./components/pages/Home/Home";
import PriceBreakdown from "./components/pages/PriceBreakdown/PriceBreakdown";
import PriceCalculator from "./components/pages/PriceCalculator/PriceCalculator";
import AddProduct from "./components/pages/AddProduct/AddProduct";
import ViewProductList from "./components/pages/ViewProductList/ViewProductList";

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <HeaderBar />
          <Switch>
            <Route path="/addproduct">
              <AddProduct />
            </Route>
            <Route path="/viewproductlist">
              <ViewProductList />
            </Route>
            <Route path="/pricebreakdown">
              <PriceBreakdown />
            </Route>
            <Route path="/pricecalculator">
              <PriceCalculator />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
