import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getData, load } from "./helpers/api_helpers";
import {usePlaidLink} from 'react-plaid-link';

const Home= () => {
    
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true)
    const [linkToken, setLinkToken] = useState(null)

    const generateToken = async () => {
        const response = await fetch('/create_link_token', { method: 'post'});
        const data = await response.json();
        await setLinkToken(data.link_token)
    };

    useEffect(() => {
        generateToken();
      }, []);

    const onSuccess = React.useCallback(async (public_token, metadata) => {
        // send public_token to server
        metadata
        const response = await fetch(`/exchange_public_token/${public_token}`, {method: 'POST'});
        setLoading(true)
        load(setLoading, items)
        return response
    })

    const config = {
        token: linkToken,
   //     receivedRedirectUri: window.location.href,
        onSuccess
    };

    const { open } = usePlaidLink(config);
    
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
        <h1 className="display-4">Plaid Credentials!!</h1>
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

        <button onClick={() => open()} id='linkButton'> Add New Financial Institution </button><br></br>
        
        <Link to="/transactions_list" className="btn btn-lg custom-button" role="button">View Transactions</Link><br></br>
        <Link to="/accounts_list" className="btn btn-lg custom-button" role="button">View Accounts</Link><br></br>
        <Link to="/budgets_list" className="btn btn-lg custom-button" role="button">View Budgets</Link><br></br>
        <Link to="/monthly_categories" className="btn btn-lg custom-button" role="button">View Monthly Categories</Link><br></br>
        <Link to="/savings_funds" className="btn btn-lg custom-button" role="button">View Savings Funds</Link><br></br>
  </div>
    )
};


export default Home