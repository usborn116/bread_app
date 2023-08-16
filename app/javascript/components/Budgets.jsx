import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getData, load, newData } from "./helpers/api_helpers";
import { LoadContext } from "./contexts/LoadContext";
import Loading from "./Loading";
import Error from "./Error";
import Form from "./Form";
import Input from "./Input";
import Submit from "./Submit";
import Delete from "./Delete";

const Budgets = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([])
    const {loading, setLoading} = useContext(LoadContext)
    const [error, setError] = useState(null)
    const [create, setCreate] = useState(false)
    const [deleting, setDeleting] = useState(false)

    useEffect(() => {
        setLoading(true)
        const url = "/budgets";
        getData(url, setData, navigate)
        load(setLoading, data)
    }, [create, deleting]);

    const allBudgets = data.map((b, index) => (
        <div key={index} className="row">
            <Link to={"" + b.id} className="btn btn-lg custom-button" role="button">{b.month}</Link>
            <Delete setDeleting={setDeleting} endpoint='budgets' id={b.id} setter={setData} setLoading={setLoading} setError={setError} />
        </div>
    ));

    //            
    
    const theMonths = ["January", "February", "March", "April", "May",
    "June", "July", "August", "September", "October", "November", "December"]
    const months = theMonths.map((m, i) => i = {id: m, name: m})
    
    if (error) return <Error message={error}/>

    if (create) return (
        <Form endpoint="budgets" item='budget' updater={newData} setter={setData} setLoading={setLoading} setError={setError} setEdit={setCreate}>
                <Input type="select" name="month" val={data.month} options={months}/>
                <Input type="hidden" name="year" val={String(new Date().getFullYear())}/>
                <Submit/>
        </Form>
    )

    return (
        <>
        {loading ? <Loading /> : 
        <div>
            <h1 className="display-4">Budgets</h1>
            <div className="table budgets">
                {allBudgets}
                <button onClick={() => setCreate(true)}>CREATE</button>
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

export default Budgets