import React from "react";
import { Link} from "react-router-dom";
import { updateData } from "./helpers/api_helpers";
import {useParams} from "react-router-dom";
import Error from "./Error";
import Input from "./Input";
import Submit from "./Submit";
import Form from "./Form";
import { useDataGetter } from "./helpers/useDataGetter";

const Account = () => {
    const {id} = useParams();

    const {data, loading, error, setData, setError, setLoading, create, setDeleting, setCreate} = useDataGetter({endpoint: '/accounts', id: id}) 
    
    const acct =
        <div className="row">
            <div>{data.name}</div>
            <div>{data.available ? data.available : data.current}</div>
            <div>{data.last_four}</div>
            <div>{data.subtype}</div>
            <div>{data.institution_name}</div>
        </div>
    ;

    if (error) return <Error message={error}/>

    if (create) return (
        <Form endpoint="accounts" item='account' updater={updateData} id={id} setter={setData} setLoading={setLoading} setError={setError} setEdit={setCreate}>
                <Input type="text" name="name" val={data.name}/>
                <Input type="hidden" name="account_id" val={data.account_id} />
                <Input type="text" name="available" val={data.available}/>
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
        <div className="table accts">
            <div className='row'>
                    <div>Name</div>
                    <div>Available to Spend/Current Balance</div>
                    <div>Account Number</div>
                    <div>Type</div>
                    <div>Institution</div>
                </div>
            {acct}
            <button onClick={() => setCreate(true)} value='Edit!'>EDIT</button>
            <Link to="/accounts_list" className="btn btn-lg custom-button" role="button">ACCOUNTS</Link>
        </div> 
        }
        </>
          )
};

export default Account