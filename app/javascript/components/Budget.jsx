import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getData, load } from "./helpers/api_helpers";
import {useParams} from "react-router-dom";
import { LoadContext } from "./contexts/LoadContext";
import Loading from "./Loading";

const Budget = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [budget, setBudget] = useState([])
    const {loading, setLoading} = useContext(LoadContext)

    useEffect(() => {
        setLoading(true)
        const url = `/budgets/${id}`;
        getData(url, setBudget, navigate)
        load(setLoading, budget)
      }, [id]);  
    
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
            <div>{c.budget_amt.toFixed(2)}</div>
            <div>{c.current}</div>
        </div>
    )) : null;

    const txns = budget.categories ? budget.categories.map((c, i) => (
        c.transactions ? c.transactions.map((t,i) => (
            <div key={i} className="row">
                <div>{t.name}</div>
                <div>{t.amount.toFixed(2)}</div>
                <div>{t.date}</div>
                <div>{c.name}</div>
            </div>
        )) : null
    )) : null;
    

    console.log('Items!', items)

    return (
        <>
        {loading ? <Loading/> : 
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
            <br></br>
            <br></br>
            <div className="table accts">
                <div className='row'>
                    <div>Transaction</div>
                    <div>Cost</div>
                    <div>Date</div>
                    <div>Category</div>
                </div>
                {txns}
            </div>
            </>
        }
        </>
          )
};

export default Budget