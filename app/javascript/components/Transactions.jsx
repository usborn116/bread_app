import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getData, load, newData } from "./helpers/api_helpers";
import { LoadContext } from "./contexts/LoadContext";
import Loading from "./Loading";
import Error from "./Error";
import Input from "./Input";
import Submit from "./Submit";
import Form from "./Form";

const Transactions = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([])
    const {loading, setLoading} = useContext(LoadContext)
    const [error, setError] = useState(null)
    const [create, setCreate] = useState(false)

    useEffect(() => {
        setLoading(true)
        const url = "/transactions";
        getData(url, setData, navigate)
        load(setLoading, data)
    }, [create]);

    const allTransactions = data?.transactions?.map(t => (
        <div key={t.id} className="row">
        <Link to={"" + t.id} className="btn btn-lg custom-button" role="button">{t.name}</Link>
        </div>
    ));

    if (create) return (
        <Form endpoint="transactions" item='transaction' updater={newData} setter={setData} setLoading={setLoading} setError={setError} setEdit={setCreate}>
                <Input type="select" name="account_id" options={data.accounts}/>
                <Input type="text" name="amount" placeHolder='Transaction Name' />
                <Input type="date" name="date" val={new Date()}/>
                <Input type="text" name="name" placeHolder='name'/>
                <Input type="text" name="merchant" placeHolder='Merchant Name' />
                <Input type="text" name="description" placeHolder='Description'/>
                <Input type="select" name="category_id" options={data.categories}/>
                <Input type="hidden" name="transaction_type" val='special'/>
                <Input type="hidden" name="transaction_id" val={`cash#${data.transactions.length}`}/>
                <Submit/>
        </Form>
    )

    return (
        <>
        {loading ? <Loading/> :
            
        <div>
            <h1 className="display-4">Transactions</h1>
            <div className="table txn">
            {allTransactions}
            <button onClick={() => setCreate(true)}>CREATE NEW CASH TRANSACTION</button>
            <Link to="/" className="btn btn-lg custom-button" role="button">HOME</Link>
            </div>
            </div>
        }
        </>
          )
};

export default Transactions