import React, {useState} from "react";
import { Link } from "react-router-dom";
import Logout from "./Logout";
import Error from "./Error";

const NavBar = ({setError, setUser}) => {
    
    return (
        <div className="nav">
        <Link to="/" className="btn btn-lg custom-button" role="button">HOME</Link>
        <Link to="/transactions_list" className="btn btn-lg custom-button" role="button">Transactions</Link>
        <Link to="/accounts_list" className="btn btn-lg custom-button" role="button">Accounts</Link>
        <Link to="/budgets_list" className="btn btn-lg custom-button" role="button">Budgets</Link>
        <Link to="/categories_list" className="btn btn-lg custom-button" role="button">Categories</Link>
        <Logout setError={setError} setUser={setUser}/>
        </div>
    )

};

export default NavBar