import React from "react";
import { Link } from "react-router-dom";
import { updateData } from "./helpers/api_helpers";
import { useDataGetter } from "./helpers/useDataGetter";
import {useParams} from "react-router-dom";
import Loading from "./Loading";
import Error from "./Error";
import Form from "./Form";
import Input from "./Input";
import Submit from "./Submit";
import Edit from "./Edit";
import Single from "./Single";

const Budget = () => {
    const {id} = useParams();

    const {data, loading, error, setData, setError, setLoading, create, setDeleting, setCreate} = useDataGetter({endpoint: '/budgets', id: id})
    
    const bdgt =
        <div className="row">
            <div>{`${data.month} ${data.year}`}</div>
            <div>{data?.balance?.toFixed(2) || 0}</div>
            <div>{data.budget_amount}</div>
            <div>{data?.rollover?.toFixed(2) || 0}</div>
        </div>

    const items = data?.categories?.map((c, i) => (
        <div key={i} className="row">
            <div>{c.name}</div>
            <div>{c.budget_amt?.toFixed(2)}</div>
            <div>{c.current}</div>
        </div>
    ));

    const txns = data?.categories?.map((c, i) => (
        c?.transactions.map((t,i) => (
            <div key={i} className="row">
                <div>{t.name}</div>
                <div>{t.amount?.toFixed(2)}</div>
                <div>{t.date}</div>
                <div>{c.name}</div>
            </div>
        ))
    ));
    

    if (error) return <Error message={error}/>

    const theMonths = ["January", "February", "March", "April", "May",
    "June", "July", "August", "September", "October", "November", "December"]
    const months = theMonths.map((m, i) => i = {id: m, name: m})

    if (create) return (
        <Form endpoint="budgets" item='budget' updater={updateData} id={id} setter={setData} setLoading={setLoading} setError={setError} setEdit={setCreate}>
                <Input type="select" name="month" val={data.month} options={months}/>
                <Input type="hidden" name="year" val={String(new Date().getFullYear())}/>
                <Submit/>
        </Form>
    )

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
            <Edit setCreate={setCreate} name={`${data?.month} ${data?.year}`}/>
            </>
        }
        </>
          )
};

export default Budget