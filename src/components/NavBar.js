import React from "react";
import { Link } from "react-router-dom";
import logo from "../logo.svg";
const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-center">
        <Link to="/">
          <img className="logo" src={logo} alt="owe me logo" />
        </Link>
        <ul className="nav-links">
          <li>
            <Link to="/users">users</Link>
          </li>
          <li>
            <Link to="/transactions">transactions</Link>
          </li>
          <li>
            <Link to="/debts">debts</Link>
          </li>
          <li>
            <Link to="/expenses">expenses</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
export default Navbar;
