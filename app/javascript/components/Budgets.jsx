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

    const allBudgets = budgets.map((b, index) => (
        <div key={index} className="row">
            <div>{b.month}</div>
            <div>{b.budget_amount.toFixed(2)}</div>
            <div>{b.balance.toFixed(2)}</div>
            <div>{b.rollover.toFixed(2)}</div>
        </div>
    ));

    //            

    const noBudgets = (
        <div>
            <div>NONE!</div>
        </div>
    )

    return (
        <div>
            <h1 className="display-4">Budgets</h1>
            <div className="table budgets">
                
                <div className='row'>
                    <div>Month</div>
                    <div>Budgeted</div>
                    <div>Current</div>
                    <div>Rollover</div>
                </div>
                {budgets.length > 0 ? allBudgets : noBudgets}
                
                <Link
                    to="/"
                    className="btn btn-lg custom-button"
                    role="button"
                >
                    HOME
                </Link>
            </div>
            </div>
          )
};

export default Budgets