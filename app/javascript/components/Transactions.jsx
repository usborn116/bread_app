import React from "react";
import { Link } from "react-router-dom";
import { newData } from "./helpers/api_helpers";
import { useDataGetter } from "./helpers/useDataGetter";
import Loading from "./Loading";
import Error from "./Error";
import Input from "./Input";
import Submit from "./Submit";
import Form from "./Form";
import Delete from "./Delete";

const Transactions = () => {
    const {data, loading, error, setData, setError, setLoading, create, setDeleting, setCreate} = useDataGetter({endpoint: 'transactions'})

    const allTransactions = data?.transactions?.map(t => (
        <div key={t.id} className="row">
        <Link to={"" + t.id} className="btn btn-lg custom-button" role="button">{t.name}</Link>
        <Delete setDeleting={setDeleting} endpoint='transactions' id={t.id} setter={setData} setLoading={setLoading} setError={setError} />
        </div>
    ));

    if (error) return <Error message={error}/>

    if (create) return (
        <Form endpoint="transactions" item='transaction' updater={newData} setter={setData} setLoading={setLoading} setError={setError} setEdit={setCreate}>
                <Input type="select" name="account_id" options={data.accounts}/>
                <Input type="text" name="name" placeHolder='name'/>
                <Input type="text" name="amount" placeHolder='Transaction Amount' />
                <Input type="date" name="date" val={new Date()}/>
                <Input type="text" name="merchant" placeHolder='Merchant Name' />
                <Input type="text" name="description" placeHolder='Description'/>
                <Input type="select" name="category_id" options={data.categories}/>
                <Input type="hidden" name="transaction_type" val='special'/>
                <Input type="hidden" name="transaction_id" val={`cash#${Date.now()}`}/>
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