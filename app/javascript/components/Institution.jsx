import React from "react";
import {useParams, useNavigate} from "react-router-dom";
import Loading from "./Loading";
import Error from "./Error";
import { useDataGetter } from "./helpers/useDataGetter";
import Single from "./Single";
import Back from "./Back";


const Institution = () => {
    const {id} = useParams();

    const navigate = useNavigate()

    const {data, loading, error, setData, setError, setLoading, create, setDeleting, setCreate} = useDataGetter({endpoint: '/plaid_credentials', id: id})

    const headers1 = ['Institution Name', 'Institution ID', 'Notices']
    const columns1 = [data?.credential?.institution_name, data?.credential?.institution_id, data?.credential?.notice]

    const headers2 = ['Account Name', 'Available To Spend/Current Balance', 'Account Number', 'Type']

    const accounts = data?.accounts?.map(a => <Single key={a.id} columns={[a.name, a?.available || a?.current, a.last_four, a.subtype]}/> );

    const headers3 = ['Transaction', 'Cost', 'Date']

    const txns = data?.transactions?.map(t => <Single key={t.id} columns={[t.name, t.amount?.toFixed(2), t.date]}/>).slice(0, 100);
    

    if (error) return <Error message={error}/>

    return (
        <>
        {loading ? <Loading/> : 
            <>
            <div className="button-container">
                {setCreate ? <Back /> : ''}
                <h1>Institution Information</h1>
            </div>
            <Single headers={headers1} columns={columns1} name={data?.credential?.institution_name}/>
            <div className="table">
                <h2>Accounts</h2>
                <Single headers={headers2}/>
                {accounts}
            </div>
            <div className="table">
                <h2>Last 100 Transactions</h2>
                <Single headers={headers3}/>
                {txns}
            </div>
            </>
        }
        </>
          )
};

export default Institution