import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getData, load } from "./helpers/api_helpers";

const Transactions = () => {
    const navigate = useNavigate();
    const [transactions, setTransactions] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const url = "/transactions";
        getData(url, setTransactions, navigate)
        load(setLoading, transactions)
    }, [loading]);

    const allTransactions = transactions.map(t => (
        <div className="row">
        <Link to={"" + t.id} className="btn btn-lg custom-button" role="button">{t.name}</Link>
        </div>
    ));

    //            

    const noTransactions = (
        <div>
            <div>NONE!</div>
        </div>
    )

    return (
        <>
            
        <div>
            <h1 className="display-4">Transactions</h1>
            <div className="table txn">
    
                {transactions.length > 0 ? allTransactions : noTransactions}
                
                <Link
                    to="/"
                    className="btn btn-lg custom-button"
                    role="button"
                >
                    HOME
                </Link>
            </div>
            </div>
            </>
          )
};

export default Transactions