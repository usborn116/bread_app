import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getData, load } from "./helpers/api_helpers";
import {usePlaidLink} from 'react-plaid-link';
import Loading from "./Loading";
import { useDataGetter } from "./helpers/useDataGetter";

const Home= () => {
    const [linkToken, setLinkToken] = useState(null)
    const [updateMode, setUpdateMode] = useState(false)
    
    const {data, loading, setLoading} = useDataGetter({endpoint: '/plaid_credentials'})

    const generateToken = async (access_token = null) => {
        const response = await fetch(`/create_link_token${access_token ? `_update/${access_token}` : ''}`, { method: 'post'});
        const data = await response.json();
        setLinkToken(data.link_token)
    };

    const generateUpdateToken = async (access_token) => {
        const response = await fetch(`/create_link_token_update/${access_token}`, { method: 'post'});
        const data = await response.json();
        console.log(data)
        config.token = await data.link_token
        console.log(config.token, typeof config.token)
        await open()
    };


    useEffect(() => {
        generateToken();
    }, []);

    const onSuccess = React.useCallback(async (public_token, metadata) => {
        if (updateMode){
            const response = await fetch(`/exchange_public_token/${public_token}`, {method: 'POST'});
            return response
        }
    })

    const config = {
        token: linkToken,
        onSuccess
    };

    const { open } = usePlaidLink(config);

    const getTransactions = async function (){
        setLoading(true)
        const things = await fetch('/sync_transactions', {
            headers: {
                "content-type": "application/json"
            },
            method: "get"
        })
        setLoading(false)
    }

    const allItems = data?.map((cred) => (
        <tr key={cred.id}>
            <td>{cred.institution_name}</td>
            <td>{cred.institution_id}</td>
            <td>{cred?.notice} <button onClick={() => generateUpdateToken(cred.access_token)}>Fix now!</button></td>
        </tr>
      ));

    return (
        <>
        {loading ? <Loading/> : 
        <>
            <button onClick={() => getTransactions()} id='linkButton'> Sync Transactions </button><br></br>
                <h1 className="display-4">Plaid Credentials!!</h1>
                <table>
                    <thead>
                        <tr>
                            <td>Institution Name</td>
                            <td>Institution ID</td>
                            <td>Notices</td>
                        </tr>
                    </thead>
                    <tbody>{allItems}</tbody>
                </table>

                <button onClick={() => open()} id='linkButton'> Add New Financial Institution </button><br></br>
                <Link to="/transactions_list" className="btn btn-lg custom-button" role="button">View Transactions</Link><br></br>
                <Link to="/accounts_list" className="btn btn-lg custom-button" role="button">View Accounts</Link><br></br>
                <Link to="/budgets_list" className="btn btn-lg custom-button" role="button">View Budgets</Link><br></br>
                <Link to="/monthly_categories" className="btn btn-lg custom-button" role="button">View Monthly Categories</Link><br></br>
                <Link to="/savings_funds" className="btn btn-lg custom-button" role="button">View Savings Funds</Link><br></br>
        </>
        }
        </>
    )
};

export default Home