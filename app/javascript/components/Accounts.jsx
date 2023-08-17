import React from "react";
import { Link } from "react-router-dom";
import { newData } from "./helpers/api_helpers";
import Loading from "./Loading";
import Error from "./Error";
import Input from "./Input";
import Submit from "./Submit";
import Form from "./Form";
import Delete from "./Delete";
import { useDataGetter } from "./helpers/useDataGetter";

const Accounts = () => {
    const {data, loading, error, setData, setError, setLoading, create, setDeleting, setCreate} = useDataGetter({endpoint: 'accounts'})

    const allAccounts = data.map(a => (
        <div className="row" key={a.id}>
       
        <Link to={"" + a.id} className="btn btn-lg custom-button" role="button">{a.name}</Link>
        <Delete setDeleting={setDeleting} endpoint='accounts' id={a.id} setter={setData} setLoading={setLoading} setError={setError} />
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
                <Link to="/" className="btn btn-lg custom-button" role="button">HOME</Link>
            </div>
        </div>
        }
        </>
          )
};

export default Accounts