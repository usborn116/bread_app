import React from "react";
import { Link } from "react-router-dom";
import Loading from "./Loading";
import { useDataGetter } from "./helpers/useDataGetter";
import LinkHandler from "./LinkHandler";

const Home= () => {
    const {data, loading, setLoading} = useDataGetter({endpoint: '/plaid_credentials'})
    
    const getTransactions = async function (){
        setLoading(true)
        const response = await fetch('/sync_transactions', {
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
            <td>{cred?.notice?.split(' ')[0] == 'Failed' ? <LinkHandler id={cred.id} access_token={cred.access_token}/> : `${cred.notice}`} </td>
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

                <LinkHandler />
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