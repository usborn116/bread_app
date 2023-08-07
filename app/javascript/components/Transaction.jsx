import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getData, load } from "./helpers/api_helpers";
import {useParams} from "react-router-dom";
import { LoadContext } from "./contexts/LoadContext";
import Loading from "./Loading";

const Transaction = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [transaction, setTransaction] = useState([])
    const {loading, setLoading} = useContext(LoadContext)

    useEffect(() => {
        setLoading(true)
        const url = `/transactions/${id}`;
        getData(url, setTransaction, navigate)
        load(setLoading, transaction)
      }, []);  

    
    
    const txn =
    <div className="row">
        <div>{transaction.date}</div>
        <div>{transaction.name}</div>
        <div>{transaction.amount ? transaction.amount.toFixed(2) : null}</div>
        <div>{transaction.category ? transaction.category.name : 'None'}</div>
        <div>{transaction.merchant}</div>
        <div>{transaction.bank}</div>
        <div>{transaction.institution_name || 'Cash'}</div>
    </div>
    ;

    return (
        <>
        {loading ? <Loading/> : 
        <div className="table accts">
            <div className='row'>
                <div>Date</div>
                <div>Name</div>
                <div>Amount</div>
                <div>Budget/Fund</div>
                <div>Merchant</div>
                <div>Account</div>
                <div>Institution</div>
            </div>
            {txn}
            <Link
                    to="/transactions_list"
                    className="btn btn-lg custom-button"
                    role="button"
                >
                    TRANSACTIONS
                </Link>
        </div>
        }
        </>
          )
};

export default Transaction