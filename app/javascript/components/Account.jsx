import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getData, load } from "./helpers/api_helpers";
import {useParams} from "react-router-dom";
import Loading from "./Loading";
import { LoadContext } from "./contexts/LoadContext";

const Account = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [account, setAccount] = useState([])
    //const [loading, setLoading] = useState(true)
    const {loading, setLoading} = useContext(LoadContext)

    useEffect(() => {
        //setLoading(true)
        const url = `/accounts/${id}`;
        getData(url, setAccount, navigate, setLoading)
        //load(setLoading, account)
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
            <Link
                    to="/accounts_list"
                    className="btn btn-lg custom-button"
                    role="button"
                >
                    ACCOUNTS
                </Link>
        </div> 
        }
        </>
          )
};

export default Account