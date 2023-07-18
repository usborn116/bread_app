import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getData, load } from "./helpers/api_helpers";

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getData, load } from "./helpers/api_helpers";

const Budgets = () => {
    const navigate = useNavigate();
    const [budgets, setBudgets] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const url = "/budgets";
        getData(url, setBudgets, navigate)
        load(setLoading, budgets)
    }, [loading]);

    const allAccounts = accounts.map((a, index) => (
        <div key={index} className="row">
            <div>{a.name}</div>
            <div>{a.available}</div>
            <div>{a.last_four}</div>
            <div>{a.subtype}</div>
            <div>{a.institution_name}</div>
        </div>
    ));

    //            

    const noAccounts = (
        <div>
            <div>NONE!</div>
        </div>
    )

    return (
        <div>
            <h1 className="display-4">Transactions</h1>
            <div className="table accts">
                
                <div className='row'>
                    <div>Name</div>
                    <div>Available to Spend</div>
                    <div>Account Number</div>
                    <div>Type</div>
                    <div>Institution</div>
                </div>
                {accounts.length > 0 ? allAccounts : noAccounts}
                
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

export default Accounts