import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getData, load } from "./helpers/api_helpers";

const Home= () => {
    
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        const url = "/plaid_credentials";
        getData(url, setItems, navigate)
        load(setLoading, items)
    }, [loading]);

    const allItems = items.map((cred, index) => (
        <tr key={index}>
            <td>{cred.institution_name}</td>
            <td>{cred.institution_id}</td>
        </tr>
      ));

    const noItems = (
        <tr>
            <td>NO BANK</td>
            <td>YET</td>
        </tr>
    )

    return (
  <div className="vw-100 vh-100 primary-color d-flex align-items-center justify-content-center">
        <h1 className="display-4">Plaid Credentials</h1>
        <table>
            <thead>
                <tr>
                    <td>Institution Name</td>
                    <td>Institution ID</td>
                </tr>
            </thead>
            <tbody>
            {items.length > 0 ? allItems : noItems}
            </tbody>
        </table>
        
        <Link
          to="/transactions_list"
          className="btn btn-lg custom-button"
          role="button"
        >
          View Transactions
        </Link>
  </div>
    )
};

export default Home