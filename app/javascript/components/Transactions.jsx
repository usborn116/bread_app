import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getData, load } from "./helpers/api_helpers";
import { LoadContext } from "./contexts/LoadContext";
import Loading from "./Loading";

const Transactions = () => {
    const navigate = useNavigate();
    const [transactions, setTransactions] = useState([])
    const {loading, setLoading} = useContext(LoadContext)

    useEffect(() => {
        setLoading(true)
        const url = "/transactions";
        getData(url, setTransactions, navigate)
        load(setLoading, transactions)
    }, []);

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
        {loading ? <Loading/> :
            
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
        }
        </>
          )
};

export default Transactions