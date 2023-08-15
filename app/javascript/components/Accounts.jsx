import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getData, load, newData } from "./helpers/api_helpers";
import { LoadContext } from "./contexts/LoadContext";
import Loading from "./Loading";
import Error from "./Error";
import Input from "./Input";
import Submit from "./Submit";
import Form from "./Form";

const Accounts = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([])
    const {loading, setLoading} = useContext(LoadContext)
    const [error, setError] = useState(null)
    const [create, setCreate] = useState(false)

    useEffect(() => {
        setLoading(true)
        const url = "/accounts";
        getData(url, setData, navigate, setLoading)
        load(setLoading, data)
    }, [create]);

    const allAccounts = data.map(a => (
        <div className="row" key={a.id}>
       
        <Link to={"" + a.id} className="btn btn-lg custom-button" role="button">{a.name}</Link>
        </div>
    ));       

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
        <div>
            <h1 className="display-4">Accounts</h1>
            <div className="table accts">
                {allAccounts}
                <button onClick={() => setCreate(true)}>CREATE NEW CASH ACCOUNT</button>
                <Link
                    to="/"
                    className="btn btn-lg custom-button"
                    role="button"
                >
                    HOME
                </Link>
            </div>
        </div>
        }
        </>
          )
};

export default Accounts