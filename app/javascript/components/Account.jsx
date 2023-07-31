import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getData, load } from "./helpers/api_helpers";
import {useParams} from "react-router-dom";

const Account = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [account, setAccount] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const url = `/accounts/${id}`;
        getData(url, setAccount, navigate)
        load(setLoading, account)
      }, [loading]);  
    
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
          )
};

export default Account