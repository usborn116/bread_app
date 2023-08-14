import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getData, load, updateData } from "./helpers/api_helpers";
import {useParams} from "react-router-dom";
import { LoadContext } from "./contexts/LoadContext";
import Loading from "./Loading";
import Error from "./Error";
import Form from "./Form";
import Input from "./Input";
import Submit from "./Submit";

const Category = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState([])
    const {loading, setLoading} = useContext(LoadContext)
    const [error, setError] = useState(null)
    const [edit, setEdit] = useState(false)

    useEffect(() => {
        setLoading(true)
        const url = `/categories/${id}`;
        getData(url, setData, navigate)
        load(setLoading, data)
      }, []);  
    
    const cat =
        <div className="row">
            
            <div>{data?.name} {data?.budget_month || ''}</div>
            <div>{data?.category_type}</div>
            <div>{data?.account?.name || 'None'}</div>
            <div>{data?.current?.toFixed(2) || 0.00}</div>
        </div>
    ;

    const category_options = [{id: 'fund', name: 'Savings Fund'}, {id: 'monthly', name: 'Monthly Budget'}]

    if (error) return <Error message={error}/>

    if (edit) return (
        <Form endpoint="categories" item='category' updater={updateData} id={id} setter={setData} setLoading={setLoading} setError={setError} setEdit={setEdit}>
                <Input type="select" name="category_type" val={data.category_type} options={category_options}/>
                <Input type="text" name="name" val={data.name} />
                <Input type="text" name="current" val={data.current}/>
                <Input type="text" name="budget_amt" val={data?.budget_amt}/>
                <Input type="hidden" name="user_id" val={data.user_id} />
                <Input type="hidden" name="account_id" val={data.account_id}/>
                <Submit/>
        </Form>
    )

    return (
        <>
        {loading ? <Loading/> : 
        <div className="table accts">
              <div className='row'>
                    <div>Name</div>
                    <div>Budget Type</div>
                    <div>Account</div>
                    <div>Current</div>
                </div>
            {cat}
            <button onClick={() => setEdit(true)} value='Edit!'>EDIT</button>
            <Link to="/savings_funds" className="btn btn-lg custom-button" role="button">SAVINGS FUNDS</Link><br></br>
            <Link to="/monthly_categories" className="btn btn-lg custom-button" role="button">BUDGET CATEGORIES</Link>
        </div>
        }
        </>
          )
};

export default Category