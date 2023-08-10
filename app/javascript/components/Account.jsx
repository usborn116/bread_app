import React, { useState, useEffect, useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getData, load, updateData } from "./helpers/api_helpers";
import {useParams} from "react-router-dom";
import Error from "./Error";
import { LoadContext } from "./contexts/LoadContext";
import Input from "./Input";
import Submit from "./Submit";
import Form from "./Form";

const Account = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [account, setAccount] = useState([])
    const {loading, setLoading} = useContext(LoadContext)
    const [error, setError] = useState(null)
    const [edit, setEdit] = useState(false)

    useEffect(() => {
        const url = `/accounts/${id}`;
        getData(url, setAccount, navigate, setLoading, setError)
        load(setLoading, account)
      }, []);  
    
    const acct =
        <div className="row">
            <div>{account.name}</div>
            <div>{account.available ? account.available : account.current}</div>
            <div>{account.last_four}</div>
            <div>{account.subtype}</div>
            <div>{account.institution_name}</div>
        </div>
    ;

    if (error) return <Error message={error}/>

    if (edit) return (
        <Form endpoint="accounts" item='account' updater={updateData} id={id} setter={setAccount} setLoading={setLoading} setError={setError} setEdit={setEdit}>
                <Input type="text" name="name" val={account.name}/>
                <Input type="hidden" name="account_id" val={account.account_id} />
                <Input type="text" name="available" val={account.available}/>
                <Input type="hidden" name="account_type" val={account.account_type}/>
                <Input type="hidden" name="subtype" val={account.subtype} />
                <Input type="hidden" name="user_id" val={account.user_id}/>
                <Input type="hidden" name="institution_name" val={account.institution_name}/>
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
            <button onClick={() => setEdit(true)} value='Edit!'>EDIT</button>
            <Link to="/accounts_list" className="btn btn-lg custom-button" role="button">ACCOUNTS</Link>
        </div> 
        }
        </>
          )
};

export default Account