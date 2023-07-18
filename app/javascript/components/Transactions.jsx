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

    const allTransactions = transactions.map((t, index) => (
        <div key={index} className="row">
            <div>{t.date}</div>
            <div>{t.name}</div>
            <div>{t.amount}</div>
            <div>{t.group ? t.group.name : 'None'}</div>
            <div>{t.merchant}</div>
        </div>
    ));

    //            

    const noTransactions = (
        <div>
            <div>NONE!</div>
        </div>
    )

    return (
        <div>
            <h1 className="display-4">Transactions</h1>
            <div className="table txn">
                
                <div className='row'>
                    <div>Date</div>
                    <div>Name</div>
                    <div>Amount</div>
                    <div>Budget/Fund</div>
                    <div>Merchant</div>
                    <div>Account</div>
                    <div>Institution</div>
                </div>
                {transactions.length > 0 ? allTransactions : noTransactions}
                
                <Link
                    to="/transactions"
                    className="btn btn-lg custom-button"
                    role="button"
                >
                    View Transactions
                </Link>
            </div>
            </div>
          )
};

export default Transactions