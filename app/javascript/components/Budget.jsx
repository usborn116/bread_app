import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getData, load } from "./helpers/api_helpers";
import {useParams} from "react-router-dom";

const Budget = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [budget, setBudget] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const url = `/budgets/${id}`;
        getData(url, setBudget, navigate)
        load(setLoading, budget)
      }, [loading]);  
    
    const bdgt =
        <div className="row">
            <div>{budget.month}</div>
            <div>{budget.balance ? budget.balance.toFixed(2) : 0}</div>
            <div>{budget.budget_amount}</div>
            <div>{budget.rollover ? budget.rollover.toFixed(2) : 0}</div>
        </div>

    const items = budget.categories ? budget.categories.map((c, i) => (
        <div key={i} className="row">
            <div>{c.name}</div>
            <div>{c.budget_amt}</div>
            <div>{c.current}</div>
        </div>
    )) : null;

    console.log('Items!', items)

    return (
        <>
            <Link to="/budgets_list" className="btn btn-lg custom-button" role="button">BUDGETS</Link>
            <div className="table accts">
                <div className='row'>
                    <div>Budget Month</div>
                    <div>Budget Balance</div>
                    <div>Budgeted Amount</div>
                    <div>Rollover Amount</div>
                </div>
                {bdgt}
            </div>
            <div className="table accts">
                <div className='row'>
                    <div>Budget Item</div>
                    <div>Budget Amount</div>
                    <div>Current Balance</div>
                </div>
                {items}
            </div>
        </>
          )
};

export default Budget