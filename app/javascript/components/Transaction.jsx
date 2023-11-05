import React from "react";
import { updateData } from "./helpers/api_helpers";
import { useDataGetter } from "./helpers/useDataGetter";
import {useParams} from "react-router-dom";
import Loading from "./Loading";
import Error from "./Error";
import Input from "./Input";
import Submit from "./Submit";
import Form from "./Form";
import Single from "./Single";

const Transaction = () => {
    const {id} = useParams();
    
    const {data, loading, error, setData, setError, setLoading, create, setDeleting, setCreate} = useDataGetter({endpoint: '/transactions', id: id})

    const headers = ['Date', 'Name', 'Amount', 'Budget/Fund', 'Merchant', 'Account', 'Institution']
    const columns = [data?.transaction?.date, data?.transaction?.name, data?.transaction?.amount?.toFixed(2), data?.transaction?.category?.name,
                    data?.transaction?.merchant, data?.transaction?.bank, `${data?.transaction?.institution_name || 'Cash'}`]
  
    if (error) return <Error message={error}/>
    
    if (create) return (
        <Form endpoint="transactions" item='transaction' updater={updateData} id={id} setter={setData} setLoading={setLoading} setError={setError} setEdit={setCreate}>
                <Input type="select" name="account_id" val={data.transaction.account_id} options={data.accounts}/>
                <Input type="text" name="amount" val={data.transaction.amount} />
                <Input type="date" name="date" val={data.transaction.date}/>
                <Input type="text" name="name" val={data.transaction.name}/>
                <Input type="text" name="merchant" val={data.transaction.merchant} placeHolder='merchant'/>
                <Input type="text" name="description" val={data.transaction.description} placeHolder='description'/>
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
        <Single headers={headers} columns={columns} setCreate={setCreate} name={data?.transaction?.name} />
        }
        </>
    )
};

export default Transaction