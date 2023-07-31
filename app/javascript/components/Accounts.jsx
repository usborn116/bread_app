import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getData, load } from "./helpers/api_helpers";
import Account from "./Account";

const Accounts = () => {
    const navigate = useNavigate();
    const [accounts, setAccounts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const url = "/accounts";
        getData(url, setAccounts, navigate)
        load(setLoading, accounts)
    }, [loading]);

    const allAccounts = accounts.map(a => (
        <div className="row">
       
        <Link to={"" + a.id} className="btn btn-lg custom-button" role="button">{a.name}</Link>
        </div>
    ));       

    const noAccounts = (
        <div>
            <div>NONE!</div>
        </div>
    )

    return (
        <div>
            <h1 className="display-4">Accounts</h1>
            <div className="table accts">
                {accounts.length > 0 ? allAccounts : noAccounts}
                
                <Link
                    to="/"
                    className="btn btn-lg custom-button"
                    role="button"
                >
                    HOME
                </Link>
            </div>
            </div>
          )
};

export default Accounts