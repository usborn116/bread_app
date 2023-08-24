import React from "react";
import { Link } from "react-router-dom";
import Loading from "./Loading";
import { useDataGetter } from "./helpers/useDataGetter";
import LinkHandler from "./LinkHandler";
import Single from "./Single";
import { getTransactions } from "./helpers/api_helpers";
import Delete from "./Delete";

const Home= () => {
    const {data, loading, setLoading, setDeleting, setData, setError} = useDataGetter({endpoint: '/plaid_credentials'})

    const allItems = data?.map((cred) => (
        <div key={cred.id} className="row">
            <div><Link to={"/institutions/" + cred.id} className="btn btn-lg custom-button" role="button">{cred.institution_name}</Link></div>
            <div>{cred.institution_id}</div>
            <div>{cred?.notice?.split(' ')[0] == 'Failed' ? <LinkHandler id={cred.id} setLoading={setLoading} access_token={cred.access_token}/> : `${cred.notice}`} </div>
            <Delete setDeleting={setDeleting} endpoint={'plaid_credentials'} id={cred.id} setter={setData} setLoading={setLoading} setError={setError} />
        </div>
      ));

    return (
        <>
        {loading ? <Loading/> : 
        <>
            <button onClick={() => getTransactions(setLoading)} id='linkButton'> Sync Transactions </button><br></br>
            <div>
                <h1 className="display-4">Plaid Credentials</h1>
                <div className="table">
                    <Link to="/" className="btn btn-lg custom-button" role="button">HOME</Link>
                    <Single headers={['Institution Name', 'Institution ID', 'Notices']}/>
                    {allItems}
                </div>
            </div>
            <LinkHandler setLoading={setLoading}/><br></br>
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