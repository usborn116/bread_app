import React from "react";
import { newData } from "./helpers/api_helpers";
import Loading from "./Loading";
import Error from "./Error";
import Input from "./Input";
import Submit from "./Submit";
import Form from "./Form";
import { useDataGetter } from "./helpers/useDataGetter";
import List from "./List";

const Accounts = () => {
    const {data, loading, error, setData, setError, setLoading, create, setDeleting, setCreate} = useDataGetter({endpoint: 'accounts'})     

    const headers = ['Name', 'Available to Spend/Current Balance', 'Account Number', 'Type', 'Institution']

    if (error) return <Error message={error}/>

    if (create) return (
        <Form endpoint="accounts" item='account' updater={newData} setter={setData} setLoading={setLoading} setError={setError} setEdit={setCreate}>
                <Input type="text" name="name" placeHolder='Name of account'/>
                <Input type="text" name="available" placeHolder='Amount available'/>
                <Input type="hidden" name="account_id" val={String(data.length)} />
                <Input type="hidden" name="account_type" val='depository'/>
                <Input type="hidden" name="subtype" val='cash' />
                <Input type="hidden" name="institution_name" val='Cash'/>
                <Submit/>
        </Form>
    )

    return (
        <>
        {loading ? <Loading/> : 
        <List headers={headers} data={data} tablename='Accounts' setCreate={setCreate} setDeleting={setDeleting} setData={setData} setLoading={setLoading} setError={setError}/>
    }
        </>
          )
};

export default Accounts