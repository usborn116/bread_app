import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {

    return (
        <div className="nav">
        <Link to="/" className="btn btn-lg custom-button" role="button">HOME</Link>
        <Link to="/transactions_list" className="btn btn-lg custom-button" role="button">Transactions</Link>
        <Link to="/accounts_list" className="btn btn-lg custom-button" role="button">Accounts</Link>
        <Link to="/budgets_list" className="btn btn-lg custom-button" role="button">Budgets</Link>
        <Link to="/monthly_categories" className="btn btn-lg custom-button" role="button">Monthly Categories</Link>
        <Link to="/savings_funds" className="btn btn-lg custom-button" role="button">Savings Funds</Link>
        </div>
    )

};

export default NavBar