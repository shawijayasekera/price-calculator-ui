import React from "react";
import {Link} from 'react-router-dom';

function HeaderBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <span className="navbar-brand mb-0 h1">Product Price Calculator</span>
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/addproduct">Add Product</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/viewproductlist">View Product</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/pricebreakdown">Price Breakdown</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/pricecalculator">Price Calculator</Link>
        </li>
      </ul>
    </nav>
  );
}

export default HeaderBar;