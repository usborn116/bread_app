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
        <div className="table">
        <div key={cred.id} className="row" style={{gridTemplateColumns: 'repeat(4, 1fr)'}}>
            <div><Link to={"/institutions/" + cred.id} className="btn btn-lg custom-button" role="button">{cred.institution_name}</Link></div>
            <div>{cred.institution_id}</div>
            <div>{cred?.notice?.split(' ')[0] == 'Failed' ? <LinkHandler id={cred.id} setLoading={setLoading} access_token={cred.access_token}/> : `${cred.notice}`} </div>
            <Delete setDeleting={setDeleting} endpoint={'plaid_credentials'} id={cred.id} setter={setData} setLoading={setLoading} setError={setError} />
        </div>
        </div>
      ));

    return (
        <>
        {!data ? <Loading/> : 
        <>
            <div>
                <h1 className="display-4">Plaid Credentials</h1>
                <div className="button-container">
                    <button className="button" onClick={() => getTransactions(setLoading)} id='linkButton'> Sync Transactions </button>
                    <LinkHandler setLoading={setLoading}/><br></br>
                </div>
                <Single headers={['Institution Name', 'Institution ID', 'Notices']}/>
                {allItems}
            </div>
        </>
        }
        </>
    )
};

export default Home