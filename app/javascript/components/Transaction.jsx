import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getData, load, updateData } from "./helpers/api_helpers";
import {useParams} from "react-router-dom";
import { LoadContext } from "./contexts/LoadContext";
import Loading from "./Loading";
import Error from "./Error";
import Input from "./Input";
import Submit from "./Submit";
import Form from "./Form";

const Transaction = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState([])
    const {loading, setLoading} = useContext(LoadContext)
    const [error, setError] = useState(null)
    const [edit, setEdit] = useState(false)

    useEffect(() => {
        setLoading(true)
        const url = `/transactions/${id}`;
        getData(url, setData, navigate)
        load(setLoading, data)
      }, []); 
      
      const txn =
      <div className="row">
          <div>{data?.transaction?.date}</div>
          <div>{data?.transaction?.name}</div>
          <div>{data?.transaction?.amount ? data.transaction?.amount.toFixed(2) : null}</div>
          <div>{data?.transaction?.category ? data.transaction?.category.name : 'None'}</div>
          <div>{data?.transaction?.merchant}</div>
          <div>{data?.transaction?.bank}</div>
          <div>{data?.transaction?.institution_name || 'Cash'}</div>
      </div>
      ;
  

    if (error) return <Error message={error}/>
    
    if (edit) return (
        <Form endpoint="transactions" item='transaction' updater={updateData} id={id} setter={setData} setLoading={setLoading} setError={setError} setEdit={setEdit}>
                <Input type="select" name="account_id" val={data.transaction.account_id} options={data.accounts}/>
                <Input type="text" name="amount" val={data.transaction.amount} />
                <Input type="date" name="date" val={data.transaction.date}/>
                <Input type="text" name="name" val={data.transaction.name}/>
                <Input type="text" name="merchant" val={data.transaction.merchant} />
                <Input type="text" name="description" val={data.transaction.description}/>
                <Input type="hidden" name="user_id" val={data.transaction.user_id}/>
                <Input type="hidden" name="transaction_type" val={data.transaction.transaction_type}/>
                <Input type="hidden" name="transaction_id" val={data.transaction.transaction_id}/>
                <Input type="select" name="category_id" val={data.transaction.category_id} options={data.categories}/>
                <Submit/>
        </Form>
    )


    return (
        <>
        {loading ? <Loading/> : 
        <div className="table accts">
            <div className='row'>
                <div>Date</div>
                <div>Name</div>
                <div>Amount</div>
                <div>Budget/Fund</div>
                <div>Merchant</div>
                <div>Account</div>
                <div>Institution</div>
            </div>
            {txn}
            <button onClick={() => setEdit(true)} value='Edit!'>EDIT</button>
            <Link
                    to="/transactions_list"
                    className="btn btn-lg custom-button"
                    role="button"
                >
                    TRANSACTIONS
                </Link>
        </div>
        }
        </>
          )
};

export default Transaction