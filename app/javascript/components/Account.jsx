import React from "react";
import { updateData } from "./helpers/api_helpers";
import {useParams} from "react-router-dom";
import Error from "./Error";
import Input from "./Input";
import Submit from "./Submit";
import Form from "./Form";
import { useDataGetter } from "./helpers/useDataGetter";
import Single from "./Single";

const Account = () => {
    const {id} = useParams();

    const {data, loading, error, setData, setError, setLoading, create, setDeleting, setCreate} = useDataGetter({endpoint: '/accounts', id: id}) 

    const available = data.available ? data.available : data.current

    const headers = ['Name', 'Available to Spend/Current Balance', 'Account Number', 'Type', 'Institution']
    const columns = [data.name, available, data.last_four, data.subtype, data.institution_name]

    if (error) return <Error message={error}/>

    if (create) return (
        <Form endpoint="accounts" item='account' updater={updateData} id={id} setter={setData} setLoading={setLoading} setError={setError} setEdit={setCreate}>
                <Input type="text" name="name" val={data.name}/>
                <Input type="hidden" name="account_id" val={data.account_id} />
                <Input type="text" name="available" val={data.available} placeHolder='Available'/>
                <Input type="hidden" name="account_type" val={data.account_type}/>
                <Input type="hidden" name="subtype" val={data.subtype} />
                <Input type="hidden" name="user_id" val={data.user_id}/>
                <Input type="hidden" name="institution_name" val={data.institution_name}/>
                <Submit/>
        </Form>
    )

    return (
        <>
        {loading ? '' : 
        <Single headers={headers} columns={columns} name={data.name} setCreate={setCreate}/>
        }
        </>
          )
};

export default Account